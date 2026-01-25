# Microsoft Blog Reader

**Live Site**: https://openjny.github.io/microsoft-blog-reader

A system that periodically fetches Microsoft Tech Community blog RSS feeds, stores articles in a database, and provides a static site with an extended RSS feed.

## Overview

The official Microsoft Tech Community RSS feed only delivers approximately 25-30 articles at a time. When new articles are posted, older articles quickly disappear from the feed. This system solves that limitation.

## Features

- **Data Accumulation**: Fetch RSS every 12 hours and store in SQLite
- **Web UI**: Display latest 30 articles with client-side search
- **Extended RSS**: Generate RSS 2.0 feed containing latest 50 articles

## License

MIT
