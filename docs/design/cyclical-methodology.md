# Discovery and Delivery Cycles

_A methodology for building interaction patterns that learn._

---

## The Core Principle

**The feedback loop IS the product.** Not a research method applied to the product. Not a testing phase before delivery. The loop — where the system observes, learns, calibrates, and anticipates — is what the customer experiences. The prototype is the pattern learning system.

This changes how we build. Linear plans assume you know what to build before you build it. Cycles assume you'll learn what to build by building it.

---

## Two Modes, One Rhythm

### Discovery Cycles

The goal is to learn what the customer actually does, not what they say they'll do.

- Run the prototype in front of real users
- Open-text language capture ("How do you feel about this one?")
- Unbiased evaluation (synthetic or real personas discovering issues organically)
- Behavioral signal logging (dwell time, revision patterns, time of day)
- Natural language clustering (where do responses converge? where do they diverge?)

**Output:** Insights that change what you build next. Not features — understanding.

### Delivery Cycles

The goal is to make the insight visible in the interaction.

- Build the component that the discovery cycle revealed
- Ship it into the prototype (not production — the prototype IS the product)
- Wire the feedback loop (every delivery generates data for the next discovery)
- Update the design system tokens (consistent language, colors, spacing)

**Output:** A working component that generates behavioral data for the next discovery cycle.

### The Rhythm

```
Discovery → Delivery → Discovery → Delivery → ...
    ↓            ↓            ↓            ↓
  Learn        Build      Validate      Refine
```

Each cycle:
1. **Discover** — Observe what the customer does. Cluster the language. Identify the opportunity.
2. **Deliver** — Build the component. Wire the feedback loop. Ship to prototype.
3. **Validate** — Re-evaluate. Check SUS scores. Observe behavioral signals. Update the value stream.
4. **Refine** — What surprised us? What's the next opportunity? Feed the next discovery cycle.

---

## Why Not Phases?

Phases assume linearity: define → design → build → test → ship. This works when you know what you're building. It breaks when the thing you're building is a system that learns from its own use.

**Phase thinking:** "We'll test after we build."

**Cycle thinking:** "Building is testing. Testing is building. They're the same activity."

**Phase thinking:** "Requirements first, then implementation."

**Cycle thinking:** "The first cycle IS requirements gathering. The prototype generates the requirements."

This doesn't mean structure is absent. It means structure emerges from the cycles, not from a plan created before the first cycle runs.

---

## The Compounding Loop

The value stream is itself a cycle:

```
Discover → Respond → Learn → Calibrate → Resurface → Discover
              ↑                                        ↓
              └──────────────────────────────────────────┘
```

Each pass through the loop makes the next pass better. The customer feels the system getting smarter. The business measures engagement increasing. The product compounds.

**This is the interaction pattern.** Not a feature, not a screen, not a button. The pattern is the loop. Every component in the module serves one moment in this loop.

---

## Communication vs. Work

**For external communication** (partners, stakeholders, cross-functional teams): Linear roadmaps. Phases. Dependency chains. People need to see where things are going.

**For internal work** (building, testing, iterating): Cycles. Discovery and delivery intertwined. The prototype IS the learning system.

Both are valid. They serve different purposes. The linear roadmap is the translation of cyclical work for audiences who need predictability. The cycles are the actual work.

---

## How This Applies to Interaction Pattern Design

Every interaction pattern follows the same cycle:

| Moment | Discovery | Delivery | Value |
|--------|-----------|----------|-------|
| Discover | "What's the right number of options?" | One card at a time | Decision reduction |
| Respond | "What words match the customer's mental model?" | Validated labels | Voice / expression |
| Learn | "Does the customer see the system respond?" | Animation + toast | Confidence |
| Calibrate | "Is the system getting smarter?" | Behavioral logging | Personalization |
| Resurface | "Does the radar actually work?" | Contextual reminders | Serendipity |
| Commit | "What does 'I'm in' mean to the system?" | Session exit + tracking | Closure |
| Reflect | "How does the customer describe what they watched?" | Behavioral language | Honesty |

**Each moment is a mini-cycle.** Discover what the customer does in that moment. Deliver a component that serves it. Validate. Refine. The full cycle runs across all moments. The moments run their own mini-cycles within it.

---

## The Meta-Pattern

The methodology itself is a behavioral calibration loop:

1. Observe the customer using the prototype
2. Learn from what they do (not what they say)
3. Calibrate the interaction based on the learning
4. Anticipate the next improvement
5. Observe again

**The prototype isn't testing the patterns. The prototype IS the pattern learning system.**

The methodology mirrors the product. Both are compounding loops that get better with each pass.
