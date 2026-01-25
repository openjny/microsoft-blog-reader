# Requirements Specification

## 1. Background & Objectives

The Microsoft Tech Community official blog RSS feed only delivers approximately 25-30 articles at a time. When new articles are posted, older articles quickly disappear from the feed.

This system addresses this limitation by:

1. **Data Accumulation**: Periodically fetch RSS and store article information in a database
2. **Web UI**: Provide a static website to browse and search accumulated articles
3. **Extended RSS**: Generate and distribute an RSS feed containing more articles than the original

## 2. Functional Requirements

### 2.1 Data Fetching & Storage (FR-001)

| ID        | Requirement                                               | Priority    |
| --------- | --------------------------------------------------------- | ----------- |
| FR-001-01 | Periodically fetch RSS feed from Microsoft Tech Community | Required    |
| FR-001-02 | Store fetched article information in SQLite database      | Required    |
| FR-001-03 | Prevent duplicate entries; add only new articles (UPSERT) | Required    |
| FR-001-04 | Extract category from article URL path and store it       | Recommended |
| FR-001-05 | Run automatically every 12 hours via GitHub Actions       | Required    |

### 2.2 Web UI (FR-002)

| ID        | Requirement                                                         | Priority    |
| --------- | ------------------------------------------------------------------- | ----------- |
| FR-002-01 | Display latest 30 articles on the top page                          | Required    |
| FR-002-02 | Show title, publication date, author, and category for each article | Required    |
| FR-002-03 | Link article titles to original articles                            | Required    |
| FR-002-04 | Provide client-side search functionality across all articles        | Required    |
| FR-002-05 | Enable filtering by category                                        | Recommended |
| FR-002-06 | Host on GitHub Pages                                                | Required    |

### 2.3 RSS Feed Generation (FR-003)

| ID        | Requirement                                                                           | Priority |
| --------- | ------------------------------------------------------------------------------------- | -------- |
| FR-003-01 | Generate RSS 2.0 format feed from accumulated articles                                | Required |
| FR-003-02 | Include latest 50 articles in RSS feed                                                | Required |
| FR-003-03 | Make accessible at `/feed.xml` or `/index.xml`                                        | Required |
| FR-003-04 | Preserve required fields from original feed (title, link, pubDate, guid, description) | Required |

## 3. Non-Functional Requirements

### 3.1 Performance (NFR-001)

| ID         | Requirement                             | Target           |
| ---------- | --------------------------------------- | ---------------- |
| NFR-001-01 | RSS fetch and DB update processing time | Under 60 seconds |
| NFR-001-02 | Static site build time                  | Under 30 seconds |
| NFR-001-03 | Web page initial load time              | Under 3 seconds  |
| NFR-001-04 | Search index size (at 1000 articles)    | Under 1MB        |

### 3.2 Availability (NFR-002)

| ID         | Requirement                          | Target                 |
| ---------- | ------------------------------------ | ---------------------- |
| NFR-002-01 | GitHub Pages hosting availability    | 99.9% (per GitHub SLA) |
| NFR-002-02 | Automatic retry on RSS fetch failure | Up to 3 attempts       |

### 3.3 Maintainability (NFR-003)

| ID         | Requirement                                                                       |
| ---------- | --------------------------------------------------------------------------------- |
| NFR-003-01 | Manage source code in GitHub repository                                           |
| NFR-003-02 | Version control database file with Git                                            |
| NFR-003-03 | Manage configuration values (fetch interval, display count, etc.) in config files |

### 3.4 Security (NFR-004)

| ID         | Requirement                                     |
| ---------- | ----------------------------------------------- |
| NFR-004-01 | Manage API keys and secrets with GitHub Secrets |
| NFR-004-02 | Sanitize HTML contained in RSS description      |

## 4. Constraints

| Item                         | Constraint                                  |
| ---------------------------- | ------------------------------------------- |
| Source RSS item count        | ~25-30 articles (Microsoft's limitation)    |
| GitHub Actions free tier     | 2000 min/month (unlimited for public repos) |
| GitHub Pages storage         | 1GB (soft limit)                            |
| Scheduled execution accuracy | ±15-20 minute delay possible                |

## 5. Future Extensions (Out of Scope)

- Support for multiple RSS feeds (other Microsoft blogs)
- Full article content storage
- Email notification functionality
- AI-powered article summarization
