# Lean Product Canvas

_Gothelf & Seiden framework (renamed from Lean UX Canvas). Source: https://jeffgothelf.com/blog/the-the-lean-product-canvas/_

Product-level canvas for the observation layer — the highest-priority IP layer. Strategy defined in the Lean Strategy Canvas.

---

## Box 1: Business Problem

People choose what to watch based on energy, mood, and context — but recommendation engines only know ratings, genre, and availability. The gap: the algorithm doesn't know you're eating dinner, you're tired, and RPDR is a no-brainer in that context, while Star Trek requires more attention than it gets credit for.

This problem exists across all content platforms, not just show tracking. The observation layer is the bridge — a reusable module of interaction patterns that adapts across platforms and gives customers control over their time and attention.

---

## Box 2: Business Outcomes (OKRs)

**Who does what by how much?**

| Outcome | Metric |
|---------|--------|
| Users respond to content suggestions with emotional intent labels | 80%+ response rate on presented titles |
| System learns individual behavioral patterns over time | SUS score improves from 62.5 → 80+ across iterations |
| Behavioral calibration outperforms collaborative filtering | Suggestion acceptance rate increases with signal volume (target: 60%+ after 20 exchanges) |
| Partners integrate the observation layer into their stack | 1+ licensing or integration conversation within 6 months |

---

## Box 3: Users

| Segment | Mental Model | Primary Jobs |
|---------|-------------|--------------|
| **Content consumers** (watchers) | "Remote control" / "What's on tonight?" | M4 (freshness), M5 (uncommitted interest), dinner decision moment |
| **Content curators** (planners) | "Personal media ledger" — Letterboxd for everything | M1 (log fast), M2 (binge shortcut), M5 (on radar), M6 (tried it) |
| **Content platforms** (partners) | "Differentiate our AI experience" | Calibration layer integration, behavioral data enrichment |
| **Product teams** (internal) | "How do I build AI prototypes that learn?" | Collaboration framework, interaction pattern taxonomy |

---

## Box 4: Users' Goals (Jobs to Be Done)

| ID | Job | Context | Emotional Job |
|----|-----|---------|---------------|
| M1 | "Log an episode fast" | Just finished, move on with life | Relief |
| M2 | "Set position after a binge" | Watched 3-4 eps, need to catch up | Relief |
| M3 | "Air day → watch day translation" | Know when it's available for me | Permission |
| M4 | "Anything new I haven't seen?" | Dinner decision moment | Relief |
| M5 | "Track uncommitted interest" | "I think I have a season of Hacks" | Permission |
| M6 | "Decide if it's worth continuing" | Fallout: 2 eps, rating 2, done | Closure |
| M7 | "Tell me when X is available" | Devil Wears Prada, Hunger Games | Patience / Anticipation |

---

## Box 5: Solutions

| Job | Solution | Prototype |
|-----|----------|-----------|
| M1 | Mark Through — 2-tap binge shortcut | `components/show-card.tsx` |
| M2 | Mark Through — episode picker modal | `components/show-detail-dialog.tsx` |
| M3 | Day-of-week translation + "+1 air-day" | `app/views/temporal/page.tsx` |
| M4 | Session view — ranked suggestions with reason text | `app/views/session/page.tsx` |
| M5 | On Radar state (not yet built) | Planned |
| M6 | Tried It state (not yet built) | Planned |
| M7 | Notify Me / Pending pattern (not yet built) | Planned |
| **All** | Observation layer — emotional response suggestion loop | `app/test/observation/page.tsx` |

---

## Box 6: Hypothesis

**We believe that** [content consumers and curators]
**will** [respond to emotional intent labels instead of star ratings]
**because** [they already think about content in mood/energy terms, not numerical terms].
**We will know this is true when** [80%+ of presented suggestions receive a response, and natural language clustering matches the proposed label taxonomy].

**Secondary hypothesis:** We believe that the observation prototype's calibration loop — learning from individual response patterns — will outperform collaborative filtering for content discovery. We will know this is true when suggestion acceptance rate increases with signal volume, reaching 60%+ after 20 behavioral exchanges.

---

## Box 7: MVP / Experiments

### Experiment 1: Response Language Validation
- **What:** Open-text language capture (`/test/observation/language`)
- **Status:** Complete — 30 synthetic responses, 6 clusters emerged
- **Result:** 8 labels reduced to 5 based on natural speech patterns
- **Next:** Validate with 10+ real users

### Experiment 2: Behavioral Calibration Loop
- **What:** Observation prototype logging responses with behavioral metadata
- **Status:** Built and tested (SUS 74.2)
- **Result:** Response logging works, calibration accuracy not yet measured
- **Next:** Track suggestion acceptance rate as signal volume increases

### Experiment 3: Poster Preview Discoverability
- **What:** Click poster → lightbox with cast, tagline, extended description
- **Status:** Built, tested
- **Result:** All 3 personas missed it. Decision quality changed when found.
- **Next:** Add persistent affordance (tap for details, info icon)

### Hypothesis Prioritization

Use the [Hypothesis Prioritization Canvas](https://jeffgothelf.com/blog/the-lean-product-canvas/) to decide which hypothesis to test next. Current priority:

1. **Response language** — validated synthetically, needs real users
2. **Calibration accuracy** — needs signal volume to measure
3. **Poster discoverability** — fix is known, low effort

---

## Relationship to Other Frameworks

- **Lean Strategy Canvas** (preceding) — sets the goal, obstacles, strategy, and OKRs
- **JTBD Micro-Jobs (M1–M7)** — feeds Box 4 (Users' Goals)
- **Interaction Pattern Taxonomy** — informs Box 5 (Solutions) with pattern/component/experience distinctions
- **COM-B Behavioral Analysis** — underlies the emotional job layer in Box 4

---

_Source: Gothelf & Seiden, "The Lean Product Canvas" (2024) — renamed from Lean UX Canvas — https://jeffgothelf.com/blog/the-lean-product-canvas/_
