# Engineering Context

_Living document. Updated as architecture decisions are made._

---

## What This Is

Proprietary research prototype containing three layers of extractable IP: observation layer (behavioral calibration), interaction pattern taxonomy (design methodology), and collaboration framework (cross-functional context for AI agents). Built with Next.js 15 (App Router), SQLite via better-sqlite3, and TMDB API. Designed to be extracted as standalone modules for integration into commercial platforms.

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

## Design System Tokens

Use these values consistently across all views. All tokens use Tailwind CSS classes.

### Response Categories (Observation Layer)

| Category | Color | Tailwind | Hex |
|----------|-------|----------|-----|
| Strong yes | Green | `bg-green-500` | #22c55e |
| Casual yes | Green (light) | `bg-green-400` | #4ade80 |
| Maybe / Later | Amber | `bg-amber-500` | #f59e0b |
| Not tonight | Red (soft) | `bg-red-400` | #f87171 |
| Not for me | Red (strong) | `bg-red-600` | #dc2626 |
| Already seen it | Neutral | `bg-gray-500` | #6b7280 |

### Spacing

- Card padding: `p-4` (16px)
- Card gap (grid): `gap-4` (16px)
- Section margin: `mb-6` (24px)
- Button padding: `px-4 py-2` (16px horizontal, 8px vertical)

### Typography

- Card title: `text-lg font-semibold`
- Description: `text-sm text-muted-foreground`
- Episode label: `text-xs uppercase tracking-wide`
- Social rating: `text-sm font-medium text-blue-500`
- Personal score: `text-sm text-muted-foreground`

### Card Dimensions

- Observation card: max-width `max-w-md` (448px)
- Show card (Classic/Timeline): `aspect-video` (16:9)
- Poster image: `aspect-[2/3]` (movie poster ratio)
- Preview dialog: `max-w-2xl` (672px)

### Animation

- Card advance: `transition-opacity duration-200`
- Preview open: `animate-in fade-in duration-200`
- Revision expand: `transition-all duration-150`

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
