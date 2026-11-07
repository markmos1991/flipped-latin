"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { getCards, saveCard, saveCards } from "@/lib/storage/cards";
import { stripHarakat } from "@/lib/arabic/harakat";
import { formatLessonDate, itemToWordEntry } from "@/lib/lessons";
import { useDisplaySettings, displayControlProps } from "@/lib/settings";
import DisplayControls from "@/components/DisplayControls";
import FloatingSettingsButton from "@/components/FloatingSettingsButton";
import SettingsSheet from "@/components/SettingsSheet";
import { Lesson, LessonItem, PronunciationNote, Verb } from "@/types/lesson";

type ItemProps = {
  item: LessonItem;
  inDeck: boolean;
  onAdd: (item: LessonItem) => void;
  arabicText: (a: string) => string;
  compact?: boolean;
  showLatin?: boolean;
};

function AddButton({ item, inDeck, onAdd }: { item: LessonItem; inDeck: boolean; onAdd: (item: LessonItem) => void }) {
  return (
    <button
      onClick={() => onAdd(item)}
      disabled={inDeck}
      aria-label={inDeck ? `${item.english}: in your flashcards` : `Add ${item.english} to flashcards`}
      title={inDeck ? "In your flashcards" : "Add to flashcards"}
      className={[
        "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors",
        inDeck
          ? "border-ink-line text-gold-soft"
          : "border-gold/60 text-gold hover:bg-gold/10",
      ].join(" ")}
    >
      {inDeck ? (
        <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" aria-hidden>
          <polyline points="2,7.5 5.5,11 12,3" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
          <line x1="7" y1="1" x2="7" y2="13" />
          <line x1="1" y1="7" x2="13" y2="7" />
        </svg>
      )}
    </button>
  );
}

// Arabic first, English as supporting text. Transliteration is shown
// only for lessons that opt in (showTransliteration), and only when it
// was hand-written — the rule-based fallback stays on the flashcards.
function LessonItemRow({ item, inDeck, onAdd, arabicText, compact, showLatin }: ItemProps) {
  return (
    <li className="flex items-start gap-3 border-b border-ink-line/70 py-3 last:border-b-0">
      <AddButton item={item} inDeck={inDeck} onAdd={onAdd} />

      <div className="flex min-w-0 flex-1 flex-col-reverse gap-1 sm:flex-row sm:items-center sm:gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-latin text-sm text-paper-dim">
            {item.english}
            {item.note && (
              <span className="ml-2 inline-block whitespace-nowrap rounded-full border border-ink-line px-2 py-0.5 text-[11px] text-paper-dim">
                {item.note}
              </span>
            )}
          </p>
          {showLatin && item.latin && <p className="font-latin text-xs italic text-gold-soft">{item.latin}</p>}
        </div>

        <p
          dir="rtl"
          lang="ar"
          className={[
            "text-right font-arabic leading-loose text-paper sm:max-w-[60%] sm:shrink-0",
            compact ? "text-2xl" : "text-3xl sm:text-4xl",
          ].join(" ")}
        >
          {arabicText(item.arabic)}
        </p>
      </div>
    </li>
  );
}

function SectionHeader({
  label,
  items,
  savedArabic,
  onAddAll,
}: {
  label: string;
  items: LessonItem[];
  savedArabic: Set<string>;
  onAddAll: (items: LessonItem[]) => void;
}) {
  const missing = items.filter((i) => !savedArabic.has(i.arabic));
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <h2 className="font-latin text-[11px] uppercase tracking-widest2 text-gold">{label}</h2>
      {missing.length > 0 ? (
        <button
          onClick={() => onAddAll(missing)}
          className="rounded-full border border-gold/60 px-3 py-1 font-latin text-[11px] uppercase tracking-wide text-gold transition-colors hover:bg-gold/10"
        >
          Add all ({missing.length})
        </button>
      ) : (
        <span className="font-latin text-[11px] uppercase tracking-wide text-paper-dim">All in deck</span>
      )}
    </div>
  );
}

// Collapsible key to the transliteration symbols, so it stays compact.
function PronunciationGuide({ notes }: { notes: PronunciationNote[] }) {
  return (
    <details className="group mb-10 rounded-lg border border-ink-line bg-ink-soft px-4 py-3">
      <summary className="cursor-pointer list-none font-latin text-[11px] uppercase tracking-widest2 text-gold">
        <span className="mr-2 inline-block transition-transform group-open:rotate-90">›</span>
        Pronunciation guide
      </summary>
      <table className="mt-3 w-full border-collapse font-latin text-sm">
        <tbody>
          {notes.map((n, i) => (
            <tr key={i} className="border-t border-ink-line/70 align-top">
              <td className="whitespace-nowrap py-2 pr-3 italic text-gold-soft">{n.symbol}</td>
              <td dir="rtl" lang="ar" className="whitespace-nowrap py-2 pr-3 font-arabic text-xl leading-none text-paper">
                {n.arabic}
              </td>
              <td className="py-2 text-paper-dim">
                {n.sound}
                {n.example && <span className="mt-0.5 block text-xs italic text-gold-soft">{n.example}</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </details>
  );
}

// All verbs side by side, one row per person — a quick revision grid.
function VerbComparison({
  verbs,
  arabicText,
  showLatin,
}: {
  verbs: Verb[];
  arabicText: (a: string) => string;
  showLatin: boolean;
}) {
  const persons = Array.from(new Set(verbs.flatMap((v) => v.conjugations.map((c) => c.person))));
  return (
    <div className="overflow-x-auto rounded-lg border border-gold/30 bg-gold/5">
      <table className="w-full border-collapse text-center">
        <thead>
          <tr className="border-b border-ink-line/70">
            <th className="px-3 py-2 text-left font-latin text-[11px] font-normal uppercase tracking-wide text-paper-dim">
              Compare
            </th>
            {verbs.map((v, i) => (
              <th key={i} className="px-3 py-2 font-latin text-xs font-normal text-paper-dim">
                {v.english}
                <span dir="rtl" lang="ar" className="block font-arabic text-lg text-gold">
                  {arabicText(v.past.arabic)}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {persons.map((p) => (
            <tr key={p} className="border-b border-ink-line/70 last:border-b-0">
              <th className="px-3 py-2 text-left font-latin text-xs font-normal uppercase tracking-wide text-paper-dim">{p}</th>
              {verbs.map((v, i) => {
                const c = v.conjugations.find((x) => x.person === p);
                return (
                  <td key={i} className="px-3 py-2">
                    {c && (
                      <>
                        <span dir="rtl" lang="ar" className="block font-arabic text-2xl leading-loose text-paper">
                          {arabicText(c.arabic)}
                        </span>
                        {showLatin && c.latin && (
                          <span className="block font-latin text-[11px] italic text-gold-soft">{c.latin}</span>
                        )}
                      </>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function VerbCard({
  verb,
  arabicText,
  showLatin,
  savedArabic,
  onAdd,
  exampleRow,
}: {
  verb: Verb;
  arabicText: (a: string) => string;
  showLatin: boolean;
  savedArabic: Set<string>;
  onAdd: (item: LessonItem) => void;
  exampleRow: (item: LessonItem, i: number) => ReactNode;
}) {
  const form = (label: string, item: LessonItem) => (
    <div className="text-right">
      <p className="font-latin text-[10px] uppercase tracking-wide text-paper-dim">{label}</p>
      <p dir="rtl" lang="ar" className="font-arabic text-2xl leading-loose text-gold">
        {arabicText(item.arabic)}
      </p>
      {showLatin && item.latin && <p className="font-latin text-[11px] italic text-gold-soft">{item.latin}</p>}
    </div>
  );
  return (
    <article className="rounded-lg border border-ink-line border-l-4 border-l-gold bg-ink-soft px-4 py-4">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-latin text-base text-paper">{verb.english}</h3>
        <div className="flex gap-5">
          {form("Present", verb.present)}
          {form("Past", verb.past)}
        </div>
      </div>
      <table className="mt-3 w-full border-collapse">
        <tbody>
          {verb.conjugations.map((c, i) => (
            <tr key={i} className="border-t border-ink-line/70">
              <td className="w-10 py-2 pr-2">
                <AddButton item={c} inDeck={savedArabic.has(c.arabic)} onAdd={onAdd} />
              </td>
              <td className="py-2 pr-2 font-latin text-sm text-paper-dim">
                {c.english}
                {showLatin && c.latin && <span className="block text-xs italic text-gold-soft">{c.latin}</span>}
              </td>
              <td dir="rtl" lang="ar" className="py-2 text-right font-arabic text-3xl leading-loose text-paper">
                {arabicText(c.arabic)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {verb.examples && verb.examples.length > 0 && (
        <>
          <p className="mt-4 font-latin text-[11px] uppercase tracking-widest2 text-paper-dim">Example sentences</p>
          <ul className="mt-1">{verb.examples.map((item, i) => exampleRow(item, i))}</ul>
        </>
      )}
    </article>
  );
}

export default function LessonView({ lesson }: { lesson: Lesson }) {
  const [savedArabic, setSavedArabic] = useState<Set<string>>(new Set());
  const [settings, setSettings] = useDisplaySettings();
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    setSavedArabic(new Set(getCards().map((c) => c.arabic)));
  }, []);

  const arabicText = (a: string) => (settings.showHarakat ? a : stripHarakat(a));
  const showLatin = lesson.showTransliteration ?? false;
  const refresh = (cards: { arabic: string }[]) => setSavedArabic(new Set(cards.map((c) => c.arabic)));
  const handleAdd = (item: LessonItem) => refresh(saveCard(itemToWordEntry(item), lesson.id));
  const handleAddAll = (items: LessonItem[]) => refresh(saveCards(items.map(itemToWordEntry), lesson.id));

  const row = (item: LessonItem, i: number, compact?: boolean) => (
    <LessonItemRow
      key={`${item.arabic}-${i}`}
      item={item}
      inDeck={savedArabic.has(item.arabic)}
      onAdd={handleAdd}
      arabicText={arabicText}
      compact={compact}
      showLatin={showLatin}
    />
  );

  const vocabItems = lesson.vocabulary.flatMap((g) => g.items);
  const verbs = lesson.verbs ?? [];
  const verbItems = verbs.flatMap((v) => [...v.conjugations, ...(v.examples ?? [])]);
  const grammarItems = lesson.grammar.flatMap((g) => [...(g.forms ?? []), ...(g.examples ?? [])]);

  return (
    <>
      <main className="mx-auto flex min-h-dvh max-w-2xl flex-col px-5 pt-10 pb-28 sm:px-8">
        <header className="mb-10 flex items-start justify-between gap-4">
          <div>
            <p className="font-latin text-[11px] uppercase tracking-widest2 text-gold">
              {lesson.number ? `Lesson ${lesson.number}` : "Lesson notes"} · {formatLessonDate(lesson.date)}
            </p>
            <h1 className="mt-1 font-latin text-2xl text-paper">{lesson.title ?? "Lesson"}</h1>
          </div>
          <nav className="mt-1 flex shrink-0 flex-col items-end gap-1 font-latin text-xs uppercase tracking-wide">
            <Link href="/lessons" className="text-paper-dim underline decoration-ink-line underline-offset-4 hover:text-gold">
              ← Lessons
            </Link>
            <Link href="/cards" className="text-paper-dim underline decoration-ink-line underline-offset-4 hover:text-gold">
              Flashcards →
            </Link>
          </nav>
        </header>

        {lesson.pronunciation && lesson.pronunciation.length > 0 && (
          <PronunciationGuide notes={lesson.pronunciation} />
        )}

        {vocabItems.length > 0 && (
          <section className="mb-10">
            <SectionHeader label="Vocabulary & phrases" items={vocabItems} savedArabic={savedArabic} onAddAll={handleAddAll} />
            {lesson.vocabulary.map((group, gi) => (
              <div key={gi} className="mb-4 rounded-lg border border-ink-line bg-ink-soft px-4">
                {group.heading && (
                  <h3 className="border-b border-ink-line/70 pt-3 pb-2 font-latin text-xs uppercase tracking-wide text-paper-dim">
                    {group.heading}
                  </h3>
                )}
                <ul>{group.items.map((item, i) => row(item, i))}</ul>
              </div>
            ))}
          </section>
        )}

        {verbs.length > 0 && (
          <section className="mb-10">
            <SectionHeader label="Verb library" items={verbItems} savedArabic={savedArabic} onAddAll={handleAddAll} />
            <VerbComparison verbs={verbs} arabicText={arabicText} showLatin={showLatin} />
            <div className="mt-4 flex flex-col gap-4">
              {verbs.map((v, vi) => (
                <VerbCard
                  key={vi}
                  verb={v}
                  arabicText={arabicText}
                  showLatin={showLatin}
                  savedArabic={savedArabic}
                  onAdd={handleAdd}
                  exampleRow={(item, i) => row(item, i, true)}
                />
              ))}
            </div>
          </section>
        )}

        {lesson.grammar.length > 0 && (
          <section className="mb-10">
            <SectionHeader label="Grammar & patterns" items={grammarItems} savedArabic={savedArabic} onAddAll={handleAddAll} />
            <div className="flex flex-col gap-4">
              {lesson.grammar.map((g, gi) => (
                <article key={gi} className="rounded-lg border border-ink-line border-l-4 border-l-gold bg-ink-soft px-4 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-latin text-base text-paper">{g.title}</h3>
                      {g.meaning && <p className="mt-0.5 font-latin text-sm text-paper-dim">Meaning: {g.meaning}</p>}
                    </div>
                    {g.arabic && (
                      <p dir="rtl" lang="ar" className="font-arabic text-4xl leading-none text-gold">
                        {arabicText(g.arabic)}
                      </p>
                    )}
                  </div>
                  {g.explanation && (
                    <p className="mt-3 font-latin text-sm leading-relaxed text-paper-dim">{g.explanation}</p>
                  )}
                  {g.forms && g.forms.length > 0 && (
                    <>
                      <p className="mt-4 font-latin text-[11px] uppercase tracking-widest2 text-paper-dim">Pattern</p>
                      <ul className="mt-1 rounded-md border border-gold/30 bg-gold/5 px-3">
                        {g.forms.map((item, i) => row(item, i))}
                      </ul>
                    </>
                  )}
                  {g.examples && g.examples.length > 0 && (
                    <>
                      <p className="mt-4 font-latin text-[11px] uppercase tracking-widest2 text-paper-dim">Examples</p>
                      <ul className="mt-1">{g.examples.map((item, i) => row(item, i, true))}</ul>
                    </>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {lesson.sentences.length > 0 && (
          <section className="mb-10">
            <SectionHeader label="Useful sentences" items={lesson.sentences} savedArabic={savedArabic} onAddAll={handleAddAll} />
            <ul className="rounded-lg border border-ink-line bg-ink-soft px-4">
              {lesson.sentences.map((item, i) => row(item, i))}
            </ul>
          </section>
        )}

        {lesson.personal.length > 0 && (
          <section className="mb-10">
            <SectionHeader label="Personal sentences" items={lesson.personal} savedArabic={savedArabic} onAddAll={handleAddAll} />
            <p className="mb-3 font-latin text-xs text-paper-dim">
              About me — practise saying these out loud.
            </p>
            <ul className="rounded-lg border border-gold/50 bg-gold/10 px-4">
              {lesson.personal.map((item, i) => row(item, i))}
            </ul>
          </section>
        )}

      </main>

      <FloatingSettingsButton onClick={() => setSheetOpen(true)} />

      <SettingsSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <DisplayControls {...displayControlProps(settings, setSettings)} />
      </SettingsSheet>
    </>
  );
}
