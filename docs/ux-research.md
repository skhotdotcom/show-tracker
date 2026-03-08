# UX Research — Show Tracker

Two rounds of evaluation conducted during active development. Each round used a cognitive walkthrough, SUS scoring, and a 4 L's debrief. Round 1 established a baseline and identified the core interaction problem. Round 2 re-evaluated after fixes using two distinct mental model personas.

---

## Personas

### Persona 1 — The General User *(Round 1 baseline)*

An undifferentiated user with a modest watchlist. Opens the app to check what's on and log recent watches. Represents the lowest common denominator — not a power user, not a casual one. Used to establish the baseline SUS and identify the single biggest interaction gap: **nothing on the app indicates that cards are interactive**.

Mental model the app needs to establish:
> "Cards show me what I'm watching. I click a card to do something with it. The detail dialog is my control panel for that show."

---

### Persona 2 — The Casual Logger *(Round 2)*

**Profile:** Watches 3–5 ongoing shows at once. Opens the app reactively — after an episode, to check what's on next, or to glance at the schedule. Sessions are short (30 seconds to 2 minutes), frequent (4–5× per week). Doesn't think in terms of "status management."

**Mental model:** *A TV remote. Show me what I'm watching and let me tick off an episode.*

**Core loop:** Finish episode → open app → mark it → see what's next → close.

---

### Persona 3 — The Active Curator *(Round 2)*

**Profile:** Maintains a library of 20+ titles across all states: watching, queued, completed, dropped. Plans what to watch next deliberately. Rates, writes notes, moves things between statuses. Sessions are longer (5–10 minutes) but less frequent. Thinks about the collection as a whole.

**Mental model:** *A personal media ledger. Like Letterboxd or Goodreads — a living record of everything I've watched and want to watch.*

**Core loop:** Browse queue → pick next show → start it → track progress → complete → rate/note → find next.

---

## Round 1 — Baseline Evaluation

*Conducted before: detail dialog action hub, card click target, scroll preservation, Coming Soon / History click-to-detail.*

### Cognitive Walkthrough

**Scenario A: Evening check-in, continue where I left off**

| Step | Current experience | Pain point |
|---|---|---|
| Open app | Continue Watching visible | ✓ |
| Find the show | Right show, right episode badge | ✓ |
| Mark episode watched | Must hover card to reveal overlay, then click Watched | No affordance that hover does anything |
| After action | Carousel jumps to position 0 | Must re-scroll to find the next show |
| Repeat | Same scroll reset every time | Highest-frequency action breaks your place every time |

After fixes: Click card → dialog → Mark Watched → dialog updates in place → close → carousel stays where it was.

---

**Scenario B: Log a rating and note after finishing a show**

| Step | Current experience | Pain point |
|---|---|---|
| Mark last episode watched | Show disappears from Continue Watching | ✓ |
| Switch to History | Find it, stars visible | ✓ |
| Write a note | Nothing in the history row suggests this is possible | Notes feature is effectively invisible |

After fixes: History row click → detail dialog → notes textarea and rating in one place.

---

**Scenario C: Start a queued show tonight**

| Step | Current experience | Pain point |
|---|---|---|
| Go to Watch Next | See the show — poster, title, nothing else | — |
| Start watching | Must hover → "Watch" button appears | Completely hidden. Nothing suggests the card is actionable. |

After fixes: Click card → dialog → "Start Watching" as a prominent CTA.

---

**Scenario D: Check Coming Soon, read about one**

| Step | Current experience | Pain point |
|---|---|---|
| Find Coming Soon | Scroll to 3rd section | Section ordering buries time-sensitive content |
| Read info | Show, episode name, date, days remaining | ✓ |
| Get more detail | Click row → nothing happens | Dead end. Must look it up elsewhere. |

---

### 4 L's (Round 1)

**Like**
- Visual design — 16:9 stills with episode badges look polished
- Continue Watching / Coming Soon split based on air date, not just status
- Episode name below the show title on cards — small detail, saves a lookup
- "View All" grid toggle in carousels
- Optimistic UI — the app feels fast

**Love**
- Mark Watched auto-advancing through season boundaries — smart and rare in tracker apps
- The Coming Soon concept — knowing exactly what and when without checking TMDB
- Star ratings in history — simple, tactile

**Lack**
- Any affordance that cards are interactive — they look decorative
- The detail dialog being a real action hub — it currently can't do the core job
- Scroll position memory in carousels — single biggest flow-breaker
- A "just finished" moment — no acknowledgment when you complete a show
- Discoverability for notes — invisible unless you already know it's there
- Coming Soon being read-only — those rows want to be tappable

**Long For**
- Click card → everything I need, no hover ritual
- Some form of completion ceremony when you finish a show
- Ability to see a show's episode list or season overview in the detail dialog
- A "what should I watch tonight" quick pick feature

---

### SUS Score (Round 1)

| # | Statement | Raw (1–5) | Adjusted |
|---|---|---|---|
| 1 | I would use this frequently | 4 | 3 |
| 2 | I found it unnecessarily complex | 2 | 3 |
| 3 | I thought it was easy to use | 3 | 2 |
| 4 | I'd need technical support to use it | 2 | 3 |
| 5 | Functions were well integrated | 3 | 2 |
| 6 | There was too much inconsistency | 3 | 2 |
| 7 | Most people would learn it quickly | 3 | 2 |
| 8 | I found it cumbersome to use | 2 | 3 |
| 9 | I felt confident using it | 3 | 2 |
| 10 | I needed to learn a lot before starting | 2 | 3 |

**Sum of adjusted scores: 25 × 2.5 = SUS 62.5**

**Rating: Acceptable (51–70).** The visual design and feature set are strong enough that users would return, but discoverability problems mean they'd consistently under-use what's there.

---

## Round 2 — Post-Fix Evaluation

*Conducted after: detail dialog action hub, card click target, ID-based state sync, carousel scroll preservation, Coming Soon click-to-detail, History click-to-detail.*

Two walkthroughs run in parallel — one for each persona.

---

### Cognitive Walkthrough — Persona 2: The Casual Logger

**Task 1: "I just finished S01E02 of Monarch. Log it."**

| Step | Goal | Action available | Discoverable? | Feedback |
|---|---|---|---|---|
| 1 | Find the show | Continue Watching carousel, S01E02 badge visible | ✅ Immediate on open | — |
| 2 | Mark the episode | Click card → dialog → green Mark Watched button | ✅ Primary button, well-placed | Dialog stays open, badge updates to S01E03 |
| 3 | Return to overview | Escape / click backdrop | ⚠️ Implicit, no "Done" CTA | No toast or animation confirms the action |

**Friction:** Dialog stays open after Mark Watched. The Casual Logger's expectation is *I did the thing, I'm done* — the dialog should auto-close or pulse a success state. Staying open creates a moment of "did that work?"

---

**Task 2: "What episodes are coming up for me this week?"**

| Step | Goal | Action available | Discoverable? | Feedback |
|---|---|---|---|---|
| 1 | Find the schedule | Scroll down past Watch Next to Coming Soon | ⚠️ 3rd section, requires scroll | — |
| 2 | Read the info | Show, episode name, date, days remaining | ✅ Dense and clear | — |
| 3 | Get more detail | Click row → detail dialog | ✅ Now clickable | Full detail |

**Friction:** Coming Soon is the most time-sensitive content and it's third in scroll order — after Watch Next, which the Casual Logger rarely uses. A user who only glances at the top half may never discover it.

---

**Task 3: "I finished a whole series — mark it done."**

| Step | Goal | Action available | Discoverable? | Feedback |
|---|---|---|---|---|
| 1 | Find the show | Continue Watching carousel | ✅ | — |
| 2 | Mark complete | Click card → "Mark Complete" button | ✅ Blue button, visible | Show disappears from carousel |
| 3 | Verify it was recorded | Scroll to History tab | ⚠️ No in-context confirmation | Must navigate away to verify |

**Friction:** Show vanishes silently. No toast, no "Moved to History: The Crown ✓." Creates low-grade anxiety about whether the action completed.

---

### Cognitive Walkthrough — Persona 3: The Active Curator

**Task 1: "Move DTF St. Louis from my queue to now watching."**

| Step | Goal | Action available | Discoverable? | Feedback |
|---|---|---|---|---|
| 1 | Find the show | Watch Next carousel | ✅ | — |
| 2 | Change status | Click card → "Start Watching" button | ✅ Clear button | Show disappears from Watch Next |
| 3 | Confirm it moved | Scroll up to Continue Watching | ⚠️ No auto-focus or toast | Must hunt to verify |

**Friction:** Same silent transition problem — but matters more to the Curator, who tracks the exact status of every item.

---

**Task 2: "Add a show I'm already partway through — I'm on S02E03."**

| Step | Goal | Action available | Discoverable? | Feedback |
|---|---|---|---|---|
| 1 | Add the show | Add Show → search → select | ✅ | Added to queue |
| 2 | Change to watching | Find in Watch Next → click → "Start Watching" | ⚠️ Separate flow | Moved to Continue Watching |
| 3 | Set correct episode | Click it again → "Set Position" → enter S02E03 | ⚠️ Third flow, 4 interactions | Position updated |

**Friction:** Adding a show you're mid-stream through requires three separate sessions with the app (add → start → position). The worst flow in the app for the Curator. An "I'm already watching this — set starting episode" option in the add dialog would collapse it to one.

---

**Task 3: "See my full library in one place."**

| Step | Goal | Action available | Discoverable? | Feedback |
|---|---|---|---|---|
| 1 | See all watching | Continue Watching → View All (grid) | ✅ | Grid view |
| 2 | See all queued | Watch Next → View All (grid) | ✅ | Grid view |
| 3 | See completed/dropped | History tab → filter | ✅ | List view |
| 4 | See everything at once | ❌ No unified library view | ❌ | Must hold it in memory |

**Friction:** Library is fragmented across 3 sections, 2 scroll positions, and a tab switch. Each section also uses a different visual treatment. The Curator's mental model is a single collection with filters — the app's model is separate rooms for each status.

---

**Task 4: "I binged 4 episodes last night — log them all."**

| Step | Goal | Action available | Discoverable? | Feedback |
|---|---|---|---|---|
| 1 | Log each episode | Mark Watched × 4 or use Set Position | ✅ Both work | Each tap advances badge |
| 2 | One-shot log to specific episode | Set Position → enter S02E05 → Save | ✅ Works | Position jumps |

**Friction:** Set Position requires 4 interactions (pencil → S field → E field → Save). Many users won't think to use it — the natural impulse is to tap Mark Watched repeatedly. A "mark up to episode…" option would serve binge-watchers directly.

---

### 4 L's (Round 2)

**Like**
- Episode badge on cards (S01E02) — progress is visible at a glance, no interaction needed
- Coming Soon air-date countdown — "4 days" vs. "Mar 11" vs. episode title all in one row; no comparable tracker shows this level of context
- Backdrop art in the detail dialog — makes every interaction feel specific to the show, not generic
- Carousel section labels — "Continue Watching" and "Watch Next" map directly to how people actually think; not "Active" and "Queue"
- AI Recommendations with reasoning — "Because you enjoy intense, action-packed dramas" is transparent and trustworthy; the explanation makes the recommendation credible

**Love**
- The detail dialog as a full action hub — everything in one place: position, status, rating, notes, delete. A user rarely wants to do *just one* thing to a show — the dialog serves the full intent in one surface.
- Optimistic UI throughout — tapping Mark Watched is instant; the badge flips before the server responds; no spinner, no "saving…" state; this is the single biggest UX upgrade that most people can't articulate but everyone feels
- Coming Soon as a planning surface — seeing "RuPaul's Drag Race S18E11 — 5 days" gives a calendar-level view of your media week; genuinely unique and emotionally engaging

**Lack**
- Silent actions throughout — Mark Watched, Mark Complete, Start Watching, Drop — all silent; every primary action should have a 2-second confirmation
- Coming Soon is buried third — below Watch Next, which the Casual Logger almost never needs; the most time-sensitive content on the page is in the third position
- No queue ordering — Watch Next is in add-order only; the Curator's core organizing behavior (*what do I want to watch next?*) has no support
- Mid-series add flow is 3 steps — adding a show you're already watching takes three separate dialogs; should collapse into one
- History list loses episode data — completed shows show status and date but not the episode you ended on; "finished at S3E8" is a detail the Curator will want in 6 months
- Recommendation cards are one-way — you can Add to Queue but you can't click through for a detail dialog, overview, or genre tags; the rec is a dead end
- No sort or filter on any carousel — with 8+ active shows, carousel order is arbitrary; no "most recently watched first" or "shortest remaining" sort available

**Long For**
- "Mark through episode" binge shortcut — a single interaction to say "I watched through S02E04"; one field, one save; binge-watching is a real pattern and the UI should have an opinion on it
- Inline status filter on Home — a toggle row: All · Watching · Queue · Coming Soon; surfaces the full library in one place without needing to know about a History tab
- Toast + transition after status changes — even "✓ The Crown moved to History" fading in for 2 seconds would make every action feel complete and confident
- Queue ordering / priority pin — drag-to-reorder, or a ★ pin to push a show to the front of Watch Next; this is the #1 Curator feature gap
- "Already watching" path in Add Show — a toggle: "Starting fresh" vs "Already watching" → shows an episode picker inline so position is set at add time
- Rating prompt on Mark Complete — a lightweight prompt while the feeling is fresh; right now rating requires remembering to go back

---

### SUS Score (Round 2)

| # | Statement | Raw (1–5) | Adjusted |
|---|---|---|---|
| 1 | I think I would like to use this frequently | 5 | 4 |
| 2 | I found the system unnecessarily complex | 2 | 3 |
| 3 | I thought the system was easy to use | 4 | 3 |
| 4 | I think I would need technical support | 1 | 4 |
| 5 | I found the functions well integrated | 3 | 2 |
| 6 | I thought there was too much inconsistency | 3 | 2 |
| 7 | Most people would learn this quickly | 4 | 3 |
| 8 | I found the system very cumbersome to use | 2 | 3 |
| 9 | I felt very confident using the system | 3 | 2 |
| 10 | I needed to learn a lot before getting going | 1 | 4 |

**Sum of adjusted scores: 30 × 2.5 = SUS 75**

**Rating: Good (68–80.3).** Comfortably above the Acceptable threshold, not yet at Excellent.

**Delta from Round 1: +12.5 points.**

- **+7** from removing hover-only as the sole interaction path (card click → dialog)
- **+5** from the detail dialog becoming a full action hub instead of a read-only view

**Remaining gap to Excellent** comes almost entirely from two things:
1. **Silent feedback after actions** — affects items 5, 6, 9 (integration, consistency, confidence); solvable with toast notifications and micro-animations
2. **Fragmented library model** — affects items 5, 6; solvable with an inline status filter on the home view without structural changes

---

## Changelog

| Date | Round | SUS | Key finding |
|---|---|---|---|
| Mar 2026 | Round 1 — Baseline | 62.5 (Acceptable) | Hover-only interaction path; cards look decorative; scroll resets on every action |
| Mar 2026 | Round 2 — Post-fix | 75.0 (Good) | Card click + dialog hub resolved core discoverability; silent feedback and fragmented library are the remaining blockers |
