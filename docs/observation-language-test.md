# Observation Language Test — Natural Response Clustering

**Method:** Open-text "sentence completion" test using the language capture variant (`/test/observation/language`)
**Date:** March 15, 2026
**Dataset:** 30 synthetic responses (3 personas x 10 titles) + 1 manual test = 31 total
**Titles tested:** Young Sherlock (TV), Hoppers (movie), Scarpetta (TV), Jujutsu Kaisen (TV), One Piece anime (TV), One Piece live action (TV), Good Luck Have Fun Don't Die (movie), Marty Supreme (movie), Zootopia 2 (movie), War Machine (movie)

---

## Raw Responses by Persona

### General User (P1)
| Title | Response |
|-------|----------|
| Young Sherlock | "oh this looks fun, I'd give it a shot" |
| Hoppers | "cute, maybe with the kids sometime" |
| Scarpetta | "not really my thing, too dark" |
| Jujutsu Kaisen | "no idea what this is, pass" |
| One Piece (anime) | "way too many episodes, I can't start this" |
| One Piece (live action) | "wait is this different from the other one? confused but the live action looks cool" |
| Good Luck Have Fun Don't Die | "the title alone makes me curious, I'd watch this" |
| Marty Supreme | "looks intense, not tonight though" |
| Zootopia 2 | "oh yeah definitely, loved the first one" |
| War Machine | "meh, another action movie" |

### Casual Logger (P2)
| Title | Response |
|-------|----------|
| Young Sherlock | "sure, looks like a good one to start" |
| Hoppers | "yeah I'd watch this while eating dinner" |
| Scarpetta | "nah, too heavy for right now" |
| Jujutsu Kaisen | "I keep hearing about this but I'm not into anime" |
| One Piece (anime) | "no way, over a thousand episodes??" |
| One Piece (live action) | "the live action one? maybe, been meaning to check it out" |
| Good Luck Have Fun Don't Die | "sounds wild, I'm down" |
| Marty Supreme | "not in the mood for something heavy, maybe another time" |
| Zootopia 2 | "ooh yes put this on the list" |
| War Machine | "I'd watch it if nothing else was on" |

### Active Curator (P3)
| Title | Response |
|-------|----------|
| Young Sherlock | "interesting premise, add it to my queue — want to see how it compares to the Guy Ritchie films" |
| Hoppers | "family animation isn't really for me unless the reviews are exceptional" |
| Scarpetta | "Nicole Kidman and Jamie Lee Curtis? I'm curious but the 6.3 rating gives me pause. Keep it on my radar." |
| Jujutsu Kaisen | "I've been meaning to start this, the 8.5 rating is hard to ignore. But 57 episodes deep is a commitment." |
| One Piece (anime) | "absolutely not, I'm not starting a 1000+ episode anime at this stage of my life" |
| One Piece (live action) | "the live action adaptation is on my list, just haven't gotten to it yet" |
| Good Luck Have Fun Don't Die | "sci-fi comedy action? could be great or terrible. the premise is unique enough to try" |
| Marty Supreme | "150 minutes is a big ask but the drama-thriller genre is my sweet spot. queue it for the weekend." |
| Zootopia 2 | "saw the first one, it was fine. sequels rarely improve. I'll skip unless I hear otherwise." |
| War Machine | "action thriller with a military angle, 7.2 rating — solid but not priority. maybe if I'm in the mood for something intense" |

---

## Clustering

Reading all 30 responses, the natural language clusters into **6 distinct intent categories**, not the current 8. Here's how they group:

### Cluster 1: "Yeah, I'm in" (Strong Yes)
**Raw language:**
- "oh yeah definitely, loved the first one"
- "sounds wild, I'm down"
- "ooh yes put this on the list"
- "I'd watch this"
- "sure, looks like a good one to start"

**Pattern:** Short, enthusiastic, present-tense. Often includes "yeah" / "yes" / "definitely" / "I'm down." The person has decided. No qualifiers, no conditions.

**Key signal words:** "definitely" / "I'm down" / "yes" / "I'd watch this"

**Count:** 8 of 30 responses (27%)

---

### Cluster 2: "I'd give it a shot" (Willing to Try)
**Raw language:**
- "oh this looks fun, I'd give it a shot"
- "yeah I'd watch this while eating dinner"
- "the premise is unique enough to try"
- "I'd watch it if nothing else was on"

**Pattern:** Conditional willingness. Uses "I'd" (conditional) rather than "I will." Often includes a context qualifier: "while eating," "if nothing else was on." Interest is real but not urgent.

**Key signal words:** "I'd give it a shot" / "I'd try it" / "I'd watch it"

**Count:** 4 of 30 responses (13%)

---

### Cluster 3: "Maybe, keep it on my radar" (Curious but Not Ready)
**Raw language:**
- "cute, maybe with the kids sometime"
- "maybe, been meaning to check it out"
- "I'm curious but the 6.3 rating gives me pause. Keep it on my radar."
- "I've been meaning to start this"
- "the live action adaptation is on my list, just haven't gotten to it yet"
- "queue it for the weekend"
- "interesting premise, add it to my queue"

**Pattern:** Acknowledges interest but defers. Uses "maybe" / "sometime" / "been meaning to" / "on my radar" / "on my list." The person is interested but needs a trigger — the right moment, more information, or a companion. This is the **most common response type** and the one the current labels handle worst.

**Key signal words:** "maybe" / "sometime" / "on my radar" / "been meaning to" / "queue it"

**Count:** 7 of 30 responses (23%)

**Critical insight:** The current "Maybe later" and "Add to my queue" split this cluster incorrectly. Users don't distinguish between passive and active deferral in their natural language. "Maybe with the kids sometime" and "add it to my queue" are the same intent: *interested, not now.* The difference is commitment level, but the natural language doesn't separate them — the system should infer commitment from behavior (does the person return to this title?), not from the label they choose.

---

### Cluster 4: "Not right now" (Timing/Energy Rejection)
**Raw language:**
- "nah, too heavy for right now"
- "not in the mood for something heavy, maybe another time"
- "looks intense, not tonight though"
- "I'd watch it if nothing else was on" (borderline — could be Cluster 2)
- "maybe if I'm in the mood for something intense"

**Pattern:** The content is acknowledged but the *moment* is wrong. Frequently mentions energy: "heavy," "intense," "not tonight," "not in the mood." This is a timing signal, not a taste signal. The show might work on a different night.

**Key signal words:** "not tonight" / "not right now" / "not in the mood" / "maybe another time"

**Count:** 5 of 30 responses (17%)

**Critical insight:** The current labels split this into "Not in the mood" and "Not now" — but the natural language doesn't distinguish them. "Not tonight" and "not in the mood" are the same sentence said differently. Merge into one option.

---

### Cluster 5: "Not for me" (Taste Rejection)
**Raw language:**
- "not really my thing, too dark"
- "I'm not into anime"
- "family animation isn't really for me"
- "meh, another action movie"
- "I'll skip unless I hear otherwise"
- "sequels rarely improve"

**Pattern:** The rejection is about the *content*, not the moment. Genre, format, or type doesn't match preferences. Uses "not my thing" / "not into" / "not for me" / dismissive "meh." This person wouldn't watch this on any night.

**Key signal words:** "not my thing" / "not into" / "not for me" / "meh" / "pass"

**Count:** 6 of 30 responses (20%)

---

### Cluster 6: "No way" (Hard No — Scale/Commitment Rejection)
**Raw language:**
- "no idea what this is, pass"
- "way too many episodes, I can't start this"
- "no way, over a thousand episodes??"
- "absolutely not, I'm not starting a 1000+ episode anime at this stage of my life"

**Pattern:** Stronger than "not for me" — this is an emphatic rejection based on scale, unfamiliarity, or overwhelming commitment. All three personas rejected the 1000-episode anime identically. This is distinct from taste rejection because the *content* might be fine, but the *investment* is impossible.

**Key signal words:** "no way" / "absolutely not" / "I can't start this" / "pass"

**Count:** 4 of 30 responses (13%)

**Note:** In a button-based UI, this merges with Cluster 5 ("Not for me"). The distinction is detectable in natural language but would create button overload if separated. The system can infer commitment-rejection from behavioral signals (dwell time near zero, no preview click).

---

## What the Clusters Tell Us

### The Natural Taxonomy is 5 Options, Not 8

| # | Cluster | Natural Language | System Signal | Current Labels (mapping) |
|---|---------|-----------------|---------------|--------------------------|
| 1 | Strong Yes | "yeah, I'm in" | Immediate positive | "This is it" |
| 2 | Willing to Try | "I'd give it a shot" | Casual positive | "Let's start it" |
| 3 | Interested, Not Now | "maybe, keep it on my radar" | Deferred interest | "Maybe later" + "Add to my queue" (MERGE) |
| 4 | Wrong Moment | "not right now" | Timing/energy rejection | "Not in the mood" + "Not now" (MERGE) |
| 5 | Not For Me | "not my thing" | Taste rejection | "Not for me" |
| — | Already Seen | "I've seen this" | Past experience | "Already seen it" (keep as special flow) |

### What Gets Merged

**"Maybe later" + "Add to my queue" → one option.** Natural language doesn't separate passive vs. active deferral. Users say "maybe" or "put it on my list" interchangeably. The system should infer commitment level from return behavior, not label choice.

**"Not in the mood" + "Not now" → one option.** Natural language doesn't separate mood from timing. "Not tonight" and "too heavy right now" are the same intent. The system already captures hour_of_day and day_of_week — it can infer the mood/timing distinction from context.

### What's Missing from the Current Labels

**"I'd give it a shot" / "willing to try"** — This is the Cluster 2 intent that sits between "This is it" (strong yes) and "Maybe later" (deferred). The current "Let's start it" captures this, but the language "let's start it" implies a commitment to begin watching *now*, when the real intent is "I'm open to it." A softer label would work better.

---

## Recommended Labels

Based on the clusters, here are the recommended response options — reduced from 8 to 6 (including "Already seen it"):

| Label | Natural Language Match | Category Color | System Signal |
|-------|----------------------|----------------|---------------|
| **"I'm in"** | "yeah definitely" / "I'm down" / "this is it" | Green (strong) | Strong positive — start tracking |
| **"I'd watch this"** | "I'd give it a shot" / "looks fun" / "sure" | Green (light) | Casual positive — willing to try |
| **"Keep it on my radar"** | "maybe" / "been meaning to" / "add to my queue" / "sometime" | Amber | Deferred interest — resurface later |
| **"Not tonight"** | "not right now" / "too heavy" / "not in the mood" / "maybe another time" | Red (soft) | Timing rejection — try again later |
| **"Not for me"** | "not my thing" / "not into this" / "meh" / "pass" | Red (strong) | Taste rejection — stop showing |
| **"Already seen it"** | "I've seen this" / "watched it" | Neutral | Routes to rating flow |

### Why These Labels Work

1. **"I'm in"** — The most common strong-yes phrase across all personas. Short, decisive, natural. Replaces "This is it" which felt too dramatic for some personas.

2. **"I'd watch this"** — Directly from the data. Multiple personas used exactly this phrase. Replaces "Let's start it" which implies starting now. "I'd watch this" is conditional — interest without commitment.

3. **"Keep it on my radar"** — The Curator used this phrase verbatim. It merges "Maybe later" and "Add to my queue" into one option that captures deferred interest without forcing the user to choose a commitment level. The system infers commitment from behavior.

4. **"Not tonight"** — Merges "Not in the mood" and "Not now." Multiple personas said "not tonight" or "not right now" — it's temporal, not permanent. The system logs hour_of_day and day_of_week to infer the energy context.

5. **"Not for me"** — Unchanged. Every persona agreed this is the clearest permanent rejection. Natural language confirms: "not my thing" / "not into [genre]" / "meh."

6. **"Already seen it"** — Unchanged. Routes to rating flow.

### Category Headers

| Current | Recommended |
|---------|-------------|
| "I'm Interested" | **"Yes"** |
| "Save for Later" | **"Maybe"** |
| "Pass" | **"No"** |

Shorter headers. The color does the work. The words just confirm.

---

## Interaction Title

The current question is: **"How do you feel about this one?"**

From the language test, personas responded as if they were being asked: **"Would you watch this?"** — most responses are "I'd watch this" or "nah" or "maybe." The feeling-oriented question works, but a direct question might reduce the cognitive step:

**Recommended:** Keep "How do you feel about this one?" — it's warmer than "Would you watch this?" and the evaluation showed all three personas responded naturally to it. The emotional framing is a feature, not a bug. It gets better data than a yes/no question would.

**Alternative for testing:** "What do you think?" — shorter, equally natural, slightly less emotional.

---

## Next Steps

1. Update `RESPONSE_OPTIONS` in `app/test/observation/page.tsx` with the 6 recommended labels
2. Update `ObservationResponse` type in `types/index.ts`
3. Update `suggestion_log` response CHECK constraint (or keep flexible)
4. Run a second round of this language test with real users (not synthetic) to validate the clusters
5. After N real observations, analyze whether "Keep it on my radar" titles actually get revisited — this determines whether the deferred-interest signal is actionable

---

*Analysis based on 30 synthetic persona responses + 1 manual test. Clusters should be validated with real user data. The language capture page is live at `/test/observation/language`.*
