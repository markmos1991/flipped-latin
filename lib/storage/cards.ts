import { FlashCard, WordEntry } from "@/types/arabic";

const STORAGE_KEY = "flipped-latin-cards";

function readAll(): FlashCard[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(cards: FlashCard[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  } catch {}
}

export function getCards(): FlashCard[] {
  return readAll();
}

// No-op if a card with this Arabic text is already saved.
export function saveCard(word: WordEntry): FlashCard[] {
  const cards = readAll();
  if (cards.some((c) => c.arabic === word.arabic)) return cards;

  const next = [
    ...cards,
    { ...word, id: crypto.randomUUID(), createdAt: new Date().toISOString() },
  ];
  writeAll(next);
  return next;
}

export function deleteCard(id: string): FlashCard[] {
  const next = readAll().filter((c) => c.id !== id);
  writeAll(next);
  return next;
}
