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

// Sun letters: the ل of ال assimilates to these — the article renders
// as A + (consonant) + hyphen and the consonant then appears again in
// the word body (e.g. الشمس → ASH-SHMS, السوق → AS-SWQ).
// Moon letters (everything else): article stays AL-.
const SUN_LETTERS = new Set([
  "ت", "ث", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ل", "ن",
]);

// Matches the definite article in its common forms at word start.
// Covers bare ال, hamza-bearing alif forms, and lam with sukun (الْ).
const AL_RE = /^[اأإآ]لْ?/;

function romanise(word: string): string {
  let out = "";
  let i = 0;
  // When assimilation is detected we skip the written shadda on the sun
  // letter — it marks the assimilation in text but we've already handled
  // it by doubling the consonant in the prefix.
  let skipNextShadda = false;

  const alMatch = word.match(AL_RE);
  if (alMatch) {
    const afterAl = alMatch[0].length;
    const firstLetter = word[afterAl] ?? "";
    if (SUN_LETTERS.has(firstLetter)) {
      // Sun letter: assimilate — A + consonant + hyphen, then the sun
      // letter is output again normally in the main loop below.
      out = "A" + (CONSONANT[firstLetter] ?? firstLetter) + "-";
      skipNextShadda = true;
    } else {
      out = "AL-";
    }
    i = afterAl;
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
        if (skipNextShadda) { skipNextShadda = false; break; }
        const m = out.match(/([A-Z']+)$/);
        if (m) out += m[1];
        break;
      }

      // ── Alif forms ───────────────────────────────────────────────
      case "ا":
        // Bare alif at logical word-start (no output yet, or just the
        // article prefix). out.endsWith("-") covers AL-, AS-, ASH-, etc.
        // Mid-word bare alif without a preceding harakat is ambiguous
        // (long vowel vs hamza seat) — skip it; the fatha/damma/kasra
        // cases handle the unambiguous long-vowel combinations above.
        if (out === "" || out.endsWith("-")) out += "A";
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
