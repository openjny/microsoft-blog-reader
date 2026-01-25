# Data Model

## 1. Overview

SQLite is the single source of truth for article data. Astro reads SQLite directly at build time.

```
SQLite (feeds.db)     ──►    Astro (better-sqlite3)    ──►    Static HTML/RSS
   │                              │
   │ Committed                    │ Build-time read
   │ Updated by fetch_rss.py      │ No intermediate files
```

## 2. Terminology

| Term            | Definition                                                                                | Example                                        |
| --------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------- |
| **board**       | Identifier extracted from RSS URL (`/t5/{board}/...`). Stored in DB.                      | `microsoft-foundry-blog`, `apps-on-azure-blog` |
| **boardId**     | Normalized board identifier (lowercase, no hyphens/underscores). Used for matching.       | `microsoftfoundryblog`, `appsonazureblog`      |
| **category**    | **Official** Tech Community category. Used in URL: `/category/{category}/blog/{boardId}`. | `azure-ai-foundry`, `azure`                    |
| **group**       | **Project-defined** UI grouping for filtering. Not an official Tech Community concept.    | `Azure`, `Microsoft 365`, `Security`, `Others` |
| **displayName** | User-friendly name for the blog.                                                          | `Microsoft Foundry`, `Apps on Azure`           |

## 3. SQLite Schema

### 3.1 articles Table

Main table storing article information.

```sql
CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guid TEXT UNIQUE NOT NULL,           -- Unique article identifier (RSS guid)
    title TEXT NOT NULL,                 -- Article title
    link TEXT NOT NULL,                  -- Article URL
    description TEXT,                    -- Article body (raw HTML from RSS)
    pub_date TEXT NOT NULL,              -- Publication date (ISO 8601 format)
    author TEXT,                         -- Author (dc:creator)
    board TEXT,                          -- Board identifier (extracted from URL)
    created_at TEXT DEFAULT (datetime('now')),  -- Record creation timestamp
    updated_at TEXT DEFAULT (datetime('now'))   -- Record update timestamp
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_articles_pub_date ON articles(pub_date DESC);
CREATE INDEX IF NOT EXISTS idx_articles_board ON articles(board);
```

### 3.2 Column Details

| Column      | Type    | Nullable | Description                 | Example                                                |
| ----------- | ------- | -------- | --------------------------- | ------------------------------------------------------ |
| id          | INTEGER | NO       | Auto-increment ID           | 1, 2, 3...                                             |
| guid        | TEXT    | NO       | Unique article identifier   | `https://techcommunity.microsoft.com/.../ba-p/4488917` |
| title       | TEXT    | NO       | Article title               | "Supercharging SharePoint Metadata..."                 |
| link        | TEXT    | NO       | Article URL                 | `https://techcommunity.microsoft.com/.../ba-p/4488917` |
| description | TEXT    | YES      | Article body (raw HTML)     | `<P>Organizations adopting...</P>`                     |
| pub_date    | TEXT    | NO       | Publication date (ISO 8601) | `2026-01-24T00:10:05Z`                                 |
| author      | TEXT    | YES      | Author name (username)      | `NicholasAquino`                                       |
| board       | TEXT    | YES      | Board identifier            | `microsoft-foundry-blog`                               |
| created_at  | TEXT    | NO       | Record creation timestamp   | `2026-01-25T12:00:00`                                  |
| updated_at  | TEXT    | NO       | Record update timestamp     | `2026-01-25T12:00:00`                                  |

### 3.3 UPSERT Logic

To prevent duplicate articles, execute UPSERT using `guid` as the key.

```sql
INSERT INTO articles (guid, title, link, description, pub_date, author, board)
VALUES (?, ?, ?, ?, ?, ?, ?)
ON CONFLICT(guid) DO UPDATE SET
    title = excluded.title,
    description = excluded.description,
    updated_at = datetime('now');
```

## 4. Board Extraction Logic

The RSS feed lacks category tags, so board is extracted from URL path.

### 4.1 URL Structure

```
https://techcommunity.microsoft.com/t5/{board}/{article-slug}/ba-p/{article-id}
```

### 4.2 Extraction Regex

```python
import re

def extract_board(url: str) -> str | None:
    """Extract board identifier from article URL path."""
    match = re.search(r'/t5/([^/]+)/', url)
    if match:
        return match.group(1)
    return None
```

### 4.3 Board Examples

| Board (Raw)                    | Normalized boardId          | Display Name                 |
| ------------------------------ | --------------------------- | ---------------------------- |
| `microsoft-foundry-blog`       | `microsoftfoundryblog`      | Microsoft Foundry            |
| `apps-on-azure-blog`           | `appsonazureblog`           | Apps on Azure                |
| `healthcare-and-life-sciences` | `healthcareandlifesciences` | Healthcare And Life Sciences |
| `exchange-team-blog`           | `exchangeteamblog`          | Exchange                     |

## 5. Board Metadata (TypeScript)

Board metadata is defined in `site/src/lib/blogs.ts`.

### 5.1 Structure

```typescript
interface BoardMetadata {
  displayName: string; // User-friendly name
  urlCategory: string; // Tech Community URL path segment
  group: Group; // UI grouping (Azure, Microsoft 365, Security, Others)
}

const BOARDS: Record<string, BoardMetadata> = {
  appsonazureblog: {
    displayName: "Apps on Azure",
    urlCategory: "azure",
    group: "Azure",
  },
  // ...
};
```

### 5.2 Aliases

Some boards have different URL slugs from their normalized boardId. Aliases handle this:

```typescript
const ALIASES: Record<string, string> = {
  // normalized slug -> canonical boardId
  microsoftfoundryblog: "azureaifoundryblog",
  healthcareandlifesciences: "healthcareandlifesciencesblog",
};
```

### 5.3 Resolution Flow

1. `normalizeBoard(board)`: Remove hyphens/underscores, lowercase
2. Check `ALIASES` for mapping to canonical boardId
3. Lookup metadata in `BOARDS`

## 6. Data Access Pattern (Astro)

Astro reads SQLite directly at build time using `better-sqlite3`.

### 6.1 Database Helper

```typescript
// site/src/lib/db.ts
export interface Article {
  id: number;
  guid: string;
  title: string;
  link: string;
  description: string | null;
  pub_date: string;
  author: string | null;
  board: string | null;
}

export function getAllArticles(): Article[] {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT id, guid, title, link, description, pub_date, author, board
    FROM articles
    ORDER BY pub_date DESC
  `);
  const articles = stmt.all() as Article[];
  db.close();
  return articles;
}

export function formatBoard(board: string | null): string {
  if (!board) return "";
  const metadata = getBlogMetadata(board);
  return metadata?.displayName ?? board;
}
```

### 6.2 Description Processing

HTML tags should be stripped when displaying:

```typescript
export function stripHtml(html: string | null): string {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
```

## 7. Client-Side Filtering

Filtering by group uses the normalized boardId with alias resolution:

```javascript
function resolveBoardId(board) {
  const normalized = board.toLowerCase().replace(/[-_]/g, "");
  return ALIASES[normalized] ?? normalized;
}

function filterByGroup(articles, selectedGroup) {
  const boardIdsInGroup = groupBoardIds[selectedGroup];
  return articles.filter((a) => {
    const resolvedId = resolveBoardId(a.board);
    return boardIdsInGroup.includes(resolvedId);
  });
}
```
