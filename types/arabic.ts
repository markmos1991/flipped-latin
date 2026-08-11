// Underlying data is always stored as plain, normal Latin (e.g. "QAHWA").
// Mirroring is a render-time CSS transform — never a stored representation.
// See components/FlippedWord.tsx.

export type WordPair = {
  arabic: string;
  latin: string;
};

export type ArabicSentence = {
  id: string;
  arabic: string;
  english?: string;
  words: WordPair[];
};

// A single reviewable word — gloss included, unlike WordPair. Used by the
// starter word list and flashcard storage; unrelated to ArabicSentence.
export type WordEntry = {
  arabic: string;
  latin: string;
  english: string;
};

export type FlashCard = WordEntry & {
  id: string;
  createdAt: string;
};

export type DisplayMode = "arabic" | "flipped" | "normal";
