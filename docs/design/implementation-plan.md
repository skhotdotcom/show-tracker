# Implementation Plan — Micro-Level Work

_Target: SUS 92. Current: 74.2. Gap: 17.8 points across 3 personas._

---

## Phase 0: Response Language (Foundation)

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

## Phase 1: Visible Feedback (Trust Loop)

The customer needs to see the system respond. Right now actions are silent. Each response should feel heard.

| Task | Status | Depends On |
|------|--------|------------|
| Card animation on response (slide out, fade, etc.) | Not started | Phase 0 |
| Confirmation toast or visual pulse on every action | Not started | Phase 0 |
| Response logged indicator (brief "saved" signal) | Not started | Phase 0 |

**Why second:** Trust. "I told it how I feel and it heard me." This directly impacts SUS statements about confidence and integration.

---

## Phase 2: "I'm In" Exit Behavior (Session Closure)

"I'm in" isn't just a strong yes — it's an exit signal. The customer commits, the session ends, the title transitions to tracking.

| Task | Status | Depends On |
|------|--------|------------|
| Define "I'm in" as session-ending action | Not started | Phase 0 |
| Transition title from discovery to tracking state | Not started | "I'm in" definition |
| Post-exit screen: "You're watching X. Here's when the next episode drops." | Not started | Transition |
| Tracking mode: different card type for in-progress shows | Not started | Phase 3 |

**Why third:** This is the first major interaction pattern that goes beyond "respond and move on." It's the commitment moment — and it connects discovery to tracking.

---

## Phase 3: TV Logic (Card Types)

The prototype treats everything the same. But a new-to-show card and a mid-season tracking card are different jobs.

| Task | Status | Depends On |
|------|--------|------------|
| New-to-show card: response language (the 5 labels) | Not started | Phase 0 |
| Already-tracking card: next episode, mark watched, no response language | Not started | Phase 2 |
| "I'm in" transition: new-to-show → already-tracking | Not started | Phase 2 |

**Why fourth:** This solves the "cumbersome" SUS item. Tracking shows shouldn't feel like discovering shows. Separate jobs, separate cards.

---

## Phase 4: Poster Discoverability (Decision Quality)

All 3 personas missed the poster click. Lightbox reveals cast, tagline, description — but only if found.

| Task | Status | Depends On |
|------|--------|------------|
| Add persistent affordance to poster (tap for details / info icon) | Not started | Phase 0 |
| Lightbox: cast, tagline, extended description | Already built | Affordance |
| Decision quality measurement (did details change response?) | Not started | Lightbox |

**Why fifth:** Direct impact on "easy to use" and "confident using it." The system earns trust when it gives enough context to make a decision without leaving the flow.

---

## Phase 5: Rating Flow (Behavioral Language)

Stars are wrong. "I couldn't stop watching" / "It was fine" / "I almost turned it off" — behavioral language captures the experience.

| Task | Status | Depends On |
|------|--------|------------|
| Design post-watch response options (behavioral language) | Not started | Phase 0 |
| Map responses to personal score reasoning | Not started | Response options |
| "Because you watched X, Y, Z" recommendation justification | Not started | Score reasoning |

**Why sixth:** This is the reflection moment in the value stream. It feeds back into calibration and enables the "Because you watched..." reasoning that builds confidence.

---

## Phase 6: Pre-Release / Pending Pattern (M7)

"Tell me when X is available" — new interaction pattern for content not yet released.

| Task | Status | Depends On |
|------|--------|------------|
| Design "Notify Me" interaction (Pending state) | Not started | — |
| Pending card type (different from discovery/tracking) | Not started | Notify Me |
| Release date reminder system | Not started | Pending state |

**Why last:** This is a new micro-job (M7) that doesn't depend on the existing flow. It's additive — the core loop works without it. But it completes the observation layer IP.

---

## Dependency Map

```
Phase 0 (Response Language)
  ↓
Phase 1 (Visible Feedback)
  ↓
Phase 2 ("I'm In" Exit)
  ↓
Phase 3 (TV Logic)
  
Phase 0 → Phase 4 (Poster Discoverability)
Phase 0 → Phase 5 (Rating Flow)
Phase 6 (Pre-Release) — independent
```

---

## Evaluation Gates

After each phase:
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
