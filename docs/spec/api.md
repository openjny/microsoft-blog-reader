# API & Endpoint Specification

## 1. Web Page Endpoints

Static pages hosted on GitHub Pages.

### 1.1 Top Page

| Item             | Value                              |
| ---------------- | ---------------------------------- |
| URL              | `/` or `/index.html`               |
| Description      | Display list of latest 30 articles |
| Update Frequency | On data update (every 12 hours)    |

#### Displayed Content

- Article title (link to original article)
- Publication date (relative or absolute time)
- Author name
- Category badge
- Summary (first ~100 characters)

### 1.2 Search Page

| Item           | Value                                  |
| -------------- | -------------------------------------- |
| URL            | `/search/` or `/search/index.html`     |
| Description    | Client-side search across all articles |
| Implementation | Lunr.js                                |

#### Features

- Free-text search
- Real-time search results
- Search result highlighting (optional)

### 1.3 Archive Page (Optional)

| Item        | Value                             |
| ----------- | --------------------------------- |
| URL         | `/archive/`                       |
| Description | Full article list with pagination |

## 2. RSS Feed Endpoints

### 2.1 Main Feed

| Item               | Value                       |
| ------------------ | --------------------------- |
| URL                | `/feed.xml` or `/index.xml` |
| Format             | RSS 2.0                     |
| Article Count      | Latest 50 articles          |
| Character Encoding | UTF-8                       |

#### RSS Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Microsoft Blog Reader</title>
    <link>https://{username}.github.io/microsoft-blog-reader/</link>
    <description>Aggregated feed of Microsoft Tech Community blogs</description>
    <language>en-us</language>
    <lastBuildDate>Sun, 26 Jan 2026 00:00:00 +0000</lastBuildDate>
    <atom:link href="https://{username}.github.io/microsoft-blog-reader/feed.xml"
               rel="self" type="application/rss+xml"/>

    <item>
      <title>Article Title</title>
      <link>https://techcommunity.microsoft.com/...</link>
      <pubDate>Sat, 25 Jan 2026 00:10:05 +0000</pubDate>
      <guid isPermaLink="true">https://techcommunity.microsoft.com/.../ba-p/4488917</guid>
      <dc:creator>AuthorName</dc:creator>
      <category>category-name</category>
      <description><![CDATA[Article summary...]]></description>
    </item>
    <!-- Up to 50 items -->
  </channel>
</rss>
```

#### Feed Element Details

| Element           | Required | Description                            |
| ----------------- | -------- | -------------------------------------- |
| `<title>`         | ✓        | Feed title                             |
| `<link>`          | ✓        | Site top page URL                      |
| `<description>`   | ✓        | Feed description                       |
| `<language>`      |          | Language code                          |
| `<lastBuildDate>` |          | Last build timestamp (RFC 822)         |
| `<atom:link>`     |          | Self-referencing link (Atom extension) |

#### Article Element Details

| Element         | Required | Description                                       |
| --------------- | -------- | ------------------------------------------------- |
| `<title>`       | ✓        | Article title                                     |
| `<link>`        | ✓        | Original article URL                              |
| `<pubDate>`     | ✓        | Publication date (RFC 822)                        |
| `<guid>`        | ✓        | Unique identifier                                 |
| `<dc:creator>`  |          | Author name                                       |
| `<category>`    |          | Category                                          |
| `<description>` |          | Article summary (HTML allowed, CDATA recommended) |

## 3. Data File Endpoints

### 3.1 Articles Data JSON

| Item    | Value                                            |
| ------- | ------------------------------------------------ |
| URL     | `/data/articles.json`                            |
| Format  | JSON                                             |
| Purpose | Search index building, external tool integration |

```json
{
  "generated_at": "2026-01-25T12:00:00Z",
  "total_count": 150,
  "articles": [ ... ]
}
```

### 3.2 Search Index

| Item    | Value                            |
| ------- | -------------------------------- |
| URL     | `/js/search-index.json`          |
| Format  | JSON (Lunr.js serialized format) |
| Purpose | Client-side search               |

## 4. HTTP Headers

Headers automatically set by GitHub Pages:

| Header        | Value                                      |
| ------------- | ------------------------------------------ |
| Content-Type  | `text/html; charset=utf-8` (HTML)          |
| Content-Type  | `application/rss+xml; charset=utf-8` (RSS) |
| Content-Type  | `application/json; charset=utf-8` (JSON)   |
| Cache-Control | `max-age=600` (GitHub Pages default)       |

## 5. CORS

GitHub Pages does not return CORS headers by default, so JavaScript fetch from external sites may be restricted.

RSS reader access via HTTP requests is not affected by CORS.

## 6. Error Handling

| Status | Situation               |
| ------ | ----------------------- |
| 200    | Success                 |
| 404    | Page/resource not found |

GitHub Pages is static hosting, so server-side errors (5xx) generally do not occur.

## 7. Rate Limiting

GitHub Pages has no explicit rate limits, but the following soft limits apply:

- Site size: 1GB recommended
- Bandwidth: 100GB/month recommended
- Builds: 10/hour

Normal RSS reader access will not hit these limits.
