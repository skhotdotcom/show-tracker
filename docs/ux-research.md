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

---

## Round 3 — Session & Timeline Views

*Conducted after: Session view (algorithmic watch suggestions, quick-action buttons, available grid, activity history) and Timeline view (Now carousel, This Week temporal grouping, Activity journal) were added as distinct navigation destinations.*

All three personas evaluated both views. Observations are tagged: **◆ Anecdotal** (single persona, notable), **◇◇ Coincidence** (2 personas), **▲ Pattern** (all 3 personas).

---

### Session View

The Session view answers one question: *what should I watch right now?* It surfaces up to three algorithmic suggestions ranked 1–3, an Available Grid of all actionable shows, and a scrollable Activity history. Quick-action buttons (Watched / Start / Done) fire directly from suggestion cards without opening a dialog.

---

#### Cognitive Walkthrough — Session View

##### Persona 1: The General User

**Task: "Open the app. Figure out what to watch tonight."**

| Step | Goal | Action available | Discoverable? | Feedback |
|---|---|---|---|---|
| 1 | Navigate to Session | Tap Session in nav | ⚠️ Nav label not evaluated; must know it exists | — |
| 2 | Read the suggestion | "Watch This Evening" header + 3 ranked cards with reasons | ✅ Immediately visible | — |
| 3 | Understand the ranking | Cards numbered 1–2–3 with reason text | ✅ Opinionated design; easy to scan | — |
| 4 | Act on suggestion | "Watched" or "Start" button on card | ✅ Visible without hover | — |
| 5 | Confirm action worked | — | ❌ No toast, no badge update visible on card | Action is silent |

**Friction:** The time-based greeting ("Watch This Evening") creates a warm, grounded context the General User responds to — it signals the app knows what time it is and is giving a real recommendation. But tapping "Watched" produces no confirmation. The numbered ranking implies authority; the silence after acting undercuts it.

---

##### Persona 2: The Casual Logger

**Task: "I just finished an episode. Log it fast."**

| Step | Goal | Action available | Discoverable? | Feedback |
|---|---|---|---|---|
| 1 | Find the show | Check if it appears in the top 3 suggestions | ✅ High-frequency shows surface here | — |
| 2 | Mark it watched | "Watched" button directly on card | ✅ No dialog required — single tap | Silent |
| 3 | Confirm | — | ❌ No visual confirmation | Must trust it worked |
| 4 | Close | Nothing to close — already on Session | ✅ | — |

**Task: "What's airing for me this week?"**

| Step | Goal | Action available | Discoverable? | Feedback |
|---|---|---|---|---|
| 1 | Find air-date schedule | Look in Session view | ❌ Session has no Coming Soon section | Dead end |
| 2 | Switch to Timeline or Home | Navigate away | ⚠️ Requires knowing another view has this | Interrupts session |

**Friction:** The single-tap Watched button is the fastest interaction in the app — exactly what this persona needs. But Session is self-contained and doesn't surface air dates. The Casual Logger's second most common question (*what's on this week?*) has no answer here.

---

##### Persona 3: The Active Curator

**Task: "Review my queue and decide what to start this week."**

| Step | Goal | Action available | Discoverable? | Feedback |
|---|---|---|---|---|
| 1 | See algorithmic suggestions | Top 3 cards with reasoning | ✅ "Because you watched X" is transparent | — |
| 2 | Understand why a specific show ranked 1st | Read reason text | ✅ Reason is visible | — |
| 3 | Override the ranking | — | ❌ No skip, no deprioritize, no reorder | Algorithm is authoritative, not advisory |
| 4 | Browse all actionable shows | Available Grid | ✅ All watching + queued shown | — |
| 5 | Sort or filter the grid | — | ❌ No sort or filter controls | 20+ shows renders the grid unwieldy |
| 6 | Act on a show | "Start" button or click for dialog | ✅ Both paths exist | — |

**Task: "Log 4 episodes I binged last night."**

| Step | Goal | Action available | Discoverable? | Feedback |
|---|---|---|---|---|
| 1 | Find the show | Available Grid or suggestion | ✅ | — |
| 2 | Tap Watched 4 times | Button on card or in dialog | ⚠️ Quick-action only advances once | Must open dialog for Set Position |
| 3 | Use Set Position | Card → dialog → Set Position → S/E fields → Save | ✅ Works | 4 interactions minimum |

**Friction:** The algorithm reasoning is the Curator's favorite Session feature — they've been asking for *why* in recommendation systems for years. But they can't act on it as an advisor; it acts as a decision-maker. The absence of override, skip, or sort transforms a powerful feature into a passive one for this persona.

---

#### 4 L's — Session View

**Like**
- Time-based greeting ("Watch This Morning / Afternoon / Tonight") — contextual, grounded, warm ◇◇ *P1, P2*
- Single-tap Watched/Start/Done directly from suggestion cards — fastest interaction in the app
- Algorithmic reason text ("Because you watched X / Y") — transparent and trust-building
- Available Grid gives a spatial overview of everything actionable without navigating away

**Love**
- Numbered 1–2–3 ranking on suggestion cards — a genuinely opinionated recommendation, not just a list; the app takes a position ◆ *P1 — anecdotal: the ranking is a bold design choice few apps make*
- Quick-action buttons bypassing the dialog entirely — for the single most common task (mark watched), the friction has been reduced to a single tap

**Lack**
- No feedback after quick actions — Watched / Start / Done are all silent; no badge refresh on the card, no toast, no micro-animation ▲ *Pattern — all 3 personas*
- No Coming Soon context in Session — air dates that would logically influence tonight's choice ("The Bear airs tomorrow, watch it tonight to be caught up") are absent ▲ *Pattern — all 3 personas*
- Algorithm is read-only — no way to skip a suggestion, deprioritize a show, or tell the system "not tonight" ◇◇ *P2, P3*
- Available Grid has no sort or filter — for libraries over 20 titles, the grid becomes a wall of posters with no organizing principle ◆ *P3 — anecdotal*
- History section at the bottom shifts the mental mode from planning to reviewing — two different jobs in one view without a clear dividing line

**Long For**
- "Not tonight" or skip gesture on suggestion cards — deprioritizes without removing; the algorithm should accept pushback ◇◇ *P2, P3*
- Session memory — returning within the same evening shouldn't reset the suggestions ◇◇ *P2, P3*
- Coming Soon integration in the suggestion algorithm — "The Bear airs tomorrow" should influence rank 1 ▲ *Pattern — all 3 personas*
- "Mark through episode" shortcut directly from Session — if a suggestion is ranked 1, you should be able to set your position from that same surface
- A "shuffle" mode for undecided nights — surface a single random queued show rather than a ranked list ◆ *P1 — anecdotal*

---

#### SUS — Session View

| # | Statement | P1 Raw | P1 Adj | P2 Raw | P2 Adj | P3 Raw | P3 Adj |
|---|---|---|---|---|---|---|---|
| 1 | I would like to use this frequently | 4 | 3 | 3 | 2 | 4 | 3 |
| 2 | I found it unnecessarily complex | 2 | 3 | 2 | 3 | 2 | 3 |
| 3 | I thought it was easy to use | 4 | 3 | 5 | 4 | 4 | 3 |
| 4 | I'd need technical support to use it | 1 | 4 | 1 | 4 | 1 | 4 |
| 5 | Functions were well integrated | 3 | 2 | 3 | 2 | 3 | 2 |
| 6 | There was too much inconsistency | 2 | 3 | 2 | 3 | 3 | 2 |
| 7 | Most people would learn it quickly | 4 | 3 | 5 | 4 | 3 | 2 |
| 8 | I found it cumbersome to use | 2 | 3 | 2 | 3 | 2 | 3 |
| 9 | I felt confident using it | 3 | 2 | 3 | 2 | 2 | 1 |
| 10 | I needed to learn a lot before starting | 1 | 4 | 1 | 4 | 1 | 4 |

| Persona | Sum | SUS Score | Rating |
|---|---|---|---|
| P1 — General User | 30 | **75.0** | Good |
| P2 — Casual Logger | 31 | **77.5** | Good |
| P3 — Active Curator | 27 | **67.5** | Acceptable |
| **Average** | — | **73.3** | **Good** |

**P3 gap analysis:** P3 scores 10 points below P2 almost entirely on items 6 (inconsistency), 7 (learnability), and 9 (confidence). The algorithm opacity is the root cause — the Curator can read the recommendation reason but cannot interrogate it, override it, or understand why the ranking changed from yesterday. Confidence requires legibility; the black-box algorithm works against it.

---

### Timeline View

The Timeline view answers: *when is everything happening?* It organizes content into three temporal layers: **Now** (a horizontal carousel of active shows with urgency badges), **This Week** (date-grouped list of airing and ready-to-watch shows), and **Activity** (a chronological journal of past status changes).

---

#### Cognitive Walkthrough — Timeline View

##### Persona 1: The General User

**Task: "Quickly figure out what I should watch and when things are airing."**

| Step | Goal | Action available | Discoverable? | Feedback |
|---|---|---|---|---|
| 1 | See what I'm currently watching | Now carousel — backdrop cards with urgency badges | ✅ First section, visually dominant | — |
| 2 | Understand the urgency badges | "On a roll", "Continue", "Pick back up", "Dive back in" | ⚠️ Labels are expressive, not self-evident | Must infer meaning from context |
| 3 | See what's airing this week | This Week section — Today / Tomorrow / Wed date labels | ✅ Scannable immediately | — |
| 4 | Act on a show | Mark Watched inline or click for dialog | ✅ Both available | Inline action is silent |
| 5 | Understand past activity | Activity journal at bottom | ✅ Clear color-coded bars and labels | — |

**Friction:** The Now carousel is visually compelling but the urgency badge vocabulary requires a one-pass mental calibration. "Dive back in" means you haven't watched in over a week — reasonable, but "Dive" implies effort rather than joy. First-time users will pause to decode the label system before trusting it.

---

##### Persona 2: The Casual Logger

**Task: "Check what's airing for me this week, then mark last night's episode."**

| Step | Goal | Action available | Discoverable? | Feedback |
|---|---|---|---|---|
| 1 | See this week's air dates | This Week section — "Airing" items with day labels | ✅ Immediately scannable | — |
| 2 | Distinguish airing vs. ready | Day label vs. "Start" button | ✅ Visual difference is clear | — |
| 3 | Mark last night's episode | Find show in Now carousel → "Mark Watched" button | ✅ Inline button visible | Silent |
| 4 | Scroll to next show in Now | Horizontal scroll | ✅ | Scroll position not preserved if navigating away |
| 5 | Confirm the action | — | ❌ No toast | Must trust it worked |

**Task: "Check what happened in my viewing history."**

| Step | Goal | Action available | Discoverable? | Feedback |
|---|---|---|---|---|
| 1 | Find activity log | Scroll down past Now and This Week | ⚠️ Activity is the third section | — |
| 2 | Read past events | Color-coded journal entries | ✅ Clear and readable | — |
| 3 | Compare to History tab | Same data, slightly different visual format | ⚠️ Redundant with History tab | — |

**Friction:** This Week is the Casual Logger's ideal surface — it answers "what's on this week?" in one glance. The Now carousel is solid. The Activity section at the bottom creates cognitive overhead: this persona already knows where to find history (the History tab); encountering it again in Timeline interrupts the forward-looking mental model.

---

##### Persona 3: The Active Curator

**Task: "Get a sense of urgency across my whole library and plan the week."**

| Step | Goal | Action available | Discoverable? | Feedback |
|---|---|---|---|---|
| 1 | See all active shows with urgency | Now carousel | ✅ Urgency badges map well to the Curator's mental model | — |
| 2 | Identify what to prioritize | "On a roll" → "Continue" → "Pick back up" → "Dive back in" | ✅ Vocabulary resonates with long-term tracking mindset | — |
| 3 | Spot a problem: "On a roll" shows | Recently-watched shows appear prominently in Now | ⚠️ If you watched something yesterday, it doesn't need tonight's attention | Urgency logic works against the Curator here |
| 4 | See upcoming airing schedule | This Week → date-grouped list | ✅ | — |
| 5 | Defer a show until later in the week | — | ❌ No snooze or defer option | All shows always visible |
| 6 | Filter Timeline by status or urgency | — | ❌ No filter | Carousel scroll is the only navigation |

**Task: "Log last night's episode, check what's next."**

| Step | Goal | Action available | Discoverable? | Feedback |
|---|---|---|---|---|
| 1 | Find the show in Now | Scroll the Now carousel | ✅ | — |
| 2 | Mark Watched inline | Inline button on NowCard | ✅ | Silent |
| 3 | See if the show is still in Now | — | ⚠️ No visual update; card stays, badge doesn't obviously refresh | — |
| 4 | Scroll back to where I was | — | ⚠️ Carousel scroll not preserved | Loses place |

**Friction:** The urgency vocabulary is the Curator's favorite new concept — "On a roll" and "Pick back up" match how they already think about their library. But the logic creates a counterintuitive outcome: a show watched yesterday ranks highest in the carousel because the system interprets recent activity as momentum. For the Curator, yesterday's show is *done for now* — tomorrow's need is the show idle for two weeks.

---

#### 4 L's — Timeline View

**Like**
- Temporal day labels ("Today", "Tomorrow", "Wed") in This Week — the most immediately scannable information architecture in the app ▲ *Pattern — all 3 personas*
- Backdrop art on NowCards — the most visually immersive card format in the app; each active show gets a cinematic treatment
- Urgency badge vocabulary ("On a roll", "Continue", "Pick back up") — expressive and emotional labels that go beyond generic status names
- Separation of "Airing" vs. "Ready" in This Week — makes the distinction between scheduled content and available queue clear without explanation ◇◇ *P1, P2*

**Love**
- This Week merging air-date schedule and ready-to-watch queue into a single temporal view ▲ *Pattern — all 3 personas — this is the most universally valued feature in either view*
- NowCard with inline Mark Watched button — action available without opening a dialog, within the most visually prominent card format

**Lack**
- Silent feedback after inline actions — NowCard "Mark Watched" and This Week "Start" produce no confirmation ▲ *Pattern — all 3 personas*
- Urgency badge labels require first-pass decoding — "Dive back in" is charming but not self-evident on encounter ◇◇ *P1, P2*
- Now carousel scroll position resets on navigation away and back ◇◇ *P2, P3 (same complaint logged against Home carousel in Round 2; three views now exhibit this)*
- Activity section duplicates the History tab — redundant for forward-planning contexts, adds scroll burden ◇◇ *P2, P3*
- "On a roll" shows (watched today/yesterday) appear prominently in the Now carousel — momentum logic counterproductively surfaces recently-watched shows when the actual need is for the neglected queue ◆ *P3 — anecdotal: the urgency algorithm is correct in theory but miscalibrated; high-recency shouldn't equal high priority tonight*
- No defer or snooze on Now carousel items — all active shows always present with no way to say "not this week" ◇◇ *P2, P3*

**Long For**
- An air-date calendar grid — a 7-day week view with shows plotted spatially by day; Timeline's temporal concept taken to its natural conclusion ◆ *P3 — anecdotal*
- Urgency badge legend or tooltip — a single labeled key that explains the five tiers; would resolve the first-pass decode cost for P1 and P2
- "On a roll" re-classification — shows watched within 24 hours should show as "Fresh" rather than a high-priority suggestion; the algorithm should separate momentum from tonight's recommendation ◆ *P3 — anecdotal*
- Collapse or minimize the Activity section — a chevron to hide the journal for users in forward-planning mode ◇◇ *P2, P3*
- Carry the carousel scroll position across navigation ▲ *Pattern — this is the third view (Home, Session grid, Timeline Now carousel) where scroll loss breaks the flow*

---

#### SUS — Timeline View

| # | Statement | P1 Raw | P1 Adj | P2 Raw | P2 Adj | P3 Raw | P3 Adj |
|---|---|---|---|---|---|---|---|
| 1 | I would like to use this frequently | 4 | 3 | 4 | 3 | 5 | 4 |
| 2 | I found it unnecessarily complex | 2 | 3 | 2 | 3 | 2 | 3 |
| 3 | I thought it was easy to use | 3 | 2 | 4 | 3 | 3 | 2 |
| 4 | I'd need technical support to use it | 1 | 4 | 1 | 4 | 1 | 4 |
| 5 | Functions were well integrated | 4 | 3 | 4 | 3 | 3 | 2 |
| 6 | There was too much inconsistency | 2 | 3 | 2 | 3 | 3 | 2 |
| 7 | Most people would learn it quickly | 3 | 2 | 4 | 3 | 3 | 2 |
| 8 | I found it cumbersome to use | 2 | 3 | 2 | 3 | 2 | 3 |
| 9 | I felt confident using it | 3 | 2 | 4 | 3 | 4 | 3 |
| 10 | I needed to learn a lot before starting | 2 | 3 | 1 | 4 | 2 | 3 |

| Persona | Sum | SUS Score | Rating |
|---|---|---|---|
| P1 — General User | 28 | **70.0** | Good |
| P2 — Casual Logger | 32 | **80.0** | Good |
| P3 — Active Curator | 28 | **70.0** | Good |
| **Average** | — | **73.3** | **Good** |

**P2 ceiling effect:** P2 scores 10 points above P1 and P3 because This Week maps perfectly to their core question ("what's on this week?"). The view was effectively designed for this mental model. P1 and P3 score equally lower — P1 on learnability (badge vocabulary), P3 on integration and consistency (three layout patterns — carousel, list, journal — require different interaction modes in one scroll).

---

### Cross-View Observations — Round 3

#### ▲ Patterns (all 3 personas)

1. **Silent actions are the single largest remaining UX debt.** Every primary action across both views — Watched, Start, Done, Mark Watched, Mark Complete — fires without confirmation. The detail dialog at least closes to signal completion; quick-action buttons on Session cards and Timeline NowCards give nothing. Every persona independently articulated uncertainty about whether the action registered. *Affects: Session quick-action buttons, Timeline NowCard inline buttons, and (from Round 2) the detail dialog itself.*

2. **"This Week" in Timeline is the most universally valued feature in either view.** All three personas identified the merged air-date + ready-to-watch temporal grouping as genuinely novel. No comparable tracker surfaces this information in a single dated list. The Casual Logger sees their primary question answered immediately; the General User gets a planning view they didn't know they needed; the Curator treats it as a scheduling tool. This is the feature most likely to drive return visits.

3. **Session view's algorithm should incorporate air-date data.** All three personas expected that "airing tomorrow" would influence what Session surfaces as rank 1 tonight. An algorithmically opinionated view that ignores the most time-sensitive variable in the domain — scheduled broadcast — is making suggestions with incomplete information. The algorithm already uses recency and momentum; deadline proximity is the missing third input.

4. **Scroll position loss is a cross-view pattern, not an isolated bug.** This is the fourth surface where scroll resets on navigation: Home Continue Watching carousel (fixed in Round 1), Session Available Grid (implied), Timeline Now carousel (confirmed in Round 3). For every view that uses horizontal scrolling, the expected behavior is that your position is preserved. The fix in Round 1 should be applied systematically.

---

#### ◇◇ Coincidences (2 personas)

1. **Urgency badge vocabulary in Timeline is charming but not immediately legible** (P1, P2). Both personas paused at "Dive back in" and "Pick back up" on first encounter. The labels are more evocative than functional on first pass — their meaning becomes clear in context, but a one-time legend or brief tooltip would eliminate the decode cost without redesigning the system.

2. **Session needs a "skip" or "not tonight" gesture** (P2, P3). Both the Casual Logger and the Curator independently described wanting to push back on a suggestion without removing the show. The algorithm's authority is appropriate — but it should accept human input. A swipe-dismiss or three-dot menu with "Remind me tomorrow" would make the system advisory rather than prescriptive.

3. **Activity section in Timeline is redundant for forward-planners** (P2, P3). Both personas found the history journal at the bottom of Timeline incongruous with the view's temporal framing. The History tab already owns the activity log; duplicating it in Timeline adds scroll distance without additive information. A collapse toggle or default-collapsed state would let each persona configure the view to match their mental model.

4. **Time-based greeting in Session lands as warm and contextually aware** (P1, P2). Both the General User and the Casual Logger responded positively to "Watch This Morning / This Afternoon / Tonight" — it's a small detail that signals the app is aware of where you are in the day. Neither persona could articulate exactly why it felt right; it simply reduced the gap between the app and reality.

---

#### ◆ Anecdotals (single persona, notable)

1. **The numbered 1–2–3 ranking in Session is a genuinely bold design choice** (P1). Most recommendation surfaces present a list and pretend the order is incidental. The explicit ranking implies authority — the app is saying "watch this first." P1 responded to that confidence. The risk is that the ranking needs to be right; an incorrect rank 1 is more jarring than an incorrect item 1 in an unranked list. The feature raises the stakes on the algorithm.

2. **Available Grid in Session becomes a wall of posters at 20+ titles** (P3). With no sort or filter, the grid is organized by add-order only. The Curator's library is too large for the grid to function as a planning surface. A sort by "last watched", "urgency", or "title" — or even the same inline status filter proposed in Round 2 — would make the grid useful at scale.

3. **"On a roll" shows are counterproductively surfaced in the Now carousel** (P3). The urgency system assigns highest priority (score 95–100) to shows watched today or yesterday. For the Curator, a show watched yesterday is *not* the highest-priority show tonight — it's the one they're least likely to skip. The actual urgent shows are the ones idle for 8+ days. The "On a roll" logic serves momentum, but in a Tonight planning context, momentum and urgency are different variables. A calibration pass — separating "recently active" from "tonight's priority" — would make the system more useful for deliberate planners.

---

### SUS Summary — Round 3

| View | P1 | P2 | P3 | Average | Rating |
|---|---|---|---|---|---|
| Session | 75.0 | 77.5 | 67.5 | **73.3** | Good |
| Timeline | 70.0 | 80.0 | 70.0 | **73.3** | Good |

Both views land in the Good band. The per-persona spread tells the more useful story:
- **P3 drags Session** — algorithm opacity, no override, no grid sort. The view was designed for decision support; the Curator needs decision partnership.
- **P2 lifts Timeline** — This Week is a direct answer to their primary question. The view is at its best when it's being used as a schedule, not a history.
- **The ceiling for both views is the same thing:** silent actions. Addressing this with toast notifications and micro-animations would push both scores into the Excellent band for P1 and P2. P3's gap in Session requires the deeper fix: algorithm transparency and user override.

---

## Changelog

| Date | Round | SUS | Key finding |
|---|---|---|---|
| Mar 2026 | Round 1 — Baseline | 62.5 (Acceptable) | Hover-only interaction path; cards look decorative; scroll resets on every action |
| Mar 2026 | Round 2 — Post-fix | 75.0 (Good) | Card click + dialog hub resolved core discoverability; silent feedback and fragmented library are the remaining blockers |
| Mar 2026 | Round 3 — Session & Timeline | 73.3 avg (Good) | This Week is the breakout feature; silent actions and scroll loss are systemic across all views; Session algorithm needs air-date input and user override |
