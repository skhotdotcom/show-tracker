# Show Tracker

A local-first app for tracking what you watch. Add TV shows and movies to your queue, track your episode progress, get notified when new episodes drop, and get AI-powered recommendations — all from a clean, browsable interface.

---

## What It Does

- **Continue Watching** — See exactly where you left off, down to the specific episode (e.g. S03E07). Cards show the episode still image, title, and air date.
- **Watch Next** — A queue of shows and movies you plan to start.
- **Coming Soon** — TV shows you're watching where the next episode hasn't aired yet. Shows the episode title and how many days until it's available.
- **History** — Completed, dropped, and finished shows with star ratings.
- **AI Recommendations** — Powered by a local LLM (LM Studio) based on what you've watched and rated.
- **AI Chat** — Ask questions about your watchlist, get suggestions, or discuss shows.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Database | SQLite via `better-sqlite3` |
| UI | shadcn/ui + Tailwind CSS |
| Metadata | TMDB API |
| AI | LM Studio (local LLM, OpenAI-compatible) |

---

## Setup

### 1. Clone and install

```bash
git clone <repo-url>
cd show-tracker
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your keys:

```bash
cp .env.example .env.local
```

```env
TMDB_API_KEY=your_tmdb_api_key_here
```

Get a free TMDB API key at [themoviedb.org](https://www.themoviedb.org/settings/api).

### 3. Start LM Studio (for AI features)

Open [LM Studio](https://lmstudio.ai), load a model, and start the local server on port `1234`. The app will work without it — AI features will simply be unavailable.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
app/
  page.tsx                  # Main page layout and tab routing
  api/
    shows/                  # CRUD for shows, status changes, ratings
    search/                 # TMDB search proxy (server-side)
    upcoming/               # Next episode lookup + air date checking
    recommendations/        # AI recommendation generation
    chat/                   # AI chat endpoint
    history/                # Watched history

hooks/
  useShows.ts               # Show list state, status/rating mutations
  useUpcoming.ts            # Next episode info, available vs coming soon
  useRecommendations.ts     # AI recommendation fetch/refresh
  useChat.ts                # Chat messages and send handler

components/
  show-card.tsx             # 16:9 show card with episode badge and overlay
  carousel-row.tsx          # Horizontal scrollable row of show cards
  recommendation-card.tsx   # Dedicated card for AI recommendations
  history-list.tsx          # List view for completed/dropped shows
  add-show-dialog.tsx       # Search and add shows via TMDB
  coming-soon.tsx           # Upcoming episode cards
  chat-panel.tsx            # Floating AI chat drawer

lib/
  db.ts                     # SQLite queries and schema migrations
  tmdb.ts                   # TMDB API client (server-side only)
  ai.ts                     # LM Studio AI client
```

---

## Backlog

### 🔲 Pending

*(nothing left)*

### ✅ Completed

- [x] Add shows and movies via TMDB search
- [x] Status management: queued → watching → completed / dropped
- [x] History view with completed and dropped shows
- [x] AI recommendations based on watch history
- [x] AI chat panel (floating drawer)
- [x] Refactor `page.tsx` god component into custom hooks (`useShows`, `useUpcoming`, `useRecommendations`, `useChat`)
- [x] Fix TMDB API key leak — search now routes through `/api/search` instead of calling TMDB directly from the client
- [x] Episode-level tracking — store and display `next_season` / `next_episode` per show
- [x] Fetch episode details from TMDB (title, air date, still image)
- [x] 16:9 landscape cards using episode stills and show backdrops
- [x] Episode badge (`S01E01`) always visible on watching cards
- [x] Episode title displayed below show name on cards
- [x] "Continue Watching" vs "Coming Soon" split by episode air date
- [x] Mark episode as watched — auto-advances to next episode (handles season rollovers)
- [x] Inline episode position editor on show cards
- [x] Dedicated `RecommendationCard` component with "Add to Queue" button
- [x] Refresh upcoming data after status changes (moving from Watch Next to Continue Watching now shows episode details immediately)
- [x] Star ratings in History view (interactive, wired to PATCH API)
- [x] **Carousel View All Button** — toggle between carousel and full responsive grid per row
- [x] **Per-feature data refresh** — every mutation refreshes only the hooks it affects
- [x] **`.env.example`** — all required environment variables documented for new contributors
- [x] **`.gitignore` update** — `data/` directory ignored to prevent committing the local database
- [x] **Hide "Coming Soon" when empty** — section returns null when there are no upcoming episodes
- [x] **Mobile navigation** — fixed bottom nav bar for mobile (Home + History tabs)
- [x] **Episode tracking UI** — season/episode counter with inline editor on watching cards
- [x] **Show type badges** — `TV` / `Movie` label shown in status badge on cards
- [x] **Optimistic UI updates** — all mutations in `useShows` apply optimistic local state immediately and revert on server error
- [x] **Show detail modal** — click a show title on hover to open a detail view with overview, notes, episode progress, date added, and ratings
- [x] **Notes field** — textarea in the show detail modal, saved via PATCH API
- [x] **Re-queue dropped shows** — History list now shows a re-queue button for dropped shows
- [x] **Ratings on watching cards** — interactive star rating in the show card hover overlay
