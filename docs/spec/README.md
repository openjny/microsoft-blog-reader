# Azure Blog Reader - Specification

A system that periodically fetches Microsoft Tech Community blog RSS, stores articles in a database, and provides a static site with Web UI and extended RSS feed.

## Document Structure

| Document                           | Description                              |
| ---------------------------------- | ---------------------------------------- |
| [requirements.md](requirements.md) | Functional & Non-functional Requirements |
| [architecture.md](architecture.md) | System Architecture & Technology Stack   |
| [data-model.md](data-model.md)     | Data Model & Schema Definition           |
| [api.md](api.md)                   | RSS Feed & Endpoint Specification        |

## Quick Reference

### Key Parameters

| Item                  | Value       |
| --------------------- | ----------- |
| Data Fetch Interval   | 12 hours    |
| Web UI Display Count  | 30 articles |
| RSS Feed Count        | 50 articles |
| Data Storage          | SQLite      |
| Static Site Generator | Hugo        |

### Source RSS

```
https://techcommunity.microsoft.com/t5/s/gxcuf89792/rss/Community?interaction.style=blog
```
