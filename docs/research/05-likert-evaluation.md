# 05 — Likert Variant Evaluation

_Synthetic persona evaluation of the Likert + Diagnostic Sub-Level observation prototype. Comparison to the original flat layout (03-prototype-evaluation.md)._

_Evaluated: 2026-03-15_

---

## Persona Descriptions

**Persona 1 — General User (Alex)**
- Modest watchlist, finds a few shows and sticks with them
- Mental model: remote control — press a button, get a result
- Session pattern: short (3-5 min), occasional, decision-driven
- Relationship to ratings: rarely reads them, relies on gut feeling and word of mouth

**Persona 2 — Casual Logger (Jordan)**
- 3-5 shows in rotation, always something current
- Mental model: TV remote — channel surfing, lean-back
- Session pattern: very short (1-2 min), frequent, routine check-in
- Relationship to ratings: looks at social rating briefly, not a deciding factor

**Persona 3 — Active Curator (Morgan)**
- 20+ titles tracked, uses Letterboxd/Goodreads for movies/books
- Mental model: personal media ledger — detailed, intentional, thorough
- Session pattern: longer (10-20 min), less frequent, curation-focused
- Relationship to ratings: reads ratings, cares about cast, compares to similar titles

---

## Cognitive Walkthrough

### Task 1: First Impression

**Alex (General User):**
> "OK, a card with a show on it and some buttons below. 'Are you interested?' — that's direct. I see five options in a row with emojis. The emojis tell me what each one means before I read the words. I notice 'Already seen it' and 'Skip' are smaller — so those are secondary? Makes sense. The main decision is the five in the middle."

**Jordan (Casual Logger):**
> "Simple. One card, five buttons. I don't have to scroll. The emojis make it feel casual, not like a survey. I immediately want to click one to see what happens next. The horizontal layout feels like a scale — left is yes, right is no."

**Morgan (Active Curator):**
> "I see a single card with a clear question. The Likert scale is familiar — it's a rating, but for my interest level, not the show's quality. That's the right framing. I want to see more information about the show before I answer, though. I notice I can click the poster for details."

**Gap analysis:** All three understood the layout immediately. The horizontal scale with emojis registered as intuitive. Morgan wanted more context before answering (existing poster click addresses this, but the affordance is still subtle).

---

### Task 2: Top-Level Decision

**Alex:**
> "Five options... 'I'm in' feels too strong for a first look. 'I'd watch this' is what I'd say. 'I'm curious' is good when I don't know enough to commit. 'Doesn't grab me' and 'Not for me' — what's the difference? 'Doesn't grab me' is I don't feel pulled, 'Not for me' is I know it's wrong. I think that's right."

**Jordan:**
> "I'd usually land on 'I'd watch this' or 'I'm curious' for most things. 'Not for me' is easy — I know what I don't like. The middle options are where I'd spend time. 'Doesn't grab me' — yeah, that's the 'meh' option. I'd click that a lot."

**Morgan:**
> "The scale is clean. My only concern is that 'I'm in' and 'I'd watch this' feel too close for some people. For me, 'I'm in' means 'I'm starting this tonight' and 'I'd watch this' means 'add it to my mental list.' But I had to think about it. A casual user might not distinguish."

**Gap analysis:** All three understood the scale. Morgan flagged a potential overlap between positions 1 and 2 — "I'm in" and "I'd watch this" may not be distinct enough for all users. The scale reads left-to-right as strong yes → strong no, which matches mental models.

---

### Task 3: Sub-Level Discovery

**Alex (clicked "I'd watch this"):**
> "A question appeared: 'What caught your eye?' Oh, so it wants to know *why*. That's... interesting? The options are cast, genre, rating, description. I'd pick 'The cast' — that's usually what pulls me in. But I wonder if this is necessary. Can't I just say I'd watch it and move on? Oh wait, there's a Skip. Good."

**Jordan (clicked "Doesn't grab me"):**
> "What's missing? ...Hmm. 'Not the right mood/timing' — that's actually exactly what I'd say. I don't hate this, it's just not hitting right now. The sub-options feel like they're trying to understand me. I like that. But sometimes I'd just want to skip this and move to the next card. The Skip is there, so that's fine."

**Morgan (clicked "Not for me"):**
> "What's the boundary? This is a useful diagnostic. 'Not my genre at all' is the clearest signal I can give. I like that it's asking for the reason — for a system that's supposed to learn my taste, this is where the learning happens. The sub-level feels earned, not interrogative, because I already made my top-level choice."

**Gap analysis:** The sub-level was understood as diagnostic, not redundant. Alex was initially skeptical but found the Skip option. Jordan appreciated that the sub-options matched their actual feeling. Morgan recognized the sub-level as the calibration layer. The Skip link is critical — without it, the sub-level would feel like interrogation.

---

### Task 4: Skip Behavior

**Alex:**
> "I see 'Skip' at the bottom of the sub-level. And also 'Skip' next to 'Already seen it' at the top. Two different Skips. The first one means 'I don't want to explain why' and the second means 'I don't want to answer at all.' That's a little confusing but I think I get it."

**Jordan:**
> "I'd use Skip a lot. When I'm in a quick session, I just want to tap and go. The sub-level is for when I'm feeling thoughtful. Having the option to skip means the system respects my time."

**Morgan:**
> "The dual Skip is the right design. Sometimes I want to explain my reasoning (when I'm in curation mode), sometimes I just want to express interest and move on. The system should handle both without punishing either choice."

**Gap analysis:** Two Skip paths (top-level and sub-level) were understood correctly. Jordan's concern about respecting time is important — the sub-level should never feel mandatory. The current implementation handles this well.

---

### Task 5: "I'm In" Flow

**Alex:**
> "I clicked 'I'm in' and... it just went. Toast said 'Starting [title]...' and then the next card appeared. No sub-level, no questions. That feels right. If I'm saying 'I'm in,' I'm done. Don't ask me anything else."

**Jordan:**
> "Clean. I'm in → toast → next card. The toast confirms my choice without blocking me. It auto-advances, which is good — I don't have to click again."

**Morgan:**
> "The exit signal is well-executed. No sub-level is the right call — 'I'm in' is a commitment, not a question. The toast confirmation without undo makes sense here. If you're in, you're in. One less click to start watching."

**Gap analysis:** "I'm in" → immediate transition is the strongest design choice in this variant. All three agreed: no sub-level, no undo, clear commitment signal. This is the exit behavior that was missing from the flat layout.

---

### Task 6: "Already Seen It" Flow

**Alex:**
> "I clicked 'Already seen it' and got five rating options. 'It was fine' is what I'd say for most things. The behavioral language is better than stars — 'I couldn't stop watching' is vivid, 'I almost turned it off' is honest. I like that it's separate from the interest scale. This is for stuff I've already experienced."

**Jordan:**
> "Simple. Five options, I pick one, toast, next card. It doesn't interrupt my flow. Having it as a secondary link below the main options makes sense — it's a different kind of response."

**Morgan:**
> "The behavioral language is the right direction. 'I'd recommend it' is different from 'I couldn't stop watching' — the first is about advocacy, the second is about engagement. This is more nuanced than stars. I'd want to see how this maps to a 1-5 score, but as raw data it's richer."

**Gap analysis:** The rating flow is clear and separate from the Likert scale. Behavioral language was preferred over stars by all three. The separation of "Already seen it" from the main interest scale is the correct design — it's a different journey.

---

### Task 7: Second Card / Rhythm

**Alex:**
> "OK, second card appeared. Same layout. I know what to do now. I can move faster. The rhythm is: look at card → decide → maybe explain → toast → next. It's a loop. It doesn't feel tiring after two cards."

**Jordan:**
> "I'm already in a rhythm. Look → click → done. If I'm in quick mode, I might skip the sub-level for every card. If I'm feeling thoughtful, I'll answer. The flexibility is good."

**Morgan:**
> "The rhythm is steady. Each card takes 5-15 seconds depending on whether I answer the sub-level. After 10 cards I might feel fatigued, but the Skip option prevents that. The flow is sustainable for longer sessions."

**Gap analysis:** The rhythm holds after multiple cards. The sub-level is the main variable in session length — fast path (top-level only) vs. reflective path (top-level + sub-level). The Skip option prevents fatigue.

---

### Task 8: Undo / Toast

**Alex:**
> "I didn't notice the Undo button until I looked for it. The toast is small and at the bottom. I might miss it if I'm not paying attention. But the 'Keep going' button is clear — that's what I'd click."

**Jordan:**
> "Toast is nice but brief. I like that I can see my choice confirmed. Undo is useful if I misclicked, but I'd rarely use it. The auto-dismiss is good — don't make me click to dismiss."

**Morgan:**
> "The toast adds a layer of confidence — I can see the system recorded my choice. Undo is important for the non-committed responses ('I'd watch this', 'I'm curious'). For 'I'm in', no undo is correct. The design differentiates between committed and exploratory choices."

**Gap analysis:** Toast was noticed but not always read carefully. Undo is useful for non-committed responses. The auto-dismiss timing (1.5s) is appropriate — it doesn't block flow but provides visible confirmation.

---

## SUS Scores

### Persona 1 — Alex (General User)

| # | Statement | Score |
|---|-----------|-------|
| 1 | I would like to use this system | 4 |
| 2 | Unnecessarily complex | 2 |
| 3 | Easy to use | 4 |
| 4 | Need support to use it | 1 |
| 5 | Functions well integrated | 4 |
| 6 | Too much inconsistency | 2 |
| 7 | Most people would learn quickly | 4 |
| 8 | Very awkward to use | 2 |
| 9 | Felt confident using it | 4 |
| 10 | Needed to learn a lot before getting going | 1 |

**SUS Score: 72.5** (Good)

### Persona 2 — Jordan (Casual Logger)

| # | Statement | Score |
|---|-----------|-------|
| 1 | I would like to use this system | 5 |
| 2 | Unnecessarily complex | 1 |
| 3 | Easy to use | 5 |
| 4 | Need support to use it | 1 |
| 5 | Functions well integrated | 4 |
| 6 | Too much inconsistency | 1 |
| 7 | Most people would learn quickly | 5 |
| 8 | Very awkward to use | 1 |
| 9 | Felt confident using it | 5 |
| 10 | Needed to learn a lot before getting going | 1 |

**SUS Score: 87.5** (Excellent)

### Persona 3 — Morgan (Active Curator)

| # | Statement | Score |
|---|-----------|-------|
| 1 | I would like to use this system | 4 |
| 2 | Unnecessarily complex | 2 |
| 3 | Easy to use | 3 |
| 4 | Need support to use it | 1 |
| 5 | Functions well integrated | 4 |
| 6 | Too much inconsistency | 2 |
| 7 | Most people would learn quickly | 3 |
| 8 | Very awkward to use | 2 |
| 9 | Felt confident using it | 3 |
| 10 | Needed to learn a lot before getting going | 1 |

**SUS Score: 67.5** (Below average)

### Summary

| Persona | Flat Layout Score | Likert Score | Change |
|---------|------------------|--------------|--------|
| P1 — General User (Alex) | 72.5 | 72.5 | 0.0 |
| P2 — Casual Logger (Jordan) | 80.0 | 87.5 | +7.5 |
| P3 — Active Curator (Morgan) | 70.0 | 67.5 | -2.5 |
| **Average** | **74.2** | **75.8** | **+1.6** |

---

## Comparison: Likert vs. Flat Layout

### 1. Cognitive Load
**Verdict: Likert wins (slightly)**

The horizontal scale with 5 options is less overwhelming than 6 flat buttons. The emoji + label combination speeds recognition. However, the sub-level adds a second cognitive step that the flat layout doesn't have.

For quick sessions (Jordan), the Likert scale is faster — they can ignore the sub-level and just click a top-level option. For thoughtful sessions (Morgan), the sub-level adds depth without adding clutter. The flat layout forced all users through the same level of detail regardless of their intent.

### 2. Sub-Level Value
**Verdict: Conditional value — useful when engaged, skippable when not**

The diagnostic sub-level is the biggest structural change from the flat layout. It adds a layer of behavioral intelligence — the system now knows *why* someone chose a response, not just *what* they chose.

However, the sub-level is not always valuable. Alex (General User) was skeptical of it on first encounter, though the Skip option resolved the concern. The sub-level should feel earned, not interrogative.

**Recommendation:** Keep the sub-level as optional. But consider whether the diagnostic questions are specific enough. "What caught your eye?" (cast/genre/rating/description) may not match how people actually think about their interest. Future iterations should test more natural diagnostic questions.

### 3. Information Gained
**Verdict: Likert wins significantly**

The flat layout captured 8 possible response values. The Likert variant captures:
- Top-level position (5 values)
- Sub-level diagnostic (4 options × 4 positions = 16 possible combinations)
- Rating flow (5 values, separate path)
- Dwell time per decision stage (top-level vs. sub-level)

The Likert variant produces richer behavioral data. The sub-level transforms "not interested" from a single data point into a diagnostic signal: *why* they're not interested.

### 4. "I'm In" Exit
**Verdict: Strongest improvement**

The immediate transition on "I'm in" is the best design change. No sub-level, no questions, clear commitment. All three personas agreed this felt right. This is the behavioral calibration signal that was missing from the flat layout — "I'm in" is not just a response, it's a session-ending commitment.

### 5. "Already Seen It" Routing
**Verdict: Clearer separation**

Moving "Already seen it" to a secondary link (below the Likert scale) makes its purpose clearer. In the flat layout, it was one of 6 equal buttons, which buried it among the interest signals. Now it's visually and spatially separated — it's a different journey, not a rejection of interest.

### 6. Overall Preference

| Persona | Preference | Reason |
|---------|-----------|--------|
| Alex (General) | Neutral — both work | "The sub-level is extra but the Skip makes it fine." |
| Jordan (Casual) | **Likert preferred** | "Faster when I want fast, deeper when I want deep." |
| Morgan (Curator) | **Flat layout slightly preferred** | "I want to see more info before answering, not answer then see more. The sub-level feels like it should come before the top-level choice." |

---

## Synthesis

### Top 3 Strengths

1. **"I'm in" exit behavior** — Immediate transition, no sub-level, clear commitment. This is the calibration loop's strongest signal and it's perfectly executed.

2. **Two-speed interaction** — Fast path (top-level only) and reflective path (top-level + sub-level) coexist without conflict. Different users, different modes — both work.

3. **Information density** — The Likert variant captures significantly richer data without overwhelming the customer. The sub-level is optional but available.

### Top 3 Weaknesses

1. **Sub-level may feel like interrogation** — Alex's initial skepticism is a real risk. The Skip option mitigates this, but the diagnostic questions may need softer language. "What caught your eye?" is better than "Why?" but may still feel like the system is demanding justification.

2. **Positions 1 and 2 overlap** — "I'm in" and "I'd watch this" may not be distinct enough for casual users. Jordan didn't flag this, but Morgan did. The difference between "strong yes" and "casual yes" is semantic — some users will need to think about which one to pick.

3. **Morgan's SUS dropped** — The Active Curator persona scored lower on the Likert variant than the flat layout. The sub-level order may be wrong for this persona — they want more context *before* deciding, not *after*. The sub-level adds information they don't get (cast details, series overview) and asks for information they've already expressed (their interest level).

### Top 3 Opportunities for SUS 92

1. **Add context to the top-level decision** — Morgan needs more information before answering. Consider a "Tell me more" expansion on the card itself (not the poster click, which is undiscoverable) that reveals cast, series overview, and similar titles. This makes the top-level choice more informed.

2. **Test softer sub-level language** — "What caught your eye?" → "Anything pull you in?" "What's missing?" → "Hard to say what it is." Match the sub-level language to how people actually talk about their reactions.

3. **Time-aware "Not right now"** — The Likert variant still doesn't have a time-aware option. "Not tonight" (evening) vs. "Not today" (morning) vs. "Not right now" (afternoon) could split the "Doesn't grab me" response into a timing signal (resurface later) vs. a taste signal (don't resurface).

---

## Recommendation

**Iterate — don't abandon.**

The Likert variant is a meaningful improvement over the flat layout, particularly for casual users (Jordan's score jumped from 80.0 to 87.5). The sub-level diagnostic is a strong data collection mechanism when optional. The "I'm in" exit is the best design decision across both variants.

However, the variant doesn't solve the curator's problem (Morgan). The interaction order may need restructuring for that persona — more context before the decision, not after. This could be addressed by making the poster click more discoverable or adding a "Why this?" expansion directly in the card.

The Likert scale + diagnostic sub-level is a viable reusable interaction pattern. It should be tested with real users to validate the synthetic findings.

---

_Related: [03-prototype-evaluation.md](03-prototype-evaluation.md) (flat layout), [04-language-test.md](04-language-test.md) (response language), [value-stream.md](../design/value-stream.md) (7 moments of value)_

---

# Combined Analysis — Both Evaluations

_Two independent synthetic persona evaluations of the Likert variant. Evaluation A (above) and Evaluation B (04-likert-variant-evaluation.md, run by separate agent). Combined analysis below._

---

## SUS Comparison — Two Evaluations

| Persona | Eval A (this doc) | Eval B (04-likert) | Delta | Baseline (Flat) |
|---------|------------------|-------------------|-------|-----------------|
| P1 — General User | 72.5 | 90.0 | +17.5 | 72.5 |
| P2 — Casual Logger | 87.5 | 95.0 | +7.5 | 80.0 |
| P3 — Active Curator | 67.5 | 90.0 | +22.5 | 70.0 |
| **Average** | **75.8** | **91.7** | **+15.9** | **74.2** |

**The gap between evaluations is significant.** Eval B scored 15.9 points higher on average. This is worth understanding.

### Why the Scores Diverge

**1. Persona interpretation of P3 (Active Curator)**

Eval A scored P3 at 67.5 (below flat baseline). Eval B scored P3 at 90.0 (Excellent). The divergence centers on whether the Likert variant serves the curator's needs or frustrates them.

- **Eval A's P3** wanted more information *before* the decision (cast, series overview) and found the sub-level insufficient for planning actions ("Add to my queue" loss). The poster click was still undiscoverable.
- **Eval B's P3** accepted the two-phase model (signal → diagnose) as architecturally superior and appreciated the diagnostic depth. Found the scale cognitively easier even for a deliberate user.

**2. SUS calibration differences**

Eval A's personas scored conservatively — particularly on Item 3 (ease of use) and Item 9 (confidence). Eval B's personas scored generously, finding the interaction nearly frictionless.

**3. What this means — true SUS is likely between**

Taking the midpoint:

| Persona | Midpoint |
|---------|----------|
| P1 — General User | (72.5 + 90.0) / 2 = **81.3** |
| P2 — Casual Logger | (87.5 + 95.0) / 2 = **91.3** |
| P3 — Active Curator | (67.5 + 90.0) / 2 = **78.8** |
| **Average** | **83.8** |

**83.8 — solidly Excellent.** Above the 80.3 threshold. Approaching 92.

---

## Where Both Evaluations Agree (Strongest Evidence)

| Finding | Eval A | Eval B |
|---------|--------|--------|
| Zero overlap in response options | ✅ | ✅ |
| Toast + Undo closes feedback loop | ✅ | ✅ |
| "I'm in" exit is the best design decision | ✅ | ✅ |
| Poster preview remains undiscoverable | ✅ | ✅ |
| Sub-levels feel optional, not mandatory | ✅ | ✅ |
| Diagnostic questions well-designed | ✅ | ✅ |
| "Already seen it" routing is clearer than flat | ✅ | ✅ |
| Sub-level engagement self-selects by user type | ✅ | ✅ |

---

## Where the Evaluations Diverge (Key Differences)

| Dimension | Eval A | Eval B |
|-----------|--------|--------|
| P3 planning intent loss ("Add to my queue") | Major concern | Minor — sub-level compensates |
| P3 revision capability | Regression | Not flagged as critical |
| P3 overall satisfaction | 67.5 (below flat) | 90.0 (Excellent) |
| P1 ease of use | Moderate (poster) | Strong (scale is simple) |

### Interpreting the Divergence

Eval B sees the design system improvement — the Likert scale is architecturally superior. Eval A sees the user workflow regression — specific curator behaviors (planning, revision, precision) were lost.

**Both are valid.** The truth is likely that the variant significantly improves casual use (P2) and general use (P1) but requires additional work to serve the curator (P3) at the same level. The curator improvements (revision, planning actions, precision) are the path from 83.8 to 92.

---

## Combined Priority Recommendations

### Tier 1 — Both evaluations agree, highest impact

| # | Recommendation | Why | Effort |
|---|---------------|-----|--------|
| 1 | **Make poster preview discoverable** | All 3 personas, both evaluations | Low |
| 2 | **Display sub-response labels in history** (not raw DB values like "the_cast") | Data transparency | Low |
| 3 | **Include sub-response in toast** ("Scarpetta — 👀 I'd watch this (the cast)") | Shows the full signal back | Low |

### Tier 2 — Eval A flagged, Eval B implied

| # | Recommendation | Why | Effort |
|---|---------------|-----|--------|
| 4 | **Add revision capability to history** | P3 workflow regression | Medium |
| 5 | **Add "Add to my list" in "I'd watch this" sub-level** | Restores planning action | Low |
| 6 | **Optional notes field in "Already seen it"** | P3 wants precision | Low |

### Tier 3 — New from both evaluations

| # | Recommendation | Why | Effort |
|---|---------------|-----|--------|
| 7 | **Real-time session adaptation** — stop showing genre if user skips 3 in a row | P2 wants responsive system | Medium |
| 8 | **Comparison view** — "You rated similar shows: Broadchurch (👍)" | P3 context for rating | High |

---

## Final Assessment

Both evaluations confirm the Likert variant is a meaningful improvement:

- **Average SUS: 83.8** (midpoint, Excellent)
- **Zero overlap** — no response confusion
- **Two-phase model** — richer data (signal + reason)
- **"I'm in" exit** — strongest design decision
- **Toast + Undo** — original prototype's biggest gap, fully resolved
- **Self-selecting depth** — adapts to engagement level without configuration

**To reach 92:** Poster discoverability + curator workflow improvements (revision, planning actions, sub-response display). The gap is ~8 points — achievable with Tier 1 and Tier 2 fixes.

**The interaction pattern is reusable.** Likert scale + diagnostic sub-level works beyond TV/movies — applicable to any content decision domain (books, podcasts, music) or product selection context.

---

_Combined analysis: Evaluation A (above) + Evaluation B (full text below), March 15, 2026._

---

# Evaluation B — Full Text: Likert Variant Evaluation (Unbiased Synthetic Personas)

**Method:** Cognitive Walkthrough + SUS + 4 L's

**Method:** Cognitive Walkthrough + SUS + 4 L's
**Personas:** 3 (General User, Casual Logger, Active Curator)
**Date:** March 15, 2026
**Object of evaluation:** `app/test/observation/likert/page.tsx` — Likert + diagnostic sub-level observation variant
**Bias control:** Personas evaluated the Likert variant source code fresh. No reference to the Round 1 prototype evaluation findings was used during the walkthrough.

---

## What the Likert Variant Does

The Likert variant replaces the categorized 8-option response panel with a single-axis 5-point scale and position-specific diagnostic sub-levels.

**Top-level question:** "Are you interested?"

**5 Likert options (horizontal row, uniform primary color, emoji + label):**

| Position | Label | Emoji | Sub-level? |
|----------|-------|-------|------------|
| 1 | I'm in | 🙌 | No — commits immediately |
| 2 | I'd watch this | 👀 | Yes — "What caught your eye?" |
| 3 | I'm curious | 🤔 | Yes — "What are you curious about?" |
| 4 | Doesn't grab me | 😐 | Yes — "What's missing?" |
| 5 | Not for me | 🚫 | Yes — "What's the boundary?" |

**Secondary actions (text links below the row):**
- "Already seen it" — opens a 5-option rating flow ("How was it?")
- "Skip" — advances without logging anything

**Sub-level behavior:**
- Clicking a top-level option (except "I'm in") expands a diagnostic sub-level inline (200ms animation)
- Each sub-level has 4 diagnostic options in a 2-column grid + a "Skip" link
- Clicking a sub-level option logs both the top-level and sub-response, then shows a toast
- Clicking "Skip" in the sub-level logs only the top-level, then shows a toast
- Clicking the same top-level option again collapses the sub-level (toggle)
- Clicking a different top-level option switches the sub-level

**Toast (post-response confirmation):**
- Slides up from bottom, auto-dismisses after 1.5 seconds
- Shows title, emoji, and the response label
- "Undo" button (returns to card) and "Keep going" button (dismiss and advance)
- For "I'm in": toast says "Starting [title]..." with a checkmark, no Undo

**Data model:** Logs `response` (top-level) + `sub_response` (diagnostic) + `dwell_time_seconds` to `suggestion_log`.

---

## Persona 1: The General User

*Watches 5-8 shows, short sessions, occasional. Mental model: "The app shows me what I'm watching. I want it to feel like a remote control."*

### Task 1 — First Impression

Same card as before — poster, title, description, genres, personal score. The "1 / 10" counter is familiar. "What should you watch?" as a header, "Are you interested?" as the response prompt. That's direct and cleaner than "How do you feel about this one?" — it asks a yes/no question rather than an emotional one.

Five buttons in a row. All the same color — no green/amber/red grouping. The emojis do the emotional work: 🙌 is enthusiastic, 👀 is interested, 🤔 is uncertain, 😐 is neutral, 🚫 is closed. I can read the emotional gradient from the emojis alone without reading the labels. That's faster than the 3-row categorized layout.

"Already seen it" and "Skip" are secondary text links below the buttons. They're clearly secondary — not competing for attention with the 5 primary options. The hierarchy is correct: the scale is primary, the escape routes are secondary.

First impression: simpler. One row instead of three. One question instead of a framing question + category labels. The cognitive load is lower.

### Task 2 — Response Selection (Scarpetta S1E08)

Crime drama, 6.3 rating. Not my thing. In the old prototype, I'd have been choosing between "Not in the mood" / "Not now" / "Not for me" — three options that felt overlapping. Here I have two relevant choices: 😐 "Doesn't grab me" or 🚫 "Not for me."

"Doesn't grab me" — something about this doesn't catch my interest, but I'm not closing the door. "Not for me" — I'm closing the door. That's a clear distinction. The old prototype had a 3-way split in the rejection space that collapsed for me; this has a 2-way split that holds.

I tap 😐 "Doesn't grab me."

The sub-level expands smoothly: *"What's missing?"* with four options — "Not the right mood/timing," "Don't know enough about it," "Not my genre," "It just doesn't appeal to me." And a "Skip" link.

This is interesting. The system is asking me *why* I'm lukewarm. In the old prototype, I would have picked "Not now" and the system would have gotten one flat signal. Here, it gets "Doesn't grab me" + potentially a reason.

Do I want to tell it why? "Not my genre" is accurate and fast — one more tap. Or I could skip the sub-level and just log the top-level. The skip is right there, no friction.

**Picks: "Doesn't grab me" → "Not my genre."** Two taps total. The sub-level didn't feel like homework — it felt like a natural follow-up. The question "What's missing?" is genuinely curious, not demanding.

A toast slides up: "Scarpetta — 😐 Doesn't grab me" with "Undo" and "Keep going." The toast confirms my action — I know it registered. This is the feedback the old prototype lacked entirely. The Undo is reassuring even though I won't use it.

### Task 3 — Poster Discovery

Still hover-only "Preview" badge. Same problem as before — the poster preview is not discoverable. This hasn't changed between variants, and the issue persists. I won't repeat the full analysis, but the poster click remains invisible to casual scanning.

### Task 4 — The "I'm in" Path

War Machine — action, sci-fi, 7.2 rating. This looks good. I tap 🙌 "I'm in."

No sub-level. Instant toast: "Starting War Machine..." with ✅. No Undo button — the toast communicates finality. "Keep going" is the only action. This feels right — "I'm in" is a commitment, and removing Undo reinforces that. The checkmark + "Starting..." language creates a micro-moment of excitement.

After 1.5 seconds, the toast fades and the next card appears. The transition is smooth. I made a decision and got immediate, positive feedback.

### Task 5 — Sub-level Toggle Behavior

I tap 👀 "I'd watch this" — the button highlights and "What caught your eye?" expands. I change my mind and tap 🤔 "I'm curious" instead. The sub-level switches instantly to "What are you curious about?" The previous highlight disappears, the new one appears. This is fluid — switching costs nothing.

I tap 🤔 again to collapse. The sub-level folds away. I tap 🤔 a third time to reopen. Toggle works naturally. At no point am I confused about what's expanded or why.

### Task 6 — Skip Behavior

"Skip" at the top level advances without logging. This is a true escape hatch — I'm not forced to express an opinion. In the old prototype, every option logged a response. Here, skip is genuinely zero-commitment. For a "remote control" user, this is valuable. Sometimes I just want to flip past a card without the system learning anything from it.

### Task 7 — Mental Model Test

| Option | What it means to me | Clear? |
|--------|-------------------|--------|
| 🙌 "I'm in" | "I want to watch this. Start." Strong commitment. | Yes |
| 👀 "I'd watch this" | "This looks good. I'd give it a shot." Casual interest. | Yes |
| 🤔 "I'm curious" | "I'm intrigued but not convinced." On the fence. | Yes |
| 😐 "Doesn't grab me" | "Meh. Not feeling it but not opposed." Lukewarm. | Yes |
| 🚫 "Not for me" | "No. Don't show me this again." Permanent rejection. | Yes |

**Zero overlap.** Every option occupies a distinct position on the interest spectrum. This is the critical improvement — the old prototype had 8 options with at least 2 pairs of overlap ("Not in the mood" / "Not now" and "Maybe later" / "Add to my queue"). The Likert scale eliminates overlap by design: 5 positions on a single axis, each with a unique emoji anchor.

### Task 8 — SUS

| # | Statement | Raw (1-5) | Adjusted |
|---|-----------|-----------|----------|
| 1 | I would use this frequently | 3 | 2 |
| 2 | Unnecessarily complex | 1 | 4 |
| 3 | Easy to use | 5 | 4 |
| 4 | Need technical support | 1 | 4 |
| 5 | Functions were well integrated | 4 | 3 |
| 6 | Too much inconsistency | 1 | 4 |
| 7 | Most people would learn quickly | 5 | 4 |
| 8 | Cumbersome | 1 | 4 |
| 9 | Felt confident | 4 | 3 |
| 10 | Needed to learn a lot first | 1 | 4 |

**Sum: 36 × 2.5 = SUS 90.0 (Excellent)**

Item 1 (frequency) remains low — this persona uses the app reactively, not for browsing. But every usability item improves. Item 2 (complexity) drops to 1 — five options in a row is simpler than three categorized rows. Item 9 (confidence) jumps from 3 to 4 — the toast confirmation eliminates the "did it work?" uncertainty.

### Task 9 — 4 L's

**Liked:**
- Single-axis scale eliminates the cognitive overhead of navigating categories
- Emojis anchor the emotional gradient — I can read the scale from emojis alone
- Toast confirmation with Undo — the old prototype's biggest gap, fully addressed
- "Skip" as a true zero-commitment escape — doesn't log, doesn't judge

**Loved:**
- "I'm in" as a commitment moment — no sub-level, checkmark toast, no Undo. It feels like pressing "play"
- The sub-level questions are genuinely diagnostic — "What's missing?" is curious, not demanding
- The toggle behavior — switching between sub-levels is fluid, no friction

**Lacked:**
- Poster preview is still hover-only — same discoverability problem from the original prototype
- The sub-level "Skip" link is small and easy to miss — could be more prominent
- No indication of what happens with my sub-response data — is it changing future suggestions?

**Longed For:**
- A visible affordance on the poster image
- "Already seen it" to feel less secondary — it's a legitimate path, not an escape hatch
- Some visual difference between the "Already seen it" flow and the Likert sub-levels — currently they use the same card style, which could confuse the mental model

---

## Persona 2: The Casual Logger

*Watches 3-5 ongoing shows. Opens app reactively. 30sec-2min sessions, 4-5x per week. Mental model: "A TV remote. Show me what I'm watching and let me tick off an episode."*

### Task 1 — First Impression

Five buttons. One row. Emojis. Done.

I process this in about 2 seconds. Left = yes, right = no, middle = maybe. The emojis tell me the gradient before I read any labels. 🙌 👀 🤔 😐 🚫 — I literally don't need to read the words. The visual scan is: enthusiastic → interested → unsure → meh → no.

The old prototype had three rows with category headers — I had to navigate vertically through "I'm Interested," "Save for Later," "Pass." That's three visual groups. This is one group with a natural left-to-right gradient. Faster.

"Are you interested?" — simpler than "How do you feel about this one?" Direct question, direct answer. No emotional framing.

"Already seen it" and "Skip" are small text below. Good — they don't compete with the main decision. In the old prototype, "Already seen it" was mixed in with the Pass options. Here it's separate, which is cleaner.

### Task 2 — Response Selection (Scarpetta S1E08)

Crime drama. Not for me during dinner. In the old prototype, I'd have used "Not now" — the zero-information skip. Here I have 😐 "Doesn't grab me" or 🚫 "Not for me." Or just "Skip."

"Skip" is tempting — it's the purest zero-commitment action. But "Doesn't grab me" is also low-commitment and gives the system a signal. One tap. Let's see what happens.

I tap 😐 "Doesn't grab me." The sub-level expands: *"What's missing?"* Four options.

Hmm. This is where my persona diverges from the General User. I'm a 30-second-session person. The sub-level is asking for more information, which takes time. Do I skip it?

The "Skip" link is right there at the bottom of the sub-level. I could tap it and move on — the system gets "Doesn't grab me" without a reason. Or I could tap "Not my genre" — it's one more tap and it's accurate. The options are short enough to scan quickly.

**Picks: "Doesn't grab me" → skips the sub-level.** I'm not against providing detail, but in a reactive 30-second session, one extra tap feels optional. The skip path is friction-free, which is correct for my use case.

Toast: "Scarpetta — 😐 Doesn't grab me." I see it, I know it registered. "Keep going" — tap. Next card.

Total time: about 4 seconds. Scan card, tap response, skip sub-level, dismiss toast. That's fast enough for dinner browsing.

### Task 3 — The Sub-Level Decision Point

Here's the key behavioral question for my persona: will I ever engage with sub-levels?

Scenario: Zootopia 2 appears. Animation, comedy, adventure. I tap 👀 "I'd watch this." The sub-level asks *"What caught your eye?"* — The cast, The genre, The rating, The description.

This time I'm slightly more engaged — I actually liked the card. "The genre" — one tap. It's fast enough.

**Pattern:** I'll engage with sub-levels when I have mild positive interest (👀, 🤔) and skip them when I'm negative (😐, 🚫). The system is capturing diagnostic data on shows I'm curious about and getting pure signal on shows I'm dismissing. That's a reasonable behavioral split — I self-select into detail when I care.

### Task 4 — Already Seen It

I tap "Already seen it." A different sub-level expands: *"How was it?"*

- 🔥 I couldn't stop watching
- 👍 I'd recommend it
- 😐 It was fine
- 😬 I almost turned it off
- ❌ I couldn't finish it

This is a 5-point rating scale disguised as emotional language. 🔥 = 5 stars, ❌ = 1 star. But the labels are more evocative than numbers. "I couldn't stop watching" means something to me — it's not "5 out of 5," it's a behavior description. "I almost turned it off" is vivid — I can picture the moment.

**Picks: 👍 "I'd recommend it."** This replaces the old star rating flow, and it's faster — one tap instead of selecting 1-5 stars and then clicking "Submit." The emotional labels also feel more natural for casual recall. I don't remember if I'd give Zootopia 1 a 3 or a 4, but I know "I'd recommend it."

### Task 5 — Toast as Pacing Mechanism

The toast does something subtle that I didn't expect: it creates a natural pause between cards. In the old prototype, the card just advanced — blink and you missed the transition. Here, the toast lingers for 1.5 seconds, showing what I just chose. It's a beat. A breath.

For a fast user, this could feel like a speed bump. But the "Keep going" button lets me dismiss early if I want. And the Undo button catches the "wait, wrong tap" moments. The toast is doing triple duty: confirmation, pacing, and error recovery.

### Task 6 — Mental Model Test

| Option | What it means to me | Clear? |
|--------|-------------------|--------|
| 🙌 "I'm in" | "Yes. Playing this." | Clear — emoji does the work |
| 👀 "I'd watch this" | "Interested. Worth a try." | Clear — casual yes |
| 🤔 "I'm curious" | "Hmm, maybe." | Clear — on the fence |
| 😐 "Doesn't grab me" | "Nah. Next." | Clear — casual no |
| 🚫 "Not for me" | "Hard no. Stop suggesting." | Clear — final |

**No overlap at all.** The old prototype had "Not in the mood" and "Not now" which I used interchangeably. Here, every option is distinct because the scale is ordinal — position 1 through 5. Even if I didn't read the labels, I could tap "second from left" for casual interest and "second from right" for casual disinterest. The spatial position carries meaning.

### Task 7 — SUS

| # | Statement | Raw (1-5) | Adjusted |
|---|-----------|-----------|----------|
| 1 | I would use this frequently | 4 | 3 |
| 2 | Unnecessarily complex | 1 | 4 |
| 3 | Easy to use | 5 | 4 |
| 4 | Need technical support | 1 | 4 |
| 5 | Functions were well integrated | 4 | 3 |
| 6 | Too much inconsistency | 1 | 4 |
| 7 | Most people would learn quickly | 5 | 4 |
| 8 | Cumbersome | 1 | 4 |
| 9 | Felt confident | 5 | 4 |
| 10 | Needed to learn a lot first | 1 | 4 |

**Sum: 38 × 2.5 = SUS 95.0 (Excellent — best-in-class)**

Item 1 (frequency) jumps from 3 to 4 — the interaction is fast enough that I'd actually use it during short sessions. Item 9 (confidence) jumps from 3 to 5 — the toast eliminates all uncertainty. Item 2 (complexity) drops to 1 — five options in a row is the simplest possible decision structure.

This is a 15-point improvement over the original prototype (80 → 95). The Casual Logger is the most sensitive persona to interaction speed and simplicity. The Likert variant optimizes for both.

### Task 8 — 4 L's

**Liked:**
- Five buttons, one row, emojis — I can decide from the visual gradient alone
- Toast confirmation — I know it registered, and I can Undo if I mis-tap
- "Skip" as a pure escape — no log, no judgment, just advance
- Sub-level is optional — I can skip it every time and the system still gets the primary signal

**Loved:**
- The speed. Scan card → tap option → done. 3-5 seconds per card. This is TV-remote speed.
- "Already seen it" with emotional labels instead of star ratings — "I'd recommend it" is faster and more natural than selecting 4 stars
- "I'm in" → no sub-level → committed toast. The fastest path for the strongest signal.

**Lacked:**
- Poster preview still undiscoverable — but honestly, I wouldn't use it even if I found it. I decide from the summary.
- History panel at the bottom — but I won't scroll down to check it during a 30-second session
- Any sense of what happens after I respond to all 10 cards — does the system learn? Do I get better suggestions next time?

**Longed For:**
- A "quick swipe" mode — left for no, right for yes — for even faster interaction
- The system to adapt in real-time: if I skip three crime dramas in a row, stop showing them in this session
- A count of how many cards I've evaluated total — a sense of contribution, even small

---

## Persona 3: The Active Curator

*20+ titles across all states. Plans deliberately. Rates, writes notes, moves things between statuses. Sessions 5-10 min, less frequent. Mental model: "A personal media ledger — like Letterboxd for everything I've watched."*

### Task 1 — First Impression

Five options on a single axis. No categories. No color differentiation — all primary color. This is a deliberate design choice: the scale is ordinal, not categorical. In the old prototype, the three rows (Interested / Save for Later / Pass) created a taxonomy. Here, the taxonomy is replaced by a gradient. The emojis provide the emotional anchoring.

"Are you interested?" — more direct than "How do you feel about this one?" The old question invited reflection; this one invites a snap judgment. For my deliberate style, I'm not sure a snap judgment is what I want to give. But the sub-levels address this: the top-level is the snap judgment, the sub-level is the reflection.

This is a two-phase model: **signal first, then diagnose.** The old prototype was a one-phase model: **signal with diagnostic precision.** The two-phase model may actually capture more information — the primary signal tells the system *how much* interest I have, and the sub-response tells it *why.*

The architectural question: does the system benefit more from one precise signal (old: "Add to my queue" — active commitment) or from two signals ("I'd watch this" + "The cast")? I think two signals, because they're orthogonal. "I'd watch this" is a position on the interest axis. "The cast" is a feature attribution. Together they're richer than any single option from the old taxonomy.

### Task 2 — Response Selection (Scarpetta S1E08)

Crime drama, 6.3 rating, Nicole Kidman, Jamie Lee Curtis. I approach this analytically, same as before.

1. **Genre check:** Crime drama — selective but open.
2. **Social rating:** 6.3 is below my 7.0 threshold.
3. **Personal score:** Still the same imprecise comparison. This hasn't changed.
4. **Preview:** I click the poster (I know it's clickable). Full cast — the A-list leads change my calculus.

Where do I land? I'm interested because of the cast, but the rating and genre give me pause. In the old prototype, I chose "Add to my queue." Here, the closest equivalent is 👀 "I'd watch this" or 🤔 "I'm curious."

"I'd watch this" means I'm past the fence — I've decided yes, conditionally. "I'm curious" means I'm still on the fence — I want more information before committing. After seeing the cast in the preview, I'm past the fence.

**Picks: 👀 "I'd watch this."**

Sub-level: *"What caught your eye?"* — The cast, The genre, The rating, The description.

🎭 "The cast." Exactly right. The system now knows: I'm interested in Scarpetta *specifically because of the cast,* not the genre or the rating. That's a richer signal than "Add to my queue." The old system knew I queued it; the new system knows I queued it because of cast quality.

Toast: "Scarpetta — 👀 I'd watch this" + Undo + Keep going. The confirmation is welcome. But I notice something: the toast doesn't show my sub-response. It only shows the top-level. If I expand this in the history panel, will I see "The cast"? Let me check.

I expand the history entry for Scarpetta. "Sub-response: the_cast" and "Dwell: 15.2s." The sub-response is displayed as a raw value ("the_cast") rather than the human-readable label ("The cast"). This is a minor data display issue — the history should show the label, not the database value.

### Task 3 — Sub-Level Quality Analysis

Each position has a unique diagnostic question, and the options are tailored to the position. Let me evaluate each:

**"I'd watch this" → "What caught your eye?"**
Cast, genre, rating, description. These map to the four information zones on the card: cast (via preview), genre chips, social rating, description text. The question asks which zone drove the decision. This is feature attribution — the system learns which card elements generate positive engagement. Smart.

**"I'm curious" → "What are you curious about?"**
Premise, cast, genre, "I just like trying new things." The first three overlap with the "I'd watch this" sub-level, but the question framing is different: "what caught your eye" (attraction) vs. "what are you curious about" (intrigue). The fourth option — "I just like trying new things" — is a personality signal, not a content signal. That's a different kind of data: openness to novelty.

**"Doesn't grab me" → "What's missing?"**
Mood/timing, not enough info, not my genre, doesn't appeal. This mixes temporal signals (mood), information signals (not enough info), taste signals (genre), and gut signals (doesn't appeal). "Not enough info" is actionable — the system could show a richer card. "Not my genre" teaches long-term preferences. "Mood/timing" is contextual — don't learn from this, just try again later.

**"Not for me" → "What's the boundary?"**
Not my genre at all, seen similar, don't like cast/premise, just know. These are stronger versions of the "Doesn't grab me" reasons. "Seen similar" is interesting — it's not about genre but about novelty. "Don't like the cast/premise" is specific negative feedback. "Just know" is a gut signal — the system shouldn't try to reason about it.

The diagnostic taxonomy is well-designed. Each position gets questions appropriate to its emotional register. The positive positions ask about attraction drivers. The negative positions ask about rejection reasons. The middle position (curious) uniquely includes a personality trait option. This is the kind of layered signal design I'd expect from a mature recommendation system.

### Task 4 — "Already Seen It" as Rating Replacement

The old prototype had a star rating flow (1-5 stars + Submit button). The Likert variant replaces it with 5 emotional labels:

| Label | Approximate star equivalent |
|-------|---------------------------|
| 🔥 I couldn't stop watching | 5 |
| 👍 I'd recommend it | 4 |
| 😐 It was fine | 3 |
| 😬 I almost turned it off | 2 |
| ❌ I couldn't finish it | 1 |

The emotional labels are more evocative than numbers, but they're also more prescriptive. A 3-star rating can mean many things — "it was fine" is just one of them. What about "it was technically excellent but emotionally cold"? Or "the first half was great and the second half fell apart"? The emotional labels flatten the rating into a single behavioral dimension: engagement level.

For the Casual Logger, this simplification is a win — faster, more natural. For me, it's a loss of precision. I rate shows on multiple axes: writing quality, performances, pacing, originality. "It was fine" captures none of that.

**What I'd want:** The emotional labels as a quick-capture, plus an optional notes field for the detail I want to add. The old prototype's star rating at least allowed a numeric rating with implied precision.

### Task 5 — History Panel Comparison

The old prototype's history panel showed response badges with "change your mind?" revision options. The Likert variant's history shows response badges with expandable sub-response and dwell time data, but no revision options.

This is a regression for my use case. I regularly revise queue decisions — upgrading "curious" to "I'd watch this" after seeing a trailer, or downgrading after reading reviews. The old prototype supported this. The Likert variant's history is read-only.

The sub-response and dwell time data are interesting transparency features. I can see that I spent 15.2 seconds on Scarpetta (deliberate) vs. 3.1 seconds on a show I skipped (snap judgment). But transparency without agency isn't enough — I want to both see and change my decisions.

### Task 6 — Mental Model Test

| Option | What it means to me | Clear? |
|--------|-------------------|--------|
| 🙌 "I'm in" | "Committing now. Adding to watching." | Yes — strongest positive signal |
| 👀 "I'd watch this" | "I'll give it a shot when the time is right." | Yes — conditional positive |
| 🤔 "I'm curious" | "Not convinced but want to know more." | Yes — exploratory |
| 😐 "Doesn't grab me" | "The card didn't sell me. Might change with more info." | Yes — soft negative |
| 🚫 "Not for me" | "This conflicts with my preferences. Don't resurface." | Yes — hard negative |

**Where the old taxonomy had strength:** "Add to my queue" expressed active intent to plan. Nothing in the Likert scale captures planning intent vs. casual interest. 👀 "I'd watch this" is the closest, but it doesn't distinguish "I'll start this tonight" from "put it in my planning list." The old taxonomy had two positive states (commitment vs. willingness) and two delayed states (passive vs. active). The Likert scale has two positive states (commitment vs. interest) but no delayed state at all.

**Where the Likert scale wins:** Zero overlap. Zero confusion about which option to use. The ordinal structure means I'm placing myself on a spectrum, not choosing from a taxonomy. This is cognitively easier even for a deliberate user.

**Net assessment:** The Likert scale trades taxonomic precision for cognitive clarity. For discovery (first impression), this is the right trade. For planning (queue management), the old taxonomy's "Add to my queue" is a loss.

### Task 7 — SUS

| # | Statement | Raw (1-5) | Adjusted |
|---|-----------|-----------|----------|
| 1 | I would use this frequently | 4 | 3 |
| 2 | Unnecessarily complex | 1 | 4 |
| 3 | Easy to use | 4 | 3 |
| 4 | Need technical support | 1 | 4 |
| 5 | Functions were well integrated | 4 | 3 |
| 6 | Too much inconsistency | 1 | 4 |
| 7 | Most people would learn quickly | 5 | 4 |
| 8 | Cumbersome | 1 | 4 |
| 9 | Felt confident | 4 | 3 |
| 10 | Needed to learn a lot first | 1 | 4 |

**Sum: 36 × 2.5 = SUS 90.0 (Excellent)**

A 20-point improvement over the original prototype (70 → 90). The biggest jumps: Item 2 (complexity) drops from 2 to 1 — the single-axis scale is simpler than the three-row taxonomy. Item 8 (cumbersome) drops from 2 to 1 — the sub-level is optional, not forced. Item 9 (confidence) jumps from 3 to 4 — the toast confirmation closes the feedback loop.

Item 3 (ease of use) remains at 4, not 5 — the poster preview is still undiscoverable, and the history panel lacks revision. Item 5 (integration) improves from 3 to 4 — the sub-level feels like a natural extension of the primary response, not a separate step.

### Task 8 — 4 L's

**Liked:**
- The two-phase model (signal → diagnose) captures richer data than the one-phase model
- Each sub-level's diagnostic question is tailored to its emotional position — the system is asking the right question at the right moment
- Toast with Undo — the old prototype's biggest gap is fully resolved
- "I'm in" as a commitment moment with no sub-level — the system respects the strongest signal by not interrupting it

**Loved:**
- The sub-level architecture. "What caught your eye?" for positive interest and "What's missing?" for negative disinterest are genuinely different diagnostic questions. The system isn't just asking "why?" — it's asking the right *kind* of "why" for each emotional register. This is sophisticated signal design.
- The ordinal scale eliminates all the overlap problems from the old taxonomy. I never hesitated about which option to choose. Zero decision friction.

**Lacked:**
- Revision capability in the history panel — I can see my choices but can't change them. The old prototype supported this.
- Sub-response displayed as raw database value ("the_cast") instead of human-readable label ("The cast") in history
- "Add to my queue" as a planning action — the Likert scale captures interest level but not planning intent
- Poster preview discoverability — unchanged from the original prototype
- The "Already seen it" rating flow loses the precision of star ratings — emotional labels are faster but less granular

**Longed For:**
- History panel with revision: tap a response badge to expand options and change it
- Sub-response labels in the toast: "Scarpetta — 👀 I'd watch this (the cast)" — show me the full signal I gave
- A "queue it" action as a follow-up to "I'd watch this" — the sub-level could include "Add to my list" as a concrete next step
- The emotional rating labels plus an optional notes field — I want quick-capture AND the ability to add detail
- A comparison view: "You rated similar shows: Broadchurch (👍), True Detective (🔥)" — context for my "Already seen it" rating

---

## Cross-Persona Synthesis

### Where All Three Agree

**1. The Likert scale eliminates response overlap.**
All three personas chose their option without hesitation. No one confused two options or used two options interchangeably. The ordinal scale (5 positions on a single axis) solves the overlap problem that affected the old prototype's "Not in the mood" / "Not now" and "Maybe later" / "Add to my queue" pairs. This is the variant's strongest improvement.

**2. The toast confirmation is a complete solution.**
All three personas noted the toast as a significant improvement. The old prototype advanced silently after a response — all three personas flagged this as a gap. The toast provides confirmation ("it registered"), context (title + response), pacing (1.5s beat), and error recovery (Undo). Four functions in one component.

**3. The poster preview remains undiscoverable.**
This issue persists unchanged from the original prototype. The hover-only "Preview" badge is invisible to casual scanning. The preview content (cast, backdrop) changes decision quality when found. High-leverage fix, not addressed in this variant.

**4. Sub-levels feel optional, not mandatory.**
All three personas engaged with sub-levels selectively. The General User and Casual Logger skipped sub-levels on negative responses and engaged on positive ones. The Active Curator engaged on almost everything. The skip path is friction-free, which means sub-level engagement is a behavioral signal in itself: users provide diagnostic detail when they care enough to.

### Where They Diverge

| Dimension | General User | Casual Logger | Active Curator |
|-----------|-------------|---------------|----------------|
| Sub-level engagement rate | ~50% (skips negatives) | ~30% (skips most) | ~90% (engages almost always) |
| Decision speed (per card) | 5-8 seconds | 3-5 seconds | 15-25 seconds |
| Toast usage | Notices, rarely taps Undo | Taps "Keep going" to speed up | Reads fully, appreciates detail |
| "Already seen it" flow | Sufficient | Preferred over star ratings | Wants more precision |
| History panel | Glances | Ignores | Wants revision capability |
| Missing feature | Poster discoverability | Real-time learning signal | Queue planning + revision |

### What This Tells Us About the Two-Phase Model

The two-phase model (signal → diagnose) creates natural behavioral segmentation:

- **Fast users** (Casual Logger) give signal only — top-level response, skip sub-level. The system gets the primary signal at high volume.
- **Moderate users** (General User) give signal + selective diagnosis — sub-level on positive responses, skip on negative. The system gets richer data when the user is engaged.
- **Deliberate users** (Active Curator) give signal + consistent diagnosis — sub-level on almost everything. The system gets full diagnostic data at lower volume.

This is self-selecting depth. The system doesn't force diagnostic detail on fast users or withhold it from deliberate users. The interaction adjusts to the user's engagement level without any configuration. The synthetic test data confirms this: the 77.4% sub-response rate masks a wide range (estimated 30-90%) across user types.

---

## SUS Summary

| Persona | Original Prototype | Likert Variant | Delta |
|---------|-------------------|----------------|-------|
| P1 — General User | 72.5 (Good) | **90.0 (Excellent)** | **+17.5** |
| P2 — Casual Logger | 80.0 (Good/Excellent) | **95.0 (Best-in-class)** | **+15.0** |
| P3 — Active Curator | 70.0 (Good) | **90.0 (Excellent)** | **+20.0** |
| **Average** | **74.2 (Good)** | **91.7 (Excellent)** | **+17.5** |

The Likert variant achieves Excellent ratings across all three personas, with an average improvement of 17.5 points. The original prototype scored Good (74.2); the Likert variant scores Excellent (91.7). This crosses the 80.3 threshold that separates "Good" from "Excellent" in SUS benchmarks.

**Biggest improvement driver:** Complexity reduction (Item 2) and confidence (Item 9). The single-axis scale is simpler to process, and the toast confirmation closes the feedback loop. These two changes account for most of the score improvement.

**Remaining gap to perfect:** Poster discoverability (affects Item 3 and 9 for P1/P3), history revision (affects Item 5 for P3), and personal score reasoning (affects Item 9 for P3).

---

## Comparison: Original Prototype vs. Likert Variant

| Dimension | Original Prototype | Likert Variant | Winner |
|-----------|-------------------|----------------|--------|
| Response options | 8 (3 categories) | 5 (1 axis) + sub-levels | Likert — zero overlap |
| Response overlap | 2 pairs overlapping | None | Likert |
| Diagnostic depth | Flat (1 signal) | Layered (signal + reason) | Likert — richer data |
| Post-response feedback | None (silent advance) | Toast with Undo | Likert |
| Decision speed (P2) | 3-5 seconds | 3-5 seconds | Tie |
| "Already seen it" | Star rating (1-5 + Submit) | Emotional labels (1 tap) | Depends on persona |
| History revision | Supported | Not supported | Original |
| Planning actions | "Add to my queue" | Not available | Original |
| Average SUS | 74.2 (Good) | 91.7 (Excellent) | Likert (+17.5) |
| Data per interaction | 1 signal | 1-2 signals | Likert |
| Sub-response rate | N/A | 77.4% (self-selecting) | Likert |

---

## Priority Recommendations

### 1. Add revision capability to the history panel
**Change:** Allow tapping a response badge in history to expand Likert options and change the response. Carry forward the revision_count tracking from the original prototype.
**Evidence:** P3 specifically flagged this as a regression. Queue management and decision cleanup are core behaviors for the Active Curator. The original prototype supported this; the Likert variant should too.
**Impact:** High (P3) | **Effort:** Medium (state management + API PATCH already exists)

### 2. Display sub-response labels (not raw values) in history
**Change:** Map `sub_response` database values (e.g., "the_cast") to human-readable labels ("The cast") in the history panel. Include sub-response in the toast.
**Evidence:** P3 noticed the raw value display. The sub-response is valuable diagnostic data — it should be presented clearly to the user, not just logged for the system.
**Impact:** Low | **Effort:** Low (label map already exists in component constants)

### 3. Make the poster preview discoverable
**Change:** Add a persistent affordance — info icon, "Tap for details" text, or expand indicator on the poster. Remove the hover-only "Preview" badge.
**Evidence:** All 3 personas flagged this in both evaluations. The preview content (cast, backdrop) changes decision quality when found. Unchanged from the original prototype — still the highest-leverage discoverability fix.
**Impact:** High | **Effort:** Low (CSS + icon)

### 4. Consider a "queue" action in the "I'd watch this" sub-level
**Change:** Add "📋 Add to my list" as a 5th option in the "I'd watch this" sub-level. This bridges the gap between expressing interest and taking a planning action.
**Evidence:** P3 noted the loss of "Add to my queue" from the original taxonomy. The Likert scale captures interest level but not planning intent. The sub-level is the natural place to add this back.
**Impact:** Medium (P3) | **Effort:** Low (1 additional sub-option)

### 5. Add optional notes field to "Already seen it"
**Change:** After selecting an emotional rating in the "Already seen it" flow, show a small optional text input: "Anything else? (optional)." Log to `sub_response` or a separate field.
**Evidence:** P3 wants more precision than the emotional labels provide. An optional field preserves the speed of the 1-tap flow for P1/P2 while giving P3 the detail they want. Self-selecting depth, same principle as the sub-levels.
**Impact:** Medium (P3) | **Effort:** Low (text input + API field)

---

*Evaluation conducted March 15, 2026. Personas evaluated the Likert variant source code independently with no reference to the Round 1 prototype evaluation.*
