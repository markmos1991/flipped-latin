"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { starterWords } from "@/lib/data/starter-words";
import { getCards, saveCard, deleteCard } from "@/lib/storage/cards";
import { stripHarakat } from "@/lib/arabic/harakat";
import { useDisplaySettings, displayControlProps } from "@/lib/settings";
import DisplayControls from "@/components/DisplayControls";
import FloatingSettingsButton from "@/components/FloatingSettingsButton";
import SettingsSheet from "@/components/SettingsSheet";
import { FlashCard, WordEntry } from "@/types/arabic";

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
  const available = starterWords.filter((w) => !savedArabic.has(w.arabic));

  function handleAdd(word: WordEntry) {
    setCards(saveCard(word));
  }

  function handleDelete(id: string) {
    setCards(deleteCard(id));
  }

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
        <Link
          href="/"
          className="mt-1 font-latin text-xs uppercase tracking-wide text-paper-dim underline decoration-ink-line underline-offset-4 hover:text-gold"
        >
          ← Renderer
        </Link>
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
          <ul className="flex flex-col gap-2">
            {deck.map((c) => (
              <li
                key={c.id}
                className="flex items-center justify-between rounded-lg border border-ink-line bg-ink-soft px-4 py-3"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-arabic text-lg text-paper">{arabicText(c.arabic)}</span>
                  <span className="font-latin text-xs text-paper-dim">{c.english}</span>
                </div>
                <button
                  onClick={() => handleDelete(c.id)}
                  aria-label={`Remove ${c.english}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-paper-dim transition-colors hover:text-red-400"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
                    <line x1="1" y1="1" x2="13" y2="13" />
                    <line x1="13" y1="1" x2="1" y2="13" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Add words */}
      <section>
        <p className="mb-3 font-latin text-[11px] uppercase tracking-widest2 text-paper-dim">
          Add words
        </p>
        {available.length === 0 ? (
          <p className="font-latin text-sm text-paper-dim">
            All starter words are already in your deck.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {available.map((w) => (
              <li
                key={w.arabic}
                className="flex items-center justify-between rounded-lg border border-ink-line bg-ink-soft/60 px-4 py-3"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-arabic text-lg text-paper">{arabicText(w.arabic)}</span>
                  <span className="font-latin text-xs text-paper-dim">{w.english}</span>
                </div>
                <button
                  onClick={() => handleAdd(w)}
                  aria-label={`Add ${w.english}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gold/60 text-gold transition-colors hover:bg-gold/10"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
                    <line x1="7" y1="1" x2="7" y2="13" />
                    <line x1="1" y1="7" x2="13" y2="7" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
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
