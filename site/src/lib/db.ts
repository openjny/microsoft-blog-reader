import { join } from "node:path";
import Database from "better-sqlite3";
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

function getDb() {
  return new Database(DB_PATH, { readonly: true });
}

export function getArticles(limit = 30): Article[] {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT id, guid, title, link, description, pub_date, author, board
    FROM articles
    ORDER BY pub_date DESC
    LIMIT ?
  `);
  const articles = stmt.all(limit) as Article[];
  db.close();
  return articles;
}

export function getAllArticles(): Article[] {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT id, guid, title, link, description, pub_date, author, board
    FROM articles
    ORDER BY pub_date DESC
  `);
  const articles = stmt.all() as Article[];
  db.close();
  return articles;
}

export function getArticlesByBoard(board: string): Article[] {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT id, guid, title, link, description, pub_date, author, board
    FROM articles
    WHERE board = ?
    ORDER BY pub_date DESC
  `);
  const articles = stmt.all(board) as Article[];
  db.close();
  return articles;
}

export function getAllBoards(): string[] {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT DISTINCT board FROM articles WHERE board IS NOT NULL ORDER BY board
  `);
  const rows = stmt.all() as { board: string }[];
  db.close();
  return rows.map((r) => r.board);
}

export function getTotalCount(): number {
  const db = getDb();
  const stmt = db.prepare("SELECT COUNT(*) as count FROM articles");
  const result = stmt.get() as { count: number };
  db.close();
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
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
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
