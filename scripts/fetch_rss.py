#!/usr/bin/env python3
"""
Fetch Microsoft Tech Community RSS and store articles in SQLite database.

This script:
1. Fetches RSS feed from Microsoft Tech Community
2. Parses and extracts article information
3. Stores articles in SQLite with UPSERT logic
"""

import logging
import re
import sqlite3
import sys
import time
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

import feedparser  # type: ignore[import-untyped]

# Configuration
RSS_URL = "https://techcommunity.microsoft.com/t5/s/gxcuf89792/rss/Community?interaction.style=blog"
MAX_RETRIES = 3
RETRY_DELAY = 5  # seconds

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
DATA_DIR = PROJECT_ROOT / "data"
DB_PATH = DATA_DIR / "feeds.db"

# Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


def init_database(conn: sqlite3.Connection) -> None:
    """Initialize database schema."""
    conn.executescript(
        """
        CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            guid TEXT UNIQUE NOT NULL,
            title TEXT NOT NULL,
            link TEXT NOT NULL,
            description TEXT,
            pub_date TEXT NOT NULL,
            author TEXT,
            board TEXT,
            created_at TEXT DEFAULT (datetime('now')),
            updated_at TEXT DEFAULT (datetime('now'))
        );

        CREATE INDEX IF NOT EXISTS idx_articles_pub_date ON articles(pub_date DESC);
        CREATE INDEX IF NOT EXISTS idx_articles_board ON articles(board);
    """
    )
    conn.commit()
    logger.info("Database schema initialized")


def extract_board(url: str) -> str | None:
    """Extract board identifier from article URL path.

    The board is extracted from the URL pattern: /t5/{board}/...
    Example: /t5/apps-on-azure-blog/... -> 'apps-on-azure-blog'
    """
    match = re.search(r"/t5/([^/]+)/", url)
    if match:
        return match.group(1)
    return None


def parse_pub_date(entry: dict[str, Any]) -> str:
    """Parse publication date from feed entry to ISO 8601 format."""
    if hasattr(entry, "published_parsed") and entry.published_parsed:
        dt = datetime(
            entry.published_parsed.tm_year,
            entry.published_parsed.tm_mon,
            entry.published_parsed.tm_mday,
            entry.published_parsed.tm_hour,
            entry.published_parsed.tm_min,
            entry.published_parsed.tm_sec,
            tzinfo=UTC,
        )
        return dt.isoformat()
    if hasattr(entry, "updated_parsed") and entry.updated_parsed:
        dt = datetime(
            entry.updated_parsed.tm_year,
            entry.updated_parsed.tm_mon,
            entry.updated_parsed.tm_mday,
            entry.updated_parsed.tm_hour,
            entry.updated_parsed.tm_min,
            entry.updated_parsed.tm_sec,
            tzinfo=UTC,
        )
        return dt.isoformat()
    # Fallback to current time
    return datetime.now(UTC).isoformat()


def fetch_rss_with_retry() -> feedparser.FeedParserDict:
    """Fetch RSS feed with retry logic."""
    last_error = None

    for attempt in range(1, MAX_RETRIES + 1):
        try:
            logger.info(f"Fetching RSS feed (attempt {attempt}/{MAX_RETRIES})")
            feed = feedparser.parse(RSS_URL)

            if feed.bozo and feed.bozo_exception:
                raise feed.bozo_exception

            if not feed.entries:
                raise ValueError("No entries found in RSS feed")

            logger.info(f"Successfully fetched {len(feed.entries)} entries")
            return feed

        except Exception as e:
            last_error = e
            logger.warning(f"Attempt {attempt} failed: {e}")
            if attempt < MAX_RETRIES:
                logger.info(f"Retrying in {RETRY_DELAY} seconds...")
                time.sleep(RETRY_DELAY)

    raise RuntimeError(f"Failed to fetch RSS after {MAX_RETRIES} attempts: {last_error}")


def upsert_articles(conn: sqlite3.Connection, feed: feedparser.FeedParserDict) -> int:
    """Insert or update articles in database. Returns count of new articles."""
    cursor = conn.cursor()
    new_count = 0

    for entry in feed.entries:
        guid = entry.get("id") or entry.get("link", "")
        title = entry.get("title", "")
        link = entry.get("link", "")
        description = entry.get("summary", "") or entry.get("description", "")
        pub_date = parse_pub_date(entry)
        author = entry.get("author", "") or entry.get("dc_creator", "")
        board = extract_board(link)

        # Check if article exists
        cursor.execute("SELECT id FROM articles WHERE guid = ?", (guid,))
        existing = cursor.fetchone()

        if existing:
            # Update existing article
            cursor.execute(
                """
                UPDATE articles
                SET title = ?, description = ?, updated_at = datetime('now')
                WHERE guid = ?
            """,
                (title, description, guid),
            )
        else:
            # Insert new article
            cursor.execute(
                """
                INSERT INTO articles (guid, title, link, description, pub_date, author, board)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """,
                (guid, title, link, description, pub_date, author, board),
            )
            new_count += 1

    conn.commit()
    logger.info(f"Processed {len(feed.entries)} entries, {new_count} new articles added")
    return new_count


def main() -> int:
    """Main entry point."""
    logger.info("Starting RSS fetch process")

    # Ensure data directory exists
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    # Connect to database
    conn = sqlite3.connect(DB_PATH)
    try:
        init_database(conn)
        feed = fetch_rss_with_retry()
        new_count = upsert_articles(conn, feed)

        # Get total count
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM articles")
        total_count = cursor.fetchone()[0]

        logger.info(
            f"Process completed successfully. {new_count} new, {total_count} total articles."
        )
        return 0

    except Exception as e:
        logger.error(f"Process failed: {e}")
        return 1

    finally:
        conn.close()


if __name__ == "__main__":
    sys.exit(main())
