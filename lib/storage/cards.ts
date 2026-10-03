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
export function saveCard(word: WordEntry, lessonId?: string): FlashCard[] {
  return saveCards([word], lessonId);
}

// Batch version of saveCard — one read/write for "add all" buttons.
export function saveCards(words: WordEntry[], lessonId?: string): FlashCard[] {
  const cards = readAll();
  const saved = new Set(cards.map((c) => c.arabic));
  const createdAt = new Date().toISOString();
  const added: FlashCard[] = [];
  for (const word of words) {
    if (saved.has(word.arabic)) continue;
    saved.add(word.arabic);
    added.push({
      ...word,
      id: generateId(),
      createdAt,
      ...(lessonId ? { lessonId } : {}),
    });
  }
  if (added.length === 0) return cards;

  const next = [...cards, ...added];
  writeAll(next);
  return next;
}

export function deleteCard(id: string): FlashCard[] {
  const next = readAll().filter((c) => c.id !== id);
  writeAll(next);
  return next;
}
