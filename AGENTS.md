# Project guidelines

## Documents

- Language: English (en-us)

## Architecture

- **Data collection**: Python script (`fetch_rss.py`) → SQLite (`data/feeds.db`)
- **Static site**: Astro reads SQLite directly via `better-sqlite3`
- Only `feeds.db` is committed; HTML/RSS are generated on-demand

## Code Quality

**Before committing, always run `make check` to ensure code passes all linters and type checks.**

| Tool | Language | Purpose | Command |
|------|----------|---------|---------|
| ruff | Python | Lint + Format | `make lint-python`, `make format-python` |
| mypy | Python | Type check | `make typecheck-python` |
| biome | TypeScript | Lint + Format | `make lint-ts`, `make format-ts` |
| astro check | Astro/TS | Type check | `make typecheck-ts` |

Quick commands:
- `make check` - Run all linters and type checkers
- `make lint-fix` - Auto-fix lint issues
- `make format` - Format all code

## Python Environment

- Use `uv` for local development
- Maintain `requirements.txt` for pip compatibility (GitHub Actions)
- Define dependencies in `pyproject.toml` (source of truth)

### Local Development (Python)

```bash
make install                         # Install all dependencies
uv run python scripts/fetch_rss.py   # Fetch RSS and update SQLite
```

## Node.js Environment (Astro)

### Local Development

```bash
make dev                             # Start dev server
make build                           # Build static site
```

### Build Output

- Static files are generated at `site/dist/`
- RSS feed is generated at `site/dist/feed.xml`
