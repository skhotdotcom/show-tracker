# Prompt: Observation Prototype Evaluation — Cognitive Walkthrough + SUS + 4Ls

_Synthetic persona evaluation of the observation prototype. Two variants below: one for Claude Code (reads source files), one for general LLM use (self-contained context)._

---

## Shared Instructions

You are a UX researcher evaluating the Show Tracker observation prototype. Run a cognitive walkthrough, SUS evaluation, and 4 L's debrief using three established personas.

**Important: Do not lead the personas.** Let each persona discover issues organically from the prototype itself. Do not reference prior findings, known bugs, or previous research to prime the personas toward specific conclusions. Each persona should evaluate the prototype fresh, based only on their own mental model. If a persona doesn't notice an issue, that's valid data — don't invent problems they wouldn't actually encounter.

---

## Variant A: Claude Code (reads repo files)

### Step 1: Read the context files

Read these files in order:
1. `app/test/observation/page.tsx` — the prototype source code (this is the primary object of evaluation)
2. `docs/design/brief.md` — full prototype brief (context on what this prototype is for)
3. `docs/research/01-baseline-evaluation.md` — existing personas and prior research (Rounds 1-3) for persona definitions only

**Do NOT read `docs/research/02-prototype-walkthrough.md`** — this contains real test findings. Reading it would bias the evaluation. The personas should discover issues independently.

### Step 2: Understand the prototype

The observation prototype presents one content title at a time and asks "How do you feel about this one?" The user picks from response options that express emotional intent. Every response is logged to the observation API.

Skip to **The Personas** below.

---

## Variant B: General LLM (self-contained)

_Run this prompt in Claude (or any capable LLM) to get synthetic persona evaluations. The goal is to test the response language with personas that have established mental models, and see where they surprise us._

### The Prototype

The observation prototype is a single-page test at `app/test/observation/page.tsx` that presents one content title at a time and asks the user: **"How do you feel about this one?"**

**What the prototype shows:**
- **Content card** with poster, title, short description (1-3 sentences), social rating, genre categories, and a personal score ("We think you'll rate this X/5 based on your history with [similar show]")
- **For TV shows:** episode poster + episode title/description if the user is already tracking the series. Series poster + series description if new to the show.
- **For movies:** movie poster + movie description + runtime
- **Poster click** opens a lightbox with expanded detail: backdrop image, extended description, top-billed cast, series overview link

**What the prototype logs:**
Every response is logged to an observation API: `{ title, content_type, response, social_rating, personal_score, timestamp, hour_of_day, day_of_week, dwell_time_seconds, revision_count }`

Below the card, a **history list** shows previous choices with a "change your mind?" option — allowing the user to revise their response. This is the visible calibration loop.

---

## The Personas

### Persona 1 — The General User

**Profile:** Watches 5-8 shows at a modest pace. Opens the app to check what's on and log recent watches. Not a power user. Short sessions, occasional.

**Mental model:** "The app shows me what I'm watching. I click something to do something with it. I want it to feel like a remote control, not a spreadsheet."

**Core loop:** Open app → see something → act → close.

**Emotional job priority:** Relief (don't make me think) → Confidence (I made the right call) → Completion (done, moving on)

---

### Persona 2 — The Casual Logger

**Profile:** Watches 3-5 ongoing shows. Opens the app reactively — after an episode, or to decide what to watch during dinner. Sessions are short (30 seconds to 2 minutes), frequent (4-5x per week). Doesn't think in terms of "status management."

**Mental model:** "A TV remote. Show me what I'm watching and let me tick off an episode."

**Core loop:** Finish episode → open app → mark it → see what's next → close.

**Emotional job priority:** No-brainer (pick for me) → Momentum (keep me going) → Low pressure (don't make me commit)

---

### Persona 3 — The Active Curator

**Profile:** Maintains a library of 20+ titles across all states. Plans what to watch next deliberately. Rates, writes notes, moves things between statuses. Sessions are longer (5-10 minutes) but less frequent. Thinks about the collection as a whole.

**Mental model:** "A personal media ledger. Like Letterboxd or Goodreads — a living record of everything I've watched and want to watch."

**Core loop:** Browse queue → pick next show → start it → track progress → complete → rate → find next.

**Emotional job priority:** Control (I know where everything stands) → Insight (the system knows me) → Agency (I can override and organize)

---

## Tasks for Each Persona

For each persona, answer:

### Task 1: First Impression
"I open the app. One title appears. It asks me 'How do you feel about this one?' What do I think?"

- What's your first reaction to being asked this question?
- How does the language of the options feel?
- Do any options feel like "you"? Do any feel forced or confusing?

### Task 2: Response Selection
"For Scarpetta S1E08 — Bridge of Time (2): a drama/crime/mystery with rating 6.3, starring Nicole Kidman and Jamie Lee Curtis. You've never seen this show. What do you pick and why?"

Walk through the decision:
- Do you read the description first? The genres? The personal score?
- Which response option matches your actual intent?
- Does the option you pick feel like something you'd say out loud?

### Task 3: Poster Discovery
"You click the poster. A lightbox opens with cast, tagline, and extended description. How does this change your decision?"

- Did the lightbox add information you needed?
- Did it change your response?
- Was it discoverable? Would you know to click the poster?

### Task 4: Already Tracking
"You've been watching The Pitt for 3 weeks. A new episode appears. How is this different from the Scarpetta decision?"

- What information do you need that the Scarpetta card doesn't have?
- Does the response language make sense for an ongoing show vs. a new-to-you show?
- How should the card feel different for something you're already invested in?

### Task 5: Revision
"You said 'Not my thing' but now you see your history says 'You said Not my thing — change your mind?' How does this feel?"

- Does seeing your past choice feel useful or nagging?
- Would you actually change your mind, or is it just good to know you could?
- What does this teach the system about you?

### Task 6: Mental Model Test
For each response option, describe what it means to you in plain language. Where do two options feel like they mean the same thing? Where is the distinction unclear?

### Task 7: SUS Evaluation
Rate each statement 1-5 (1 = strongly disagree, 5 = strongly agree):

1. I would like to use this system frequently
2. I found the system unnecessarily complex
3. I thought the system was easy to use
4. I think I would need technical support to use it
5. I found the functions well integrated
6. I thought there was too much inconsistency
7. Most people would learn this system quickly
8. I found the system cumbersome to use
9. I felt very confident using the system
10. I needed to learn a lot before getting going

### Task 8: 4 L's

**Liked** — What did you like about the experience?
**Loved** — What stood out as genuinely good or delightful?
**Lacked** — What was missing that you expected?
**Longed For** — What do you wish it did that it doesn't?

---

## Synthesis

After all three personas have completed the walkthrough:

1. **Cross-persona patterns** — Where do all three agree? Where do they diverge?
2. **Language surprises** — Did any persona interpret a response option differently than intended? Where did the words fail to match the mental model?
3. **The calibration loop** — Does the history/revision feature feel useful or intrusive? Would each persona actually change their mind?
4. **TV vs. Movie logic** — How should the card feel different for a new show vs. an ongoing show vs. a movie?
5. **Priority recommendations** — Top 3-5 changes to make before the next test

### Language Audit
For each response option, test it against each persona's mental model. Where does the word work? Where does it fail? Where might a persona surprise us with a different interpretation than intended?

### SUS Summary Table
| Persona | Sum | Score | Rating |
|---------|-----|-------|--------|

### Priority Recommendations
The highest-impact changes to make before the next test. Rank by evidence from the evaluation — only recommend changes that the personas' responses directly support. Do not reference prior research findings.

## Output

**For Variant A (Claude Code):** Write the complete evaluation to `docs/research/03-prototype-evaluation.md`. Include all 8 tasks for all 3 personas, the synthesis, language audit, SUS table, and priority recommendations. Then report the SUS scores and top 3 recommendations.

**For Variant B (General LLM):** Output the full evaluation inline. Follow the output format:
```
## Observation Prototype Evaluation — Synthetic Personas

### Persona 1: [Name]
[Task 1-8 results]

### Persona 2: [Name]
[Task 1-8 results]

### Persona 3: [Name]
[Task 1-8 results]

### Cross-Persona Synthesis
[Patterns, divergences, surprises]

### Language Audit
[Each option tested against each mental model]

### SUS Summary
| Persona | Sum | Score | Rating |
|---------|-----|-------|--------|

### Priority Recommendations
1. [Highest impact change]
2. [Second priority]
3. [Third priority]
```

---

## Context for the Evaluator

This is Round 1 of a new observation prototype built on top of an existing Show Tracker app (3 prior UX research rounds, SUS improved from 62.5 → 73.3). The existing app has detailed cognitive walkthroughs, SUS scores, and 4L's data in `docs/research/01-baseline-evaluation.md`. The observation prototype is a separate experiment — it's testing a *new* interaction model (emotional intent responses) that doesn't exist in the main app yet.

The key research question: **Does the response language match how the user actually thinks about content? And where do the synthetic personas surprise us with interpretations we didn't expect?**
