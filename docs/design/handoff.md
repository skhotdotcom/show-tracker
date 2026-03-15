# Handoff — Cross-Functional Considerations

_What partners need to know before this ships. Updated as the prototype evolves._

---

## What This Is

The observation prototype (`/test/observation`) is a behavioral calibration system disguised as a content recommendation flow. It presents one title at a time, captures emotional intent responses, and logs behavioral metadata (dwell time, time of day, revision patterns). Over time, it learns how a specific person chooses what to watch — not from ratings, but from energy, context, and mood.

The main app (Classic, Timeline, Session views) is a fully functional show tracker. The observation prototype is experimental — it tests whether emotional response labels can replace traditional recommendation inputs.

---

## For Product / Leadership

### What we learned

1. **Ratings don't capture selection behavior.** People choose what to watch based on energy level (low → comfort shows, high → new/premium). The algorithm needs context, not just preference data.
2. **8 response labels should be 6.** Language testing with 30 synthetic personas showed that users don't distinguish "Not in the mood" from "Not now" or "Maybe later" from "Add to my queue." Two pairs merge. ([04-language-test](../research/04-language-test.md))
3. **SUS improved from 62.5 → 75.0 across 3 rounds.** The main app's usability moved from "Acceptable" to "Good" by making cards clickable and turning the detail dialog into a full action hub. ([01-baseline-evaluation](../research/01-baseline-evaluation.md))
4. **The observation prototype scored 74.2 SUS on first test.** Strongest with fast/reactive users (80.0 for Casual Logger). Weakest with deliberate planners who want to see the system act on their input. ([03-prototype-evaluation](../research/03-prototype-evaluation.md))

### What this means for the product

- **The observation layer is the recommendation engine's training data.** Every response teaches the system what "not tonight" vs. "not for me" means for this person. The more responses, the better the suggestions get.
- **Discovery and tracking are different jobs.** The observation prototype handles discovery ("would you watch this?"). The main app handles tracking ("mark it watched"). Mixing them — showing ongoing shows in the discovery flow — breaks both experiences.
- **The "This Week" view in Timeline is the breakout feature.** All 3 personas across all rounds identified it as the most universally valuable surface. It merges air-date schedule and ready-to-watch queue into a single temporal view. No competitor does this.

### Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Response labels feel like a quiz, not a conversation | High | Language test validated labels against natural speech patterns. Monitor drop-off rates on real users. |
| System collects responses but never visibly acts on them | High | Users (especially curators) need to see the system get smarter. Surface "you usually skip crime dramas on weeknights" as a visible learning signal. |
| Poster preview is undiscoverable | Medium | All 3 personas missed it. Add a persistent "Tap for details" affordance before launch. |
| Energy inference is wrong | Medium | Start with explicit time-of-day signals. Add contextual prompts ("Feeling like a chill watch?") before attempting fully implicit inference. |

---

## For Engineering / Dev

### Architecture decisions

- **SQLite via better-sqlite3 (synchronous).** Single-file DB at `data/tracker.db`. No ORM. All queries in `lib/db.ts`. This keeps the prototype fast and inspectable — you can `sqlite3 data/tracker.db` and query observation data directly.
- **TMDB API for all metadata.** Episode-level data (stills, descriptions, per-episode ratings) fetched via `lib/tmdb.ts`. Rate limits are generous for personal use but will need caching for multi-user.
- **Observation logging is append-only.** `suggestion_log` table captures every response with behavioral metadata. Revisions increment `revision_count` and update `response` — the history is in the count, not in separate rows.
- **Language capture is a separate table.** `language_capture` stores raw text responses for UX research. This is throwaway research data, not production.

### Technical debt to address before shipping

| Item | Priority | Notes |
|------|----------|-------|
| Silent actions across all views | High | Every primary action (Mark Watched, Start, Complete, Drop) fires without confirmation. Add toast notifications. Pattern identified in Round 1, still unresolved. |
| Scroll position loss in carousels | High | Fixed in Classic view (Round 1), still broken in Timeline Now carousel and Session Available grid. Apply the same fix systematically. |
| TV episode logic in observation prototype | High | Showing S1E8 of a show the user hasn't started makes no sense. Need two card types: series-level (new) and episode-level (tracking). |
| Personal score reasoning | Medium | "Based on your history with X" needs to explain why X is relevant. The genre affinity data exists in watch-patterns — surface the math. |
| Response type validation | Low | `suggestion_log.response` is a free TEXT field. Add a CHECK constraint matching the final label set. |

### Data model for the observation layer

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

## For Design / UX

### What the research says about the response labels

The current 8 labels should become 6. Two pairs merge because users don't distinguish them in natural language:

| Current (8) | Recommended (6) | Why |
|-------------|-----------------|-----|
| "This is it" | **"I'm in"** | Most common strong-yes phrase across all personas |
| "Let's start it" | **"I'd watch this"** | Conditional interest — "I'd" not "I will" |
| "Maybe later" + "Add to my queue" | **"Keep it on my radar"** | Users don't separate passive/active deferral. System should infer commitment from behavior. |
| "Not in the mood" + "Not now" | **"Not tonight"** | Users don't separate mood from timing. System logs hour/day context. |
| "Not for me" | **"Not for me"** | Unchanged — clearest permanent rejection across all personas |
| "Already seen it" | **"Already seen it"** | Unchanged — routes to rating flow |

Full analysis with raw response data: [04-language-test](../research/04-language-test.md)

### Category headers should simplify

| Current | Recommended |
|---------|-------------|
| "I'm Interested" | **"Yes"** |
| "Save for Later" | **"Maybe"** |
| "Pass" | **"No"** |

The color does the work. The words just confirm.

### Top 5 UX priorities (from research)

1. **Make the poster preview discoverable.** Add a persistent affordance — all 3 personas missed it in every test round.
2. **Add response confirmation feedback.** A checkmark animation or brief toast before advancing to the next card. Every persona noted the silent transition.
3. **Surface personal score reasoning.** "Based on your history with X" needs to show the connective logic, not just the prediction.
4. **Design a tracking card for ongoing shows.** "How do you feel?" is wrong for shows already in progress. Needs episode progress + "mark watched" — no emotional response options.
5. **Reduce response labels from 8 to 6.** Merge the two pairs identified in language testing.

---

## For Marketing / Content

### The story in one sentence

Show Tracker learns how you choose what to watch — not from ratings, but from how you respond to suggestions based on your energy, mood, and context.

### Key differentiators

- **Energy-aware recommendations** — the algorithm knows that RPDR is a no-brainer on tired weeknights, and Star Trek requires more attention than it gets credit for.
- **Emotional intent, not star ratings** — "Not tonight" is a timing signal. "Not for me" is a preference signal. The system learns the difference.
- **"This Week" temporal view** — no competitor merges air-date schedule and ready-to-watch queue into a single dated list. This is the feature that drives return visits.
- **The prototype learns from every interaction** — every response makes the next suggestion better. The system gets smarter by watching what you skip, not just what you watch.

### What NOT to promise

- Don't say "AI-powered" without qualification. The AI features (recommendations, chat) require a local LLM running via LM Studio. They're optional. The core app works without them.
- Don't promise energy inference. The prototype captures the signals (time of day, dwell time, response patterns) but doesn't yet infer energy level automatically. That's Phase 2.
- Don't use the word "taste." We say "Watch Patterns." The distinction matters — patterns are observable behavior, taste is a judgment.

---

## For Sales / Partnerships

### If this becomes a product

The observation layer is the moat. Traditional recommendation engines use collaborative filtering (people like you watched X). This system uses **behavioral calibration** — it learns from your individual response patterns, not from aggregate data.

The pipeline: **observe → learn → calibrate → anticipate**. Same macro pattern proven at:
- Shadow Health (2016) — conversation AI that learned from user corrections
- Holmusk — clinical workflow that narrowed 100 choices to 2-5 based on individual patterns

### Integration surface

The observation API is a clean REST interface:
- `POST /api/observations` — log a response
- `GET /api/observations` — retrieve history
- `PATCH /api/observations` — revise a response
- `GET /api/watch-patterns` — genre affinity stats
- `GET /api/suggestions` — trending content filtered by user library

Any partner with a content catalog could integrate the observation layer as a calibration widget. The API captures the behavioral signals; the partner's recommendation engine consumes them.

### Licensing considerations

- TMDB API is free for personal/educational use. Commercial use requires attribution and may require a commercial license.
- LM Studio (local LLM) is free. The AI features are optional and run entirely on the user's machine — no cloud dependency, no data sharing.

---

_This document is dev-informed but partner-facing. Update it as the prototype evolves and new research rounds complete._
