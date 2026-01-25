# Data Model

## 1. Overview

SQLite is the single source of truth for article data. Astro reads SQLite directly at build time.

```
SQLite (feeds.db)     ──►    Astro (better-sqlite3)    ──►    Static HTML/RSS
   │                              │
   │ Committed                    │ Build-time read
   │ Updated by fetch_rss.py      │ No intermediate files
```

## 2. SQLite Schema

### 2.1 articles Table

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
    category TEXT,                       -- Category (extracted from URL)
    created_at TEXT DEFAULT (datetime('now')),  -- Record creation timestamp
    updated_at TEXT DEFAULT (datetime('now'))   -- Record update timestamp
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_articles_pub_date ON articles(pub_date DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
```

### 2.2 Column Details

| Column      | Type    | Nullable | Description                 | Example                                                |
| ----------- | ------- | -------- | --------------------------- | ------------------------------------------------------ |
| id          | INTEGER | NO       | Auto-increment ID           | 1, 2, 3...                                             |
| guid        | TEXT    | NO       | Unique article identifier   | `https://techcommunity.microsoft.com/.../ba-p/4488917` |
| title       | TEXT    | NO       | Article title               | "Supercharging SharePoint Metadata..."                 |
| link        | TEXT    | NO       | Article URL                 | `https://techcommunity.microsoft.com/.../ba-p/4488917` |
| description | TEXT    | YES      | Article body (raw HTML)     | `<P>Organizations adopting...</P>`                     |
| pub_date    | TEXT    | NO       | Publication date (ISO 8601) | `2026-01-24T00:10:05Z`                                 |
| author      | TEXT    | YES      | Author name (username)      | `NicholasAquino`                                       |
| category    | TEXT    | YES      | Category (URL-extracted)    | `healthcare-and-life-sciences`                         |
| created_at  | TEXT    | NO       | Record creation timestamp   | `2026-01-25T12:00:00`                                  |
| updated_at  | TEXT    | NO       | Record update timestamp     | `2026-01-25T12:00:00`                                  |

### 2.3 UPSERT Logic

To prevent duplicate articles, execute UPSERT using `guid` as the key.

```sql
INSERT INTO articles (guid, title, link, description, pub_date, author, category)
VALUES (?, ?, ?, ?, ?, ?, ?)
ON CONFLICT(guid) DO UPDATE SET
    title = excluded.title,
    description = excluded.description,
    updated_at = datetime('now');
```

## 3. Data Access Pattern (Astro)

Astro reads SQLite directly at build time using `better-sqlite3`. No intermediate JSON file is needed.

### 3.1 Database Helper (TypeScript)

```typescript
// site/src/lib/db.ts
import Database from "better-sqlite3";
import { join } from "path";

const DB_PATH = join(process.cwd(), "..", "data", "feeds.db");

export interface Article {
  id: number;
  guid: string;
  title: string;
  link: string;
  description: string | null;
  pub_date: string;
  author: string | null;
  category: string | null;
}

export function getArticles(limit: number = 30): Article[] {
  const db = new Database(DB_PATH, { readonly: true });
  const stmt = db.prepare(`
    SELECT id, guid, title, link, description, pub_date, author, category
    FROM articles
    ORDER BY pub_date DESC
    LIMIT ?
  `);
  const articles = stmt.all(limit) as Article[];
  db.close();
  return articles;
}

export function getArticlesByCategory(category: string): Article[] {
  const db = new Database(DB_PATH, { readonly: true });
  const stmt = db.prepare(`
    SELECT id, guid, title, link, description, pub_date, author, category
    FROM articles
    WHERE category = ?
    ORDER BY pub_date DESC
  `);
  const articles = stmt.all(category) as Article[];
  db.close();
  return articles;
}

export function getAllCategories(): string[] {
  const db = new Database(DB_PATH, { readonly: true });
  const stmt = db.prepare(`
    SELECT DISTINCT category FROM articles WHERE category IS NOT NULL
  `);
  const rows = stmt.all() as { category: string }[];
  db.close();
  return rows.map((r) => r.category);
}
```

### 3.2 Description Processing

When displaying, HTML tags should be stripped:

```typescript
export function stripHtml(html: string | null): string {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}
```

## 4. Category Extraction Logic

Since the RSS feed lacks category tags, extract from URL path.

### 4.1 URL Structure

```
https://techcommunity.microsoft.com/t5/{category-name}/{article-slug}/ba-p/{article-id}
```

### 4.2 Extraction Regex

```python
import re

def extract_category(url: str) -> str | None:
    """Extract category from URL"""
    match = re.search(r'/t5/([^/]+)/', url)
    if match:
        return match.group(1)
    return None
```

### 4.3 Category Examples

| Category Slug                  | Display Name (Inferred)      |
| ------------------------------ | ---------------------------- |
| `azure-ai-services-blog`       | Azure AI Services Blog       |
| `microsoft-sentinel-blog`      | Microsoft Sentinel Blog      |
| `healthcare-and-life-sciences` | Healthcare and Life Sciences |
| `exchange-team-blog`           | Exchange Team Blog           |
| `microsoft-365-blog`           | Microsoft 365 Blog           |

## 5. Search Index (Generated)

Generate search index for Lunr.js at Hugo build time.

### 5.1 Indexed Fields

| Field       | Boost | Description   |
| ----------- | ----- | ------------- |
| title       | 10    | Article title |
| category    | 5     | Category      |
| author      | 3     | Author name   |
| description | 1     | Body text     |

### 5.2 Index Structure (search-index.json)

```json
{
  "index": { ... },  // Lunr.js serialized index
  "documents": {
    "1": {
      "title": "...",
      "link": "...",
      "category": "...",
      "pub_date": "..."
    }
  }
}
```
