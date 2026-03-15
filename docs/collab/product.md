# Product & Leadership Context

_Living document. Updated as research rounds complete._

---

## What This Is

Three layers of proprietary IP for AI-assisted content discovery — observation, taxonomy, collaboration. Built as a research prototype with Next.js, SQLite, and TMDB. The observation layer (`/test/observation`) is a behavioral calibration system: one title at a time, emotional intent responses, behavioral metadata. Designed to be extracted and integrated into streaming platforms and AI-powered customer experiences.

---

## The Three Layers

| Layer | Strategic Value | Target Use Case |
|-------|----------------|-----------------|
| **Observation Layer** | Behavioral calibration engine — learns from individual response patterns, not aggregate data | Streaming platforms, recommendation engines, AI-powered customer experiences |
| **Interaction Pattern Taxonomy** | Reusable design methodology — pattern/component/experience distinction, behavioral signal stack, emotional job framework | Design teams, AI prototyping workflows, product organizations |
| **Collaboration Framework** | Cross-functional context docs designed for AI agents — each audience has a self-contained file their AI reads independently | Product teams, agencies, AI-assisted workflows |

---

## What We Learned

1. **Ratings don't capture selection behavior.** People choose what to watch based on energy level (low comfort shows, high new/premium). The algorithm needs context, not just preference data.
2. **8 response labels should be 6.** Language testing with 30 synthetic personas showed that users don't distinguish "Not in the mood" from "Not now" or "Maybe later" from "Add to my queue." Two pairs merge. ([language-cluster-analysis](../research/04-language-test.md))
3. **SUS improved from 62.5 to 75.0 across 3 rounds.** The main app's usability moved from "Acceptable" to "Good" by making cards clickable and turning the detail dialog into a full action hub. ([baseline-evaluation](../research/01-baseline-evaluation.md))
4. **The observation prototype scored 74.2 SUS on first test.** Strongest with fast/reactive users (80.0 for Casual Logger). Weakest with deliberate planners who want to see the system act on their input. ([prototype-evaluation](../research/03-prototype-evaluation.md))

---

## What This Means for the Product

- **The observation layer is the recommendation engine's training data.** Every response teaches the system what "not tonight" vs. "not for me" means for this person. The more responses, the better the suggestions get.
- **Discovery and tracking are different jobs.** The observation prototype handles discovery ("would you watch this?"). The main app handles tracking ("mark it watched"). Mixing them — showing ongoing shows in the discovery flow — breaks both experiences.
- **The "This Week" view in Timeline is the breakout feature.** All 3 personas across all rounds identified it as the most universally valuable surface. It merges air-date schedule and ready-to-watch queue into a single temporal view. No competitor does this.

---

## Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Response labels feel like a quiz, not a conversation | High | Language test validated labels against natural speech patterns. Monitor drop-off rates on real users. |
| System collects responses but never visibly acts on them | High | Users (especially curators) need to see the system get smarter. Surface "you usually skip crime dramas on weeknights" as a visible learning signal. |
| Poster preview is undiscoverable | Medium | All 3 personas missed it. Add a persistent "Tap for details" affordance before launch. |
| Energy inference is wrong | Medium | Start with explicit time-of-day signals. Add contextual prompts ("Feeling like a chill watch?") before attempting fully implicit inference. |

---

## Related Docs

- [Design brief — JTBD analysis and energy model](../design/brief.md)
- [Interaction pattern taxonomy](../design/taxonomy.md)
- [All research findings](../research/)
