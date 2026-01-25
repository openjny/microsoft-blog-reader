#!/usr/bin/env python3
"""
Fetch Microsoft Tech Community RSS and store articles in JSON format.

This script:
1. Fetches RSS feed from Microsoft Tech Community
2. Parses and extracts article information
3. Merges with existing articles (deduplication by guid)
4. Saves to JSON file (sorted by pub_date desc)
"""

import json
import logging
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import feedparser

# Configuration
RSS_URL = "https://techcommunity.microsoft.com/t5/s/gxcuf89792/rss/Community?interaction.style=blog"
MAX_RETRIES = 3
RETRY_DELAY = 5  # seconds

# Paths
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
DATA_DIR = PROJECT_ROOT / "data"
JSON_PATH = DATA_DIR / "articles.json"

# Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


def extract_category(url: str) -> str | None:
    """Extract category from article URL path."""
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
            tzinfo=timezone.utc,
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
            tzinfo=timezone.utc,
        )
        return dt.isoformat()
    # Fallback to current time
    return datetime.now(timezone.utc).isoformat()


def strip_html(html: str) -> str:
    """Remove HTML tags from text."""
    if not html:
        return ""
    text = re.sub(r"<[^>]+>", "", html)
    text = re.sub(r"\s+", " ", text).strip()
    return text


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


def load_existing_articles() -> dict[str, dict[str, Any]]:
    """Load existing articles from JSON file. Returns dict keyed by guid."""
    if not JSON_PATH.exists():
        return {}

    try:
        with open(JSON_PATH, encoding="utf-8") as f:
            data = json.load(f)
        return {article["guid"]: article for article in data.get("articles", [])}
    except (json.JSONDecodeError, KeyError) as e:
        logger.warning(f"Failed to load existing articles: {e}")
        return {}


def merge_articles(
    existing: dict[str, dict[str, Any]],
    feed: feedparser.FeedParserDict,
) -> tuple[list[dict[str, Any]], int]:
    """Merge new articles with existing ones. Returns (articles, new_count)."""
    new_count = 0

    for entry in feed.entries:
        guid = entry.get("id") or entry.get("link", "")
        link = entry.get("link", "")

        article = {
            "guid": guid,
            "title": entry.get("title", ""),
            "link": link,
            "description": strip_html(entry.get("summary", "") or entry.get("description", "")),
            "pub_date": parse_pub_date(entry),
            "author": entry.get("author", "") or entry.get("dc_creator", ""),
            "category": extract_category(link),
        }

        if guid not in existing:
            new_count += 1
            logger.debug(f"New article: {article['title']}")

        # Always update (upsert behavior)
        existing[guid] = article

    # Sort by pub_date descending
    articles = sorted(existing.values(), key=lambda x: x["pub_date"], reverse=True)

    return articles, new_count


def save_articles(articles: list[dict[str, Any]]) -> None:
    """Save articles to JSON file."""
    data = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "total_count": len(articles),
        "articles": articles,
    }

    JSON_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(JSON_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

    logger.info(f"Saved {len(articles)} articles to {JSON_PATH}")


def main() -> int:
    """Main entry point."""
    logger.info("Starting RSS fetch process")

    try:
        # Load existing articles
        existing = load_existing_articles()
        logger.info(f"Loaded {len(existing)} existing articles")

        # Fetch new articles
        feed = fetch_rss_with_retry()

        # Merge and save
        articles, new_count = merge_articles(existing, feed)
        save_articles(articles)

        logger.info(f"Process completed successfully. {new_count} new articles.")
        return 0

    except Exception as e:
        logger.error(f"Process failed: {e}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
