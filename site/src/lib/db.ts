import { join } from "node:path";
import Database, { type Database as DatabaseType } from "better-sqlite3";
import { getBlogMetadata } from "./blogs";

const DB_PATH = join(process.cwd(), "..", "data", "feeds.db");

export interface Article {
  id: number;
  guid: string;
  title: string;
  link: string;
  description: string | null;
  pub_date: string;
  author: string | null;
  board: string | null;
}

/**
 * Singleton database connection.
 * The connection is lazily initialized and reused across all queries.
 * Since we're in a build-time context, the connection will be closed when the process exits.
 */
let dbInstance: DatabaseType | null = null;

function getDb(): DatabaseType {
  if (!dbInstance) {
    dbInstance = new Database(DB_PATH, { readonly: true });
  }
  return dbInstance;
}

/**
 * Close the database connection.
 * Call this when you're done with all database operations.
 */
export function closeDb(): void {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
  }
}

export function getArticles(limit = 30): Article[] {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT id, guid, title, link, description, pub_date, author, board
    FROM articles
    ORDER BY pub_date DESC
    LIMIT ?
  `);
  return stmt.all(limit) as Article[];
}

export function getAllArticles(): Article[] {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT id, guid, title, link, description, pub_date, author, board
    FROM articles
    ORDER BY pub_date DESC
  `);
  return stmt.all() as Article[];
}

export function getArticlesByBoard(board: string): Article[] {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT id, guid, title, link, description, pub_date, author, board
    FROM articles
    WHERE board = ?
    ORDER BY pub_date DESC
  `);
  return stmt.all(board) as Article[];
}

export function getAllBoards(): string[] {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT DISTINCT board FROM articles WHERE board IS NOT NULL ORDER BY board
  `);
  const rows = stmt.all() as { board: string }[];
  return rows.map((r) => r.board);
}

export function getTotalCount(): number {
  const db = getDb();
  const stmt = db.prepare("SELECT COUNT(*) as count FROM articles");
  const result = stmt.get() as { count: number };
  return result.count;
}

export function stripHtml(html: string | null): string {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  const timeStr = date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  // Get timezone offset in hours:minutes format
  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? "+" : "-";
  const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
  const minutes = String(Math.abs(offset) % 60).padStart(2, "0");
  return `${timeStr} (${sign}${hours}:${minutes})`;
}

export function formatBoard(board: string | null): string {
  if (!board) return "";

  // Try to get official name from metadata
  const metadata = getBlogMetadata(board);
  if (metadata) {
    return metadata.displayName;
  }

  // Fallback: convert slug to title case
  return board
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
