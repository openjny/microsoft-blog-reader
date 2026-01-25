import Database from "better-sqlite3";
import { join } from "path";
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
  category: string | null;
}

function getDb() {
  return new Database(DB_PATH, { readonly: true });
}

export function getArticles(limit: number = 30): Article[] {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT id, guid, title, link, description, pub_date, author, category
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
    SELECT id, guid, title, link, description, pub_date, author, category
    FROM articles
    ORDER BY pub_date DESC
  `);
  const articles = stmt.all() as Article[];
  db.close();
  return articles;
}

export function getArticlesByCategory(category: string): Article[] {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT id, guid, title, link, description, pub_date, author, category
    FROM articles
    WHERE category = ?
    ORDER BY pub_date DESC
  `);
  const articles = stmt.all(category) as Article[];
  db.close();
  return articles;
}

export function getAllCategories(): string[] {
  const db = getDb();
  const stmt = db.prepare(`
    SELECT DISTINCT category FROM articles WHERE category IS NOT NULL ORDER BY category
  `);
  const rows = stmt.all() as { category: string }[];
  db.close();
  return rows.map((r) => r.category);
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

export function formatCategory(slug: string | null): string {
  if (!slug) return "";

  // Try to get official name from metadata
  const metadata = getBlogMetadata(slug);
  if (metadata) {
    return metadata.name;
  }

  // Fallback: convert slug to title case
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
