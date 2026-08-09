import { Transliterator, AnalysedWord } from "../transliterate";
import { tokenize } from "../tokenize";

// Consonant → Latin uppercase. Emphatics (ص ض ط ظ) and ذ/ث both
// map to their nearest common equivalent — close enough for a
// pronunciation hint without IPA complexity.
const CONSONANT: Record<string, string> = {
  "ب": "B",  "ت": "T",  "ث": "TH",
  "ج": "J",  "ح": "H",  "خ": "KH",
  "د": "D",  "ذ": "TH",
  "ر": "R",  "ز": "Z",
  "س": "S",  "ش": "SH",
  "ص": "S",  "ض": "D",  "ط": "T",  "ظ": "Z",
  "ع": "'",  "غ": "GH",
  "ف": "F",  "ق": "Q",  "ك": "K",
  "ل": "L",  "م": "M",  "ن": "N",
  "ه": "H",
  "و": "W",  "ي": "Y",
  "ة": "A",  "ى": "A",
  "ئ": "Y",  "ؤ": "W",
  "ء": "'",
};

// Matches the definite article in its common forms at word start.
// Covers bare ال, hamza-bearing alif forms, and lam with sukun (الْ).
const AL_RE = /^[اأإآ]لْ?/;

function romanise(word: string): string {
  let out = "";
  let i = 0;

  // Definite article: always render as AL- for MVP.
  // Sun-letter assimilation (AS-SAMAA vs AL-SAMAA) is a phonological
  // detail that Phase 2 manual correction handles for now.
  const alMatch = word.match(AL_RE);
  if (alMatch) {
    out = "AL-";
    i = alMatch[0].length;
  }

  while (i < word.length) {
    const ch = word[i];
    const next = word[i + 1] ?? "";

    switch (ch) {
      // ── Harakat ──────────────────────────────────────────────────
      case "َ": // fatha: short A, or long AA before alif/alif maqsura
        if (next === "ا" || next === "ى") { out += "AA"; i++; }
        else out += "A";
        break;
      case "ُ": // damma: short U, or long OO before waw
        if (next === "و") { out += "OO"; i++; }
        else out += "U";
        break;
      case "ِ": // kasra: short I, or long EE before ya
        if (next === "ي") { out += "EE"; i++; }
        else out += "I";
        break;
      case "ً": out += "AN"; break; // tanwin fath
      case "ٌ": out += "UN"; break; // tanwin damm
      case "ٍ": out += "IN"; break; // tanwin kasr
      case "ْ": break;              // sukun — no vowel
      case "ٰ": out += "A"; break;  // dagger alef (superscript alef)
      case "ّ": {                   // shadda — double the preceding consonant cluster
        const m = out.match(/([A-Z']+)$/);
        if (m) out += m[1];
        break;
      }

      // ── Alif forms ───────────────────────────────────────────────
      case "ا":
        // In the middle of a word with harakat, bare alif is consumed
        // as a long-vowel extension by the fatha case above.
        // At word start (or after AL-), it's a hamza seat → A.
        if (out === "" || out === "AL-") out += "A";
        break;
      case "أ": out += "A";  break;
      case "إ": out += "I";  break;
      case "آ": out += "AA"; break;

      // ── Skip ─────────────────────────────────────────────────────
      case "ـ": break; // tatweel (kashida) — decorative, no phoneme

      // ── Everything else: look up in consonant table ───────────────
      default:
        if (ch in CONSONANT) out += CONSONANT[ch];
        // Unknown Unicode codepoint — silently skip.
    }
    i++;
  }

  return out
    .replace(/^'+|'+$/g, "")   // trim edge apostrophes
    .replace(/-{2,}/g, "-")    // collapse double hyphens
    .trim();
}

export class RuleBasedTransliterator implements Transliterator {
  async analyse(arabic: string): Promise<AnalysedWord[]> {
    return tokenize(arabic).map((surface) => ({
      surface,
      transliteration: romanise(surface),
      lemma: null,
      root: null,
    }));
  }
}
