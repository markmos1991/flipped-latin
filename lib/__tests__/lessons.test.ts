import { describe, it, expect } from "vitest";
import { lessons } from "@/lib/data/lessons";
import { allLessons, formatLessonDate, itemLatin, itemToWordEntry, lessonItems, lessonKeyWords } from "@/lib/lessons";

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

  it("every verb has a conjugation for each person, with hand-written Latin", () => {
    for (const l of lessons) {
      for (const v of l.verbs ?? []) {
        expect(v.conjugations.map((c) => c.person)).toEqual(["I", "We", "He", "She"]);
        for (const c of v.conjugations) expect(c.latin).toBeTruthy();
      }
    }
  });

  it("includes verb conjugations and examples in a lesson's flashcard items", () => {
    const l2 = lessons.find((l) => l.number === 2)!;
    const arabic = lessonItems(l2).map((i) => i.arabic);
    expect(arabic).toContain("أُسَافِرُ");
    expect(arabic).toContain("هِيَ تَذْهَبُ إِلَى الْجَمْعِيَّةِ كُلَّ أُسْبُوعٍ");
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

describe("lessonKeyWords", () => {
  it("keeps one card per verb, using the past-tense root", () => {
    const l2 = lessons.find((l) => l.number === 2)!;
    const verbs = lessonKeyWords(l2).find((g) => g.heading === "Verbs")!;
    expect(verbs.words.map((w) => w.arabic)).toEqual(["سَافَرَ", "ذَهَبَ", "تَعَلَّمَ", "دَرَّسَ", "اِشْتَرَى"]);
    expect(verbs.words[0]).toEqual({ arabic: "سَافَرَ", latin: "Sāfara", english: "to travel" });
    const all = lessonKeyWords(l2).flatMap((g) => g.words.map((w) => w.arabic));
    expect(all).not.toContain("أُسَافِرُ");
  });

  it("includes every vocabulary group", () => {
    for (const l of lessons) {
      const headings = lessonKeyWords(l).map((g) => g.heading);
      for (const g of l.vocabulary) expect(headings).toContain(g.heading);
    }
  });
});
