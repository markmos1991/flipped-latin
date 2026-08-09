// Unicode range U+064B–U+065F covers all standard tashkeel diacritics:
// fatha, damma, kasra, shadda, sukun, tanwin forms, and the extended
// harakat block. The stored Arabic string is never modified — strip at
// render time only.
const HARAKAT_RE = /[ً-ٟ]/g;

export function stripHarakat(s: string): string {
  return s.replace(HARAKAT_RE, "");
}
