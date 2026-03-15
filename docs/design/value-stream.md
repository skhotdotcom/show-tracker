# Value Stream — Behavioral Calibration Module

_The flow of value from the customer's perspective. Each step delivers value on its own, and value compounds across the stream._

_Macro-level thinking. The specific scaling paths — B2B2C, partner integration, unknown future uses — will emerge as the module matures. This framework is designed to accommodate them._

---

## The Question

Not "what features do we need?" but "where does value accrue for the customer at each moment of interaction?"

---

## Stream: 7 Moments of Value

### 1. Discover — "What's available right now?"

**Customer value:** A single, focused suggestion instead of an overwhelming grid.
**Component:** One card at a time. Context-aware (time of day, day of week, what's fresh).
**Value type:** Decision reduction. 100 options → 1.

### 2. Respond — "How do I feel about this one?"

**Customer value:** Voice. Not stars, not thumbs — a real response in their own words (or close to it).
**Component:** Response options that match mental models. "I'm in" / "I'd watch this" / "Keep it on my radar" / "Not tonight" / "Not for me."
**Value type:** Expression. The customer feels heard, not scored.

### 3. Learn — "Did it land?"

**Customer value:** Confirmation that the system understood. A visible signal that the response was received and mattered.
**Component:** Visual feedback (card animates away, response logged, brief confirmation). The customer trusts the loop is closed.
**Value type:** Confidence. The system is paying attention.

### 4. Calibrate — "It's learning me."

**Customer value:** Over time, suggestions get better. Not because of what other people watch — because of what *this* person responds to. The system learns from dwell time, revision patterns, time-of-day preferences, mood/timing distinctions.
**Component:** Behavioral calibration engine. No single moment — the value compounds with each interaction.
**Value type:** Personalization. The system gets smarter about *me*, not about "people like me."

### 5. Resurface — "I forgot about this, but it's perfect right now."

**Customer value:** Titles from "Keep it on my radar" reappear at the right moment. Not randomly — because the system learned the customer's patterns and knows this one fits now.
**Component:** Freshness pulse + radar resurfacing. "You marked Hacks as 'on radar' — it just dropped a new season, and you tend to watch comedy on Friday nights."
**Value type:** Serendipity with logic. The system remembers what the customer forgot.

### 6. Commit — "I'm watching this."

**Customer value:** Transition from discovery to tracking. "I'm in" ends the session and moves the title to an active state. No more deciding — just watching.
**Component:** "I'm in" exit behavior. Session ends. Title transitions to in-progress. Next episode shows up in tracking, not discovery.
**Value type:** Commitment. The decision is made. Stop searching, start watching.

### 7. Reflect — "Was that worth my time?"

**Customer value:** Not stars — behavioral language. "I couldn't stop watching" / "It was fine" / "I almost turned it off." This captures the *experience*, not just a number.
**Component:** Post-watch response with behavioral language. Feeds back into calibration.
**Value type:** Honesty. The rating system matches how customers actually think about what they watched.

---

## Where Value Compounds

| Moment | Standalone Value | Compounding Value |
|--------|-----------------|-------------------|
| Discover | Decision reduction (100 → 1) | Gets better as calibration improves |
| Respond | Voice / expression | More responses = better calibration |
| Learn | Confidence / trust | Trust enables more honest responses |
| Calibrate | Personalization | Each exchange refines the model |
| Resurface | Serendipity | Radar titles resurface at right moments |
| Commit | Session closure | Stops searching, enables tracking |
| Reflect | Honest experience capture | Behavioral language feeds calibration |

**The compounding loop:** Respond → Learn → Calibrate → Resurface → Respond. Each cycle makes the next cycle better. This is the product — not a feature applied to a product.

---

## Where "SUS 92" Lives in the Stream

92 isn't about individual features. It's about the customer feeling the loop work — at every moment:

| SUS Statement | Value Stream Connection | Target Fix |
|---------------|------------------------|------------|
| "I thought it was easy to use" | Discover (focused suggestion), Respond (intuitive labels) | Poster discoverable, "I'm in" exit |
| "I found the various functions...were well integrated" | Respond → Learn → Calibrate (the loop feels seamless) | Response confirmation, calibration visible |
| "I thought it was easy to learn" | Discover + Respond (first 30 seconds make sense) | Clear first-use experience |
| "I felt confident using it" | Learn (confirmation), Reflect (honest language) | Toast/animation on every action |
| "There was too much inconsistency..." | All moments — same interaction pattern every time | Consistent component behavior |
| "I found it cumbersome..." | Tracking vs. discovery (don't mix jobs) | Separate tracking mode |
| "I would imagine most people would learn..." | New user onboarding to the pattern | First-use flow |
| "I found it very awkward..." | Response options match mental models | 5 validated labels |
| "I felt need for support..." | System explains itself | "Because you watched..." reasoning |
| "I thought it was efficient..." | Fast decisions, no grid paralysis | One card, immediate response |

**92 means the customer feels the value stream working — not just features existing.**

---

## B2B2C: Two Streams, One Framework

This value stream is the **consumer experience** — what the viewer feels. A companion **business outcomes** document will map each consumer moment to measurable business metrics (engagement, retention, subscription growth, referral leads).

Two separate documents, scaling together. The consumer stream drives component design. The business outcomes doc drives partner positioning. The business outcomes are the *measurement* of the consumer stream working.

Additional scaling paths beyond B2B2C are expected to emerge as the module matures. The framework is designed to accommodate them without restructuring.

---

## Module Boundaries

Each moment is a component that can be extracted and adapted:

| Component | Reusable For | Adaptation |
|-----------|-------------|------------|
| Discover (one-at-a-time suggestion) | Any content platform, e-commerce, learning | Swap TMDB for any content source |
| Respond (emotional intent labels) | Any decision point | Adjust labels to context (not just TV) |
| Learn (visible confirmation) | Any AI interaction | Feedback animation + logging |
| Calibrate (behavioral pattern engine) | Any personalization system | Different behavioral signals |
| Resurface (contextual reminder) | Shopping, health, learning | Different "right moment" triggers |
| Commit (session exit → action) | Any search/decision flow | Different downstream states |
| Reflect (behavioral rating) | Any feedback system | Different response vocabularies |

**The module is the stream, not any single moment.**

---

_Related: Lean Strategy Canvas (goal + OKRs), Lean Product Canvas (JTBD + hypotheses), Interaction Pattern Taxonomy (pattern/component/experience distinction)_
