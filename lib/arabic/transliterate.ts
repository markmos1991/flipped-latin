// Per-word shape returned by every Transliterator provider.
// surface + transliteration are used by the renderer now.
// lemma + root are null for the rule-based provider but will be
// populated by /api/analyse-arabic (Claude) in a later phase —
// keeping them in the shape so callers never need to change.
export type AnalysedWord = {
  surface: string;          // original Arabic word, with harakat intact
  transliteration: string;  // uppercase Latin, e.g. "QAHWA"
  lemma: string | null;     // dictionary form — null until Claude provider
  root: string | null;      // trilateral root — null until Claude provider
};

export interface Transliterator {
  analyse(arabic: string): Promise<AnalysedWord[]>;
}
