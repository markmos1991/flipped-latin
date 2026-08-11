"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FlippedWord from "@/components/FlippedWord";
import DisplayControls from "@/components/DisplayControls";
import FloatingSettingsButton from "@/components/FloatingSettingsButton";
import SettingsSheet from "@/components/SettingsSheet";
import { getCards } from "@/lib/storage/cards";
import { useDisplaySettings, displayControlProps } from "@/lib/settings";
import { DisplayMode, FlashCard } from "@/types/arabic";

type Stage = "front" | "back";

export default function PracticePage() {
  const [deck, setDeck] = useState<FlashCard[] | null>(null);
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<Stage>("front");
  const [hintShown, setHintShown] = useState(false);
  const [tally, setTally] = useState({ correct: 0, again: 0 });
  const [settings, setSettings] = useDisplaySettings();
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    setDeck(getCards());
  }, []);

  function grade(correct: boolean) {
    setTally((t) =>
      correct ? { ...t, correct: t.correct + 1 } : { ...t, again: t.again + 1 }
    );
    setIndex((i) => i + 1);
    setStage("front");
    setHintShown(false);
  }

  let content: React.ReactNode;

  if (deck === null) {
    content = null;
  } else if (deck.length === 0) {
    content = (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-5 text-center">
        <p className="font-latin text-sm text-paper-dim">No cards saved yet.</p>
        <Link
          href="/cards"
          className="rounded-full border border-gold/60 px-4 py-2 font-latin text-xs uppercase tracking-wide text-gold transition-colors hover:bg-gold/10"
        >
          ← Back to deck
        </Link>
      </main>
    );
  } else if (index >= deck.length) {
    content = (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-5 text-center">
        <p className="font-latin text-[11px] uppercase tracking-widest2 text-gold">
          Session complete
        </p>
        <p className="font-latin text-2xl text-paper">
          {tally.correct} correct · {tally.again} again
        </p>
        <Link
          href="/cards"
          className="rounded-full border border-gold/60 px-4 py-2 font-latin text-xs uppercase tracking-wide text-gold transition-colors hover:bg-gold/10"
        >
          ← Back to deck
        </Link>
      </main>
    );
  } else {
    const card = deck[index];
    // Front stays Arabic-only until hint/reveal, regardless of the shared
    // display mode. Once latin should be visible, honour the user's chosen
    // orientation (mirrored or normal) — just never "arabic" (that would
    // hide it again).
    const mode: DisplayMode =
      stage === "back" || hintShown
        ? settings.mode === "arabic"
          ? "flipped"
          : settings.mode
        : "arabic";

    content = (
      <div className="flex min-h-dvh flex-col">
        <header className="flex items-center justify-between px-5 pt-6 sm:px-8">
          <Link
            href="/cards"
            aria-label="Exit review"
            className="flex h-8 w-8 items-center justify-center rounded-full text-paper-dim transition-colors hover:text-paper"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden>
              <line x1="1" y1="1" x2="13" y2="13" />
              <line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </Link>
          <p className="font-latin text-xs uppercase tracking-widest2 text-paper-dim">
            {index + 1} / {deck.length}
          </p>
          <p className="font-latin text-xs text-paper-dim">
            {tally.correct} correct, {tally.again} again
          </p>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center gap-6 px-5">
          <FlippedWord
            pair={{ arabic: card.arabic, latin: card.latin }}
            mode={mode}
            arabicSize={settings.arabicSize}
            latinSize={settings.latinSize}
            latinGap={settings.latinGap}
            showAxis={settings.showAxis}
            showHarakat={settings.showHarakat}
          />
          {stage === "back" && (
            <p className="font-latin text-lg text-paper-dim">{card.english}</p>
          )}
        </main>

        <div
          className="flex gap-3 px-5 pb-6 sm:px-8"
          style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}
        >
          {stage === "front" ? (
            <>
              <button
                onClick={() => setHintShown((v) => !v)}
                className={[
                  "flex-1 rounded-full border px-4 py-3 font-latin text-xs uppercase tracking-wide transition-colors",
                  hintShown
                    ? "border-gold bg-gold/10 text-gold"
                    : "border-ink-line text-paper-dim hover:border-gold/50 hover:text-paper",
                ].join(" ")}
              >
                Hint
              </button>
              <button
                onClick={() => setStage("back")}
                className="flex-1 rounded-full border border-gold/60 px-4 py-3 font-latin text-xs uppercase tracking-wide text-gold transition-colors hover:bg-gold/10"
              >
                Reveal
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => grade(false)}
                className="flex-1 rounded-full border border-ink-line px-4 py-3 font-latin text-xs uppercase tracking-wide text-paper-dim transition-colors hover:border-red-400/50 hover:text-red-400"
              >
                Again
              </button>
              <button
                onClick={() => grade(true)}
                className="flex-1 rounded-full border border-gold bg-gold/10 px-4 py-3 font-latin text-xs uppercase tracking-wide text-gold transition-colors hover:bg-gold/20"
              >
                Got it
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {content}
      <FloatingSettingsButton onClick={() => setSheetOpen(true)} />
      <SettingsSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <DisplayControls {...displayControlProps(settings, setSettings)} />
      </SettingsSheet>
    </>
  );
}
