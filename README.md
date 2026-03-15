# Show Tracker

A local-first app for tracking what you watch — and a living case study in AI-assisted prototyping. Built with Next.js, SQLite, and TMDB. AI features powered by a local LLM via LM Studio.

---

## Case Study: The Prototype as a Learning System

This project started as a personal show tracker and evolved into something more: a research instrument for understanding how people choose what to watch.

The core insight came from observation, not surveys. Watching someone do 20 minutes of mental inventory — "I think I'm caught up on Mobland, did a new Pitt drop?" — revealed that **ratings don't capture energy-based selection**. The algorithm knows air dates and ratings. It doesn't know you're eating dinner, you're tired, and RPDR is a no-brainer in that context.

The prototype pipeline:

1. **Observe** — Live conversation analysis, not surveys. Extracted 7 micro-jobs (JTBD) from how someone actually talks about their shows.
2. **Build** — Each micro-job became a testable interaction pattern. "Tonight's Pick" solves the dinner decision. "Mark Through" solves the binge logger. "On Radar" solves uncommitted interest.
3. **Test** — Cognitive walkthroughs with synthetic personas (SUS scoring: 62.5 → 75.0 across 3 rounds). Real user walkthrough with 10 content options.
4. **Learn** — The observation prototype doesn't just test interaction patterns — it *is* the pattern learning system. Every user response is a calibration signal that makes the next suggestion better.

> "The prototype isn't testing the patterns. The prototype IS the pattern learning system." — [Taxonomy](docs/design/taxonomy.md)

The feedback loop: **observe → learn → calibrate → anticipate**. The same macro pattern that powered Shadow Health's conversation AI (2016) and Holmusk's clinical workflow — applied to content discovery.

---

## Design Timeline

| Date | What Happened | Artifact |
|------|---------------|----------|
| **Round 1** | Initial UX evaluation — 3 personas, cognitive walkthroughs, SUS baseline (avg 62.5) | [01-baseline-evaluation](docs/research/01-baseline-evaluation.md) |
| **Round 2** | Iteration on feedback — SUS improved to 72.5 avg. Identified interaction backlog. | [01-baseline-evaluation](docs/research/01-baseline-evaluation.md) |
| **Round 3** | Session + Timeline views evaluated. SUS reached 75.0. | [01-baseline-evaluation](docs/research/01-baseline-evaluation.md) |
| **JTBD Analysis** | Extracted 7 micro-jobs from live observation. Defined energy-aware recommendation model. | [brief](docs/design/brief.md) |
| **Phase 0 Build** | Observation prototype — single-card suggestion loop with emotional response options and behavioral logging. | [build-observation-prototype](docs/prompts/build-observation-prototype.md) |
| **Real User Test** | Solo walkthrough of 10 suggestions. Found: response language doesn't match mental model, poster lightbox undiscoverable, TV episode logic broken. | [02-prototype-walkthrough](docs/research/02-prototype-walkthrough.md) |
| **Synthetic Eval** | 3-persona evaluation of observation prototype (SUS avg 74.2). Cross-persona language audit. | [03-prototype-evaluation](docs/research/03-prototype-evaluation.md) |
| **Language Test** | Built open-text variant. 30 synthetic responses clustered into 6 intent categories. Recommended reducing labels from 8 to 6. | [04-language-test](docs/research/04-language-test.md) |
| **Taxonomy** | Defined the interaction pattern / component / experience distinction. Mapped behavioral signal stack. Connected to course + article writing. | [taxonomy](docs/design/taxonomy.md) |

---

## Documentation Strategy

All documentation lives in `docs/`. No loose `.md` files in the repo root (except this README). Three folders, organized by purpose.

```
docs/
  research/                              # Findings from tests and evaluations
    01-baseline-evaluation.md            # Rounds 1-3 persona walkthroughs, SUS scores, 4Ls
    02-prototype-walkthrough.md          # Real user test — 8 findings from first walkthrough
    03-prototype-evaluation.md           # Synthetic 3-persona eval (SUS avg 74.2)
    04-language-test.md                  # Open-text clustering — 8 labels reduced to 6
  design/                                # Strategy, briefs, frameworks
    brief.md                             # JTBD analysis, energy model, prototype specs (P1-P6)
    taxonomy.md                          # Interaction pattern / component / experience distinction
  prompts/                               # Reusable AI prompts and build recipes
    build-observation-prototype.md       # Build prompt for observation prototype
    run-prototype-evaluation.md          # Eval prompt (Claude Code + general LLM variants)
```

### How this works as a system

| Folder | Contains | Naming rule | When to add |
|--------|----------|-------------|-------------|
| `research/` | Findings from any test or evaluation | Number-prefixed (`01-`, `02-`…) so sequence is obvious | After every test round |
| `design/` | Strategy, briefs, frameworks, thinking notes | Short nouns (`brief.md`, `taxonomy.md`) | When framing a problem or defining an approach |
| `prompts/` | Reusable AI prompts and recipes | Verb-prefixed (`build-`, `run-`, `evaluate-`) | When you create a prompt worth re-running |

**For a new project:** copy the three empty folders. Research starts at `01-`. Design gets a `brief.md`. Prompts get named by what they do.

---

## What It Does

- **Continue Watching** — See exactly where you left off, down to the specific episode (e.g. S03E07). Cards show the episode still image, title, and air date.
- **Watch Next** — A queue of shows and movies you plan to start.
- **Coming Soon** — TV shows you're watching where the next episode hasn't aired yet. Shows the episode title and how many days until it's available.
- **History** — Completed, dropped, and finished shows with star ratings.
- **Detail Dialog** — Full action hub for any show: mark episodes watched, edit S/E position, change status (start/complete/drop), rate, take notes, and delete.
- **AI Recommendations** — Powered by a local LLM (LM Studio) based on what you've watched and rated.
- **AI Chat** — Ask questions about your watchlist, get suggestions, or discuss shows.
- **Watch Patterns** — Genre affinity stats with clickable filter chips. Shows your completion rates, average ratings, and genre distribution.

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
3. Shows idle for 5-14 days (gentle nudge back)
4. Queued shows ready to start

Suggestions appear as a ranked numbered list with context-aware reason text. The Available grid below highlights which shows are in tonight's suggestion and dims the rest.

Best for: short-session decisions, low-friction next-action flow.

### Observation Prototype (`/test/observation`)
Experimental. Single-card suggestion loop — shows one TMDB title at a time and asks "How do you feel about this one?" Responses are emotional intent labels. Every interaction is logged with behavioral metadata (dwell time, time of day, day of week) for pattern analysis.

### Language Capture (`/test/observation/language`)
Experimental. Open-text variant of the observation prototype. Instead of fixed labels, users type whatever comes to mind. Used for UX writing research — clustering natural language into intent categories.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
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
    temporal/page.tsx       # Timeline view — urgency-ranked Now / This Week / Activity
    session/page.tsx        # Session view — prescriptive "watch tonight" planner
  test/
    observation/page.tsx    # Observation prototype — emotional response suggestion loop
    observation/language/page.tsx  # Language capture variant — open-text responses
  api/
    shows/                  # CRUD for shows, status changes, ratings
    shows/backfill/         # Batch genre/rating enrichment for existing shows
    search/                 # TMDB search proxy (server-side)
    upcoming/               # Next episode lookup + air date checking
    recommendations/        # AI recommendation generation
    chat/                   # AI chat endpoint
    history/                # Watched history
    suggestions/            # TMDB trending content for observation prototype
    observations/           # Observation logging (structured responses)
    observations/language/  # Language capture logging (open-text responses)
    watch-patterns/         # Genre affinity stats

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
  watch-patterns.tsx        # Genre affinity stats + filter chips

lib/
  db.ts                     # SQLite queries and schema migrations
  tmdb.ts                   # TMDB API client (server-side only)
  ai.ts                     # LM Studio AI client

docs/
  research/                 # Numbered test findings (01-, 02-, ...)
  design/                   # Strategy briefs, frameworks, thinking notes
  prompts/                  # Reusable AI prompts and build recipes
```
