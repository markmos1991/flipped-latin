import { describe, it, expect, beforeEach } from "vitest";
import { RuleBasedTransliterator } from "../providers/rule-based";

let t: RuleBasedTransliterator;
beforeEach(() => { t = new RuleBasedTransliterator(); });

async function trans(arabic: string) {
  return (await t.analyse(arabic)).map((w) => w.transliteration);
}

// ── Sun-letter assimilation ──────────────────────────────────────────────────

describe("sun letters — ال assimilates", () => {
  it("sin (س): السوق → AS-S...", async () => {
    const [w] = await trans("السوق");
    expect(w).toMatch(/^AS-S/);
  });

  it("shin (ش): الشمس → ASH-SH...", async () => {
    const [w] = await trans("الشمس");
    expect(w).toMatch(/^ASH-SH/);
  });

  it("ra (ر): الرجل → AR-R...", async () => {
    const [w] = await trans("الرجل");
    expect(w).toMatch(/^AR-R/);
  });

  it("nun (ن): النهر → AN-N...", async () => {
    const [w] = await trans("النهر");
    expect(w).toMatch(/^AN-N/);
  });

  it("dal (د): الدرس → AD-D...", async () => {
    const [w] = await trans("الدرس");
    expect(w).toMatch(/^AD-D/);
  });

  it("ta (ت): التفاح → AT-T...", async () => {
    const [w] = await trans("التفاح");
    expect(w).toMatch(/^AT-T/);
  });

  it("lam (ل): الليل → AL-L... (lam is itself a sun letter)", async () => {
    const [w] = await trans("الليل");
    // ل assimilates: prefix = AL- (A + L + hyphen), then L again from the word
    expect(w).toMatch(/^AL-L/);
  });
});

// ── Sun-letter assimilation with harakat — internal vowels must survive ──────
//
// The doubled consonant from assimilation must still pick up whatever vowel
// follows it in the source text; skipNextShadda should only swallow the
// shadda mark itself, never the harakat that comes after it.

describe("sun letters with harakat — internal vowel is preserved", () => {
  it("shin (ش): الشَّمْس → ASH-SHAMS", async () => {
    const [w] = await trans("الشَّمْس");
    expect(w).toBe("ASH-SHAMS");
  });

  it("ra (ر): الرَّجُل → AR-RAJUL", async () => {
    const [w] = await trans("الرَّجُل");
    expect(w).toBe("AR-RAJUL");
  });

  it("dal (د): الدَّار → AD-DAR", async () => {
    const [w] = await trans("الدَّار");
    expect(w).toBe("AD-DAR");
  });
});

// ── Moon letters — AL- stays ─────────────────────────────────────────────────

describe("moon letters — ال stays as AL-", () => {
  it("qaf (ق): القمر → AL-Q...", async () => {
    const [w] = await trans("القمر");
    expect(w).toMatch(/^AL-Q/);
  });

  it("ba (ب): البيت → AL-B...", async () => {
    const [w] = await trans("البيت");
    expect(w).toMatch(/^AL-B/);
  });

  it("kaf (ك): الكتاب → AL-K...", async () => {
    const [w] = await trans("الكتاب");
    expect(w).toMatch(/^AL-K/);
  });

  it("mim (م): المدرسة → AL-M...", async () => {
    const [w] = await trans("المدرسة");
    expect(w).toMatch(/^AL-M/);
  });
});

// ── Multi-word: article mid-sentence still assimilates ───────────────────────

describe("mid-sentence assimilation", () => {
  it("السوق as third word in a sentence", async () => {
    const words = await trans("ذهبت إلى السوق");
    expect(words).toHaveLength(3);
    expect(words[2]).toMatch(/^AS-S/);
  });

  it("moon word followed by sun word as separate tokens", async () => {
    // الشمس is a standalone token here — assimilation must fire mid-sentence
    const words = await trans("رأيت القمر الشمس");
    expect(words[1]).toMatch(/^AL-Q/);   // moon letter
    expect(words[2]).toMatch(/^ASH-SH/); // sun letter
  });
});
