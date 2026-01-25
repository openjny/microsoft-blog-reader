# Data Model

## 1. SQLite Schema

### 1.1 articles Table

Main table storing article information.

```sql
CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guid TEXT UNIQUE NOT NULL,           -- Unique article identifier (RSS guid)
    title TEXT NOT NULL,                 -- Article title
    link TEXT NOT NULL,                  -- Article URL
    description TEXT,                    -- Article body (HTML)
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

### 1.2 Column Details

| Column      | Type    | Nullable | Description                     | Example                                                |
| ----------- | ------- | -------- | ------------------------------- | ------------------------------------------------------ |
| id          | INTEGER | NO       | Auto-increment ID               | 1, 2, 3...                                             |
| guid        | TEXT    | NO       | Unique article identifier       | `https://techcommunity.microsoft.com/.../ba-p/4488917` |
| title       | TEXT    | NO       | Article title                   | "Supercharging SharePoint Metadata..."                 |
| link        | TEXT    | NO       | Article URL                     | `https://techcommunity.microsoft.com/.../ba-p/4488917` |
| description | TEXT    | YES      | Article body (may contain HTML) | `<P>Organizations adopting...</P>`                     |
| pub_date    | TEXT    | NO       | Publication date (ISO 8601)     | `2026-01-24T00:10:05Z`                                 |
| author      | TEXT    | YES      | Author name (username)          | `NicholasAquino`                                       |
| category    | TEXT    | YES      | Category (URL-extracted)        | `healthcare-and-life-sciences`                         |
| created_at  | TEXT    | NO       | Record creation timestamp       | `2026-01-25T12:00:00`                                  |
| updated_at  | TEXT    | NO       | Record update timestamp         | `2026-01-25T12:00:00`                                  |

### 1.3 UPSERT Logic

To prevent duplicate articles, execute UPSERT using `guid` as the key.

```sql
INSERT INTO articles (guid, title, link, description, pub_date, author, category)
VALUES (?, ?, ?, ?, ?, ?, ?)
ON CONFLICT(guid) DO UPDATE SET
    title = excluded.title,
    description = excluded.description,
    updated_at = datetime('now');
```

## 2. JSON Export Format

Export to `data/articles.json` as Hugo data file.

### 2.1 Structure

```json
{
  "generated_at": "2026-01-25T12:00:00Z",
  "total_count": 150,
  "articles": [
    {
      "id": 150,
      "guid": "https://techcommunity.microsoft.com/.../ba-p/4488917",
      "title": "Supercharging SharePoint Metadata...",
      "link": "https://techcommunity.microsoft.com/.../ba-p/4488917",
      "description": "Organizations adopting Microsoft 365 Copilot...",
      "pub_date": "2026-01-24T00:10:05Z",
      "author": "NicholasAquino",
      "category": "healthcare-and-life-sciences"
    }
  ]
}
```

### 2.2 Field Description

| Field        | Type   | Description                             |
| ------------ | ------ | --------------------------------------- |
| generated_at | string | JSON generation timestamp (ISO 8601)    |
| total_count  | number | Total article count                     |
| articles     | array  | Array of article objects (newest first) |

### 2.3 Description Processing

- Strip HTML tags from the original RSS description
- Store full text without truncation

```python
import re

def strip_html(html: str) -> str:
    """Remove HTML tags from text"""
    text = re.sub(r'<[^>]+>', '', html)
    text = re.sub(r'\s+', ' ', text).strip()
    return text
```
    if len(text) > max_length:
        text = text[:max_length] + '...'
    return text
```

## 3. Category Extraction Logic

Since the RSS feed lacks category tags, extract from URL path.

### 3.1 URL Structure

```
https://techcommunity.microsoft.com/t5/{category-name}/{article-slug}/ba-p/{article-id}
```

### 3.2 Extraction Regex

```python
import re

def extract_category(url: str) -> str | None:
    """Extract category from URL"""
    match = re.search(r'/t5/([^/]+)/', url)
    if match:
        return match.group(1)
    return None
```

### 3.3 Category Examples

| Category Slug                  | Display Name (Inferred)      |
| ------------------------------ | ---------------------------- |
| `azure-ai-services-blog`       | Azure AI Services Blog       |
| `microsoft-sentinel-blog`      | Microsoft Sentinel Blog      |
| `healthcare-and-life-sciences` | Healthcare and Life Sciences |
| `exchange-team-blog`           | Exchange Team Blog           |
| `microsoft-365-blog`           | Microsoft 365 Blog           |

## 4. Search Index

Generate search index for Lunr.js at build time.

### 4.1 Indexed Fields

| Field       | Boost | Description      |
| ----------- | ----- | ---------------- |
| title       | 10    | Article title    |
| category    | 5     | Category         |
| author      | 3     | Author name      |
| description | 1     | Body (truncated) |

### 4.2 Index Structure (search-index.json)

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
