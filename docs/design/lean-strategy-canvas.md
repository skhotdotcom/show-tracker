# Lean Strategy Canvas

_Gothelf & Seiden framework. Source: https://jeffgothelf.com/blog/the-lean-product-canvas/_

Strategic container for the Show Tracker initiative. Filled first — the Lean Product Canvas follows.

---

## Box 1: Goal

What are we trying to achieve in the immediate term?

**Build a reusable behavioral calibration module for AI-assisted content discovery.** Not a show tracker — a system that learns from individual response patterns, not aggregate data. Extractable as standalone IP for streaming platforms, recommendation engines, and AI-powered customer experiences.

---

## Box 2: Obstacles

What's keeping us from achieving the goal?

| Obstacle | Biggest? |
|----------|----------|
| No existing platform integration — we're a standalone prototype, not embedded in a partner's stack | |
| Response language not yet validated with real users (synthetic personas only) | |
| No "Pending" pattern for pre-release content (M7) — IP is incomplete | |
| Behavioral calibration signal needs 20-30 exchanges before it becomes useful | Yes — without enough signal, the calibration loop doesn't prove itself |
| Market doesn't know this pattern exists — it's a new category, not a known solution | |

**The biggest obstacle right now:** The calibration loop needs signal volume to prove itself. The prototype works, but the value only becomes visible after enough behavioral exchanges to show the system getting smarter. Until then, it looks like a recommendation engine with extra steps.

---

## Box 3: Where Will You Play? How Will You Win?

### Where will you play?

**Initial market:** Streaming platforms and entertainment companies (Netflix, Disney+, HBO Max) looking to differentiate their AI-powered customer experiences beyond collaborative filtering.

**Secondary market:** Product teams and agencies building AI-assisted workflows — the collaboration framework and interaction pattern taxonomy as standalone tools.

**Not playing:** Traditional entertainment analytics, social/collaborative viewing, or review aggregation.

### How will you win?

**Behavioral calibration, not collaborative filtering.** Traditional systems learn from "people like you watched X." This system learns from *your individual response patterns* — dwell time, revision behavior, time-of-day preferences, mood/timing distinctions. The more you use it, the more personal it gets. Aggregate data doesn't improve it — individual data does.

**The macro pattern is proven.** Same feedback loop as Shadow Health's conversation AI (2016) and Holmusk's clinical workflow — applied to content discovery for the first time.

**Cross-functional by design.** The collaboration framework means partner teams (and their AI tools) can integrate the context docs immediately — no knowledge transfer, no handoff.

---

## Box 4: Success Criteria (OKRs)

### Objective: Prove the behavioral calibration model works

| Key Result | Current | Target |
|------------|---------|--------|
| SUS score on observation prototype | 74.2 (Good) | 80+ (Excellent) |
| Response language validated with real users | Synthetic only | 10+ real user walkthroughs |
| Calibration accuracy (suggestion → accepted) | Not yet measured | 60%+ acceptance rate after 20 exchanges |
| "Keep it on my radar" titles resurfaced and acted on | Not yet tracked | 30%+ conversion on resurfaced titles |

### Objective: Establish the three IP layers as licensable assets

| Key Result | Current | Target |
|------------|---------|--------|
| Observation layer API documented | Basic REST endpoints | Full integration guide |
| Taxonomy documented as reusable framework | In `taxonomy.md` | Standalone methodology doc |
| Collaboration framework documented | 5 collab docs | Template for other projects |
| First licensing conversation | 0 | 1 partner inquiry |

---

## Relationship to the Lean Product Canvas

The Lean Strategy Canvas sets the container. The Lean Product Canvas (next) fills in the specific problems, users, solutions, and experiments for the observation layer — the highest-priority IP layer right now.

Strategy first. Product follows.

---

_Source: Gothelf & Seiden, "The Lean Product Canvas" (2024) — https://jeffgothelf.com/blog/the-lean-product-canvas/_
