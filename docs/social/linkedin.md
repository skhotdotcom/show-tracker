# LinkedIn Post

---

I ran a synthetic persona evaluation on my AI prototype and discovered my response options were wrong.

8 button labels designed to express emotional intent:
- "This is it"
- "I'd watch this"
- "Maybe later"
- "Not tonight"
- "Not in the mood"
- "Not my thing"

Then I ran a language test: open text instead of buttons. 30 responses. Clustered the natural language.

6 clusters emerged. 2 pairs of buttons collapsed.

"Maybe later" and "Add to my queue" — the system treats these as different commitment levels. Users don't distinguish them in their own words.

"Not in the mood" and "Not now" — the mood/timing distinction is system-meaningful but user-invisible.

**The lesson:** Your response options are a design assumption. Natural language is the ground truth.

The best interaction patterns reduce 100 choices to 2-5. But the labels have to match how users actually think, not how you designed the system to learn.

**Process summary:**
1. Built an observation prototype from JTBD micro-jobs
2. Ran cognitive walkthroughs with 3 synthetic personas
3. Captured open-text responses (no button labels)
4. Clustered natural language into intent categories
5. Reduced from 8 options to 5 based on the clusters
6. Validated the reduction against the original evaluation

Synthetic persona evaluation isn't user testing. It's a pre-validation layer — it catches language mismatches before you build on top of wrong labels.

Cost: 0 users. 2 hours of time.

---

## Notes
- Clean, professional tone for LinkedIn
- Don't tag anyone or use hashtags unless Scotty wants to
- Image: language cluster visualization or observation card
