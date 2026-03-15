# Claude Code Prompt — Phase 0: Observation Layer

_Experience prototype for behavioral calibration. This is a test, not a feature._

---

You are a front-end design engineer building a micro interaction prototype for a show tracking app. This is an experience test — not a feature. The goal is to observe customer behavior and learn their preferences through a feedback loop.

## The Card

Each suggestion shows one title at a time.

**For TV shows:**
- Show the **episode poster** (if available from TMDB), not the series poster
- Episode title and episode description (e.g., "S18E04 — The Rusical Roast")
- Episode air date
- Social rating (episode-specific rating if available in TMDB, series rating as fallback)
- Genre categories (from series level)
- Personal score: "We think you'll rate this 4/5 based on your history with RPDR"

**For movies:**
- Movie poster
- Movie title, tagline, and short description (1-3 sentences)
- Movie release date and runtime
- Social rating (community/star rating)
- Genre categories
- Personal score: "We think you'll like this — similar to [movie you rated highly]"

**Preview on click:** Clicking the poster opens a larger view (lightbox or expand inline) showing the full backdrop image, extended description, and cast top-billed. This is the "tell me more" moment without leaving the prototype.

**The system must know what it's showing:** The `suggestion_log` table includes `content_type` ('tv' or 'movie'), `season_number` and `episode_number` (for TV), and `tmdb_id`. This distinction matters because the behavioral signals are different — "not in the mood" to an episode means something different than "not in the mood" to a movie.

## The Response

"How do you feel about this one?" — the customer picks the language that matches their emotional intent:

**Immediate intent:**
- "This is it" — strong match, let's go
- "Let's start it" — willing, casual interest

**Delayed intent:**
- "Maybe later" — not right now, but keep it alive
- "Add to my queue" — committed, will watch

**Rejection (with signal):**
- "Not in the mood" — right show, wrong moment (energy/context signal)
- "Not for me" — wrong show entirely (taste signal)
- "Not now" — neutral, no strong feeling either way

Each response is logged via the observation API. The language matters — "not in the mood" is different from "not for me." One is timing, the other is taste. The system learns the difference.

## Revision History

Below the card, show the customer's previous choices as a history list. Each previous choice has a dropdown that lets them change it. "You said 'Maybe later' — change your mind?" This is the calibration loop — the customer revises, the system learns. Track `revision_count` in the observation log.

## Already Seen It

If the customer has already watched the show/movie:
- Allow them to rate it (star rating)
- If they've watched a few episodes but not finished: "Do you want to finish?" with options: "Yes, keep tracking" / "Not anymore" (logs as dropped + rating)

## Observation Layer

Every interaction is logged:
```
{
  title,
  content_type ('tv' | 'movie'),
  tmdb_id,
  season_number (nullable),
  episode_number (nullable),
  episode_description (nullable),
  social_rating,
  personal_score,
  response,
  timestamp,
  hour_of_day,
  day_of_week,
  dwell_time_seconds,
  revision_count
}
```

The observation API at `app/api/observations/route.ts` — POST to log, GET to retrieve. New table `suggestion_log`. No inference yet. Just capture. The feedback loop teaches the system what "in the mood" vs. "not for me" means for *this* person.

## The Bigger Picture (Macro Pattern)

This micro interaction is one piece of a calibration system. Over time, observation data combines with social ratings and community behavior. The system learns: "People like you who said 'maybe later' to Hacks S4 ended up watching it within 2 weeks." Each response is a behavioral signal that makes the next recommendation more accurate. The recommendation learns from the customer, not from external opinion. Pull > push.

## What I'm Envisioning

A single-page prototype. One card at a time. Poster, description, social rating, personal score, genres. Below: "How do you feel about this one?" — emotional response options. Below that: history of previous choices with revision dropdown. This is a standalone micro component that may become part of a larger macro experience.

## Technical Constraints

- Next.js (existing app at `show-tracker/`)
- SQLite via better-sqlite3 (existing pattern in `lib/db.ts`)
- shadcn/ui components (existing in `components/ui/`)
- Create `app/api/observations/route.ts` — POST to log, GET to retrieve
- New table `suggestion_log` with columns: id, content_type, title, tmdb_id, season_number, episode_number, episode_description, social_rating, personal_score, response, timestamp, hour_of_day, day_of_week, dwell_time_seconds, revision_count
- New test page at `app/test/observation/page.tsx`
- Fetch titles from TMDB API (existing pattern in `lib/tmdb.ts`) — for TV shows, fetch episode details to get episode-level posters and descriptions
- No new dependencies. Wireframe-level UI. Non-blocking logging.
- This is a test page, not production.
