import { ArabicSentence } from "@/types/arabic";

// All sentences store fully-vowelled Arabic (with harakat). Stripping is
// done at render time via stripHarakat() — the data is never modified.
export const sampleSentences: ArabicSentence[] = [
  {
    id: "coffee",
    arabic: "أَنَا أُرِيدُ قَهْوَةً",
    english: "I want coffee",
    words: [
      { arabic: "أَنَا", latin: "ANA" },
      { arabic: "أُرِيدُ", latin: "UREED" },
      { arabic: "قَهْوَةً", latin: "QAHWA" },
    ],
  },
  {
    id: "house",
    arabic: "هَذَا هُوَ الْبَيْتُ الْكَبِيرُ",
    english: "This is the big house",
    words: [
      { arabic: "هَذَا", latin: "HAADHA" },
      { arabic: "هُوَ", latin: "HUWA" },
      { arabic: "الْبَيْتُ", latin: "AL-BAYT" },
      { arabic: "الْكَبِيرُ", latin: "AL-KABEER" },
    ],
  },
  {
    id: "book",
    arabic: "قَرَأْتُ كِتَابًا جَمِيلًا أَمْسِ",
    english: "I read a beautiful book yesterday",
    words: [
      { arabic: "قَرَأْتُ", latin: "QARA'TU" },
      { arabic: "كِتَابًا", latin: "KITAABAN" },
      { arabic: "جَمِيلًا", latin: "JAMEELAN" },
      { arabic: "أَمْسِ", latin: "AMS" },
    ],
  },

  // Mirror-stress tests — Q, S, Z, Y are the hardest uppercase glyphs
  // to read legibly after a horizontal flip. Load them up deliberately.
  {
    id: "mirror-qsz",
    arabic: "السَّمَاءُ زَرْقَاءُ وَالْقَمَرُ يُضِيءُ",
    english: "The sky is blue and the moon shines",
    words: [
      { arabic: "السَّمَاءُ", latin: "AL-SAMAA" },
      { arabic: "زَرْقَاءُ", latin: "ZARQAA" },
      { arabic: "وَالْقَمَرُ", latin: "WAL-QAMAR" },
      { arabic: "يُضِيءُ", latin: "YADEE" },
    ],
  },
  {
    id: "mirror-y",
    arabic: "يَوْمٌ جَدِيدٌ يَبْدَأُ الْآنَ",
    english: "A new day begins now",
    words: [
      { arabic: "يَوْمٌ", latin: "YAWM" },
      { arabic: "جَدِيدٌ", latin: "JADEED" },
      { arabic: "يَبْدَأُ", latin: "YABDA" },
      { arabic: "الْآنَ", latin: "AL-AAN" },
    ],
  },

  // Long sentence — forces RTL wrap to 2+ lines at normal type sizes.
  {
    id: "long-wrap",
    arabic: "ذَهَبْتُ إِلَى السُّوقِ وَأَشْتَرَيْتُ خُبْزًا وَزَيْتًا وَجُبْنًا وَتَمْرًا",
    english: "I went to the market and bought bread, oil, cheese, and dates",
    words: [
      { arabic: "ذَهَبْتُ", latin: "THAHABTU" },
      { arabic: "إِلَى", latin: "ILA" },
      { arabic: "السُّوقِ", latin: "AL-SUUQ" },
      { arabic: "وَأَشْتَرَيْتُ", latin: "WA-ISHTARAYTU" },
      { arabic: "خُبْزًا", latin: "KHUBZAN" },
      { arabic: "وَزَيْتًا", latin: "WA-ZAYTAN" },
      { arabic: "وَجُبْنًا", latin: "WA-JUBNAN" },
      { arabic: "وَتَمْرًا", latin: "WA-TAMRAN" },
    ],
  },

  // Tashkeel density stress test — checks Amiri renders dense harakat
  // without clipping or colliding with the Latin annotation below.
  {
    id: "tashkeel",
    arabic: "بَيْتٌ صَغِيرٌ وَجَمِيلٌ",
    english: "A small and beautiful house",
    words: [
      { arabic: "بَيْتٌ", latin: "BAYT" },
      { arabic: "صَغِيرٌ", latin: "SAGHEER" },
      { arabic: "وَجَمِيلٌ", latin: "WA-JAMEEL" },
    ],
  },
];
