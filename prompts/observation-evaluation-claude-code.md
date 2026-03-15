# Claude Code Prompt — Observation Prototype Evaluation (Unbiased)

_Copy this entire file and paste it into Claude Code to run the synthetic persona evaluation._

---

You are a UX researcher evaluating the Show Tracker observation prototype. Run a cognitive walkthrough, SUS evaluation, and 4 L's debrief using three established personas.

**Important: Do not lead the personas.** Let each persona discover issues organically from the prototype itself. Do not reference prior findings, known bugs, or previous research to prime the personas toward specific conclusions. Each persona should evaluate the prototype fresh, based only on their own mental model. If a persona doesn't notice an issue, that's valid data — don't invent problems they wouldn't actually encounter.

## Step 1: Read the context files

Read these files in order:
1. `app/test/observation/page.tsx` — the prototype source code (this is the primary object of evaluation)
2. `ai-prototype-brief.md` — full prototype brief (context on what this prototype is for)
3. `docs/ux-research.md` — existing personas and prior research (Rounds 1-3) for persona definitions only

**Do NOT read `docs/prototype-test-insights.md`** — this contains real test findings. Reading it would bias the evaluation. The personas should discover issues independently.

## Step 2: Understand the prototype

The observation prototype presents one content title at a time and asks "How do you feel about this one?" The user picks from response options that express emotional intent. Every response is logged to the observation API.

The response options are:
- "This is the one" (strong yes)
- "I'd watch this" (casual yes)
- "Keep me posted" (curious)
- "Not tonight" (maybe)
- "Add to my list" (queued)
- "Not the vibe right now" (not now)
- "Not my thing" (hard pass)
- "Already seen it" (routes to rating flow)

There is also a history section showing past choices with "change your mind?" revision.

## Step 3: Run the evaluation for each persona

### Persona 1 — The General User
Watches 5-8 shows, short sessions, occasional. Mental model: "The app shows me what I'm watching. I want it to feel like a remote control."

### Persona 2 — The Casual Logger
Watches 3-5 ongoing shows. Opens app reactively — after an episode or during dinner. Sessions are 30sec-2min, 4-5x per week. Mental model: "A TV remote. Show me what I'm watching and let me tick off an episode."

### Persona 3 — The Active Curator
20+ titles across all states. Plans deliberately. Rates, writes notes, moves things. Sessions 5-10 min but less frequent. Mental model: "A personal media ledger — like Letterboxd for everything I've watched."

### For each persona, answer:

**Task 1 — First Impression:** What do you think when you open the app and see one title with the question "How do you feel about this one?" How does the language of the options feel? Do any feel like "you"? Do any feel forced or confusing?

**Task 2 — Response Selection:** For Scarpetta S1E08 — Bridge of Time (2): drama/crime/mystery, rating 6.3, Nicole Kidman, Jamie Lee Curtis. You've never seen it. What do you pick and why? Walk through the decision step by step. Does the option you pick feel like something you'd say out loud?

**Task 3 — Poster Discovery:** You click the poster and a lightbox opens with cast, tagline, and extended description. How does this change your decision? Was it discoverable? Would you have found this on your own?

**Task 4 — Already Tracking:** You've been watching The Pitt for 3 weeks. A new episode appears. How is this different from the Scarpetta decision? What info do you need that the card doesn't have? How should the card feel different for an ongoing show vs. a new-to-you show?

**Task 5 — Revision:** You said "Not my thing" but the history says "You said Not my thing — change your mind?" Does this feel useful or nagging? Would you actually change your mind? What does this teach the system about you?

**Task 6 — Mental Model Test:** For each response option, describe what it means to you in plain language. Where do two options feel like they mean the same thing? Where is the distinction unclear?

**Task 7 — SUS:** Rate 1-5 for each of the 10 standard SUS statements. Calculate the SUS score (sum of adjusted scores x 2.5).

**Task 8 — 4 L's:** Liked, Loved, Lacked, Longed For.

## Step 4: Synthesis

After all three personas complete:

### Cross-Persona Patterns
Where do all three agree? Where do they diverge? What does this tell us about the response language?

### Language Audit
For each response option, test it against each persona's mental model. Where does the word work? Where does it fail? Where might a persona surprise us with a different interpretation than intended?

### SUS Summary Table
| Persona | Sum | Score | Rating |
|---------|-----|-------|--------|

### Priority Recommendations
The highest-impact changes to make before the next test. Rank by evidence from the evaluation — only recommend changes that the personas' responses directly support. Do not reference prior research findings.

## Step 5: Write the output

Write the complete evaluation to `docs/observation-prototype-evaluation.md` in this repo. Include all 8 tasks for all 3 personas, the synthesis, language audit, SUS table, and priority recommendations.

Then tell me the evaluation is complete and give me the SUS scores and top 3 recommendations.
