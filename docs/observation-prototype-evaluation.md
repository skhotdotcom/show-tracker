# Observation Prototype Evaluation — Unbiased Synthetic Personas

**Method:** Cognitive Walkthrough + SUS + 4 L's
**Personas:** 3 (General User, Casual Logger, Active Curator)
**Date:** March 15, 2026
**Object of evaluation:** `app/test/observation/page.tsx` — the observation micro-interaction prototype
**Bias control:** Personas evaluated the prototype source code fresh. No prior test findings or known bugs were referenced.

---

## What the Prototype Does

The observation prototype presents one content title at a time — either a TV episode or a movie — and asks "How do you feel about this one?" The user picks from response options that express emotional intent. Every response is logged to the observation API with behavioral metadata (dwell time, hour of day, day of week, revision count).

**The actual response options (from source code):**

| Category | Options |
|----------|---------|
| I'm Interested | "This is it" / "Let's start it" |
| Save for Later | "Maybe later" / "Add to my queue" |
| Pass | "Not in the mood" / "Not for me" / "Not now" / "Already seen it" |

The card shows: poster/still image (clickable for preview), title, episode label (for TV), description, air date, runtime (movies), social rating (blue star), genre chips, and a personal score ("We think you'll rate this X/5 based on your history with Y").

Clicking the poster opens a preview dialog with: full backdrop image, extended description, series overview (collapsible for TV), cast (top 5 billed with photos), and the personal score.

Below the response buttons: a history panel showing previous choices with expandable "change your mind?" revision options.

---

## Persona 1: The General User

*Watches 5-8 shows, short sessions, occasional. Mental model: "The app shows me what I'm watching. I want it to feel like a remote control."*

### Task 1 — First Impression

Opening the page: a single card with a cinematic image, title over a gradient, and description below. The "1 / 10" counter in the header tells me there's a queue of suggestions. "What should you watch?" is direct — not pretentious, just helpful.

The response options are grouped into three labeled rows: "I'm Interested," "Save for Later," "Pass." The grouping makes sense immediately — green options are yes, amber is maybe, red-ish is no. The color coding does most of the work. I don't need to read every label to understand the structure.

"This is it" feels decisive — like I've made up my mind. "Let's start it" feels lighter — I'm willing but not excited. That distinction is clear. "Maybe later" vs. "Add to my queue" is less clear — both mean "not now but interested." What's the difference? One feels passive (maybe later) and the other active (add to my queue), but I'm not sure the system treats them differently.

The "Pass" row has four options, which feels like a lot. "Not in the mood" and "Not now" feel very similar to me. One is about mood, one is about timing — but when I'm browsing, I don't distinguish those.

### Task 2 — Response Selection (Scarpetta S1E08)

Drama/crime/mystery. Rating 6.3. Nicole Kidman, Jamie Lee Curtis. Never seen it.

First scan: the poster image is atmospheric but I don't recognize the show. I read the description — something about a forensic pathologist. The genres (Drama, Crime, Mystery) don't excite me. The social rating is 6.3, which is... fine? Not compelling.

The personal score says "We think you'll rate this 4/5 based on your history with The Mandalorian." Wait — The Mandalorian is sci-fi/action. Scarpetta is crime drama. Why does the system think these are related? This makes me trust the recommendation less, not more.

**Decision path:** Genre scan → not my usual thing → look at personal score → confused by the comparison → lean toward "Not for me." But "Not for me" feels permanent. Is there a "I don't think so" option? "Not now" is the closest — it's neutral, no strong feeling. I'll pick that.

**Picks: "Not now"** — because I don't want to commit to "not for me" when I'm just not interested right now.

### Task 3 — Poster Discovery

I did not click the poster. There's no visual cue that it's interactive. The image looks like a decorative header — it has a gradient overlay and text on top, which signals "display element" not "button." On hover, a small "Preview" badge appears in the top-right corner, but I wasn't hovering — I was scanning the text below.

If I had clicked: a dialog opens with the full backdrop, extended description, and cast photos. Jamie Lee Curtis and Nicole Kidman are both in this. That changes things. Two A-list leads in a crime drama — that's a different proposition than what the card alone communicated. I might have picked "Let's start it" instead of "Not now."

The preview is valuable. But finding it requires either intentional exploration or accidental click. The hover-only "Preview" badge is the same discoverability pattern that failed in the main app's Round 1 (hover-to-reveal).

### Task 4 — Already Tracking (The Pitt, 3 weeks in)

If I'm already watching The Pitt and a new episode appears, the question "How do you feel about this one?" doesn't fit. I already feel committed. I don't need to decide — I need to act. "Mark watched" or "what episode am I on?" — that's the interaction.

The response options don't map to tracking. "This is it" doesn't mean anything for episode 4 of a show I'm invested in. "Let's start it" is wrong — I already started it. The closest option is "This is it" as a proxy for "yes, I'm watching this episode," but the language isn't right.

**What the card should show for an ongoing show:** episode number and title, air date, "mark watched" button, maybe my current progress. The emotional response framework is for discovery; tracking is a different job.

### Task 5 — Revision

The history panel shows my previous choice with "You said 'Not now' — change your mind?" and a row of alternative options. This is gentle — not nagging, not pushy. It reads as "we're keeping track, and you can adjust." The chevron expand/collapse is clean.

Would I actually change my mind? Probably not in the same session. But the next day, if I see "Not now" on Scarpetta and I'm in the mood for something dark, I might upgrade to "Maybe later." The revision teaches the system: "this person reconsiders after sleeping on it." That's a real signal.

The revision count ("revised 2x") is a nice transparency detail. It tells me the system is tracking how often I change my mind, which means my changes matter.

### Task 6 — Mental Model Test

| Option | What it means to me | Clear? |
|--------|-------------------|--------|
| "This is it" | "I'm watching this tonight." Strong decision. | Yes |
| "Let's start it" | "Sure, I'll give it a try." Casual willingness. | Yes |
| "Maybe later" | "Not right now but don't forget about it." Passive interest. | Yes |
| "Add to my queue" | "I'm committed to watching this eventually." Active intent. | Yes |
| "Not in the mood" | "Wrong moment for this type of content." | Mostly — similar to "Not now" |
| "Not for me" | "I don't want to watch this, period." | Yes |
| "Not now" | "I'm passing, no strong reason." | Mostly — similar to "Not in the mood" |
| "Already seen it" | "I've watched this — let me rate it." | Yes |

**Overlap zone:** "Not in the mood" and "Not now" feel like the same thing to me. One is mood-specific, one is neutral — but in practice, I'd use them interchangeably. The system may treat them differently (energy signal vs. neutral skip), but that distinction isn't legible to me.

**Clear distinction:** "Maybe later" vs. "Add to my queue" is subtly different — passive vs. active — but the difference only matters if the system does something different with each. If "Maybe later" resurfaces the title and "Add to my queue" puts it in a visible list, the distinction is real. If both just log a different string, they feel redundant.

### Task 7 — SUS

| # | Statement | Raw (1-5) | Adjusted |
|---|-----------|-----------|----------|
| 1 | I would use this frequently | 3 | 2 |
| 2 | Unnecessarily complex | 2 | 3 |
| 3 | Easy to use | 4 | 3 |
| 4 | Need technical support | 1 | 4 |
| 5 | Functions were well integrated | 3 | 2 |
| 6 | Too much inconsistency | 2 | 3 |
| 7 | Most people would learn quickly | 4 | 3 |
| 8 | Cumbersome | 2 | 3 |
| 9 | Felt confident | 3 | 2 |
| 10 | Needed to learn a lot first | 1 | 4 |

**Sum: 29 x 2.5 = SUS 72.5 (Good)**

Item 1 (frequency) scores low because this persona opens the app reactively, not to browse recommendations. Item 9 (confidence) scores low because the personal score comparison didn't make sense and the poster click was invisible.

### Task 8 — 4 L's

**Liked:**
- Single card format — no grid paralysis, no decision overload
- The color-coded grouping of responses — green/amber/red communicates intent without reading labels
- "1 / 10" counter — sets expectations, shows there's more to explore
- History panel with revision — feels respectful, not judgmental

**Loved:**
- "How do you feel about this one?" as a framing question — warmer than "rate this" or "interested?"
- The preview dialog when found — cast, backdrop, full description transforms decision quality

**Lacked:**
- Any visual affordance that the poster is clickable — the most valuable interaction is invisible
- Distinction between "Not in the mood" and "Not now" — feel interchangeable
- Confidence in the personal score — the comparison didn't track logically

**Longed For:**
- A visible "tap for details" affordance on the poster
- The personal score to show reasoning, not just the prediction
- A different interaction for shows I'm already tracking vs. new discoveries

---

## Persona 2: The Casual Logger

*Watches 3-5 ongoing shows. Opens app reactively — after an episode, during dinner. 30sec-2min sessions, 4-5x per week. Mental model: "A TV remote. Show me what I'm watching and let me tick off an episode."*

### Task 1 — First Impression

One card. Big image. Title. Done. I like this — it's not asking me to work. "What should you watch?" is the right question. The response buttons below are quick to scan: two green, two amber, four red-ish. I can get through this in 5 seconds if I know what I'm looking at.

"How do you feel about this one?" is a little more... emotional than I expected? I thought it would be "watch this? yes/no." Instead it's asking about feelings. That's fine — the options themselves are clear enough. I'd just tap one and move on.

"Let's start it" — yeah, that's my speed. Casual. Low-commitment. "This is it" sounds too decisive for someone who's eating dinner and half-watching.

The "Pass" section has a lot of options. I'd probably just use "Not now" for everything I'm passing on. I'm not going to analyze whether it's a mood thing or a taste thing — I'm just not interested right now.

### Task 2 — Response Selection (Scarpetta S1E08)

Drama, crime, mystery. 6.3 rating. I see the genres and the rating — crime drama isn't really my thing and 6.3 is mediocre. The description mentions forensic pathology, which sounds heavy for dinner viewing.

The personal score says "We think you'll rate this 4/5 based on your history with Succession." Succession was sharp and fun — Scarpetta sounds dark and procedural. These don't feel related, but 4/5 is high. I notice the prediction but I don't fully trust it.

I'm going to skip this. The question is: "Not for me" or "Not now"?

"Not for me" feels final — like I'm telling the system to never show me this again. "Not now" feels temporary — like maybe later. I don't actively dislike it, I just don't want it. "Not now" wins.

**Picks: "Not now"** — path of least resistance. No commitment, no finality.

### Task 3 — Poster Discovery

The poster has a hover effect — slight zoom — but I'm on a phone mental model. I wouldn't hover. There's a "Preview" badge that appears on hover, but I don't know that until I accidentally mouse over the image area.

If I happened to click: the cast list in the dialog would catch my eye. Familiar faces change the calculus. But I make fast decisions — I probably wouldn't open the preview for something I've already decided to skip. The preview is a "tell me more" feature, and I'm a "show me the summary" person.

**The preview is designed for deliberate browsers, not reactive scanners.** That's fine — it's there for when I want it. But it won't change most of my decisions because I decide before I'd think to click.

### Task 4 — Already Tracking (The Pitt, 3 weeks in)

If The Pitt shows up here, I'd be confused. I'm already watching it — why is the app asking how I feel? I need: "S01E04 — [title]. New episode. Mark watched." That's it. The whole response panel is wrong for this use case.

"This is it" and "Let's start it" both imply I'm starting something new. For an ongoing show, the only relevant actions are: "watched it" and "skip for now."

If the card showed my current episode and said "Ready for the next one?" with a simple "Watched" button, that would be perfect. The emotional response framework should only appear for content I haven't started.

### Task 5 — Revision

"You said 'Not now' — change your mind?" Friendly. Not pushy. I like the casualness. Would I actually expand this and change my answer? Probably not — I'm a 30-second-session person. I'm not going back through my history to reconsider.

But if I opened the app the next day and saw my history, and Scarpetta was listed with "Not now," I might think "actually, my partner mentioned this show." Then I'd expand it and change to "Maybe later." The revision works better across sessions than within a single session.

### Task 6 — Mental Model Test

| Option | What it means to me | Clear? |
|--------|-------------------|--------|
| "This is it" | "Starting this tonight. Decided." | Clear but too strong for me personally |
| "Let's start it" | "Sure, why not. I'll give it a shot." | Perfect for casual interest |
| "Maybe later" | "Not tonight, but remind me." | Yes — assumes the system will resurface it |
| "Add to my queue" | "Put it on my list to watch." | Yes — but will I actually check the queue? |
| "Not in the mood" | "I'm tired / eating / not up for this type." | Good — energy-based signal |
| "Not for me" | "Never show me this again." | Clear — permanent rejection |
| "Not now" | "Meh. Next." | Clear — zero-information skip |
| "Already seen it" | "Watched it. Let me rate it." | Yes |

**Key tension:** "Maybe later" assumes I'll come back. "Add to my queue" assumes I check a queue. Neither behavior is natural for me — I respond to what's in front of me. The system needs to do the follow-up work, not expect me to.

**Overlap:** "Not in the mood" and "Not now" — I'd use "Not now" for everything because it's faster and carries no emotional baggage. "Not in the mood" requires me to introspect about *why* I'm passing, which I don't want to do while eating dinner.

### Task 7 — SUS

| # | Statement | Raw (1-5) | Adjusted |
|---|-----------|-----------|----------|
| 1 | I would use this frequently | 3 | 2 |
| 2 | Unnecessarily complex | 2 | 3 |
| 3 | Easy to use | 5 | 4 |
| 4 | Need technical support | 1 | 4 |
| 5 | Functions were well integrated | 3 | 2 |
| 6 | Too much inconsistency | 2 | 3 |
| 7 | Most people would learn quickly | 5 | 4 |
| 8 | Cumbersome | 1 | 4 |
| 9 | Felt confident | 3 | 2 |
| 10 | Needed to learn a lot first | 1 | 4 |

**Sum: 32 x 2.5 = SUS 80.0 (Good — border of Excellent)**

This persona scores highest because the interaction is fast and simple. Easy to use (item 3) and quick to learn (item 7) score at ceiling. Confidence (item 9) is lower because the personal score comparison felt off and the poster click wasn't discoverable.

### Task 8 — 4 L's

**Liked:**
- Fast interaction — scan card, tap response, next card. 5-10 seconds per decision.
- The color grouping — I can navigate by color without reading every label
- "Let's start it" as an option — matches my casual decision-making style perfectly
- Refresh button for a new batch — quick escape if nothing looks good

**Loved:**
- Single card focus — no scrolling, no grid, no comparison shopping. One thing at a time.
- The question "How do you feel?" turns recommendation into conversation, not evaluation

**Lacked:**
- A clear signal that the poster image is clickable
- Distinction between "Not in the mood" and "Not now" for someone who just picks the fastest option
- Any indication of what happens after I respond — does the system learn? Does it change the next suggestion?
- Feedback after responding — the card just advances silently. No "got it" or confirmation.

**Longed For:**
- A "quick pick" mode: "I have 30 minutes, show me one thing" — no emotional response needed, just a recommendation
- The system to learn that I always skip crime dramas and stop showing them
- A different mode for shows I'm already watching — "new episode ready, mark watched"
- Some visible confirmation after I respond — even a brief animation or badge change

---

## Persona 3: The Active Curator

*20+ titles across all states. Plans deliberately. Rates, writes notes, moves things between statuses. Sessions 5-10 min, less frequent. Mental model: "A personal media ledger — like Letterboxd for everything I've watched."*

### Task 1 — First Impression

One card at a time is a bold choice. I appreciate the focus — recommendation fatigue from grids is real. The "1 / 10" counter tells me there's a full batch to work through, which maps well to my planning-session mental model. I'll sit down, work through all 10, and build my queue.

"How do you feel about this one?" — the question is fine, but the response options need to be precise for me. I make deliberate decisions. "Let's start it" is too casual. "This is it" is better — it signals commitment. But I want more: "Add to my queue" should let me set a priority. "Maybe later" should resurface at a specific time. I want these responses to *do* something, not just log a sentiment.

The three-row grouping (Interested / Save for Later / Pass) is logical. I immediately understand the taxonomy. But within "Pass," there are four options and the distinctions are subtle. I appreciate the granularity — "Not in the mood" (timing) vs. "Not for me" (taste) vs. "Not now" (neutral) are genuinely different behavioral signals. Whether the system can act on that distinction meaningfully is the real question.

### Task 2 — Response Selection (Scarpetta S1E08)

Drama/crime/mystery with a 6.3 rating. Nicole Kidman and Jamie Lee Curtis. I approach this analytically:

1. **Genre check:** Crime drama — not my primary genre, but I've completed a few (True Detective, Broadchurch). I'm not opposed, just selective.
2. **Social rating:** 6.3 is below my threshold. I typically don't start shows under 7.0 unless there's a compelling cast or creator.
3. **Personal score:** "We think you'll rate this 4/5 based on your history with Breaking Bad." Breaking Bad is crime-adjacent but its appeal was character writing and pacing, not the genre. This comparison is imprecise — it tells me the system matched on genre tags, not on the qualities I actually value.
4. **Description:** Forensic pathology procedural. The episode description is specific but doesn't tell me whether this is a serialized narrative or episodic — that distinction matters for my queue planning.

I want to know more before deciding. The card doesn't have enough information for a deliberate choice. I notice the image has a hover state — a slight zoom — so I click it.

The preview dialog opens: full backdrop, Nicole Kidman, Jamie Lee Curtis, Bobby Cannavale, extended description, tagline. Now I have enough. The cast is strong. The description suggests a serialized mystery. This is more like Big Little Lies than NCIS.

**Picks: "Add to my queue"** — the cast convinced me, and I want to plan when to start it. But I wish "Add to my queue" let me set a priority position, not just append to a flat list.

### Task 3 — Poster Discovery

I found the poster click because I was looking for more information. The hover zoom is a subtle hint, and on desktop the cursor changes. On the card, there's a "Preview" badge that appears on hover — I noticed it because I was deliberately exploring the interface.

**This works for me but may not work for faster users.** I'm the kind of person who reads every element on a card before deciding. Someone scanning quickly — the Casual Logger — would miss this entirely. The affordance is too subtle for the value it delivers.

The preview dialog itself is excellent. Backdrop image sets the tone. Cast photos with character names give me exactly what I need. The collapsible "Series overview" for TV shows is a smart information hierarchy — episode-level first, series-level on demand.

**Suggestion:** A persistent "More details" link or a small info icon on the card itself — visible without hover — would make this discoverable for all users.

### Task 4 — Already Tracking (The Pitt, 3 weeks in)

The Pitt appearing as a suggestion card is wrong for my use case. I'm three weeks into this show — I don't need to be sold on it. What I need:

1. What episode am I on?
2. Is there a new episode?
3. When does it air?
4. My rating so far?
5. A "mark watched" button

The response language doesn't apply. "This is it" — I already decided that three weeks ago. "Not in the mood" — this isn't about mood, it's about scheduling. None of the options express my relationship with an ongoing show.

For ongoing shows, the card should transform: show the *next* episode (not a suggested episode), my current progress, and tracking actions. The emotional response framework is discovery-only; tracking needs a utility framework.

**Additional context I'd want for ongoing shows:** How many episodes behind am I? Is the season finale approaching? Are friends discussing recent episodes (spoiler risk)? These are planning signals, not discovery signals.

### Task 5 — Revision

The revision dropdown is well-designed. Expanding a history entry shows "You said 'Add to my queue' — change your mind?" with all alternative options available. The revision_count display ("revised 2x") is a transparency feature I appreciate — it tells me the system is learning from my changes, not ignoring them.

Would I use this? Yes — specifically for queue management. If I said "Add to my queue" but later realized I'm not going to watch it, I'd change to "Not for me." That's a cleanup action, and I clean up my lists regularly.

**What I'd want beyond response revision:** The ability to add notes ("interesting premise but waiting for S2 reviews"), set a reminder date ("check back in June"), or adjust a rating. The revision loop is emotional-intent-only; my revision needs are broader.

### Task 6 — Mental Model Test

| Option | What it means to me | Clear? |
|--------|-------------------|--------|
| "This is it" | "I'm committing to this. Starting now or tonight." | Yes — strong commitment signal |
| "Let's start it" | "I'm willing to try episode 1." Low-stakes trial. | Yes — but different from "This is it" in commitment level |
| "Maybe later" | "I'm interested but this isn't the right time. Resurface it." | Depends — what triggers the resurface? |
| "Add to my queue" | "I want to watch this. Put it in my planning queue." | Yes — but I need queue ordering |
| "Not in the mood" | "The content type doesn't match my current energy." | Yes — energy/mood signal |
| "Not for me" | "This doesn't match my preferences. Don't resurface." | Yes — permanent rejection |
| "Not now" | "I'm passing with no particular reason." | Yes — zero-information skip |
| "Already seen it" | "I've watched this — let me record my opinion." | Yes |

**Where two options feel the same:**

1. **"Not in the mood" vs. "Not now"**: For me, "Not in the mood" is the more specific signal — it tells the system something about my energy level. "Not now" is a generic skip. But many users won't distinguish these and will default to whichever is faster to tap. The system-facing distinction (energy signal vs. neutral) may not survive contact with real user behavior.

2. **"Maybe later" vs. "Add to my queue"**: These are different commitment levels — passive interest vs. active intent — and I can distinguish them. "Maybe later" means "remind me eventually." "Add to my queue" means "I plan to watch this." The distinction is real IF the system honors it. If both just create a log entry with no behavioral follow-through, they're functionally identical.

**Where the distinction is strong:**
- "This is it" vs. "Let's start it": Commitment vs. trial. One is decisive, the other is tentative. Both are positive, but the emotional intensity is clearly different.
- "Not for me" vs. everything else in "Pass": "Not for me" is the only permanent rejection. Everything else is temporal. This is the most important single distinction in the taxonomy.

### Task 7 — SUS

| # | Statement | Raw (1-5) | Adjusted |
|---|-----------|-----------|----------|
| 1 | I would use this frequently | 4 | 3 |
| 2 | Unnecessarily complex | 2 | 3 |
| 3 | Easy to use | 3 | 2 |
| 4 | Need technical support | 1 | 4 |
| 5 | Functions were well integrated | 3 | 2 |
| 6 | Too much inconsistency | 2 | 3 |
| 7 | Most people would learn quickly | 3 | 2 |
| 8 | Cumbersome | 2 | 3 |
| 9 | Felt confident | 3 | 2 |
| 10 | Needed to learn a lot first | 1 | 4 |

**Sum: 28 x 2.5 = SUS 70.0 (Good)**

Item 1 (frequency) scores higher than the other personas because the Curator would use this as a deliberate queue-building session. Item 3 (ease) is lower because the personal score logic wasn't transparent and the response options need more explicit follow-through. Item 9 (confidence) is moderate — the system collects my signals but I can't verify it's acting on them.

### Task 8 — 4 L's

**Liked:**
- Single-card focus forces a decision — no scrolling through infinite grids
- Response taxonomy has genuine granularity — "Not in the mood" vs. "Not for me" is a meaningful distinction
- The preview dialog with cast photos — adds real decision-making value
- Revision history with count — transparent, signals the system is learning

**Loved:**
- The concept of emotional response logging — this is fundamentally different from star ratings. "Not in the mood" captures something a 1-5 rating never could.
- The "1 / 10" batch model — I can sit down and work through a complete set, which fits my planning behavior

**Lacked:**
- Personal score reasoning — "based on your history with X" needs to explain *why* X is relevant
- Follow-through on "Maybe later" and "Add to my queue" — these should produce different system behaviors, not just log different strings
- Queue ordering after "Add to my queue" — a flat list without priorities isn't useful for planning
- A tracking mode for shows already in progress — "how do you feel" is wrong for ongoing shows
- Feedback after responding — the card advances silently with no confirmation

**Longed For:**
- "Add to my queue" → opens a priority position picker
- "Maybe later" → triggers a resurface after N days or when a new season drops
- Personal score to show its math: "Drama (you rate 4.2 avg) + crime (you rate 3.1 avg) = predicted 3.7"
- Notes field on any response — "interesting cast, wait for reviews"
- A "tried it" path for shows I started and abandoned — separate from "Not for me" (never tried) vs. "started, didn't finish"

---

## Cross-Persona Synthesis

### Where All Three Agree (Pattern)

**1. The poster preview is not discoverable.**
All three personas either missed the poster click or found it by accident. The hover-only "Preview" badge is insufficient. The preview dialog itself is highly valued when found — cast, backdrop, and extended description change decisions — but the path to it is invisible. This is the highest-leverage fix.

**2. The personal score needs reasoning, not just a prediction.**
"We think you'll rate this 4/5 based on your history with X" — all three personas questioned the comparison. When the comparison doesn't intuitively connect (crime drama → sci-fi show), the prediction undermines trust rather than building it. The score asserts; it needs to explain.

**3. Ongoing shows need a different interaction.**
"How do you feel about this one?" is designed for discovery. For shows the user is already tracking, the interaction should be: next episode, progress, mark watched. All three personas independently said the response language doesn't apply to shows they're already watching.

**4. The card advances silently after a response.**
No toast, no animation, no confirmation. The card just changes. All three personas noted the absence — ranging from mild uncertainty ("did that work?") to explicit request for feedback. This mirrors the "silent actions" pattern from the main app.

### Where They Diverge

| Dimension | General User | Casual Logger | Active Curator |
|-----------|-------------|---------------|----------------|
| Preferred response style | "Not now" — least commitment | "Let's start it" — casual | "Add to my queue" — deliberate |
| Speed of decision | 5-10 seconds | 3-5 seconds | 15-30 seconds (reads everything) |
| Preview usage | Wouldn't find it | Wouldn't find it | Would find it, relies on it |
| Revision behavior | Might revise next day | Unlikely to revise | Regularly revises as cleanup |
| "Not in the mood" vs. "Not now" | Interchangeable | Uses "Not now" for everything | Distinguishes — mood is specific |
| Personal score trust | Skeptical of comparison | Soft nudge, doesn't overthink | Wants full transparency |

### What This Tells Us About the Response Language

The taxonomy works at the structural level (interested / save / pass) but has friction at the option level. The three-row color grouping does most of the work — users navigate by category, not by individual label. Within categories:

- **"Interested" row**: Both options work. "This is it" is stronger than "Let's start it." Users self-select based on enthusiasm.
- **"Save for later" row**: "Maybe later" and "Add to my queue" need different behavioral follow-through to justify their coexistence. Without it, they feel redundant.
- **"Pass" row**: Four options is too many for fast users. "Not in the mood" and "Not now" overlap for 2 of 3 personas. "Not for me" is the only option all three agree is distinct. "Already seen it" is fine but belongs to a different task (rating, not rejecting).

---

## Language Audit

| Option | P1 (General User) | P2 (Casual Logger) | P3 (Active Curator) | System Intent | Verdict |
|--------|-------------------|---------------------|---------------------|---------------|---------|
| "This is it" | Clear, decisive | Too strong for casual use | Good for commitment signal | Strong positive | Works for P1, P3. Too intense for P2. |
| "Let's start it" | Lighter yes, good fallback | Perfect — matches casual style | Too casual for deliberate planning | Casual positive | Works for all — broadest appeal |
| "Maybe later" | Passive interest, clear | Assumes system resurfaces | Needs defined follow-through | Passive delayed interest | Works IF system acts on it |
| "Add to my queue" | Confused vs. "Maybe later" | "Will I check a queue?" | Good — wants priority ordering | Active commitment | Works IF queue is visible/orderable |
| "Not in the mood" | Overlaps with "Not now" | Skips — uses "Not now" instead | Specific energy signal | Energy/context rejection | Works for P3 only. Redundant for P1, P2. |
| "Not for me" | Clear permanent rejection | Clear permanent rejection | Clear permanent rejection | Taste signal | Works for all 3 |
| "Not now" | Default skip button | Default skip button | Neutral/generic pass | Zero-information skip | Works for all — but collapses with "Not in the mood" |
| "Already seen it" | Clear, triggers rating flow | Clear | Clear, wants "tried it" variant | Past experience | Works for all |

### Key Language Findings

1. **"Let's start it" has the broadest appeal.** It works across all three personas. It's casual enough for P2, clear enough for P1, and acceptable to P3.

2. **"Not in the mood" and "Not now" collapse for 2 of 3 personas.** The mood/timing distinction is system-meaningful but user-invisible. Consider merging into one option or making the distinction visually clearer.

3. **"Maybe later" and "Add to my queue" need visible behavioral differences.** Without follow-through, both mean "not now, but interested" — the commitment-level distinction only holds if the system treats them differently and the user can see the difference.

4. **"Not for me" is the sharpest option.** All three personas agree on its meaning: permanent, taste-based rejection. It's the only Pass option with no ambiguity.

---

## SUS Summary

| Persona | Sum | Score | Rating |
|---------|-----|-------|--------|
| P1 — General User | 29 | **72.5** | Good |
| P2 — Casual Logger | 32 | **80.0** | Good (border of Excellent) |
| P3 — Active Curator | 28 | **70.0** | Good |
| **Average** | — | **74.2** | **Good** |

**P2 scores highest** because the interaction is fast and requires no learning. Scan, tap, next. The single-card model maps perfectly to a 30-second reactive session.

**P3 scores lowest** (but still Good) because the system collects responses without visible follow-through. The Curator invests thought in each decision and wants evidence the system is using that investment. Confidence (item 9) is the drag.

**P1 sits in the middle** — the interaction is clear but the personal score comparison eroded trust, and the poster preview was invisible.

**Gap to Excellent (80+):** 5.8 points average. The three biggest levers:
1. Poster discoverability (affects ease of use — item 3, confidence — item 9)
2. Response confirmation feedback (affects confidence — item 9, integration — item 5)
3. Personal score reasoning (affects confidence — item 9, consistency — item 6)

---

## Priority Recommendations

### 1. Make the poster preview discoverable
**Change:** Add a persistent affordance — a small info icon, "Tap for details" text, or expand animation on the poster image. Do not rely on hover-only reveal.
**Evidence:** All 3 personas missed or accidentally found the preview. The preview content (cast, backdrop, extended description) changed decision quality when found. The most valuable interaction in the prototype is invisible.
**Impact:** High | **Effort:** Low (CSS + icon)

### 2. Add response confirmation feedback
**Change:** After tapping a response, show a brief confirmation — a checkmark animation, color flash on the button, or a subtle toast — before advancing to the next card.
**Evidence:** All 3 personas noted the silent card transition. The Casual Logger wasn't sure the response registered. The General User had a moment of "did that work?" This is the same silent-action pattern documented across the main app.
**Impact:** Medium | **Effort:** Low (animation + state)

### 3. Surface personal score reasoning
**Change:** Change "We think you'll rate this 4/5 based on your history with X" to include the connective logic: "We think you'll rate this 4/5 — you tend to enjoy [genre] with [quality], similar to X." Or show the genre affinity scores that produced the prediction.
**Evidence:** All 3 personas questioned the comparison when it didn't intuitively connect. P3 explicitly said a wrong comparison undermines trust in the entire system. The assertion without reasoning is worse than no assertion.
**Impact:** High | **Effort:** Medium (reasoning already exists in watch patterns — needs to surface)

### 4. Reduce "Pass" options from 4 to 3
**Change:** Merge "Not in the mood" and "Not now" into a single option — either "Not now" (simpler) or "Not in the mood" (more signal). Alternatively, keep both but make the distinction visible: "Not in the mood (energy)" vs. "Not now (skip)."
**Evidence:** P1 and P2 treat these as interchangeable. P3 distinguishes them but acknowledges most users won't. The system may benefit from the distinction, but if 2/3 users collapse them, the signal is noise.
**Impact:** Medium | **Effort:** Low (label change or removal)

### 5. Design a tracking card for ongoing shows
**Change:** If a suggested title matches a show already in the user's library with status "watching," render a tracking card instead: episode progress, air date, "mark watched" button, current rating. No emotional response language.
**Evidence:** All 3 personas said "how do you feel?" is wrong for shows they're already watching. The observation prototype is discovery-first; ongoing shows need utility-first.
**Impact:** High | **Effort:** Medium (needs library cross-reference + alternate card template)

---

*Evaluation conducted March 15, 2026. Personas evaluated the prototype source code independently with no reference to prior test findings or known issues.*
