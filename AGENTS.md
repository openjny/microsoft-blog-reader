# Project guidelines

## Documents

- Language: English (en-us)

## Architecture

- **Data collection**: Python script (`fetch_rss.py`) → SQLite (`data/feeds.db`)
- **Static site**: Astro reads SQLite directly via `better-sqlite3`
- Only `feeds.db` is committed; HTML/RSS are generated on-demand

## Python Environment

- Use `uv` for local development
- Maintain `requirements.txt` for pip compatibility (GitHub Actions)
- Define dependencies in `pyproject.toml` (source of truth)

### Local Development (Python)

```bash
uv sync                              # Install dependencies
uv run python scripts/fetch_rss.py   # Fetch RSS and update SQLite
```

## Node.js Environment (Astro)

### Local Development

```bash
cd site
npm install                          # Install dependencies
npm run dev                          # Start dev server
npm run build                        # Build static site
```

### Build Output

- Static files are generated at `site/dist/`
- RSS feed is generated at `site/dist/feed.xml`

## GitHub Pages

- Enable Pages first: `gh api repos/{owner}/{repo}/pages -X POST -f build_type=workflow`
- Workflow `enablement: true` fails due to insufficient GITHUB_TOKEN permissions
