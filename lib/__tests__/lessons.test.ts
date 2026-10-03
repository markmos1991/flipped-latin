import { describe, it, expect } from "vitest";
import { lessons } from "@/lib/data/lessons";
import { allLessons, formatLessonDate, itemLatin, itemToWordEntry, lessonItems } from "@/lib/lessons";

describe("lesson data", () => {
  it("has unique ids and valid YYYY-MM-DD dates", () => {
    const ids = lessons.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const l of lessons) {
      expect(l.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(formatLessonDate(l.date)).not.toMatch(/Invalid/);
    }
  });

  it("every item has Arabic, English and some Latin", () => {
    for (const l of lessons) {
      for (const item of lessonItems(l)) {
        expect(item.arabic.trim()).not.toBe("");
        expect(item.english.trim()).not.toBe("");
        expect(itemLatin(item)).not.toBe("");
      }
    }
  });
});

describe("lesson helpers", () => {
  it("lists lessons newest first", () => {
    const dates = allLessons().map((l) => l.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("formats dates in British style", () => {
    expect(formatLessonDate("2026-10-03")).toBe("3 October 2026");
  });

  it("falls back to the rule-based transliterator when latin is missing", () => {
    expect(itemLatin({ arabic: "كِتَاب", english: "book" })).toBe("KITAAB");
  });

  it("folds the note into the flashcard's English", () => {
    expect(
      itemToWordEntry({ arabic: "مَا اسْمُكِ؟", latin: "MAA ISMUKI", english: "What is your name?", note: "to a female" }),
    ).toEqual({ arabic: "مَا اسْمُكِ؟", latin: "MAA ISMUKI", english: "What is your name? (to a female)" });
  });
});
