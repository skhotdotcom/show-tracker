# Design & UX Context

_Living document. Updated after each research round._

---

## What This Is

Show Tracker is a local-first show tracking app with an experimental observation prototype. The observation prototype (`/test/observation`) presents one content title at a time and asks "How do you feel about this one?" — capturing emotional intent responses instead of traditional ratings. The main app has three views (Classic, Timeline, Session), each a different mental model for the same library.

---

## Response Label Recommendations

The current 8 labels should become 6. Two pairs merge because users don't distinguish them in natural language:

| Current (8) | Recommended (6) | Why |
|-------------|-----------------|-----|
| "This is it" | **"I'm in"** | Most common strong-yes phrase across all personas |
| "Let's start it" | **"I'd watch this"** | Conditional interest — "I'd" not "I will" |
| "Maybe later" + "Add to my queue" | **"Keep it on my radar"** | Users don't separate passive/active deferral. System should infer commitment from behavior. |
| "Not in the mood" + "Not now" | **"Not tonight"** | Users don't separate mood from timing. System logs hour/day context. |
| "Not for me" | **"Not for me"** | Unchanged — clearest permanent rejection across all personas |
| "Already seen it" | **"Already seen it"** | Unchanged — routes to rating flow |

Full analysis with raw response data: [language-cluster-analysis](../research/04-language-test.md)

---

## Category Headers Should Simplify

| Current | Recommended |
|---------|-------------|
| "I'm Interested" | **"Yes"** |
| "Save for Later" | **"Maybe"** |
| "Pass" | **"No"** |

The color does the work. The words just confirm.

---

## Top 5 UX Priorities (from research)

1. **Make the poster preview discoverable.** Add a persistent affordance — all 3 personas missed it in every test round.
2. **Add response confirmation feedback.** A checkmark animation or brief toast before advancing to the next card. Every persona noted the silent transition.
3. **Surface personal score reasoning.** "Based on your history with X" needs to show the connective logic, not just the prediction.
4. **Design a tracking card for ongoing shows.** "How do you feel?" is wrong for shows already in progress. Needs episode progress + "mark watched" — no emotional response options.
5. **Reduce response labels from 8 to 6.** Merge the two pairs identified in language testing.

---

## Research References

- [Usability evaluations — Rounds 1-3](../research/01-baseline-evaluation.md) — SUS progression from 62.5 to 75.0
- [Real user walkthrough](../research/02-prototype-walkthrough.md) — 8 findings from first prototype test
- [Observation prototype evaluation](../research/03-prototype-evaluation.md) — 3-persona synthetic eval (SUS avg 74.2)
- [Language cluster analysis](../research/04-language-test.md) — 30 responses clustered into 6 intent categories
- [Design brief — JTBD and energy model](../design/brief.md)
