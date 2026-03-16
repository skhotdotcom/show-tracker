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
