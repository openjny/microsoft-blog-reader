#!/usr/bin/env python3
"""
Fetch RSS feeds from multiple Microsoft sources and store articles in an SQLite database.

This script:
1. Fetches RSS feeds from multiple Microsoft sources
2. Parses and extracts article information
3. Stores articles in SQLite with UPSERT logic
"""

import logging
import re
import sqlite3
import sys
import time
import traceback
from datetime import UTC, datetime
from pathlib import Path
from typing import Any

import feedparser  # type: ignore[import-untyped]

# Configuration
RSS_URLS = [
    "https://techcommunity.microsoft.com/t5/s/gxcuf89792/rss/Community?interaction.style=blog",
    "https://devblogs.microsoft.com/landing",
]
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


def extract_board(url: str) -> str:
    """Extract board/blog identifier from article URL path.

    Supports multiple feed sources:
    - TechCommunity: /t5/{board}/... -> 'apps-on-azure-blog'
    - DevBlogs: devblogs.microsoft.com/{blog-name}/... -> 'vscode-blog'

    Returns 'unknown' for URLs that don't match any known pattern.
    """
    # TechCommunity pattern: /t5/{board}/
    match = re.search(r"/t5/([^/]+)/", url)
    if match:
        return match.group(1)

    # DevBlogs pattern: devblogs.microsoft.com/{blog-name}/
    match = re.search(r"devblogs\.microsoft\.com/([^/]+)/", url)
    if match:
        return match.group(1)

    return "unknown"


def parse_pub_date(entry: Any) -> str:
    """Parse publication date from feed entry to ISO 8601 format."""
    published_parsed = getattr(entry, "published_parsed", None)
    if published_parsed:
        dt = datetime(
            published_parsed.tm_year,
            published_parsed.tm_mon,
            published_parsed.tm_mday,
            published_parsed.tm_hour,
            published_parsed.tm_min,
            published_parsed.tm_sec,
            tzinfo=UTC,
        )
        return dt.isoformat()

    updated_parsed = getattr(entry, "updated_parsed", None)
    if updated_parsed:
        dt = datetime(
            updated_parsed.tm_year,
            updated_parsed.tm_mon,
            updated_parsed.tm_mday,
            updated_parsed.tm_hour,
            updated_parsed.tm_min,
            updated_parsed.tm_sec,
            tzinfo=UTC,
        )
        return dt.isoformat()

    # Fallback to current time
    return datetime.now(UTC).isoformat()


def fetch_rss_with_retry(rss_url: str) -> Any:
    """Fetch RSS feed with retry logic."""
    last_error: Exception | None = None

    for attempt in range(1, MAX_RETRIES + 1):
        try:
            logger.info(f"Fetching RSS feed from {rss_url} (attempt {attempt}/{MAX_RETRIES})")
            feed = feedparser.parse(rss_url)

            if feed.bozo and feed.bozo_exception:
                exc = feed.bozo_exception
                if isinstance(exc, Exception):
                    raise exc
                raise RuntimeError(f"Feed parsing error: {exc}")

            if not feed.entries:
                raise ValueError("No entries found in RSS feed")

            logger.info(f"Successfully fetched {len(feed.entries)} entries from {rss_url}")
            return feed

        except Exception as e:
            last_error = e
            logger.warning(f"Attempt {attempt} failed for {rss_url}: {e}")
            if attempt < MAX_RETRIES:
                logger.info(f"Retrying in {RETRY_DELAY} seconds...")
                time.sleep(RETRY_DELAY)

    raise RuntimeError(f"Failed to fetch RSS from {rss_url} after {MAX_RETRIES} attempts: {last_error}")


def upsert_articles(conn: sqlite3.Connection, feed: Any) -> int:
    """Insert or update articles in database. Returns count of new articles."""
    cursor = conn.cursor()
    new_count = 0

    for entry in feed.entries:
        guid: str = entry.get("id") or entry.get("link", "")
        title: str = entry.get("title", "")
        link: str = entry.get("link", "")
        description: str = entry.get("summary", "") or entry.get("description", "")
        pub_date = parse_pub_date(entry)
        author: str = entry.get("author", "") or entry.get("dc_creator", "")
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

        total_new_count = 0
        feeds_succeeded = 0
        feeds_failed = 0

        for rss_url in RSS_URLS:
            try:
                feed = fetch_rss_with_retry(rss_url)
                new_count = upsert_articles(conn, feed)
                total_new_count += new_count
                feeds_succeeded += 1
            except Exception as e:
                logger.error(f"Failed to process feed {rss_url}: {e}")
                feeds_failed += 1
                # Continue processing other feeds

        # Get total count
        cursor = conn.cursor()
        cursor.execute("SELECT COUNT(*) FROM articles")
        total_count = cursor.fetchone()[0]

        logger.info(
            f"Process completed. {total_new_count} new, {total_count} total articles. "
            f"Feeds: {feeds_succeeded} succeeded, {feeds_failed} failed."
        )

        # Return non-zero exit code if all feeds failed
        if feeds_succeeded == 0 and feeds_failed > 0:
            logger.error("All feeds failed to process")
            return 1

        return 0

    except Exception as e:
        logger.error(f"Process failed: {e}")
        logger.error(f"Stack trace:\n{traceback.format_exc()}")
        return 1

    finally:
        conn.close()


if __name__ == "__main__":
    sys.exit(main())
