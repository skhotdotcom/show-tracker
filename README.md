# Show Tracker

A local-first app for tracking what you watch. Add TV shows and movies to your queue, track your episode progress, get notified when new episodes drop, and get AI-powered recommendations — all from a clean, browsable interface.

---

## Docs

- [UX Research](docs/ux-research.md) — Personas, cognitive walkthroughs, SUS scores, and 4 L's across two evaluation rounds (SUS 62.5 → 75.0)

---

## What It Does

- **Continue Watching** — See exactly where you left off, down to the specific episode (e.g. S03E07). Cards show the episode still image, title, and air date.
- **Watch Next** — A queue of shows and movies you plan to start.
- **Coming Soon** — TV shows you're watching where the next episode hasn't aired yet. Shows the episode title and how many days until it's available.
- **History** — Completed, dropped, and finished shows with star ratings.
- **Detail Dialog** — Full action hub for any show: mark episodes watched, edit S/E position, change status (start/complete/drop), rate, take notes, and delete.
- **AI Recommendations** — Powered by a local LLM (LM Studio) based on what you've watched and rated.
- **AI Chat** — Ask questions about your watchlist, get suggestions, or discuss shows.

---

## Views

The app ships three views, switchable from the header. Each is a distinct mental model for interacting with your library.

### Classic
The default status-bucket layout. Shows are organized into carousels by status: Continue Watching, Coming Soon, Watch Next, and History. Best for browsing your full library and managing individual shows.

### Timeline (`/views/temporal`)
Organizes your library by urgency rather than status. Three zones:

- **Now** — Active shows sorted by how recently you watched them. Each card shows an urgency badge (On a roll → Continue → Pick back up → Dive back in) and a permanently visible Mark Watched button — no hover required.
- **This Week** — Episodes airing today through the next 7 days, plus queued shows ready to start.
- **Activity** — A date-grouped journal of recent watch activity.

Best for: maintaining momentum across a large in-progress library.

### Session (`/views/session`)
Prescriptive session planner. Answers "what should I watch tonight?" using a priority algorithm:

1. Shows with an episode airing within 2 days (catch up while it's relevant)
2. Shows watched in the last 3 days (keep the momentum)
3. Shows idle for 5–14 days (gentle nudge back)
4. Queued shows ready to start

Suggestions appear as a ranked numbered list with context-aware reason text. The Available grid below highlights which shows are in tonight's suggestion and dims the rest.

Best for: short-session decisions, low-friction next-action flow.

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
  page.tsx                  # Classic view — carousels by status
  views/
    temporal/
      page.tsx              # Timeline view — urgency-ranked Now / This Week / Activity
    session/
      page.tsx              # Session view — prescriptive "watch tonight" planner
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
  view-switcher.tsx         # Classic / Timeline / Session navigation pills
  show-card.tsx             # 16:9 show card with episode badge and overlay
  show-detail-dialog.tsx    # Full action hub dialog (watch, rate, notes, status, delete)
  carousel-row.tsx          # Horizontal scrollable row with scroll position preservation
  recommendation-card.tsx   # Dedicated card for AI recommendations
  history-list.tsx          # List view for completed/dropped shows (click-to-detail)
  add-show-dialog.tsx       # Search and add shows via TMDB
  coming-soon.tsx           # Upcoming episode rows (click-to-detail)
  chat-panel.tsx            # Floating AI chat drawer

lib/
  db.ts                     # SQLite queries and schema migrations
  tmdb.ts                   # TMDB API client (server-side only)
  ai.ts                     # LM Studio AI client
```

---

## Backlog

### 🔲 Pending

- [ ] **Silent actions** — No feedback after Mark Watched, status changes, or ratings. Toast notifications or subtle confirmation cues would close the loop.
- [ ] **Queue ordering** — No way to reorder the Watch Next queue. Drag-to-reorder or a priority field would let users sequence their backlog.
- [ ] **Mid-series add flow** — Adding a show already in progress requires three steps (add → open → set episode). A "currently on episode…" field in the add dialog would reduce this to one.
- [ ] **Binge logger shortcut** — No fast path for logging multiple episodes in one session. A "mark through S01E04" bulk action would serve binge-watchers.
- [ ] **Rating prompt on complete** — Completing a show doesn't prompt for a rating. A completion dialog with a star prompt would capture ratings while the experience is fresh.
- [ ] **Sort and filter** — No way to sort or filter the library by genre, network, rating, or date added.
- [ ] **Cross-section search** — No global search across the full library.

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
- [x] **Card click → detail dialog** — the card body is now the click target; no hover required to reach any action
- [x] **Detail dialog as full action hub** — Mark Watched, Set Position, Start Watching, Mark Complete, Drop, and Delete all live in the dialog; hover overlay is a convenience shortcut, not the only path
- [x] **Detail dialog state sync** — `detailShowId` stores an ID, not a snapshot; `detailShow` is derived live from `useShows` state so optimistic updates inside the dialog are always in sync
- [x] **Carousel scroll preservation** — scroll position saved to a ref on every scroll event and restored after state-driven re-renders; marking a show watched no longer resets the carousel to position 0
- [x] **Coming Soon click-to-detail** — clicking a Coming Soon row opens the show detail dialog
- [x] **History click-to-detail** — clicking anywhere on a history row opens the show detail dialog; action buttons use `stopPropagation` to avoid conflicts
- [x] **Timeline view** — new `/views/temporal` page with urgency-ranked Now section, This Week airing/ready section, and Activity journal; Mark Watched button always visible (no hover dependency)
- [x] **Session view** — new `/views/session` page with prescriptive "Watch Tonight" ranked suggestions, Available poster grid, and compact history; suggestion algorithm weighs recency, upcoming air dates, and queue status
- [x] **View switcher** — Classic / Timeline / Session navigation pills in the header; active state driven by `usePathname()`
