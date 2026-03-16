# Prompt: Likert + Diagnostic Sub-Level Observation Variant

_Create a new test page at `app/test/observation/likert/page.tsx`. This is a variant of the observation prototype that tests a 5-point Likert scale with position-specific diagnostic sub-levels._

---

## Top-level interaction

Question below the card: **"Are you interested?"**

Five options in a **horizontal row** (no numbers, no sentiment colors — all primary color styling):

1. 🙌 I'm in
2. 👀 I'd watch this
3. 🤔 I'm curious
4. 😐 Doesn't grab me
5. 🚫 Not for me

Below the row, two secondary-styled links:
- **Already seen it** — routes to rating flow
- **Skip** — logs top-level choice only, advances to next card

---

## Sub-level interaction

Inline expand below the 5 options (200ms animation). Each position has a unique diagnostic question.

**"I'm in"** — No sub-level. Show toast and transition. This is the exit signal.

**"I'd watch this"** → *"What caught your eye?"*
- 🎭 The cast
- 🎬 The genre
- ⭐ The rating
- 📝 The description

**"I'm curious"** → *"What are you curious about?"*
- 💡 The premise
- 🎭 The cast
- 🎬 The genre
- 🌱 I just like trying new things

**"Doesn't grab me"** → *"What's missing?"*
- ⏰ Not the right mood/timing
- ❓ Don't know enough about it
- 🎬 Not my genre
- 🤷 It just doesn't appeal to me

**"Not for me"** → *"What's the boundary?"*
- 🎬 Not my genre at all
- 🔄 Seen shows like this before
- 😕 Don't like the cast/premise
- 🚫 I just know it's not for me

**"Already seen it"** → Rating flow:
- 🔥 I couldn't stop watching
- 👍 I'd recommend it
- 😐 It was fine
- 😬 I almost turned it off
- ❌ I couldn't finish it

**Sub-level has a "Skip" link** at the bottom of every sub-level. Logs only the top-level, sets `sub_response` to null.

---

## Behavioral rules

- Top-level click is always logged (the primary signal)
- Sub-level click is logged as `sub_response` alongside `response`
- "Skip" (top-level) logs only the top-level, advances immediately
- "Skip" (sub-level) logs only the top-level, advances immediately
- Selecting a sub-level option logs both and advances
- Clicking the same top-level option again collapses the sub-level (toggle)
- Clicking a different top-level option switches the sub-level expansion
- **Dwell time** starts when the card appears, ends when the full interaction completes (top-level only if skip, or top-level + sub-level)
- For "I'm in": dwell time ends at top-level click, no sub-level shown

---

## Toast card (emotional delight)

After any response is logged, show a brief toast overlay (1.5s auto-dismiss):

- Show the content title
- Show the response they chose (with emoji)
- Show **Undo** (go back to the card) and **Keep going** (dismiss toast, move on) buttons
- Toast slides in from bottom, smooth fade out on dismiss
- For "I'm in": toast says "Starting [title]..." with a checkmark, no undo (they committed)

---

## Visual design

- Card layout same as existing observation page (poster, title, description, social rating)
- Question text subtle gray, above the options
- 5 Likert buttons: horizontal row, primary color, emoji + label, no numbers, no sentiment colors
- "Already seen it" and "Skip": secondary text style, smaller, below the row
- Sub-level: smooth expand (200ms), options in a compact grid or row
- Toast: bottom-center, rounded, shadow, slides up
- Card centered, max-width `max-w-md`
- Keep existing poster preview / lightbox functionality

---

## Data model

Update `types/index.ts`:

```typescript
export type ObservationResponse =
  | 'im_in'
  | 'id_watch_this'
  | 'im_curious'
  | 'doesnt_grab_me'
  | 'not_for_me'
  | 'already_seen_it';

export type SubResponse = string;
```

Update `app/api/observations/route.ts`:
- Update `VALID_RESPONSES` to match new values
- Accept optional `sub_response: string | null` in POST body
- Pass `sub_response` to database

Update `lib/db.ts`:
- Add `sub_response TEXT` to `suggestion_log` (nullable)
- Update `logObservation` to accept and store `sub_response`

---

## Do not modify

- `app/test/observation/page.tsx` — this is a parallel variant, not a replacement

---

## Reference files

- `app/test/observation/page.tsx` — card design reference
- `lib/db.ts` — schema and logObservation
- `app/api/observations/route.ts` — API route
- `types/index.ts` — current types
