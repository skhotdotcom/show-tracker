# Sales & Partnerships Context

_Living document. Updated as the integration surface evolves._

---

## What This Is

Three layers of proprietary IP for AI-assisted content discovery and cross-functional collaboration. The observation layer captures behavioral calibration signals; the taxonomy provides a reusable design methodology; the collaboration framework enables cross-functional teams and their AI agents to work from shared context.

---

## The Moat

Traditional recommendation engines use collaborative filtering (people like you watched X). This system uses **behavioral calibration** — it learns from individual response patterns, not aggregate data.

The pipeline: **observe → learn → calibrate → anticipate**. Same macro pattern proven at:
- Shadow Health (2016) — conversation AI that learned from user corrections
- Holmusk — clinical workflow that narrowed 100 choices to 2-5 based on individual patterns

The response language was validated through natural language clustering (30 synthetic responses, 6 intent categories) — not designed by engineers, validated against how users actually speak.

---

## Three Layers, Three Integration Plays

### 1. Observation Layer (Streaming Platforms)
A calibration widget that integrates into any content catalog. The API captures behavioral signals; the partner's recommendation engine consumes them.

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/observations` | POST | Log a response |
| `/api/observations` | GET | Retrieve history |
| `/api/observations` | PATCH | Revise a response |
| `/api/watch-patterns` | GET | Genre affinity stats |
| `/api/suggestions` | GET | Trending content filtered by user library |

### 2. Interaction Pattern Taxonomy (Design Teams)
A reusable design methodology — the pattern/component/experience distinction, behavioral signal stack, emotional job framework. Licensed for internal use by product and design organizations.

### 3. Collaboration Framework (Agencies, AI-Assisted Workflows)
Living context docs where each cross-functional audience has a self-contained file their AI agent can read independently. No handoffs. Shared understanding. Licensed as a reusable framework.

---

## Licensing

**© 2026 Scott Purcell. All rights reserved.**

- Code and documentation are proprietary — public for visibility, not for reuse
- Commercial use, redistribution, and derivative works require written consent
- TMDB API: free for personal/educational use; commercial use may require attribution/license from TMDB
- All three IP layers are available for licensing, consulting, and integration partnerships

---

## Evidence

- Usability tested across 3 rounds — SUS improved from 62.5 to 75.0 ([research](../research/))
- Response labels validated through natural language testing with 30 synthetic personas ([language analysis](../research/04-language-test.md))
- Observation prototype scored 74.2 SUS on first evaluation ([prototype evaluation](../research/03-prototype-evaluation.md))
