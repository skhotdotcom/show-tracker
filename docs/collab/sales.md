# Sales & Partnerships Context

_Living document. Updated as the integration surface evolves._

---

## What This Is

Show Tracker is a local-first show tracking app with a behavioral calibration layer. The observation prototype presents content suggestions one at a time, captures emotional intent responses, and logs behavioral metadata (dwell time, time of day, revision patterns). Over time, it builds an individual behavioral profile — not collaborative filtering, not ratings.

---

## If This Becomes a Product

The observation layer is the moat. Traditional recommendation engines use collaborative filtering (people like you watched X). This system uses **behavioral calibration** — it learns from your individual response patterns, not from aggregate data.

The pipeline: **observe, learn, calibrate, anticipate**. Same macro pattern proven at:
- Shadow Health (2016) — conversation AI that learned from user corrections
- Holmusk — clinical workflow that narrowed 100 choices to 2-5 based on individual patterns

---

## Integration Surface

The observation API is a clean REST interface:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/observations` | POST | Log a response |
| `/api/observations` | GET | Retrieve history |
| `/api/observations` | PATCH | Revise a response |
| `/api/watch-patterns` | GET | Genre affinity stats |
| `/api/suggestions` | GET | Trending content filtered by user library |

Any partner with a content catalog could integrate the observation layer as a calibration widget. The API captures the behavioral signals; the partner's recommendation engine consumes them.

---

## Licensing Considerations

- TMDB API is free for personal/educational use. Commercial use requires attribution and may require a commercial license.
- LM Studio (local LLM) is free. The AI features are optional and run entirely on the user's machine — no cloud dependency, no data sharing.

---

## Evidence

- Usability tested across 3 rounds — SUS improved from 62.5 to 75.0 ([research](../research/))
- Response labels validated through natural language testing with 30 synthetic personas ([language analysis](../research/04-language-test.md))
- Observation prototype scored 74.2 SUS on first evaluation ([prototype evaluation](../research/03-prototype-evaluation.md))
