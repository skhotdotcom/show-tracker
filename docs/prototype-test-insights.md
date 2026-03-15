# Prototype Test Insights

_Test notes from Scotty, March 15, 2026. Run through of 10 movie/show options._

---

## Test Context

- **What was tested:** Observation prototype at `app/test/observation/page.tsx`
- **Test method:** Solo walkthrough — 10 movie/show options, one card at a time
- **Stage:** First working prototype (Phase 0 observation layer)
- **Date:** 2026-03-15

---

## Key Findings

### 1. Poster Lightbox: Undiscoverable But Valuable

**Finding:** Didn't realize clicking the poster showed more info until after leaving the test. Initially marked Scarpetta as "not for me" based on genre tags alone (Drama, Crime). After accidentally discovering the lightbox, saw Jamie Lee Curtis + tagline ("She's a voice for the voiceless") and changed his mind.

**Insight:** The lightbox works well as a decision-support tool, but it's invisible. Users need a clear affordance that the poster is clickable.

**Priority:** 🟡 Moderate — the interaction is right, the discoverability is wrong.

---

### 2. Response Language: Doesn't Match Mental Model

**Finding:** The current response options don't match how the user actually thinks about content. The words were supposed to feel less pressure than traditional responses, but they don't quite land.

**What's missing:** "Interested but not right now" — a curious/maybe state that's neither commitment nor rejection.

**Current options that work:**
- "Maybe later" — closest to "not tonight" (time-based, not interest-based)

**Current options that don't work:**
- "Not in the mood" — unclear: not in the mood for this show, or not in the mood in general?
- "Let's start it" — feels like too much commitment for a casual interest

**Proposed revisions:**

| Current | Revised | Why |
|---------|---------|-----|
| "This is it" | "This is the one" | Slightly more intentional |
| "Let's start it" | "I'd watch this" | Lower commitment, closer to casual interest |
| *(missing)* | "Keep me posted" | New: curious but not ready to commit |
| "Maybe later" | "Not tonight" | Time-specific, not interest-specific |
| "Add to my queue" | "Add to my list" | Simpler |
| "Not in the mood" | "Not the vibe right now" | Less final, mood-specific |
| "Not for me" | "Not my thing" | Casual, not judgmental |

**Key principle:** Every option should feel like a low-pressure thing to say out loud. Less commitment language, more mood/intent language.

**Priority:** 🔴 Critical — this is the core of the interaction. If the language is wrong, nothing else works.

---

### 3. Color Coding: Hard to Read, Unnecessary

**Finding:** The green/yellow/red/pink color grouping for response options is hard to read against the dark background and isn't needed. The words themselves carry enough meaning.

**Priority:** 🟡 Moderate — simplify to monochrome or subtle variants.

---

### 4. TV Logic Debt: Mid-Season Episodes Make No Sense

**Finding:** Showing S1E8 of a show the user hasn't started is logically broken. "If I haven't watched the series yet, I wouldn't be able to say if I'm interested in episode 8 yet."

**The problem:** The system treats TV episodes the same as movies — one content unit at a time. But for TV, the unit of interest is the *series*, not the *episode*. You don't have an opinion on S1E8 until you have an opinion on the show.

**Solution needed:**
- If the user is **new to the show**: Show series poster + series description + "Would you watch this?"
- If the user is **already tracking the show**: Show episode poster + episode description + "Ready for the next one?"
- These are two different card types, one content type.

**Priority:** 🔴 Critical — the prototype can't learn from bad data. If the suggestion doesn't make sense, the response is meaningless.

---

### 5. Terminology: "Movie" Not "Film"

**Finding:** Use "movie" not "film" in all UI text.

**Priority:** 🟢 Minor — simple find-and-replace.

---

### 6. Two Micro Patterns Identified

**Finding:** The prototype page is actually two separate micro patterns:

1. **Watch** — the suggestion loop: show one title → get a response → log it
2. **History** — the revision loop: show past choices → allow changing your mind

These are different components with different jobs. The History component is the visible calibration loop — it's how the user teaches the system over time.

**Priority:** 🟡 Moderate — design them as separate components, not one monolithic page.

---

### 7. "Let's Start It" Should Be an Exit Point

**Finding:** When the system finds what you want to watch, the interaction should naturally end and move to a different state: "in-progress" mode.

**The in-progress pattern:**
- Did you finish it?
- Did you like it? (rate it)
- How many episodes did you watch?

This is a different micro pattern from the Watch loop. The system transitions from "find something" to "track something."

**Priority:** 🟡 Moderate — important for the full interaction arc, but the Watch pattern should be solid first.

---

### 8. Overall Assessment

> "Really interesting the way Claude Code laid out the page. Not what I was expecting for a micro component pattern."

The prototype exceeded expectations for a first pass. The dark theme, single-card focus, and conversational response language all landed. The issues are discoverability, language precision, and TV logic — all fixable without rearchitecting.

---

## Next Steps (Prioritized)

### 1. Fix Response Language (Critical)
Revise the response options to match the user's mental model. Test with 10 more options.

### 2. Solve TV Logic Debt (Critical)
New-to-show vs. tracking: different card types, different information. Series poster for new, episode poster for active.

### 3. Simplify the Watch Component (Moderate)
Remove color coding. Fix discoverability of poster click. Clean up the personal score comparison logic.

### 4. Design the History Component (Moderate)
Separate it from the Watch component. Think of it as its own micro pattern with its own interaction model.

### 5. Design the In-Progress Pattern (Later)
What happens after "This is the one"? Tracking, rating, completion detection.

---

## Lessons Learned

### From This Test
- **Prototype speed > prototype polish.** Running through 10 options in a few minutes taught more than any design review.
- **Language is design.** The response options aren't just labels — they're the interaction model. Every word matters.
- **Undiscoverable interactions aren't interactions.** If the user doesn't find it, it doesn't exist.
- **Logic debt is real.** The system needs to know the user's relationship to the content (new vs. active) before it can suggest the right level of detail.
- **Solo testing reveals structural issues fast.** No moderator needed. Just use it and note what feels wrong.

### From the Process
- **Design critique skill works** — structured feedback across usability, hierarchy, consistency, accessibility
- **The prompt matters more than the code.** The original prompt didn't specify the response language taxonomy — Claude Code improvised. The next iteration should be more specific about the emotional job layer.
- **Dark theme is the right call** for evening/lean-back content discovery

---

_Updated: 2026-03-15_
