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

export type FlashCard = {
  id: string;
  sentence: ArabicSentence;
  createdAt: string;
};

export type DisplayMode = "arabic" | "flipped" | "normal";
