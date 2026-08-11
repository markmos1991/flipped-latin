# Flipped Latin

An experimental renderer for practising right-to-left Arabic reading:
Arabic text stays normal, its Latin transliteration is uppercased and
genuinely mirrored horizontally with CSS (`scale-x(-1)`), and the two are
aligned word-by-word underneath each other.

## Status: Phase 2 complete — automatic transliteration + correction

The renderer, automatic (rule-based) transliteration, and inline manual
correction are all working. What's here:

- **Renderer** — `FlippedWord` / `FlippedText` do genuine word-level
  alignment and mirroring (the mirror is a render-time transform;
  `pair.latin` is always stored as normal, unreversed text). Three display
  modes: Arabic only, Arabic + flipped Latin, Arabic + normal Latin.
- **Sample sentences** (`lib/data/sample.ts`) — seven hard-coded, fully
  vowelled `ArabicSentence` examples, including deliberate stress tests for
  the hardest-to-mirror uppercase glyphs (Q, S, Z, Y), RTL line wrapping,
  and dense harakat.
- **Harakat toggle** — `lib/arabic/harakat.ts` strips vowel marks at render
  time; the underlying data always stays fully vowelled.
- **Automatic transliteration** — `ArabicInput` lets you type or paste your
  own Arabic; it's sent to `POST /api/analyse-arabic`, which runs it
  through a pluggable `Transliterator` (`lib/arabic/transliterate.ts`).
  The current provider, `RuleBasedTransliterator`
  (`lib/arabic/providers/rule-based.ts`), handles harakat-to-Latin mapping,
  long-vowel detection, shadda doubling, and sun-letter assimilation for
  the definite article (e.g. fully-vowelled الشَّمْس → ASH-SHAMS, but
  القَمَر → AL-QAMAR — internal vowels require harakat in the input; bare
  unvocalised text like الشمس naturally comes out as ASH-SHMS, same as any
  other word run through this provider). Covered by unit tests in
  `lib/arabic/__tests__/rule-based.test.ts`.
- **Inline correction editor** — click any Latin word in the renderer to
  edit it directly (`FlippedWord`'s edit mode); corrections apply
  per-sentence via `onWordChange` and don't mutate the sample data.
- **Live experiment panel** (`DisplayControls`, opened via
  `FloatingSettingsButton` → `SettingsSheet`) — display mode, Arabic /
  Latin type scale, word spacing, the gap between each Arabic word and its
  Latin line, and a "show mirror-axis mark" toggle for eyeballing spacing.
- **Persistence** — display settings are saved to `localStorage`
  (`app/page.tsx`), with device-width-aware defaults (phone / tablet /
  desktop) applied only on first visit before any settings are saved.

What's *not* here yet: a Claude-backed transliteration provider (richer
accuracy, plus lemma/root — see below), and flashcards.

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Run tests with `npm run test` (Vitest).

## Where to look first

- `components/FlippedWord.tsx` — the actual mirroring and the inline edit
  UI. If mirrored glyphs ever look wrong, this is the file to check; it
  should never touch the string itself, only the rendered `<span>`.
- `components/FlippedText.tsx` — RTL word-level layout and wrapping.
- `app/page.tsx` — the test bed: sentence switcher, settings persistence,
  and wiring between the renderer, input, and controls.
- `lib/arabic/providers/rule-based.ts` — the harakat-driven transliteration
  rules (consonants, long vowels, shadda, sun/moon letters).
- `app/api/analyse-arabic/route.ts` — the analysis endpoint. Swap the
  `RuleBasedTransliterator` import here for a Claude-backed provider when
  ready; nothing else in the app needs to change.
- `lib/data/sample.ts` — edit or extend this directly to throw more test
  sentences at the renderer.

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

## Next milestones

1. **Claude-backed `Transliterator` provider** — swap into
   `app/api/analyse-arabic/route.ts` in place of (or alongside) the
   rule-based provider for improved accuracy, plus populating the
   currently-`null` `lemma` and `root` fields on `AnalysedWord`.
2. **Flashcards** — `lib/storage/cards.ts` for local (`localStorage`)
   persistence of a `FlashCard` (type already defined in
   `types/arabic.ts`), plus a minimal `FlashCard` component with
   Again / Got It review actions.
