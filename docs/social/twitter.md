# Twitter/X Thread

## Thread

**1/**
I ran synthetic persona evaluations on my AI prototype and discovered my response options were wrong.

8 button labels designed to feel natural. Natural language testing proved 2 of them were redundant and 1 was too dramatic.

Here's the process 🧵

**2/**
The prototype presents one title at a time: "How do you feel about this one?"

Response options expressed emotional intent:
- "This is it"
- "I'd watch this"
- "Maybe later"
- "Not tonight"
- "Not in the mood"
- "Not my thing"

Designed by me. Thought they were solid.

**3/**
First test: cognitive walkthrough with 3 synthetic personas (General User, Casual Logger, Active Curator).

Key finding: "Maybe later" and "Add to my queue" collapsed for 2 of 3 personas. The system treats them as different commitment levels. Users don't.

**4/**
Then I ran a language test. Instead of button labels, I gave open text: "What would you say about this title?"

30 responses across 3 personas and 10 titles. Clustered the natural language.

6 clusters emerged.

**5/**
The biggest cluster (23%): "Maybe, keep it on my radar."

This maps to TWO current buttons: "Maybe later" and "Add to my queue."

Users don't distinguish passive vs. active deferral in their own words. The system should infer commitment from behavior, not label choice.

**6/**
Clustered to 5 options:

"I'm in" → strong yes, exit the search
"I'd watch this" → willing to try
"Keep it on my radar" → deferred interest (merged 2 options)
"Not tonight" → timing rejection (merged 2 options)
"Not for me" → taste rejection, permanent

**7/**
The prototype had a poster preview that changed decisions — cast photos, taglines, extended description. All 3 personas missed it.

The most valuable interaction was invisible.

**8/**
Lesson: synthetic persona evaluations aren't user testing. They're a pre-validation layer.

They caught language mismatches before I built more on top of wrong labels.

Cost: 0 users, 2 hours of my time.

**9/**
The process:
1. Build from JTBD micro-jobs
2. Write personas from prior research
3. Cognitive walkthrough + SUS + 4 L's
4. Open-text language capture
5. Cluster responses
6. Reduce option set
7. Validate against original evaluation

**10/**
The best interaction patterns reduce 100 choices to 2-5.

But the labels have to match how users actually think, not how you designed the system to learn.

Natural language clusters tell you the truth.

---

## Notes
- Post as thread, not a single long tweet
- Images: observation card screenshot, language cluster visualization
- Don't link to repo unless asked
