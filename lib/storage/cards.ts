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

// crypto.randomUUID() needs a secure context (HTTPS or localhost) — this
// app is also used over plain HTTP on the local network (phone testing),
// where it's undefined, so generate the id without it.
function generateId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

// No-op if a card with this Arabic text is already saved.
export function saveCard(word: WordEntry): FlashCard[] {
  const cards = readAll();
  if (cards.some((c) => c.arabic === word.arabic)) return cards;

  const next = [
    ...cards,
    { ...word, id: generateId(), createdAt: new Date().toISOString() },
  ];
  writeAll(next);
  return next;
}

export function deleteCard(id: string): FlashCard[] {
  const next = readAll().filter((c) => c.id !== id);
  writeAll(next);
  return next;
}
