# Marketing & Content Context

_Living document. Updated as the product story evolves._

---

## What This Is

Show Tracker is a local-first app that learns how you choose what to watch — not from ratings, but from how you respond to suggestions based on your energy, mood, and context. Built with Next.js, SQLite, and TMDB.

---

## The Story in One Sentence

Show Tracker learns how you choose what to watch — not from ratings, but from how you respond to suggestions based on your energy, mood, and context.

---

## Key Differentiators

- **Energy-aware recommendations** — the algorithm knows that RPDR is a no-brainer on tired weeknights, and Star Trek requires more attention than it gets credit for.
- **Emotional intent, not star ratings** — "Not tonight" is a timing signal. "Not for me" is a preference signal. The system learns the difference.
- **"This Week" temporal view** — no competitor merges air-date schedule and ready-to-watch queue into a single dated list. This is the feature that drives return visits.
- **The prototype learns from every interaction** — every response makes the next suggestion better. The system gets smarter by watching what you skip, not just what you watch.

---

## What NOT to Promise

- Don't say "AI-powered" without qualification. The AI features (recommendations, chat) require a local LLM running via LM Studio. They're optional. The core app works without them.
- Don't promise energy inference. The prototype captures the signals (time of day, dwell time, response patterns) but doesn't yet infer energy level automatically. That's Phase 2.
- Don't use the word "taste." We say "Watch Patterns." The distinction matters — patterns are observable behavior, taste is a judgment.

---

## Screenshots

| Classic view | Timeline view | Session view |
|:---:|:---:|:---:|
| ![Classic](../images/classic-view.png) | ![Timeline](../images/timeline-view.png) | ![Session](../images/session-view.png) |

| Observation card | Preview dialog | Language capture |
|:---:|:---:|:---:|
| ![Observation](../images/observation-card.png) | ![Preview](../images/observation-preview.png) | ![Language](../images/language-capture.png) |
