// lib/db.ts — SQLite database layer using better-sqlite3 (synchronous API).
// All DB access goes through the singleton returned by getDb().
// Tables: shows, episodes, chat_messages, chat_extractions, recommendations.

import Database from 'better-sqlite3';
import path from 'path';
import type { Show } from '@/types';

const DB_PATH = process.env.DATABASE_PATH || path.join(process.cwd(), 'data', 'tracker.db');

// Singleton connection — reused across requests in the same Node.js process.
let db: Database.Database | null = null;

function getDb(): Database.Database {
  if (!db) {
    const dbDir = path.dirname(DB_PATH);
    const fs = require('fs');
    // Ensure the data directory exists before opening the database.
    if (!fs.existsSync(dbDir)) {
      fs.mkdirSync(dbDir, { recursive: true });
    }
    db = new Database(DB_PATH);
    initializeDatabase(db);
  }
  return db;
}

function initializeDatabase(database: Database.Database) {
  database.exec(`
    CREATE TABLE IF NOT EXISTS shows (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tmdb_id INTEGER UNIQUE,
      title TEXT NOT NULL,
      type TEXT CHECK(type IN ('tv', 'movie')),
      poster_url TEXT,
      backdrop_url TEXT,
      overview TEXT,
      release_date TEXT,
      status TEXT CHECK(status IN ('watching', 'queued', 'completed', 'dropped')),
      rating INTEGER,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS episodes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      show_id INTEGER REFERENCES shows(id) ON DELETE CASCADE,
      season INTEGER NOT NULL,
      episode INTEGER NOT NULL,
      watched_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS chat_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      role TEXT CHECK(role IN ('user', 'assistant')),
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS chat_extractions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      message_id INTEGER REFERENCES chat_messages(id) ON DELETE CASCADE,
      show_id INTEGER REFERENCES shows(id) ON DELETE SET NULL,
      show_title TEXT NOT NULL,
      action TEXT CHECK(action IN ('add_queue', 'mark_watching', 'mark_completed', 'mark_dropped')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS recommendations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tmdb_id INTEGER NOT NULL,
      title TEXT NOT NULL,
      type TEXT CHECK(type IN ('tv', 'movie')),
      poster_url TEXT,
      reason TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE INDEX IF NOT EXISTS idx_shows_status ON shows(status);
    CREATE INDEX IF NOT EXISTS idx_shows_type ON shows(type);
    CREATE INDEX IF NOT EXISTS idx_episodes_show ON episodes(show_id);
  `);

  // Migrations — ALTER TABLE is a no-op (caught) if the column already exists.
  try { database.exec(`ALTER TABLE shows ADD COLUMN next_season INTEGER DEFAULT 1`); } catch {}
  try { database.exec(`ALTER TABLE shows ADD COLUMN next_episode INTEGER DEFAULT 1`); } catch {}
}

export function getShowsByStatus(status: string): Show[] {
  return getDb().prepare(`
    SELECT * FROM shows 
    WHERE status = ? 
    ORDER BY updated_at DESC
  `).all(status) as Show[];
}

export function getWatchingShows(): Show[] {
  return getDb().prepare(`
    SELECT * FROM shows 
    WHERE status = 'watching' 
    ORDER BY updated_at DESC
  `).all() as Show[];
}

export function getQueuedShows(): Show[] {
  return getDb().prepare(`
    SELECT * FROM shows 
    WHERE status = 'queued' 
    ORDER BY updated_at DESC
  `).all() as Show[];
}

export function getCompletedShows(): Show[] {
  return getDb().prepare(`
    SELECT * FROM shows 
    WHERE status = 'completed' 
    ORDER BY updated_at DESC
  `).all() as Show[];
}

export function getHistory(): Show[] {
  return getDb().prepare(`
    SELECT * FROM shows 
    WHERE status IN ('completed', 'dropped')
    ORDER BY updated_at DESC
  `).all() as Show[];
}

export function getAllShows(): Show[] {
  return getDb().prepare(`
    SELECT * FROM shows 
    ORDER BY updated_at DESC
  `).all() as Show[];
}

export function getShowByTmdbId(tmdbId: number): Show | undefined {
  return getDb().prepare(`
    SELECT * FROM shows WHERE tmdb_id = ?
  `).get(tmdbId) as Show | undefined;
}

export function getShowById(id: number): Show | undefined {
  return getDb().prepare(`
    SELECT * FROM shows WHERE id = ?
  `).get(id) as Show | undefined;
}

export interface CreateShowInput {
  tmdb_id?: number | null;
  title: string;
  type: 'tv' | 'movie';
  poster_url?: string | null;
  backdrop_url?: string | null;
  overview?: string | null;
  release_date?: string | null;
  status?: 'watching' | 'queued' | 'completed' | 'dropped';
  rating?: number | null;
  notes?: string | null;
}

export function createShow(input: CreateShowInput): Show | undefined {
  const stmt = getDb().prepare(`
    INSERT INTO shows (tmdb_id, title, type, poster_url, backdrop_url, overview, release_date, status, rating, notes)
    VALUES (@tmdb_id, @title, @type, @poster_url, @backdrop_url, @overview, @release_date, @status, @rating, @notes)
  `);
  const result = stmt.run({
    tmdb_id: input.tmdb_id ?? null,
    title: input.title,
    type: input.type,
    poster_url: input.poster_url ?? null,
    backdrop_url: input.backdrop_url ?? null,
    overview: input.overview ?? null,
    release_date: input.release_date ?? null,
    status: input.status ?? 'queued',
    rating: input.rating ?? null,
    notes: input.notes ?? null,
  });
  return getShowById(result.lastInsertRowid as number);
}

export function updateShowStatus(id: number, status: string): Show | undefined {
  getDb().prepare(`
    UPDATE shows SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `).run(status, id);
  return getShowById(id);
}

export function updateShowProgress(id: number, nextSeason: number, nextEpisode: number): Show | undefined {
  getDb().prepare(`
    UPDATE shows SET next_season = ?, next_episode = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `).run(nextSeason, nextEpisode, id);
  return getShowById(id);
}

export function updateShowRating(id: number, rating: number): Show | undefined {
  getDb().prepare(`
    UPDATE shows SET rating = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `).run(rating, id);
  return getShowById(id);
}

export function updateShowNotes(id: number, notes: string): Show | undefined {
  getDb().prepare(`
    UPDATE shows SET notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
  `).run(notes, id);
  return getShowById(id);
}

export function deleteShow(id: number) {
  return getDb().prepare(`
    DELETE FROM shows WHERE id = ?
  `).run(id);
}

export function markEpisodeWatched(showId: number, season: number, episode: number) {
  const stmt = getDb().prepare(`
    INSERT INTO episodes (show_id, season, episode)
    VALUES (?, ?, ?)
  `);
  stmt.run(showId, season, episode);
}

export function getWatchedEpisodes(showId: number) {
  return getDb().prepare(`
    SELECT * FROM episodes WHERE show_id = ? ORDER BY season, episode
  `).all(showId);
}

export function addChatMessage(role: 'user' | 'assistant', content: string) {
  const stmt = getDb().prepare(`
    INSERT INTO chat_messages (role, content)
    VALUES (?, ?)
  `);
  const result = stmt.run(role, content);
  return {
    id: result.lastInsertRowid as number,
    role,
    content,
    created_at: new Date().toISOString(),
  };
}

interface ChatMessageRow {
  id: number;
  role: string;
  content: string;
  created_at: string;
}

export function getChatHistory(limit = 50): ChatMessageRow[] {
  return getDb().prepare(`
    SELECT * FROM chat_messages 
    ORDER BY created_at DESC 
    LIMIT ?
  `).all(limit) as ChatMessageRow[];
}

export function addChatExtraction(messageId: number, showTitle: string, action: string, showId?: number) {
  const stmt = getDb().prepare(`
    INSERT INTO chat_extractions (message_id, show_id, show_title, action)
    VALUES (?, ?, ?, ?)
  `);
  stmt.run(messageId, showId ?? null, showTitle, action);
}

export function getRecentExtractions(limit = 10) {
  return getDb().prepare(`
    SELECT ce.*, cm.content as message_content
    FROM chat_extractions ce
    JOIN chat_messages cm ON ce.message_id = cm.id
    ORDER BY ce.created_at DESC
    LIMIT ?
  `).all(limit);
}

export function addRecommendation(tmdbId: number, title: string, type: 'tv' | 'movie', posterUrl: string | null, reason: string) {
  const stmt = getDb().prepare(`
    INSERT OR REPLACE INTO recommendations (tmdb_id, title, type, poster_url, reason)
    VALUES (?, ?, ?, ?, ?)
  `);
  stmt.run(tmdbId, title, type, posterUrl, reason);
}

export function getRecommendations() {
  return getDb().prepare(`
    SELECT * FROM recommendations 
    ORDER BY created_at DESC
  `).all();
}

export function clearRecommendations() {
  getDb().prepare(`DELETE FROM recommendations`).run();
}

export function getStats() {
  const stats = getDb().prepare(`
    SELECT 
      COUNT(*) as total_shows,
      COUNT(CASE WHEN type = 'tv' THEN 1 END) as tv_shows,
      COUNT(CASE WHEN type = 'movie' THEN 1 END) as movies,
      COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed,
      COUNT(CASE WHEN status = 'watching' THEN 1 END) as watching,
      AVG(CASE WHEN rating IS NOT NULL THEN rating END) as avg_rating
    FROM shows
  `).get();
  return stats;
}

export { getDb };

export default getDb;