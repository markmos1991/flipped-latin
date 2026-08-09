# Flipped Latin

An experimental renderer for practising right-to-left Arabic reading:
Arabic text stays normal, its Latin transliteration is uppercased and
genuinely mirrored horizontally with CSS (`scale-x(-1)`), and the two are
aligned word-by-word underneath each other.

## Status: Milestone 1 — renderer only

This is the hard-coded test bed described in the project handover. It does
**not** yet do automatic transliteration, manual correction, or flashcards.
It exists to answer one question first: *does the renderer itself feel
good?*

What's here:

- Three hard-coded `ArabicSentence` examples (`lib/data/sample.ts`)
- `FlippedWord` / `FlippedText`, which do genuine word-level alignment and
  mirroring (the mirror is a render-time transform — `pair.latin` is always
  stored as normal, unreversed text)
- A live experiment panel (`DisplayControls`) for display mode, Arabic /
  Latin type scale, word spacing, and the gap between each Arabic word and
  its Latin line, so you can tune typography without touching code
- A "show mirror-axis mark" toggle, mostly useful while eyeballing whether
  spacing between word pairs feels right

What's deliberately *not* here yet: Arabic input, automatic
transliteration, correction UI, display-mode persistence, and flashcards.
Those come after the renderer itself feels right.

## Getting started

This project wasn't built or run in the sandbox that generated it (no
package registry access there), so the first run on your machine will
install dependencies normally:

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where to look first

- `components/FlippedWord.tsx` — the actual mirroring. If mirrored glyphs
  ever look wrong, this is the file to check; it should never touch the
  string itself, only the rendered `<span>`.
- `components/FlippedText.tsx` — RTL word-level layout and wrapping.
- `app/page.tsx` — the test bed: sentence switcher + controls, wired to
  the two components above.
- `lib/data/sample.ts` — edit or extend this directly to throw more test
  sentences (longer words, more words per line, harder-to-mirror letters
  like Q, S, Z) at the renderer while you're evaluating it.

## Design notes

- Arabic is set in Amiri (a naskh-style serif chosen for reading clarity,
  not decoration); Latin is set in Space Grotesk, chosen because its
  uppercase letterforms — Q, A, W in particular — stay distinct after a
  horizontal flip, which is the thing the whole project depends on.
- The palette is a warm, near-black "ink" background with a muted gold
  accent reserved for the Latin/annotation layer, so Flipped Latin reads
  as pronunciation support under the Arabic rather than competing with it.
- Uppercase-only Latin is intentional (see the handover doc) — mirrored
  lowercase letters are more prone to becoming other letters (mirrored `q`
  can read as `p`).

## Next milestones (not started)

1. `ArabicInput` + a pluggable `Transliterator` interface
   (`lib/arabic/transliterate.ts`) so transliteration can be automated and
   later swapped out.
2. `TransliterationEditor` for correcting auto-generated Latin per word.
3. `lib/storage/cards.ts` — local (e.g. `localStorage`) persistence for
   flashcards, plus a minimal `FlashCard` component with Again / Got It.
