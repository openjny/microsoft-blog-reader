.PHONY: help install lint lint-fix format typecheck check dev build fetch clean

# Default target
help:
	@echo "Usage: make <target>"
	@echo ""
	@echo "Development:"
	@echo "  install     Install all dependencies (Python + Node.js)"
	@echo "  dev         Start Astro dev server"
	@echo "  build       Build static site"
	@echo "  fetch       Fetch RSS and update SQLite"
	@echo ""
	@echo "Code Quality:"
	@echo "  lint        Run all linters (Python + TypeScript)"
	@echo "  lint-fix    Run linters with auto-fix"
	@echo "  format      Format all code"
	@echo "  typecheck   Run type checkers (mypy + astro check)"
	@echo "  check       Run all checks (lint + typecheck)"
	@echo ""
	@echo "Cleanup:"
	@echo "  clean       Remove build artifacts"

# Installation
install:
	uv sync --dev
	cd site && npm install

# Python linting
lint-python:
	uv run ruff check scripts/

lint-python-fix:
	uv run ruff check --fix scripts/

format-python:
	uv run ruff format scripts/

typecheck-python:
	uv run mypy scripts/

# TypeScript/Astro linting
lint-ts:
	cd site && npm run lint

lint-ts-fix:
	cd site && npm run lint:fix

format-ts:
	cd site && npm run format

typecheck-ts:
	cd site && npm run typecheck

check-ts:
	cd site && npm run check

# Combined targets
lint: lint-python lint-ts

lint-fix: lint-python-fix lint-ts-fix

format: format-python format-ts

typecheck: typecheck-python typecheck-ts

check: lint typecheck

# Development
dev:
	cd site && npm run dev

build:
	cd site && npm run build

fetch:
	uv run python scripts/fetch_rss.py

# Cleanup
clean:
	rm -rf site/dist site/.astro
