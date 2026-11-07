import { lessons } from "@/lib/data/lessons";
import { romaniseText } from "@/lib/arabic/providers/rule-based";
import { WordEntry } from "@/types/arabic";
import { Lesson, LessonItem } from "@/types/lesson";

// Newest first.
export function allLessons(): Lesson[] {
  return [...lessons].sort((a, b) => b.date.localeCompare(a.date));
}

export function getLesson(id: string): Lesson | undefined {
  return lessons.find((l) => l.id === id);
}

export function formatLessonDate(date: string): string {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function itemLatin(item: LessonItem): string {
  return item.latin ?? romaniseText(item.arabic);
}

// Flashcard shape for a lesson item. The note is folded into the English
// so male/female variants stay distinguishable on the card.
export function itemToWordEntry(item: LessonItem): WordEntry {
  return {
    arabic: item.arabic,
    latin: itemLatin(item),
    english: item.note ? `${item.english} (${item.note})` : item.english,
  };
}

// Every item in a lesson that can become a flashcard.
export function lessonItems(lesson: Lesson): LessonItem[] {
  return [
    ...lesson.vocabulary.flatMap((g) => g.items),
    ...(lesson.verbs ?? []).flatMap((v) => [...v.conjugations, ...(v.examples ?? [])]),
    ...lesson.grammar.flatMap((g) => [...(g.forms ?? []), ...(g.examples ?? [])]),
    ...lesson.sentences,
    ...lesson.personal,
  ];
}

export type WordGroup = { heading: string; words: WordEntry[] };

// The key words of a lesson for the flashcard deck, grouped by category:
// the vocabulary groups as they are, plus one card per verb. A verb's
// card uses the past-tense root (the dictionary form, e.g. سَافَرَ "to travel")
// rather than every conjugation. Example sentences, grammar and personal
// sentences are left out.
export function lessonKeyWords(lesson: Lesson): WordGroup[] {
  const groups: WordGroup[] = lesson.vocabulary.map((g, i) => ({
    heading: g.heading ?? (lesson.vocabulary.length > 1 ? `Vocabulary ${i + 1}` : "Vocabulary"),
    words: g.items.map(itemToWordEntry),
  }));
  const verbs = lesson.verbs ?? [];
  if (verbs.length > 0) {
    groups.push({
      heading: "Verbs",
      words: verbs.map((v) => ({
        arabic: v.past.arabic,
        latin: itemLatin(v.past),
        english: v.english.replace(/^To /, "to "),
      })),
    });
  }
  return groups;
}
