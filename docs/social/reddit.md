# Reddit Post — r/UXDesign

## Title
I ran synthetic persona evaluations on an AI prototype and the natural language revealed my response options were wrong. Here's what I learned.

---

## Post

I've been building an observation-layer prototype for a content recommendation app. Not a typical recommendation engine — the system presents one title at a time and asks "How do you feel about this one?" with response options expressing emotional intent: "This is it," "I'd watch this," "Keep me posted," "Not tonight," "Not in the mood," "Not my thing."

The original response options were designed by me (the builder). I thought they were good. Then I ran synthetic persona evaluations — not usability tests, but cognitive walkthroughs using three established personas (General User, Casual Logger, Active Curator) who evaluate the prototype source code independently.

**What they found that I didn't:**

1. **Two pairs of options collapsed.** "Maybe later" and "Add to my queue" — the system treats them as different commitment levels (passive vs. active interest). But 2 of 3 personas couldn't tell them apart. Same with "Not in the mood" and "Not now" — the mood/timing distinction is system-meaningful but user-invisible.

2. **The poster preview changed decisions but was invisible.** Clicking the poster opens a lightbox with cast, tagline, and extended description. All 3 personas either missed it or found it by accident. The most valuable interaction in the prototype was undiscoverable.

3. **The personal score undermined trust.** "We think you'll rate this 4/5 based on your history with Game of Thrones" — when the comparison didn't track logically, it eroded confidence in the entire recommendation.

**Then I ran a language test.** Instead of asking personas to choose from my button labels, I gave them open text: "What would you say about this title?" 30 responses across 3 personas and 10 titles. Then I clustered the natural language.

**6 clusters emerged:**
1. "Yeah, I'm in" (27%) — strong yes
2. "I'd give it a shot" (13%) — willing to try
3. "Maybe, keep it on my radar" (23%) — **the biggest cluster**, deferred interest
4. "Not right now" (17%) — timing/energy rejection
5. "Not for me" (20%) — taste rejection
6. "No way" (13%) — hard no (scale/commitment)

The clusters proved what the synthetic evaluation suspected: the natural language doesn't support 8 button labels. Users don't distinguish "passive vs. active deferral" in their own words. They say "maybe" or "put it on my list" interchangeably. The commitment-level distinction is a system signal, not a user mental model.

**Reduced to 5 + "Already seen it":**
- "I'm in" (replaces "This is it" — less dramatic, matches natural language)
- "I'd watch this" (from the data — multiple personas used exactly this phrase)
- "Keep it on my radar" (merges "Maybe later" + "Add to my queue")
- "Not tonight" (merges "Not in the mood" + "Not now")
- "Not for me" (unchanged — sharpest option, all 3 agree)

**What I learned about synthetic persona evaluations:**

- They're not a replacement for real user testing. But they caught the language mismatches before I built more on top of wrong labels.
- The key is making them unbiased. I explicitly blocked the evaluator from reading my prior test findings. The personas had to discover issues independently.
- Natural language clustering is the real validation. Synthetic personas can evaluate button labels, but open-text responses reveal what users actually think.

**Process:**
1. Built the prototype in Claude Code from a JTBD-based prompt
2. Wrote 3 personas from prior research (3 rounds, SUS 62.5→73.3)
3. Ran cognitive walkthrough + SUS + 4 L's (Liked, Loved, Lacked, Longed For)
4. Ran separate language capture test (open text, 3 personas × 10 titles)
5. Clustered responses → reduced option set
6. Validated reduced set against the original evaluation

Happy to answer questions about the process or share the evaluation templates.

---

## Flair
Research / Case Study

## Notes
- Don't cross-post to r/userexperience on the same day
- Include images if possible (observation card, language capture page)
- Link to repo only if asked (pull > push, don't lead with promotion)
