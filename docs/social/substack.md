# Substack Post — Draft

## Title
Natural Language Is the Ground Truth: What Synthetic Persona Evaluations Taught Me About Response Language

---

## Draft

I'm building an AI prototype for content recommendation. Not a typical recommendation engine — the system presents one title at a time and asks: "How do you feel about this one?"

The user picks from response options that express emotional intent. Not "rate this 1-5" or "thumbs up/down" — but language that captures what they actually mean: "This is it," "I'd watch this," "Maybe later," "Not tonight," "Not in the mood," "Not for me."

I designed 8 options. I thought they were good. Then I tested them. The results changed my mind.

### The Setup

The prototype is built from job-to-be-done analysis. Seven micro-jobs users actually do when deciding what to watch:

1. "Log an episode fast"
2. "Set position after a binge"
3. "Air day → watch day translation"
4. "Anything new I haven't seen?"
5. "Track uncommitted interest"
6. "Decide if it's worth continuing"
7. "Tell me when X is available"

I built the prototype in Claude Code from these jobs. The observation layer logs every suggestion and every response — behavioral signals that teach the system what "fits" for this specific person.

Then I evaluated it. Not with users (I'm not ready for that yet) but with synthetic personas — three established personas from prior research who evaluate the prototype source code independently.

### The Button Labels Were Wrong

My original response options:

| Category | Options |
|----------|---------|
| I'm Interested | "This is it" / "Let's start it" |
| Save for Later | "Maybe later" / "Add to my queue" |
| Pass | "Not in the mood" / "Not for me" / "Not now" / "Already seen it" |

The cognitive walkthrough surfaced a pattern: 2 of 3 personas couldn't distinguish "Maybe later" from "Add to my queue." They couldn't distinguish "Not in the mood" from "Not now."

The system treats these as different signals — passive vs. active interest, mood vs. timing. But users don't think in those categories. They say "maybe" or "put it on my list" interchangeably.

I was designing language for the system's learning model, not for the user's mental model.

### The Language Test

To validate, I ran a separate test. Instead of asking personas to choose from my button labels, I gave them open text: "What would you say about this title?"

30 responses across 3 personas and 10 titles. Then I clustered the natural language. No preconceived categories. The words themselves told me the structure.

**6 clusters emerged:**

1. **"Yeah, I'm in"** (27%) — Short, enthusiastic, present-tense. "Definitely," "I'm down," "yes."
2. **"I'd give it a shot"** (13%) — Conditional willingness. "I'd watch this," "sure, why not," "if nothing else is on."
3. **"Maybe, keep it on my radar"** (23%) — The biggest cluster. "Maybe," "been meaning to," "on my list," "queue it."
4. **"Not right now"** (17%) — Timing/energy rejection. "Too heavy for right now," "not tonight," "maybe another time."
5. **"Not for me"** (20%) — Taste rejection. "Not my thing," "not into this," "meh."
6. **"No way"** (13%) — Hard no. "Over a thousand episodes??" "Absolutely not."

The clusters proved what the synthetic evaluation suspected: natural language doesn't support 8 button labels. The biggest cluster — deferred interest — mapped to two different buttons that the system treated as different signals. But users didn't separate them in their own words.

### The Reduction

Based on the clusters, I reduced from 8 to 5 options (plus "Already seen it" as a special flow):

**"I'm in"** → Replaces "This is it" — the most common strong-yes phrase across all personas. Short, decisive, natural.

**"I'd watch this"** → Replaces "Let's start it" — multiple personas used this exact phrase. It's conditional: interest without commitment.

**"Keep it on my radar"** → Merges "Maybe later" and "Add to my queue" — one option for deferred interest. The system infers commitment from return behavior, not label choice.

**"Not tonight"** → Merges "Not in the mood" and "Not now" — temporal rejection. The system logs hour_of_day and day_of_week to infer the energy context.

**"Not for me"** → Unchanged. The sharpest option. Every persona agreed on its meaning: permanent, taste-based rejection.

### The Bigger Lesson

Your response options are a design assumption. Natural language is the ground truth.

When you design button labels, you're designing for two audiences:
1. The user who clicks them (mental model match)
2. The system that learns from them (signal differentiation)

I was optimizing for audience #2 — the system needs mood vs. timing, passive vs. active. But if the labels don't match how users actually think, the system learns from corrupted input.

The fix: use labels that match natural language, and let the system infer the system-facing signals from behavior. Dwell time, return behavior, time of day — these teach the system what "Not tonight" means for this person. The label doesn't have to do all the work.

### What Synthetic Persona Evaluations Are (and Aren't)

They're not user testing. I know this. The personas don't have real habits, real preferences, real context.

But they caught the language mismatches before I built more on top of wrong labels. They revealed that the poster preview — the most valuable interaction in the prototype — was invisible to all three personas. They showed that the personal score undermined trust when the comparison didn't track.

Cost: 0 users recruited, 2 hours of evaluation time, one LLM session.

The process:
1. Build from JTBD micro-jobs
2. Write personas from prior research
3. Cognitive walkthrough + SUS + 4 L's (Liked, Loved, Lacked, Longed For)
4. Open-text language capture (no button labels)
5. Cluster responses
6. Reduce option set
7. Validate against original evaluation

The prototype teaches us about show tracking. The process of building the prototype teaches us about building AI prototypes. Both feedback loops are running.

---

*The best interactions reduce 100 choices to 2-5. But the labels have to match how users actually think, not how you designed the system to learn.*

---

## Notes
- Long-form piece for Substack
- Can be repurposed as an article (NN/g style) if Scotty wants
- Connection to the AI Prototyping theme: this is the tactical process of building the prototype, not the course material
