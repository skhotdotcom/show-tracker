# Show Tracker — Project Backlog

## Current Goal
**SUS 92** (top 10%). Current: 83.8 midpoint. Gap: 8.2 points.

---

## Active

### Tier 1 — Highest leverage, both evaluations agree
- [ ] **Fix poster discoverability** — replace hover-only "Preview" badge with persistent affordance (info icon or "Tap for details"). Low effort, all 3 personas flag this.
- [ ] **Display sub-response labels in history/toast** — show "The cast" not "the_cast". Low effort.
- [ ] **Sub-response in toast** — "Title — emoji response (diagnostic)". Low effort.

### Tier 2 — Curator workflow fixes (closes P3 gap to 92)
- [ ] **Add revision capability to history panel** — let users change a response after the fact. Medium effort.
- [ ] **Add "Add to my list" in "I'd watch this" sub-level** — restores planning action lost from flat layout. Low effort.
- [ ] **Optional notes in "Already seen it"** — P3 wants precision beyond emotional labels. Low effort.

### Tier 3 — New opportunities
- [ ] **Real-time session adaptation** — stop showing genre if user skips 3 in a row. Medium effort.
- [ ] **Comparison view** — "You rated similar shows: Broadchurch (👍)". High effort.

### Future Builds (P1–P6)
- [ ] **Build "Tonight's Pick"** — energy-aware single-card recommendation (P1)
- [ ] **Build "Mark Through"** — 2-tap binge shortcut (P2)
- [ ] **Build "Freshness Pulse"** — "3 new episodes since last check" (P3)
- [ ] **Add "On Radar" and "Tried It" states** (P4/P5)
- [ ] **Build "Notify Me"** for upcoming titles (P6)

### Design Work
- [ ] **Pre-release content interaction** — M7 "Notify Me" as "Pending" pattern
- [ ] **Descriptive rating flow** — replace stars with behavioral language
- [ ] **Business outcomes doc** — companion to value stream for B2B2C positioning

## Waiting On
- Real user testing (synthetic evaluations are complete)

## Done
- [x] Observation prototype built (Claude Code)
- [x] Response language validated (8 → 5 + "Already seen it")
- [x] Likert + diagnostic sub-level variant built (747 lines)
- [x] Two evaluations complete (Eval A: 75.8, Eval B: 91.7, midpoint: 83.8)
- [x] Documentation consolidated (DOCUMENTATION-STRATEGY.md)
- [x] Screenshots consolidated (docs/screenshots/{original,likert}/)
- [x] Collab docs, value stream, implementation plan created
