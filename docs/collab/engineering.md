# Engineering Context

_Living document. Updated as architecture decisions are made._

---

## What This Is

Show Tracker is a local-first app for tracking what you watch, built with Next.js 15 (App Router), SQLite via better-sqlite3, and TMDB API. The observation prototype (`/test/observation`) captures emotional intent responses to content suggestions and logs behavioral metadata for pattern analysis.

---

## Architecture Decisions

- **SQLite via better-sqlite3 (synchronous).** Single-file DB at `data/tracker.db`. No ORM. All queries in `lib/db.ts`. This keeps the prototype fast and inspectable — you can `sqlite3 data/tracker.db` and query observation data directly.
- **TMDB API for all metadata.** Episode-level data (stills, descriptions, per-episode ratings) fetched via `lib/tmdb.ts`. Rate limits are generous for personal use but will need caching for multi-user.
- **Observation logging is append-only.** `suggestion_log` table captures every response with behavioral metadata. Revisions increment `revision_count` and update `response` — the history is in the count, not in separate rows.
- **Language capture is a separate table.** `language_capture` stores raw text responses for UX research. This is throwaway research data, not production.

---

## Technical Debt to Address Before Shipping

| Item | Priority | Notes |
|------|----------|-------|
| Silent actions across all views | High | Every primary action (Mark Watched, Start, Complete, Drop) fires without confirmation. Add toast notifications. Pattern identified in Round 1, still unresolved. |
| Scroll position loss in carousels | High | Fixed in Classic view (Round 1), still broken in Timeline Now carousel and Session Available grid. Apply the same fix systematically. |
| TV episode logic in observation prototype | High | Showing S1E8 of a show the user hasn't started makes no sense. Need two card types: series-level (new) and episode-level (tracking). |
| Personal score reasoning | Medium | "Based on your history with X" needs to explain why X is relevant. The genre affinity data exists in watch-patterns — surface the math. |
| Response type validation | Low | `suggestion_log.response` is a free TEXT field. Add a CHECK constraint matching the final label set. |

---

## Data Model — Observation Layer

```sql
-- Every suggestion + response
CREATE TABLE suggestion_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content_type TEXT CHECK(content_type IN ('tv', 'movie')),
  title TEXT NOT NULL,
  tmdb_id INTEGER NOT NULL,
  season_number INTEGER,
  episode_number INTEGER,
  episode_title TEXT,
  episode_description TEXT,
  social_rating REAL,
  personal_score TEXT,
  response TEXT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  hour_of_day INTEGER NOT NULL,
  day_of_week INTEGER NOT NULL,
  dwell_time_seconds REAL,
  revision_count INTEGER DEFAULT 0,
  user_rating INTEGER
);

-- Open-text responses (research only)
CREATE TABLE language_capture (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  content_type TEXT CHECK(content_type IN ('tv', 'movie')),
  title TEXT NOT NULL,
  tmdb_id INTEGER NOT NULL,
  season_number INTEGER,
  episode_number INTEGER,
  raw_response TEXT NOT NULL,
  persona TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  dwell_time_seconds REAL
);
```

---

## Key Files

| File | Purpose |
|------|---------|
| `lib/db.ts` | All DB access — singleton, synchronous |
| `lib/tmdb.ts` | TMDB API wrapper |
| `lib/ai.ts` | LM Studio integration (chat, extraction, recommendations) |
| `types/index.ts` | Shared TypeScript interfaces |
| `app/test/observation/page.tsx` | Observation prototype UI |
| `app/api/observations/route.ts` | Observation logging API (POST/GET/PATCH) |
| `app/api/suggestions/route.ts` | TMDB trending content, filtered by user library |
| `app/api/watch-patterns/route.ts` | Genre affinity stats |
