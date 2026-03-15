# Interaction Pattern Taxonomy — Show Tracker

_Thinking notes from Scotty, 3/15. Design research documentation._

---

## The Language Problem: Features ≠ Interaction Patterns ≠ Experiences

**Don't call them "features."** The word "feature" conflates three distinct things:

| Term | Discipline | What It Means | Example |
|------|-----------|---------------|---------|
| **Interaction Pattern** | Interaction Design | The recurring dialogue between user and system | "Mark through" — a single gesture that updates position across multiple episodes |
| **Component** | Engineering/Feasibility | The buildable unit — what ships | Episode picker modal, toast notification, badge counter |
| **Experience** | Product/Functionality | The felt outcome — what the user *gets* | "I caught up on 4 episodes in 2 taps and didn't have to think about it" |

**Why this matters:** When you call something a "feature," you're collapsing the pattern, the build, and the outcome into one word. That creates scope creep, misaligned expectations, and vague specs.

When you name them separately:
- Designers design the **pattern** ("mark through" interaction flow)
- Engineers build the **component** (modal + API endpoint)
- Product measures the **experience** (time-to-complete, satisfaction)

Each layer has its own language, its own success criteria, and its own failure modes.

---

## Taxonomy as Shared Understanding (Scoping Tool)

The pattern taxonomy isn't just a naming convention — it's a **scoping instrument**.

When a team (or solo operator) says "we should build X," the taxonomy forces three questions:
1. **What's the interaction pattern?** (the user's side of the dialogue)
2. **What's the component?** (the buildable unit)
3. **What's the experience we're testing?** (the outcome we're measuring)

Alone or in a group, this language prevents the fuzzy idea problem: "let's add something for tracking shows you've tried." That's not a spec — it's a vibe. The taxonomy turns vibes into testable statements.

**Pattern taxonomy is strong, but the language goes bigger:** This same structure works for organizing any fuzzy information domain: claims (evidence → insight), learning (objective → exercise → assessment), hiring (behavior → signal → question). It's a reusable scoping pattern for turning vague ideas into testable statements.

---

## Brain Systems: Is This Executive Function?

**Short answer:** Yes, this is executive function work — specifically the kind that organizes unstructured input into structured categories. But it's not *just* executive function.

**Executive function (dorsolateral prefrontal cortex):**
- Working memory — holding multiple categories in mind simultaneously
- Inhibitory suppression — filtering out noise, deciding what doesn't belong
- Cognitive flexibility — switching between categories, recombining

**Pattern recognition (parietal lobe + temporal lobe):**
- Detecting recurring structures in the data (e.g., "these three features all solve the same job")
- Schema building — creating mental models that group things by function, not appearance

**Semantic association (temporal lobe):**
- Mapping abstract concepts ("relief") to concrete behaviors ("pick for me")
- Building vocabulary — creating the language layer that makes patterns communicable

**Metacognition (prefrontal cortex):**
- "Is this the right level of abstraction?" — thinking about the thinking itself
- Recognizing when a taxonomy is too granular or too coarse
- Adjusting the frame based on the audience (solo builder vs. team of 12)

**The synthesis:** Organizing fuzzy information into meaning is a multi-system cognitive task. Executive function provides the scaffolding (categories, hierarchy, priority). Pattern recognition provides the insight (these things belong together). Semantic association provides the language. Metacognition provides the calibration.

When Scotty says "is this executive function brain work?" — he's doing metacognition about his own cognition. That's the highest-level loop.

---

## "Energy-Aware" vs. "Behavioral Signals"

**"Energy-aware" is incomplete.** It describes one dimension of the signal — low/medium/high energy — but doesn't capture the full picture.

**"Behavioral signals" is better** because it describes what we're actually observing: the *experience* we're testing, not the inferred internal state. We don't measure energy directly (no heart rate monitor). We observe behavior and infer the signal.

### The Behavioral Signal Stack

| Layer | What It Is | Example | How You Measure It |
|-------|-----------|---------|-------------------|
| **Behavioral Signal** | Observable action or context | "Dinner time, watching alone, opened app" | Time of day, session history, explicit cue |
| **Inferred State** | The thing the behavior suggests | "Low energy, comfort-seeking" | Pattern matching on behavioral signals |
| **Emotional Job** | What the user wants to *feel* | Relief, permission, closure | Post-interaction interview, SUS, qualitative |
| **Interaction Pattern** | How the system responds | "Tonight's Pick" — single card, no browsing | Task completion time, agreement rate |

"Energy-aware" lives in the Inferred State layer. But the real thing we're testing is the Behavioral Signal → Emotional Job mapping. Energy is one flavor of that — but it could also be:
- **Time-investment signal** — "I have 20 minutes" vs. "I have the evening"
- **Social signal** — watching alone vs. with a partner
- **Completion signal** — "I'm 1 episode from finishing a season" vs. "just starting"
- **Mood signal** — want something heavy/thoughtful vs. light/comforting

All of these are behavioral signals that map to emotional jobs. "Energy-aware" is a subset. "Behavioral signals" is the full layer.

---

## Emotional Job Labeling: The Research Problem

### The Observation Challenge

If we wanted to research emotional jobs (relief, anticipation, permission, closure, patience), how would we observe them?

**Direct labeling doesn't work:** You can't show someone a movie poster and ask "does this give you permission?" That requires:
1. Pre-existing experience with the content (seen it or not)
2. Context about their current queue (on radar or committed)
3. A vocabulary for emotional jobs (most people don't think this way)

**The decision tree is the key insight:** Emotional jobs are *downstream* of content decisions. They emerge from a layered decision tree:

```
Have I seen this?
├── Yes
│   ├── Would I watch again?
│   │   ├── Yes → Comfort / Rewatch
│   │   └── No → Done (not worth tracking)
│   └── Is there new content?
│       ├── Yes → Anticipation
│       └── No → Patience (waiting)
└── No
    ├── Am I interested?
    │   ├── Yes → Permission (on radar)
    │   │   ├── High interest → Notify me (patience)
    │   │   └── Medium interest → Track it (permission)
    │   └── No → Not tracking
    └── Would I try it?
        ├── Yes → Trial state (permission to experiment)
        └── No → Not tracking
```

Each node in this tree generates a different emotional job. You can't ask about "permission" without knowing where they are in the tree. The emotional job is a **property of their position in the decision tree**, not a standalone feeling you can label on a poster.

### How to Test This

**Don't ask "what do you feel?"** Instead:

1. **Observe the decision:** Show the content in context of their queue (watched, not watched, on radar, etc.) and ask them what they'd do.
2. **Map their action to the tree:** Where does their decision land in the decision tree?
3. **Infer the emotional job from the branch:** If they move Hacks from "watch next" to "on radar" — that's permission. If they mark Fallout as "tried it" — that's closure.
4. **Validate with follow-up:** "Why did you move it?" The answer will sound like the emotional job, even if they don't use that vocabulary.

**The behavioral signal is the label.** You don't ask about feelings. You watch what they do with the content and infer the emotional job from the action.

---

## Social and Rated Content (Thought Starter)

Scotty's instinct: there's a thought about social and rated content.

**Possible direction:** The current model is entirely self-referential — what *you've* watched, what *you* feel, what *you* want. But ratings (community) and social signals (friends watching) introduce external data that shifts the emotional job.

- **Ratings** change the emotional job from "relief" (pick for me) to "curiosity" (everyone says this is good) or "skepticism" (high ratings, but is it for me?)
- **Social signals** change the emotional job from "permission" (I'm interested) to "belonging" (everyone's watching this) or "FOMO" (I should catch up)

This connects to the Pull > Push philosophy — ratings are push data (external opinion imposed on you), while behavioral signals are pull data (your own patterns surfacing what fits you).

**Open question:** Should the Show Tracker prototype eventually incorporate social/rated signals, or is the energy-aware behavioral model enough for v1? And does adding ratings undermine the "relief" emotional job by introducing decision fatigue?

---

## "The prototype isn't testing the patterns. The prototype IS the pattern learning system."

> **"The prototype isn't testing the patterns. The prototype IS the pattern learning system."**
> — Scotty, 3/15

_This is the core insight. Save it. Quote it. Build from it._

The feedback loop isn't a research method applied *to* the product. The feedback loop *is* the product. Every user interaction teaches the system what "relief" or "permission" means for that specific person. The prototype doesn't validate the taxonomy — it *grows* the taxonomy.

### Pattern Precedents: Three Domains, One Pattern

**1. Shadow Health (2016) — Conversation Feedback Loop**
- AI conversation engine would "brick" (fail to understand user)
- Feedback loop: tell user why → let them categorize → let them detail → feed back into AI training
- Immediate user value (understanding, agency) + continuous system improvement
- "A new data point that could be used to continuously improve AI content for future and existing products"

**2. Holmusk (MSE) — Mental Status Exam**
- 100+ clinical attributes to choose from → cognitive overload
- Solution: social data (common clinician choices) + individual data (this clinician's patterns)
- Instead of 100 options → show 2-5 most common
- Choice in one row filters options in the next row (contextual narrowing)
- System learns with every interaction → form gets faster over time
- **The best interactions reduce 100 choices to 2-5**

**3. Show Tracker (2026) — Behavioral Calibration**
- Behavioral signals (time, context, recent history) → content suggestions
- User response teaches the system: watch/skip/move-to-radar = calibration signal
- Suggestions narrow and sharpen over time
- Same pattern: social data + individual data → contextual recommendation

### The Pattern Language

> **The feedback loop is the product. The learning IS the experience.**

Each precedent proves the same thesis from a different domain:
- Shadow Health: AI conversation (2016)
- Holmusk: Clinical workflow (MSE)
- Show Tracker: Content discovery (2026)

The micro-interaction pattern: **Earn the right to narrow options by learning from every choice the user makes. Each selection is a calibration signal that makes the next interaction simpler.**

---

## The Prototype as Test Instrument (Macro Pattern)

> **"The prototype isn't testing the patterns. The prototype IS the pattern learning system."**
> — Scotty, 3/15

_This is the core insight. Save it. Quote it. Build from it._

The feedback loop isn't a research method applied *to* the product. The feedback loop *is* the product. Every user interaction teaches the system what "relief" or "permission" means for that specific person. The prototype doesn't validate the taxonomy — it *grows* the taxonomy.

---

## The Prototype as Test Instrument (Macro Pattern)

### Scotty's Insight

The prototype shouldn't just implement the patterns — it should *observe the customer's response* to content suggestions and use that to build a deeper taxonomy.

**The feedback loop:**
```
System suggests → Customer responds → Response becomes signal data → System calibrates → Better suggestion
```

This isn't just a research method. It's a **macro pattern** — a calibration layer that sits above all the other patterns. The system learns what "relief" looks like for *this specific person* by watching what they actually do.

### The Signal Exchange

Every content suggestion is a hypothesis:

| System Says | Customer Does | Signal Interpretation |
|-------------|---------------|----------------------|
| "New RPDR dropped" | Watches immediately | Correct: comfort/relief confirmed |
| "New RPDR dropped" | Ignores, watches Star Trek | Recalibrate: energy/context inference was wrong |
| "You might like Fallout" | Moves to "Tried It" | Pattern match failure: not a comfort fit |
| "3 episodes waiting on The Pitt" | Watches 2, stops | Partial signal: interested but something broke (availability?) |
| "Hunger Games is now available" | Adds to "On Radar" | Patience signal confirmed: not urgent, but don't forget |

The customer's response IS the behavioral signal taxonomy. We're not asking them to label their feelings — we're observing the signal exchange and inferring the emotional job from their action.

### Why This Is a Macro Pattern

The four interaction patterns (Context-Aware Pick, Progress Shortcut, State Expansion, Proactive Signal) are *micro patterns* — they solve specific jobs.

The calibration layer is a **macro pattern** — it observes how the user responds to all micro patterns and adjusts:

1. **Time pattern calibration:** "Scotty always picks RPDR on weeknights but skipped it this Thursday" → recalibrate day-of-week energy inference
2. **Content fit calibration:** "Suggestions for 'similar to Fallout' are always rejected" → expand the comfort/reject boundary
3. **Freshness calibration:** "Never acts on '3 new episodes' for show X" → lower priority, maybe not as caught up as thought
4. **State calibration:** "Moved show from Watch Next to On Radar within 48 hours" → the initial commitment was too strong, ask differently next time

**The macro pattern makes every micro pattern better over time.** This is the thing that turns a recommendation engine into something that actually knows you.

### How to Build This Into the Prototype

**Phase 0 (Observation Layer):**
- Log every suggestion and every response
- No inference yet — just capture the signal exchange
- Format: `{ timestamp, suggestion_type, content, user_action, response_time }`

**Phase 1 (Pattern Matching):**
- After 20-30 signal exchanges, look for clusters
- "Every time I suggest X, Scotty watches it within 5 minutes" = high-confidence fit
- "Every time I suggest Y, Scotty ignores it" = pattern mismatch

**Phase 2 (Calibration):**
- System starts adjusting suggestions based on observed patterns
- Suggestion accuracy becomes the metric: how often does the user follow the recommendation?

**Phase 3 (Awareness):**
- The system reaches a state where suggestions feel "aware" — not algorithmic, but personal
- This is the emotional job outcome: relief ("it knows me"), not fatigue ("another suggestion")

### The Research-to-Product Pipeline

This is the prototype as research instrument:

```
Observation (what they do)
    → Taxonomy (what it means)
        → Pattern (how to respond)
            → Calibration (how to do it better)
                → Awareness (the felt experience)
```

The taxonomy doesn't come from interviews or surveys. It comes from the prototype observing the signal exchange between suggestion and response. The patterns are validated by whether the user follows the recommendation or not.

**This is the macro pattern for the entire system:** observe → learn → calibrate → anticipate.

---

_Last updated: 2026-03-15_
