# Microsoft Blog Reader - Specification

A system that periodically fetches Microsoft Tech Community blog RSS, stores articles in a database, and provides a static site with Web UI and extended RSS feed.

## Design Principle

**Separation of Concerns**: Data collection and presentation are strictly separated.

```
fetch_rss.py (scheduled)            Astro (on-demand)
      │                                   │
      ▼                                   ▼
RSS ──► SQLite (committed) ──────────► HTML/RSS (deployed)
                               │
                     better-sqlite3 (direct read)
```

- **SQLite** is the single source of truth (committed to repository)
- **Astro** reads SQLite directly at build time (no intermediate JSON)
- Static files are generated on-demand during build (not committed)

## Document Structure

| Document                           | Description                              |
| ---------------------------------- | ---------------------------------------- |
| [requirements.md](requirements.md) | Functional & Non-functional Requirements |
| [architecture.md](architecture.md) | System Architecture & Technology Stack   |
| [data-model.md](data-model.md)     | Data Model & Schema Definition           |
| [api.md](api.md)                   | RSS Feed & Endpoint Specification        |

## Quick Reference

### Key Parameters

| Item                  | Value          |
| --------------------- | -------------- |
| Data Fetch Interval   | 12 hours       |
| Web UI Display Count  | 30 articles    |
| RSS Feed Count        | 50 articles    |
| Data Storage          | SQLite         |
| Static Site Generator | Astro          |
| SQLite Access         | better-sqlite3 |

### Source RSS

```
https://techcommunity.microsoft.com/t5/s/gxcuf89792/rss/Community?interaction.style=blog
```
