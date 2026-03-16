# Evaluate: Likert + Diagnostic Sub-Level Observation Variant

_Synthetic persona evaluation of the Likert observation prototype. Tests the 5-point scale + sub-level diagnostic interaction._

---

## Shared Instructions

You are a UX researcher evaluating the Show Tracker Likert observation prototype at `app/test/observation/likert/page.tsx`. Run a cognitive walkthrough, SUS evaluation, and 4 L's debrief using three established personas.

**Important: Do not lead the personas.** Let each persona discover issues organically from the prototype itself. Each persona should evaluate the prototype fresh, based only on their own mental model.

**This variant is being compared to the flat 6-button layout.** The core question: does the 5-point Likert scale with diagnostic sub-levels feel more natural, less overwhelming, and more informative than the previous flat layout?

---

## Step 1: Read the context files

Read these files in order:
1. `app/test/observation/likert/page.tsx` — the Likert variant source (primary object)
2. `app/test/observation/page.tsx` — the original flat layout (for comparison)
3. `types/index.ts` — current response types
4. `docs/design/value-stream.md` — the 7 moments of value
5. `docs/design/taxonomy.md` — interaction pattern / component / experience distinction

---

## Step 2: Establish the personas

From `docs/ux-research.md`, extract the three established personas. For each persona:
- Name them
- Describe their mental model for choosing what to watch
- Describe their session patterns (length, frequency)
- Describe their relationship to ratings, reviews, and recommendations

---

## Step 3: Cognitive Walkthrough (per persona)

For each persona, walk through the Likert observation prototype as if you are that person encountering it for the first time.

### Tasks (8 tasks per persona):

1. **First impression:** You land on `/test/observation/likert`. What do you see? What's your first reaction? What do you think this does?

2. **Top-level decision:** You see "Are you interested?" with 5 options. How does each option land? Do any feel redundant? Do any feel missing? Which one would you click for this first card?

3. **Sub-level discovery:** You clicked [their natural choice]. A sub-level appears with a diagnostic question. What do you think? Does the question make sense? Do the sub-options match how you'd describe your feeling?

4. **Skip behavior:** Do you see the "Skip" link? Would you use it? When would you skip vs. answer the sub-level?

5. **"I'm in" flow:** You click "I'm in." What happens? Is the immediate transition correct, or do you want to confirm? Does the toast feel right?

6. **"Already seen it" flow:** You click "Already seen it." A rating flow appears. How does this feel? Do the 5 rating options match your experience?

7. **Second card:** You've completed one card and the next appears. How does the rhythm feel? Is the repetition satisfying or exhausting?

8. **Undo/toast:** Did you notice you can undo? Would you use it? Does the toast add confidence or clutter?

### For each task, note:
- What the persona **noticed** (what caught their eye)
- What they **expected** would happen
- What actually **happened**
- Any **gap** between expectation and outcome
- Whether they **understood** why the sub-level was asking that question

---

## Step 4: SUS Evaluation (per persona)

Have each persona complete the 10-item System Usability Scale for the Likert variant:

| # | Statement | Response (1-5) |
|---|-----------|----------------|
| 1 | I think that I would like to use this system | 1=Strongly Disagree → 5=Strongly Agree |
| 2 | I found the system unnecessarily complex | 1=Strongly Disagree → 5=Strongly Agree |
| 3 | I thought the system was easy to use | 1=Strongly Disagree → 5=Strongly Agree |
| 4 | I think that I would need the support of a technical person to be able to use this system | 1=Strongly Disagree → 5=Strongly Agree |
| 5 | I found the various functions in this system were well integrated | 1=Strongly Disagree → 5=Strongly Agree |
| 6 | I thought there was too much inconsistency in this system | 1=Strongly Disagree → 5=Strongly Agree |
| 7 | I would imagine that most people would learn to use this system very quickly | 1=Strongly Disagree → 5=Strongly Agree |
| 8 | I found the system very awkward to use | 1=Strongly Disagree → 5=Strongly Agree |
| 9 | I felt very confident using the system | 1=Strongly Disagree → 5=Strongly Agree |
| 10 | I needed to learn a lot of things before I could get going with this system | 1=Strongly Disagree → 5=Strongly Agree |

**Scoring:** For even-numbered items (2, 4, 6, 8, 10), subtract the response from 5. For odd-numbered items (1, 3, 5, 7, 9), subtract 1 from the response. Sum all adjusted scores, multiply by 2.5. Maximum score: 100.

---

## Step 5: Comparison to Flat Layout

After evaluating both variants, answer:

1. **Cognitive load:** Which layout feels less overwhelming? 5 horizontal options vs. 6 flat buttons?
2. **Sub-level value:** Does the diagnostic question feel like useful follow-up or unnecessary interrogation?
3. **Information gained:** Does the Likert variant produce richer behavioral data than the flat layout?
4. **"I'm in" exit:** Does the immediate transition (no sub-level) feel right for the strongest yes?
5. **"Already seen it" routing:** Does having its own section feel clearer than being a flat button among 6?
6. **Overall preference:** Which variant would you keep using? Why?

---

## Step 6: Synthesis

After all 3 personas complete evaluation:

1. **Top 3 strengths** of the Likert variant
2. **Top 3 weaknesses** of the Likert variant
3. **Top 3 opportunities** — what would push this toward SUS 92?
4. **Interaction pattern assessment** — does the Likert scale + diagnostic sub-level work as a reusable pattern? Where else could it apply?

---

## Output

Write the complete evaluation to `docs/research/05-likert-evaluation.md`. Include:
- Persona descriptions
- All 8 cognitive walkthrough tasks for all 3 personas
- SUS table with scores
- Comparison to flat layout
- Synthesis (strengths, weaknesses, opportunities)
- Recommendation: keep, iterate, or abandon the Likert variant

Then report: SUS scores per persona, the comparison verdict, and the top 3 opportunities to improve the variant.
