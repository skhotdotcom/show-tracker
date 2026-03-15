# AI Prototype Brief — Show Tracker

_Sequoia session, March 14, 2026. Source: JTBD analysis + habit observation + 3 rounds of UX research._

---

## The Core Insight

Scotty doesn't choose what to watch based on ratings or availability. He chooses based on **energy level**. The tracker answers "what's available?" but the real question is "what fits this moment?"

The algorithm knows: air dates, ratings, status, recency.
The algorithm doesn't know: he's eating dinner, he's tired, RPDR is a no-brainer in low-energy contexts, Star Trek requires more attention than it gets credit for.

**The prototype should close that gap.**

---

## JTBD — Micro Jobs (M1–M7)

| ID | Job | Context | Current State | Gap |
|----|-----|---------|---------------|-----|
| M1 | "Log an episode fast" | Just finished, move on with life | Detail dialog → Mark Watched | No auto-close, no confirmation toast |
| M2 | "Set position after a binge" | Watched 3-4 eps, need to catch up | 4 interactions (pencil → S → E → Save) | No "mark through" shortcut |
| M3 | "Air day → watch day translation" | Know when it's available FOR ME | Coming Soon shows raw date | Doesn't show day-of-week or +1 pattern |
| M4 | "Anything new I haven't seen?" | Dinner decision moment | Manual comparison | No freshness signal |
| M5 | "Track uncommitted interest" | "I think I have a season of Hacks to watch" | Watch Next only — reads as committed | No "maybe" / "on radar" state |
| M6 | "Decide if it's worth continuing" | Fallout: 2 eps, rating 2, done | Complete or delete only | No "tried, didn't enjoy" state |
| M7 | "Tell me when X is available" | Devil Wears Prada, Hunger Games | Coming Soon is read-only | No subscribe/notify |

---

## Energy-Aware Recommendation Model

### The Pattern

```
if (context.energy === 'low')
  → surface predictable, comfort-viewing defaults
  → RPDR, Bob's Burgers, rewatch favorites
  → "no-brainer" category

if (context.energy === 'medium')
  → surface active shows with momentum
  → The Pitt, Shrinking, Monarch
  → familiar but progressing

if (context.energy === 'high')
  → surface new/premium/demanding shows
  → Star Trek, new series, movie-length events
  → requires attention
```

### How to Infer Energy (Signals)

| Signal | Low Energy | High Energy |
|--------|-----------|-------------|
| Time of day | Evening (after dinner) | Afternoon, weekend morning |
| Day of week | Weekday evenings | Weekend |
| Session length | < 30 min (1 ep) | > 1 hr (binge) |
| Recent behavior | Comfort rewatch | Starting new shows |
| Context cue | **Dinner/eating** (explicit signal) | — |

### The "Dinner Decision" Moment

This is the **highest-leverage interaction** in the entire app.

- **Trigger:** Evening, food in oven / about to eat
- **Question:** "What should I watch while I eat?"
- **Answer should be:** One recommendation. Not a list. Not a grid. ONE opinionated pick.
- **Logic:** Default to the no-brainer unless there's a fresh episode of something highly rated

**Prototype feature: "What should I watch tonight?" single-pick recommendation.**

---

## Habit Data to Capture

### Explicit (Scotty told me)

- RPDR: religious viewing, no-brainer default
- Trek: avid fan, but requires more energy than dinner allows
- The Pitt: usually excited, currently glitched
- Dinner routine: food in oven = decides what to watch
- +1 pattern: watches day after air date (Thu→Fri, Fri→Sat)
- Energy-based selection: comfort wins when tired, new/premium when alert

### Inferred (from conversation patterns)

- RPDR > Starfleet in low-energy contexts despite similar ratings
- Predictability > quality in default selection
- "Check if new episode dropped" is a recurring micro-task
- Uncertainty ("I think I'm caught up on Mobland") is a recurring friction
- The tracker should know his shows as well as he does — and better

---

## Proposed Prototype Interactions

### P1: "Tonight's Pick" (dinner decision solver)

```
When: Evening context detected
What: Single card with ONE recommendation
Why: "New RPDR just dropped" / "You're 1 ep from finishing Starfleet"
Energy: Adapts to time/context — comfort picks at dinner, premium on weekends
```

**Success metric:** Scotty doesn't have to think. He sees the card and says "yeah, that."

### P2: "Mark Through" (binge shortcut)

```
When: User opens detail dialog on an active show
What: "Mark through S02E05" as a single interaction
Why: Binge-watching is the dominant catch-up pattern; 4-tap Set Position is too many
```

**Success metric:** 2 taps to log a 4-episode binge (show → episode → done).

### P3: "Freshness Pulse" (anything new?)

```
When: User opens the app
What: Inline badge or section: "3 new episodes since you last checked"
Why: Manual freshness check is a recurring head-inventory task
```

**Success metric:** No more "I think a new episode came out yesterday — I should check."

### P4: "On Radar" state (uncommitted interest)

```
When: User adds a show they're curious about but not committed to
What: Separate from Watch Next; "On Radar" reads as "not yet, but keep me posted"
Why: Hacks, Ted Lasso, The Night Manager — Scotty tracks interest differently than active commitment
```

**Success metric:** Watch Next = "I plan to watch this." On Radar = "Tell me if something changes."

### P5: "Tried It" state (graceful churn)

```
When: User decides a show isn't for them
What: "Tried it" — logged with rating and episode count, excluded from recommendations
Why: Fallout (2 eps, rating 2) shouldn't keep surfacing as available
```

**Success metric:** Churned shows stay in the record but stop asking for attention.

### P6: "Notify Me" (subscribe to availability)

```
When: User marks 100% interest on an upcoming title
What: Push/inline notification when it becomes available
Why: Hunger Games, Devil Wears Prada — Scotty wants to know, not search for it
```

**Success metric:** "Hunger Games is now in theaters" — arrives as a statement, not a search result.

---

## Prototype Architecture (for AI Prototyping Course)

### Phase 1: Context-Aware Recommendation
- **Input:** Time of day, day of week, active shows, last watched
- **Output:** Single "Tonight's Pick" card
- **Test:** Does Scotty agree with the pick > 80% of the time?

### Phase 2: Binge-Aware Progress Tracking
- **Input:** User opens detail dialog
- **Output:** "Mark through" episode picker
- **Test:** Can Scotty log a 4-ep binge in < 10 seconds?

### Phase 3: Proactive Freshness
- **Input:** Air dates + last watched date
- **Output:** "3 new episodes" pulse on app open
- **Test:** Does this eliminate the manual "did anything new drop?" check?

### Phase 4: State Model Expansion
- **Input:** Add "On Radar" and "Tried It" states
- **Output:** Clean separation between committed, interested, and churned
- **Test:** Does Watch Next feel less cluttered? Do churned shows stop resurfacing?

---

## Open Questions

1. **Energy inference accuracy:** Can we reliably infer energy level from behavioral signals, or should we ask? ("Feeling like a chill watch or something new?")
2. **Notification threshold:** How many upcoming titles warrant notify-me? All 100% interest shows, or only those Scotty explicitly flags?
3. **Muppet Show extension:** How does "loved a special, want more" map to the state model? Is that "On Radar" or a new "Waiting for More" state?
4. **The Pitt glitch:** Should the tracker surface "availability issues" as a state? (Currently the glitch is invisible to the app.)
5. **Air day +1 pattern:** Should this be a user setting ("I always watch the day after") or inferred from behavior?

---

## For the Maven Case Study

This is the AI Prototyping pipeline in action:

1. **Observe** (live conversation, not surveys) → watched Scotty do 20 minutes of mental inventory
2. **Extract JTBD** (M1–M7) → broke the vague "track my shows" into 7 testable micro-jobs
3. **Map to current state** → where does the app work, where does it break?
4. **Design prototype features** (P1–P6) → each one solves a specific micro-job
5. **Define success metrics** → observable, not aspirational
6. **Iterate** → test with SUS + cognitive walkthrough (already proven with Rounds 1–3)

The insight that powers everything: **ratings don't capture energy-based selection.** The algorithm needs to know not just what you like, but when you like it.
