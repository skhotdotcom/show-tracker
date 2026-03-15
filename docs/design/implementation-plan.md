# Implementation Plan — Micro-Level Work

_Target: SUS 92. Current: 74.2. Gap: 17.8 points across 3 personas._

---

## Working Model: Cycles, Not Phases

**For internal work:** Think in cycles of discovery and delivery. The prototype IS the pattern learning system. Each cycle builds, tests, learns, and feeds the next cycle. The value stream is a loop, not a line.

**For external communication:** Phases are the linear translation of cyclical work. Partners, engineering teams, and stakeholders may need to see a dependency-ordered roadmap. This doc serves both purposes — but the work itself cycles.

```
Discovery → Delivery → Discovery → Delivery → ...
   ↓            ↓           ↓           ↓
 Learn        Build      Validate     Refine
```

Each cycle:
1. **Discover** — Run unbiased evaluation. Test language. Observe behavior.
2. **Deliver** — Build what the cycle revealed. Ship a component.
3. **Validate** — Re-run evaluation. Check SUS. Update value stream doc.
4. **Learn** — What surprised us? What's the next opportunity?

---

---

## Current Cycle: Response Language + Trust

The first cycle focuses on what the customer says (response language) and whether the system confirms it heard them (trust). These aren't sequential steps — they're one learning loop. Build both, test both, learn from both.

---

## Response Language (Cycle 1 — Discovery + Delivery)

Everything else depends on this. The prototype still uses 8 labels. Reduce to 5 + "Already seen it" based on validated natural language clustering.

| Task | Status | Depends On |
|------|--------|------------|
| Update prototype labels (8 → 5) | Not started | — |
| Update button text to match validated language | Not started | Update labels |
| Merge "Maybe later" + "Add to my queue" → "Keep it on my radar" | Not started | Update labels |
| Merge "Not in the mood" + "Not now" → "Not tonight" | Not started | Update labels |
| Remove "This is it" → "I'm in" | Not started | Update labels |
| Run unbiased evaluation with new language | Not started | All above |

**Why first:** The response language is the emotional intent layer. Everything — calibration, confirmation, reflection — builds on what the customer says in this moment.

---

## Visible Feedback (Cycle 1 — Delivery + Validation)

The customer needs to see the system respond. Right now actions are silent. Each response should feel heard.

| Task | Status | Depends On |
|------|--------|------------|
| Card animation on response (slide out, fade, etc.) | Not started | Phase 0 |
| Confirmation toast or visual pulse on every action | Not started | Phase 0 |
| Response logged indicator (brief "saved" signal) | Not started | Phase 0 |

**Why second:** Trust. "I told it how I feel and it heard me." This directly impacts SUS statements about confidence and integration.

---

## "I'm In" Exit Behavior (Cycle 2 — Discovery + Delivery)

"I'm in" isn't just a strong yes — it's an exit signal. The customer commits, the session ends, the title transitions to tracking.

| Task | Status | Depends On |
|------|--------|------------|
| Define "I'm in" as session-ending action | Not started | Response language |
| Transition title from discovery to tracking state | Not started | "I'm in" definition |
| Post-exit screen: "You're watching X. Here's when the next episode drops." | Not started | Transition |

---

## TV Logic + Poster Discoverability (Cycle 3 — Discovery + Delivery)

Two opportunities, one cycle:
- **TV logic:** New-to-show cards and tracking cards are different jobs. Separate them.
- **Poster discoverability:** All 3 personas missed the lightbox. Make context visible.

| Task | Status | Depends On |
|------|--------|------------|
| New-to-show card: response language (5 labels) | Not started | Response language |
| Already-tracking card: next episode, mark watched | Not started | "I'm in" exit |
| Add persistent affordance to poster (info icon / tap for details) | Not started | — |
| Decision quality measurement (did details change response?) | Not started | Affordance |

---

## Rating Flow + "Because You Watched" (Cycle 4 — Discovery + Delivery)

Stars are wrong. Behavioral language captures the experience. "Because you watched X" builds recommendation confidence.

| Task | Status | Depends On |
|------|--------|------------|
| Design post-watch response options (behavioral language) | Not started | — |
| Map responses to personal score reasoning | Not started | Response options |
| "Because you watched X, Y, Z" recommendation justification | Not started | Score reasoning |

---

## Pre-Release / Pending Pattern (Cycle 5 — Discovery + Delivery)

"Tell me when X is available" — new interaction pattern (M7) for content not yet released. Independent of the core loop.

| Task | Status | Depends On |
|------|--------|------------|
| Design "Notify Me" interaction (Pending state) | Not started | — |
| Pending card type (different from discovery/tracking) | Not started | Notify Me |
| Release date reminder system | Not started | Pending state |

---

## Evaluation Gates

After each cycle:
1. **Re-run unbiased evaluation** with the 3 personas
2. **Check SUS scores** — are we moving toward 92?
3. **Update value stream doc** — does the customer feel the new value?
4. **Update design system tokens** — new components need token additions
5. **Commit and push** — all changes tracked

---

## What 92 Looks Like

The customer completes the value stream and feels:
- **Discovered** — "It showed me something I actually wanted"
- **Heard** — "It understood how I felt about it"
- **Confirmed** — "I knew it saved my response"
- **Learned** — "It's getting better at knowing me"
- **Resurfaced** — "It remembered what I wanted"
- **Committed** — "I said I'm in and the session ended. I'm watching it now."
- **Reflected** — "The rating options matched how I actually felt"

**92 is the customer feeling the entire loop work, seamlessly, every time.**
