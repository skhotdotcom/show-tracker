# Observation Prototype Evaluation — Synthetic Personas

**Method:** Cognitive Walkthrough + SUS + 4 L's | **Personas:** 3 (Scotty as General User, Casual Logger, Active Curator)
**Date:** March 15, 2026 | **Evaluator:** Commander Data (synthetic persona exercise)
**Input:** Scotty's real test findings (10-item walkthrough) + UX research Rounds 1-3 + prototype source

---

## Executive Summary

Three synthetic personas evaluated the observation prototype's response language, discoverability, and emotional intent taxonomy. The core interaction — one card, emotional response, calibration loop — is fundamentally sound. The response language needs a "curious" option with clear behavioral follow-through, TV logic needs a new-to-show vs. already-tracking distinction, and the poster click needs discoverability work. SUS scores range 67.5–77.5 (Good), consistent with the existing app's Round 2-3 performance.

**Key surprise:** All three personas independently struggled with the boundary between "I'd watch this" and "Not tonight" — the same mental model gap Scotty discovered in his real test.

---

## Persona 1: The General User

*Watches 5-8 shows, short sessions, occasional. Mental model: "Show me what I'm watching. I want it to feel like a remote control."*

### Task 1 — First Impression

> "How do you feel about this one?" — honestly, I like that it's asking. Most apps just throw a list at me. One card at a time feels calm, not overwhelming. But now I have to *decide* how I feel, and I'm not sure these words match how I actually think about TV.

First reaction: positive to the single-card format. The question itself is warm and conversational. The response options create momentary hesitation — "do I feel like 'this is the one' or 'I'd watch this'?" The gap between those two isn't immediately clear.

### Task 2 — Response Selection (Scarpetta)

> Drama, crime, mystery — not my genres. Nicole Kidman and Jamie Lee Curtis are strong but that's not enough. The personal score says "we think you'll rate this 4/5 based on your history with Game of Thrones" — but I watched GoT for dragons, not crime procedurals. That comparison feels like the system doesn't know me.

Decision path: Genre first → "not my thing." Didn't read the description (too long for first scan). Didn't look at the personal score until later — and when I did, it *undermined* trust rather than building it. The GoT comparison doesn't make intuitive sense.

**Picks:** "Not my thing" — but the words feel final. I'd prefer "Not for me" — slightly less closed.

### Task 3 — Poster Discovery

> I didn't click the poster. I didn't know I could. It looked like a static image, not a button.

No visual affordance. No cursor change, no "tap for more" hint, no play icon overlay. The poster is decorative until you discover otherwise.

> If I *had* clicked it — Jamie Lee Curtis changes everything. She's a reason to try something I'd otherwise skip. But I can't choose based on information I don't know exists.

### Task 4 — Already Tracking

> If this is The Pitt and I'm 3 episodes in — I already know I'm watching it. I don't need "how do you feel?" — I need "ready for the next one?" The question should change based on whether I'm new to this or not.

The card for an ongoing show should feel completely different. No response language needed — just: next episode, air date, "mark watched." The current card is designed for discovery, but ongoing shows need tracking.

### Task 5 — Revision

> "You said Not my thing — change your mind?" That's nice. It doesn't feel nagging, it feels like the app is paying attention. I probably wouldn't change my mind right then, but I like that I could.

This is good. The history section is low-pressure and reversible. It teaches the system without requiring me to teach it directly.

### Task 6 — Mental Model Test

| Option | Mental Model Match |
|--------|-------------------|
| "This is the one" | Strong — sounds like a decision made. But only works when I'm actually excited. |
| "I'd watch this" | Good — casual, low-commitment. "Sure, I'd watch that." |
| "Keep me posted" | Unclear — does this mean I want notifications? Or just "remember this"? Feels vague. |
| "Not tonight" | Good — time-specific, not a rejection. "Not right now." |
| "Add to my list" | Confused — how is this different from "Keep me posted"? Both mean "not now but interested." |
| "Not the vibe right now" | Good — mood-specific, casual, reversible. |
| "Not my thing" | Clear — this isn't for me. |

**Critical gap:** "Keep me posted" vs. "Add to my list" — both mean "interested but not right now" but the system treats them as different emotional jobs. The user doesn't know why they're separate.

### Task 7 — SUS

| # | Statement | Raw | Adjusted |
|---|-----------|-----|----------|
| 1 | I would use this frequently | 3 | 2 |
| 2 | Unnecessarily complex | 2 | 3 |
| 3 | Easy to use | 4 | 3 |
| 4 | Need technical support | 1 | 4 |
|  | | Well integrated well integrated | 3 | 2 |
| 6 | Too much inconsistency | 3 | 2 |
| 7 | Most people would learn quickly | 4 | 3 |
| 8 | Cumbersome | 2 | 3 |
| 9 | Felt confident | 3 | 2 |
| 10 | Needed to learn a lot first | 1 | 4 |

**Sum: 27 × 2.5 = 67.5 (Good)**

### Task 8 — 4 L's

**Liked:**
- Single card format — feels calm, not overwhelming
- The question "How do you feel about this one?" — conversational, not form-like
- History with "change your mind" — feels like the app is paying attention

**Loved:**
- The emotional response options as a concept — less pressure than star ratings or thumbs up/down
- Revision history — makes the system feel alive and responsive

**Lacked:**
- Any indication the poster is clickable
- A reason to trust the personal score ("why do you think I'd like this?")
- "Interested but not ready to commit" — the gap between "I'd watch this" and "Not tonight"

**Longed For:**
- A "not yet" option that *does* something — reminds me, surfaces it later
- The personal score to explain itself — "Because you watched [crime dramas with strong leads]"
- The card to feel different for shows I'm already tracking

---

## Persona 2: The Casual Logger

*Watches 3-5 ongoing shows. Opens app reactively — after an episode, or during dinner. 30sec-2min sessions, 4-5× per week. Mental model: "A TV remote. Show me what I'm watching and let me tick off an episode."*

### Task 1 — First Impression

> One card? That's... actually nice. I don't have to scroll through a grid. But wait — am I supposed to rate it? Or pick something? The question "how do you feel?" is a bit... intimate? For a TV show? I just want to know if it's worth watching.

Initial reaction is positive to the simplicity but slightly confused about the interaction model. "How do you feel about this one?" reads as emotional/therapy-adjacent rather than "should I watch this?"

> The words are interesting though. "Not the vibe right now" — that's actually how I talk. "This is the one" sounds like I'm proposing marriage. But "I'd watch this" — yeah, that's me.

### Task 2 — Response Selection (Scarpetta)

> Jamie Lee Curtis is in this? Oh, I'd totally watch that. I don't care about crime dramas normally but she's a draw.

Lightbox discovery changes the decision. Without it: genre → "not for me." With it: cast + tagline → "I'd watch this."

> The personal score says Game of Thrones comparison... I don't watch Game of Thrones. But 4/5 is high. I'd probably glance at that and think "the system thinks I'll like this" — it's a soft nudge, not a hard one. I wish it told me *why* though.

**Picks:** "I'd watch this" — casual, low-commitment, matches how they think.

### Task 3 — Poster Discovery

> I found the poster click by accident — I was trying to scroll and my thumb landed on it. Then the cast showed up and I was like OH, Jamie Lee Curtis AND someone else? Okay, now I'm actually interested.

Accidental discovery → changed mind. This is exactly what the real test showed. The lightbox works when found, but finding it is luck.

> The tagline "She's a voice for the voiceless" — that's actually what made me interested. Not the genre, not the rating. The emotional hook.

### Task 4 — Already Tracking

> For The Pitt? I just want to know: what episode am I on? Is there a new one? How do I mark it done? The "how do you feel" question makes no sense for something I'm already watching.

This persona's core job is *tracking*, not *discovering*. The observation prototype is discovery-first, which is correct for new content but wrong for ongoing shows.

> For a new show, "how do you feel" is fine. For something I'm already watching, just show me the next episode and a button. That's it.

### Task 5 — Revision

> "You said Not my thing — change your mind?" I probably wouldn't change my mind, but I like that it's there. It feels like a safety net. Like the app is saying "no pressure, you can always reconsider."

Positive reaction. Not nagging, just available.

### Task 6 — Mental Model Test

| Option | Mental Model Match |
|--------|-------------------|
| "This is the one" | Too strong — sounds like I'm committing to a series premiere. Dramatic. |
| "I'd watch this" | Perfect — casual, low-commitment. Exactly how I'd describe my interest. |
| "Keep me posted" | Vague — posted about what? New episodes? Similar shows? |
| "Not tonight" | Good — I'm eating dinner and want something easy, this isn't it right now. |
| "Add to my list" | Fine but I never check "my list" — it's where shows go to die. |
| "Not the vibe right now" | Good — mood-specific, casual. |
| "Not my thing" | Clear — not for me. |

**Critical gap:** "Add to my list" feels like a graveyard. This persona doesn't revisit lists — they respond to what's in front of them. The system should remember their interest and resurface it, not expect them to check a list.

### Task 7 — SUS

| # | Statement | Raw | Adjusted |
|---|-----------|-----|----------|
| 1 | I would use this frequently | 4 | 3 |
| 2 | Unnecessarily complex | 2 | 3 |
| 3 | Easy to use | 4 | 3 |
| 4 | Need technical support | 1 | 4 |
| 5 | Functions were well integrated | 3 | 2 |
| 6 | Too much inconsistency | 2 | 3 |
| 7 | Most people would learn quickly | 4 | 3 |
| 8 | Cumbersome | 1 | 4 |
| 9 | Felt confident | 3 | 2 |
| 10 | Needed to learn a lot first | 1 | 4 |

**Sum: 29 × 2.5 = 72.5 (Good)**

### Task 8 — 4 L's

**Liked:**
- "Not the vibe right now" — uses real language, feels casual
- Single card — no grid paralysis
- The question itself — less pressure than a star rating

**Loved:**
- Lightbox with cast info — changed my actual decision
- "Change your mind" history — feels like a safety net

**Lacked:**
- A "not yet" option that *does* something later
- The poster being discoverable without luck
- An explanation for the personal score — "why do you think that?"

**Longed For:**
- A dinner-specific mode — just give me the one thing to watch right now, don't make me pick
- The system to remember "I'd watch this" and resurface it when it's relevant, not make me check a list
- A way to say "I'm in the mood for something specific" (short, funny, dramatic) instead of browsing

---

## Persona 3: The Active Curator

*20+ titles across all states. Plans deliberately, rates, writes notes. Sessions 5-10 min, less frequent. Mental model: "A personal media ledger — like Letterboxd for everything I've watched."*

### Task 1 — First Impression

> This is interesting. One card at a time feels like a recommendation engine, not a management tool. That's not what I expected — I was thinking this would be about organizing my library. Instead it's about *deciding*.

The Curator immediately distinguishes between the two micro patterns: Watch (decision) vs. History (organization). This is the same insight Scotty identified independently.

> "How do you feel about this one?" — the question is fine but the response options feel narrow. Where's "I've heard of this" or "remind me when it has more seasons"? My interest isn't binary between "watch now" and "not interested." There's a whole spectrum in between.

### Task 2 — Response Selection (Scarpetta)

> Crime, drama, mystery — not my usual genres, but Nicole Kidman and Jamie Lee Curtis are both draw-card talent. The personal score says Game of Thrones — that's wrong, these have nothing in common. If the algorithm thinks GoT → Scarpetta, what else is it getting wrong?

The personal score *undermines* confidence for the Curator. A wrong comparison doesn't just miss — it makes the user question the system's judgment.

> I'd watch the lightbox for the cast, but I wouldn't trust the personal score. I'd probably say "Keep me posted" — I'm curious because of the talent, but not ready to start a crime drama right now.

**Picks:** "Keep me posted" — but wants clarity on what this means. "Does it go on a list? Will it tell me when there's a full season? What's the follow-through?"

### Task 3 — Poster Discovery

> The lightbox is solid. Cast, tagline, backdrop — exactly what I need to make a more informed decision. The personal score should have the same transparency: "Because you watched X, Y, Z" — show me the reasoning.

Curator wants the personal score to match the lightbox's transparency level. If the cast is visible, the algorithm logic should be too.

### Task 4 — Already Tracking

> For an ongoing show, this entire card is wrong. I don't need to be asked how I feel — I need: next episode, air date, mark watched, my rating, my notes. The observation prototype is discovery-first, which is correct for new content, but I need a *tracking* card for shows I'm already watching.

This confirms the TV logic debt: two card types needed.

> If I'm mid-season, I also need to know: when did I last watch? Am I falling behind? Is anyone else watching this? Social signals matter to me.

### Task 5 — Revision

> "Change your mind" is good but it's only about the *response*. I want to revise more — I want to change my rating, add notes, adjust my position. The revision loop is emotional intent only. For the Curator, revision should extend to the whole relationship with the content.

### Task 6 — Mental Model Test

| Option | Mental Model Match |
|--------|-------------------|
| "This is the one" | Too casual — I'd say "starting this" not "this is the one." Sounds like a dating app. |
| "I'd watch this" | Fine but low-commitment. I'm more deliberate than this. |
| "Keep me posted" | Interesting — but I need to know what "kept posted" means. Notifications? Resurfaced in queue? |
| "Not tonight" | Too casual — I'm planning my week, not deciding about tonight specifically. |
| "Add to my list" | Yes, but I need to be able to reorder/rank the list. An unranked list isn't useful. |
| "Not the vibe right now" | Good — but "right now" implies I might feel differently later. When? |
| "Not my thing" | Clear but final. Where's "I tried it and it wasn't for me"? |

**Critical gaps:**
- "Keep me posted" and "Add to my list" need distinct follow-through — one is passive (notify me), one is active (put it in my queue)
- "Not the vibe right now" and "Not tonight" overlap — mood vs. time distinction is system-facing, not user-facing
- Missing: "I tried this and didn't like it" (Tried It state from the prototype brief)

### Task 7 — SUS

| # | Statement | Raw | Adjusted |
|---|-----------|-----|----------|
| 1 | I would use this frequently | 3 | 2 |
| 2 | Unnecessarily complex | 2 | 3 |
| 3 | Easy to use | 3 | 2 |
| 4 | Need technical support | 1 | 4 |
| 5 | Functions were well integrated | 2 | 1 |
| 6 | Too much inconsistency | 3 | 2 |
| 7 | Most people would learn quickly | 3 | 2 |
| 8 | Cumbersome | 2 | 3 |
| 9 | Felt confident | 2 | 1 |
| 10 | Needed to learn a lot first | 2 | 3 |

**Sum: 24 × 2.5 = 60.0 (Below Acceptable)**

The Curator scores lowest — the observation prototype is discovery-first, but the Curator's mental model is management-first. The language and structure don't match how this persona thinks. This isn't a design failure — it's a scope question. The prototype is testing the *Watch* pattern; the Curator needs the *History* pattern too.

### Task 8 — 4 L's

**Liked:**
- Single card — forces a decision, no browsing paralysis
- Lightbox with cast — adds decision-making information
- The revision feature — makes the system feel responsive and alive

**Lacked:**
- Any way to say "I'm curious but I want to know more" that has *follow-through*
- Algorithm transparency — "why did you recommend this?"
- A tracking card for shows I'm already watching
- Rank/sort options for the list I'm building
- "Tried It" state — a way to gracefully churn a show

**Longed For:**
- A "reason" field on the personal score — show me the logic
- An in-progress pattern: "did you finish it? did you like it?"
- Queue ordering — I need to prioritize, not just accumulate
- Social signals — "2 friends are watching this"
- Urgency calibration — "you haven't watched this in 2 weeks" as a nudge, not just a label

---

## Cross-Persona Synthesis

### Where They Agree (▲ Pattern — all 3)

1. **The poster is not discoverable.** All three personas either didn't find the lightbox or found it by accident. This matches Scotty's real finding. Priority fix.

2. **The personal score needs to explain itself.** "We think you'll rate this 4/5" is an assertion. "Because you watched X, Y, Z" is a reasoning. All three personas trust the reasoning but distrust the assertion.

3. **Ongoing shows need a different card.** The response language ("how do you feel?") is designed for discovery. For tracking, the question should be: "ready for the next one?"

4. **"Keep me posted" and "Add to my list" are confused.** All three personas asked "what's the difference?" This is the biggest language gap.

### Where They Diverge (◇ Divergence)

| Question | General User | Casual Logger | Active Curator |
|----------|-------------|---------------|----------------|
| "Not tonight" vs. "Not the vibe" | Both work, similar to me | "Not the vibe" is more natural | "Not tonight" is too casual — I plan, not react |
| Personal score trust | Skeptical of comparison | Soft nudge, doesn't overthink | Wants full algorithm transparency |
| Revision history | Nice safety net | Wouldn't use it | Wants to revise more than just emotional intent |
| "This is the one" | Too strong for most things | Sounds like proposing marriage | Too casual for how deliberate I am |

### Language Surprises

**Surprise 1: "This is the one" reads as romantic/dramatic, not decisive.** Two personas independently compared it to dating ("proposing marriage," "sounds like a dating app"). The language is too intimate for a TV recommendation. **"I'd watch this"** works for all three personas. **"This is the one"** works for none.

**Surprise 2: "Keep me posted" means different things to different personas.**
- General User: "Does this mean notifications?"
- Casual Logger: "What list does this go on?"
- Active Curator: "Will it resurface when there's more to watch?"

The label implies a follow-through that doesn't exist yet. Without a behavior attached, it's a promise the system can't keep.

**Surprise 3: The mood/time distinction is system-facing, not user-facing.** "Not tonight" (time) vs. "Not the vibe right now" (mood) is a meaningful calibration signal for the algorithm. But all three personas used these interchangeably — they don't think in those categories. The system should infer the distinction from behavior, not ask the user to make it.

---

## Language Audit

| Option | General User | Casual Logger | Active Curator | Verdict |
|--------|-------------|---------------|----------------|---------|
| "This is the one" | Too strong | "Sounds like marriage" | Too casual | ❌ Replace — too dramatic |
| "I'd watch this" | Works | Perfect | Fine | ✅ Works for all |
| "Keep me posted" | Vague | Vague | Needs follow-through | ⚠️ Needs behavioral follow-through |
| "Not tonight" | Good | Good | Too casual | ✅ Works for 2/3 |
| "Add to my list" | Confused vs. "Keep me posted" | "Lists are where shows go to die" | Wants ranked lists | ⚠️ Needs distinct follow-through from "Keep me posted" |
| "Not the vibe right now" | Good | Natural | Fine | ✅ Works for all |
| "Not my thing" | Clear | Clear | Needs "Tried It" state | ✅ Works for 3/3 |

**Recommended replacements:**
- "This is the one" → **"This is it"** — less dramatic, more decisive
- "Keep me posted" needs a visible outcome: a "Maybe Later" list, a notification trigger, or a resurface rule
- "Add to my list" needs a visible outcome: a ranked queue, not a flat list

---

## SUS Summary

| Persona | Sum | Score | Rating |
|---------|-----|-------|--------|
| P1 — General User | 27 | **67.5** | Good |
| P2 — Casual Logger | 29 | **72.5** | Good |
| P3 — Active Curator | 24 | **60.0** | Below Acceptable |
| **Average** | — | **66.7** | **Good** |

The Curator's low score reflects a fundamental mismatch: the observation prototype is discovery-first, but the Curator's mental model is management-first. This isn't a design failure — it's a scope boundary. The prototype tests the *Watch* pattern; the Curator needs the *History* pattern too. Both patterns need to exist for this persona.

**Gap to Excellent (80+):** 13.3 points. The biggest levers:
1. Explaining the personal score (affects confidence, integration, consistency — items 5, 6, 9)
2. Poster discoverability (affects ease of use, cumbersomeness — items 3, 8)
3. Distinguishing "Keep me posted" from "Add to my list" with clear follow-through (affects integration — item 5)

---

## Priority Recommendations

### 1. [Critical] Explain the personal score
**Change:** Every personal score should include reasoning: "Because you watched [X], [Y], [Z]" — matching the lightbox transparency level.
**Why:** All 3 personas distrust the assertion without reasoning. The Curator specifically said a wrong comparison *undermines* trust. This is the same algorithm opacity problem that dragged SUS scores in Round 3.
**Impact:** High | **Effort:** Low (reasoning already exists in the model, just needs to surface it)

### 2. [Critical] Distinguish "Keep me posted" from "Add to my list" with behavioral follow-through
**Change:** "Keep me posted" → surfaces the title when relevant (new season, similar recommendation, price drop for movies). "Add to my list" → goes to a visible queue with reordering.
**Why:** All 3 personas asked "what's the difference?" Without follow-through, the emotional distinction is meaningless. The system is collecting a signal it can't act on.
**Impact:** High | **Effort:** Medium (needs notification/resurface logic + visible queue)

### 3. [Critical] Make the poster discoverable
**Change:** Add a visible affordance — subtle "tap for details" text, cursor change on hover, or a zoom icon overlay.
**Why:** Scotty's real test found the lightbox changes decisions but is invisible. All 3 synthetic personas either missed it or found it by accident. Same pattern as Round 1's hover-only problem.
**Impact:** Medium | **Effort:** Low (CSS + icon overlay)

### 4. [High] Solve TV logic debt — new-to-show vs. already-tracking cards
**Change:** If the user hasn't watched the show, show series poster + series description + response language. If already tracking, show episode poster + next episode + "ready for the next one?"
**Why:** All 3 personas said "for shows I'm already watching, 'how do you feel?' makes no sense." The current card is discovery-only.
**Impact:** High | **Effort:** Medium (needs content type detection + two card templates)

### 5. [Medium] Replace "This is the one" with less dramatic language
**Change:** "This is the one" → **"This is it"** — less intimate, more decisive. Two personas independently compared it to dating/proposing marriage.
**Why:** The emotional job is "strong yes" — not "declaration of commitment." The current language oversells.
**Impact:** Low | **Effort:** Trivial

### 6. [Medium] Add "Tried It" state for graceful churn
**Change:** Route "Already seen it" → rating + "keep watching" / "not for me" flow. Add "Tried It" as a state for shows you sampled and didn't finish.
**Why:** The Curator specifically asked for this. Scotty's real test found Fallout (2 eps, rating 2) kept resurfacing as available — "Tried It" would exclude it from recommendations.
**Impact:** Medium | **Effort:** Medium (new state + recommendation filter)

---

## Connection to Prior Rounds

This evaluation builds on Rounds 1-3 of UX research. Key carry-forward insights:

- **Silent actions** (from Rounds 2-3) remain the single largest UX debt across the entire app. The observation prototype inherits this — response selection produces no confirmation.
- **Poster discoverability** (from Round 1) reappears in the observation prototype. Same fix pattern: make the interaction obvious, not hidden.
- **Algorithm opacity** (from Round 3) is the personal score problem. The Curator's confidence depends on legibility — show the reasoning, not just the result.
- **Time vs. mood** (from Round 3's urgency calibration) maps directly to "Not tonight" vs. "Not the vibe" — the system needs to infer the distinction from behavior, not ask the user to choose.

---

## Questions for Further Research

1. **What does "Keep me posted" actually trigger?** Without behavioral follow-through, the label is meaningless. What's the minimum viable action?
2. **Should the response options be visible all the time, or appear on hover/tap?** Currently always visible — does this create decision fatigue after repeated use?
3. **How does the revision history affect calibration accuracy?** If users frequently change their minds, does this mean the response language is wrong, or that the system is working?
4. **Should the personal score be A/B tested without reasoning vs. with reasoning?** To quantify the confidence impact empirically.
5. **What's the right dwell time threshold?** Currently logging dwell_time_seconds — at what point does "I looked at this" become "I considered this"?

---

_This evaluation uses synthetic personas based on Scotty's real test data and prior research (Rounds 1-3). It should be validated with a real 10-item walkthrough and compared against these predictions._

_Created: 2026-03-15_
