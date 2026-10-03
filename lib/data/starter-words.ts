import { WordEntry } from "@/types/arabic";

// Fully-vowelled, single-word entries for the flashcard deck — unrelated
// to the reading-practice sentences in lib/data/sample.ts. A beginner
// spread: common nouns, a few adjectives, high-frequency function words.
export const starterWords: WordEntry[] = [
  // Nouns
  { arabic: "قَهْوَة", latin: "QAHWA", english: "coffee" },
  { arabic: "بَيْت", latin: "BAYT", english: "house" },
  { arabic: "كِتَاب", latin: "KITAAB", english: "book" },
  { arabic: "مَاء", latin: "MAA", english: "water" },
  { arabic: "خُبْز", latin: "KHUBZ", english: "bread" },
  { arabic: "شَمْس", latin: "SHAMS", english: "sun" },
  { arabic: "قَمَر", latin: "QAMAR", english: "moon" },
  { arabic: "بَاب", latin: "BAAB", english: "door" },
  { arabic: "وَلَد", latin: "WALAD", english: "boy" },
  { arabic: "بِنْت", latin: "BINT", english: "girl" },
  { arabic: "مَدِينَة", latin: "MADEENA", english: "city" },
  { arabic: "سُوق", latin: "SOOQ", english: "market" },
  { arabic: "يَوْم", latin: "YAWM", english: "day" },
  { arabic: "لَيْل", latin: "LAYL", english: "night" },
  { arabic: "صَدِيق", latin: "SADEEQ", english: "friend" },

  // Adjectives
  { arabic: "كَبِير", latin: "KABEER", english: "big" },
  { arabic: "صَغِير", latin: "SAGHEER", english: "small" },
  { arabic: "جَمِيل", latin: "JAMEEL", english: "beautiful" },
  { arabic: "جَدِيد", latin: "JADEED", english: "new" },
  { arabic: "قَدِيم", latin: "QADEEM", english: "old" },

  // Function words
  { arabic: "أَنَا", latin: "ANA", english: "I" },
  { arabic: "أَنْتَ", latin: "ANTA", english: "you" },
  { arabic: "هُوَ", latin: "HUWA", english: "he" },
  { arabic: "هِيَ", latin: "HIYA", english: "she" },
  { arabic: "فِي", latin: "FEE", english: "in" },
  { arabic: "مِنْ", latin: "MIN", english: "from" },
  { arabic: "إِلَى", latin: "ILA", english: "to" },
  { arabic: "نَعَم", latin: "NA'AM", english: "yes" },
  { arabic: "لَا", latin: "LAA", english: "no" },
];
