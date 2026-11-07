"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { starterWords } from "@/lib/data/starter-words";
import { getCards, saveCards, deleteCard } from "@/lib/storage/cards";
import { stripHarakat } from "@/lib/arabic/harakat";
import { allLessons, formatLessonDate, lessonKeyWords, WordGroup } from "@/lib/lessons";
import { useDisplaySettings, displayControlProps } from "@/lib/settings";
import DisplayControls from "@/components/DisplayControls";
import FloatingSettingsButton from "@/components/FloatingSettingsButton";
import SettingsSheet from "@/components/SettingsSheet";
import { FlashCard, WordEntry } from "@/types/arabic";
import { Lesson } from "@/types/lesson";

// Word sources shown on this page, newest lesson first, starter words last.
// A word appears once only: the first source that has it keeps it.
type Source = { id: string; label: string; sublabel?: string; lessonId?: string; groups: WordGroup[] };

function lessonLabel(l: Lesson): string {
  return l.number ? `Lesson ${l.number}` : `Lesson · ${formatLessonDate(l.date)}`;
}

function buildSources(): Source[] {
  const seen = new Set<string>();
  const dedupe = (groups: WordGroup[]) =>
    groups
      .map((g) => ({
        ...g,
        words: g.words.filter((w) => (seen.has(w.arabic) ? false : (seen.add(w.arabic), true))),
      }))
      .filter((g) => g.words.length > 0);

  const lessonSources = allLessons().map((l) => ({
    id: l.id,
    label: lessonLabel(l),
    sublabel: l.title,
    lessonId: l.id,
    groups: dedupe(lessonKeyWords(l)),
  }));
  const starter = { id: "starter", label: "Starter words", groups: dedupe([{ heading: "Common words", words: starterWords }]) };
  return [...lessonSources, starter].filter((s) => s.groups.length > 0);
}

const sources = buildSources();
const lessonLabels = new Map(allLessons().map((l) => [l.id, l.title ? `${lessonLabel(l)} · ${l.title}` : lessonLabel(l)]));

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
    <line x1="7" y1="1" x2="7" y2="13" />
    <line x1="1" y1="7" x2="13" y2="7" />
  </svg>
);

function AddAllButton({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <button
      onClick={(e) => {
        // It also sits inside a <summary>: don't toggle the section.
        e.preventDefault();
        onClick();
      }}
      className="shrink-0 rounded-full border border-gold/60 px-3 py-1 font-latin text-[11px] uppercase tracking-wide text-gold transition-colors hover:bg-gold/10"
    >
      Add all ({count})
    </button>
  );
}

export default function CardsPage() {
  const [cards, setCards] = useState<FlashCard[] | null>(null);
  const [settings, setSettings] = useDisplaySettings();
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    setCards(getCards());
  }, []);

  const arabicText = (a: string) => (settings.showHarakat ? a : stripHarakat(a));

  const loaded = cards !== null;
  const deck = cards ?? [];
  const savedArabic = new Set(deck.map((c) => c.arabic));
  const notSaved = (words: WordEntry[]) => words.filter((w) => !savedArabic.has(w.arabic));

  const handleAdd = (words: WordEntry[], lessonId?: string) => setCards(saveCards(words, lessonId));
  const handleDelete = (id: string) => setCards(deleteCard(id));

  // Your deck, grouped by the lesson each card came from.
  const deckGroups: { label: string; cards: FlashCard[] }[] = [];
  for (const l of allLessons()) {
    const inLesson = deck.filter((c) => c.lessonId === l.id);
    if (inLesson.length > 0) deckGroups.push({ label: lessonLabels.get(l.id)!, cards: inLesson });
  }
  const other = deck.filter((c) => !c.lessonId || !lessonLabels.has(c.lessonId));
  if (other.length > 0) deckGroups.push({ label: "Other words", cards: other });

  const availableSources = sources
    .map((s) => ({ ...s, groups: s.groups.map((g) => ({ ...g, words: notSaved(g.words) })).filter((g) => g.words.length > 0) }))
    .filter((s) => s.groups.length > 0);

  return (
    <>
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col px-5 pt-10 pb-28 sm:px-8">
      <header className="mb-8 flex items-start justify-between">
        <div>
          <p className="font-latin text-[11px] uppercase tracking-widest2 text-gold">
            Flashcards
          </p>
          <h1 className="mt-1 font-arabic text-2xl text-paper">
            بِطَاقَات — your word deck
          </h1>
        </div>
        <nav className="mt-1 flex flex-col items-end gap-1 font-latin text-xs uppercase tracking-wide">
          <Link
            href="/"
            className="text-paper-dim underline decoration-ink-line underline-offset-4 hover:text-gold"
          >
            ← Renderer
          </Link>
          <Link
            href="/lessons"
            className="text-paper-dim underline decoration-ink-line underline-offset-4 hover:text-gold"
          >
            Lessons →
          </Link>
        </nav>
      </header>

      {/* Your deck */}
      <section className="mb-10">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-latin text-[11px] uppercase tracking-widest2 text-paper-dim">
            Your deck{loaded && ` (${deck.length})`}
          </p>
          {deck.length > 0 && (
            <Link
              href="/practice"
              className="rounded-full border border-gold/60 px-3 py-1.5 font-latin text-xs uppercase tracking-wide text-gold transition-colors hover:bg-gold/10"
            >
              Start review →
            </Link>
          )}
        </div>

        {!loaded ? null : deck.length === 0 ? (
          <p className="rounded-lg border border-ink-line bg-ink-soft px-4 py-6 text-center font-latin text-sm text-paper-dim">
            No cards saved yet — add a few words below to build your deck.
          </p>
        ) : (
          <div className="flex flex-col gap-5">
            {deckGroups.map((g) => (
              <div key={g.label}>
                <h2 className="mb-2 font-latin text-xs uppercase tracking-wide text-gold-soft">
                  {g.label} <span className="text-paper-dim">({g.cards.length})</span>
                </h2>
                <ul className="flex flex-col gap-2">
                  {g.cards.map((c) => (
                    <li
                      key={c.id}
                      className="flex items-center justify-between rounded-lg border border-ink-line bg-ink-soft px-4 py-3"
                    >
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="font-arabic text-lg text-paper">{arabicText(c.arabic)}</span>
                        <span className="font-latin text-xs text-paper-dim">{c.english}</span>
                      </div>
                      <button
                        onClick={() => handleDelete(c.id)}
                        aria-label={`Remove ${c.english}`}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-paper-dim transition-colors hover:text-red-400"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
                          <line x1="1" y1="1" x2="13" y2="13" />
                          <line x1="13" y1="1" x2="1" y2="13" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Add words, grouped by lesson and category */}
      <section>
        <p className="mb-3 font-latin text-[11px] uppercase tracking-widest2 text-paper-dim">
          Add words
        </p>
        {!loaded ? null : availableSources.length === 0 ? (
          <p className="font-latin text-sm text-paper-dim">
            Every lesson and starter word is already in your deck.
          </p>
        ) : (
          <div className="flex flex-col gap-4">
            {availableSources.map((s) => {
              const all = s.groups.flatMap((g) => g.words);
              return (
                <details key={s.id} open className="group rounded-lg border border-ink-line bg-ink-soft/60 px-4 py-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                    <span>
                      <span className="font-latin text-[11px] uppercase tracking-widest2 text-gold">
                        <span className="mr-2 inline-block transition-transform group-open:rotate-90">›</span>
                        {s.label}
                      </span>
                      {s.sublabel && <span className="ml-2 font-latin text-xs text-paper-dim">{s.sublabel}</span>}
                    </span>
                    <AddAllButton
                      count={all.length}
                      onClick={() => handleAdd(all, s.lessonId)}
                    />
                  </summary>
                  {s.groups.map((g) => (
                    <div key={g.heading} className="mt-4">
                      <div className="mb-1 flex items-center justify-between gap-3 border-b border-ink-line/70 pb-2">
                        <h3 className="font-latin text-xs uppercase tracking-wide text-paper-dim">{g.heading}</h3>
                        {s.groups.length > 1 && (
                          <AddAllButton count={g.words.length} onClick={() => handleAdd(g.words, s.lessonId)} />
                        )}
                      </div>
                      <ul>
                        {g.words.map((w) => (
                          <li key={w.arabic} className="flex items-center justify-between gap-3 border-b border-ink-line/40 py-2 last:border-b-0">
                            <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
                              <span className="font-arabic text-lg text-paper">{arabicText(w.arabic)}</span>
                              <span className="font-latin text-xs text-paper-dim">{w.english}</span>
                            </div>
                            <button
                              onClick={() => handleAdd([w], s.lessonId)}
                              aria-label={`Add ${w.english}`}
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/60 text-gold transition-colors hover:bg-gold/10"
                            >
                              <PlusIcon />
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </details>
              );
            })}
          </div>
        )}
      </section>
    </main>

    <FloatingSettingsButton onClick={() => setSheetOpen(true)} />

    <SettingsSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
      <DisplayControls {...displayControlProps(settings, setSettings)} />
    </SettingsSheet>
    </>
  );
}
