# Documentation Strategy

_How this repo is organized. Follow this pattern when adding new files._

---

## The System

All documentation lives in `docs/`. No loose `.md` files in the repo root (except the README). Five folders, organized by purpose.

```
docs/
  research/                              # Findings from tests and evaluations
  design/                                # Strategy, briefs, frameworks, thinking
  collab/                                # Living context docs — one per audience
  prompts/                               # Reusable AI prompts and build recipes
  screenshots/                           # UI screenshots — one folder per variant
```

---

## Folder Rules

### `research/` — Findings from tests and evaluations

**Naming:** Number-prefixed (`01-`, `02-`…) so sequence is obvious at a glance.

**When to add:** After every test round — usability test, evaluation, language test, A/B comparison. If it generated SUS scores, walkthrough notes, or synthesis, it goes here.

**Current files:**

| File | What |
|------|------|
| `01-baseline-evaluation.md` | Rounds 1-3 persona walkthroughs, SUS scores, 4Ls |
| `02-prototype-walkthrough.md` | Real user test — 8 findings from first walkthrough |
| `03-prototype-evaluation.md` | Synthetic 3-persona eval (SUS avg 74.2) |
| `04-language-test.md` | Open-text clustering — 8 labels reduced to 6 |
| `05-likert-evaluation.md` | Likert variant eval — both evaluations + combined analysis |

### `design/` — Strategy, briefs, frameworks, thinking

**Naming:** Short nouns (`brief.md`, `taxonomy.md`). No numbering — these aren't sequential.

**When to add:** When framing a problem, defining an approach, or capturing strategic thinking. These are the "what are we building and why" files.

**Current files:**

| File | What |
|------|------|
| `lean-strategy-canvas.md` | Gothelf & Seiden — goal, obstacles, strategy, OKRs |
| `lean-product-canvas.md` | Gothelf & Seiden — problem, outcomes, users, JTBD, hypotheses |
| `brief.md` | JTBD analysis, energy model, prototype specs (P1-P6) |
| `taxonomy.md` | Interaction pattern / component / experience distinction |
| `cyclical-methodology.md` | Discovery/delivery cycles — how the work moves |
| `value-stream.md` | 7 moments of value — consumer experience |
| `implementation-plan.md` | Cycle-based roadmap to SUS 92 |

### `collab/` — Living context docs for cross-functional partners

**Naming:** Named by audience (`product.md`, `engineering.md`). One file per collaborator type.

**When to add:** When a new stakeholder type needs project context. These are living documents — updated as the project evolves, not snapshots.

**Design principle:** Each file is self-contained. A product manager reads only `product.md` and has full context. An engineer reads only `engineering.md`. No dependencies between files. No cross-references required.

**Collaboration over handoff.** These aren't handoff artifacts — they're working docs that cross-functional teams use together. A PM updates the status table. An engineer updates the data model. A designer updates the label recommendations. The docs stay alive because they're useful, not because someone enforces it.

**Current files:**

| File | Audience |
|------|----------|
| `product.md` | Leadership/PMs — learnings, product implications, status |
| `engineering.md` | Devs — architecture, tech debt, data model, design tokens |
| `design.md` | UX/UI — label recommendations, priorities, research refs |
| `marketing.md` | Content/comms — story, differentiators, what not to promise |
| `sales.md` | Partnerships — the moat, API surface, licensing |

### `prompts/` — Reusable AI prompts and build recipes

**Naming:** Verb-prefixed (`build-`, `run-`, `evaluate-`). Named by what they do, not what they contain.

**When to add:** When you create a prompt worth re-running. If it produced good results once, it should produce them again.

**Current files:**

| File | What |
|------|------|
| `build-observation-prototype.md` | Build prompt for observation prototype |
| `build-likert-variant.md` | Build prompt for Likert + diagnostic sub-level variant |
| `run-prototype-evaluation.md` | Eval prompt (general LLM) |
| `evaluate-likert-variant.md` | Eval prompt for Likert variant |

### `screenshots/` — UI screenshots, organized by variant

**Naming:** One folder per variant or view. Numbered files within each folder for sequence.

**When to add:** After any UI change that's worth documenting visually. Screenshots support the research and design docs — they're evidence, not decoration.

**Current structure:**

```
screenshots/
  original/    — Flat layout views, observation card, preview dialog
  likert/      — Likert scale, sub-levels, already-seen flow, toast
```

---

## For a New Project

1. Copy the five empty folders
2. Research starts at `01-` (first test round)
3. Design gets a `brief.md` and `lean-strategy-canvas.md`
4. Collab gets one file per partner audience
5. Prompts get named by what they do
6. Screenshots get a folder per variant

---

## Why This Works

**For humans:** Clear hierarchy. You know where to look for what you need. No hunting through a flat list of 30 files.

**For AI agents:** Each folder has a naming convention that signals purpose. Numbered research files read in order. Verb-prefixed prompts are discoverable. Collab docs are self-contained — an agent can load just the one relevant to the current task.

**For cross-functional teams:** The collab docs mean a marketer doesn't need to read engineering notes, and an engineer doesn't need to read marketing copy. Everyone gets their context, nobody gets overload.

---

_This strategy is itself a reusable artifact. It lives in `docs/` because it's documentation about documentation — and that's exactly where documentation should be._
