"use client";

import { useState, useEffect, useRef } from "react";
import { DisplayMode } from "@/types/arabic";
import { sampleSentences } from "@/lib/data/sample";
import { stripHarakat } from "@/lib/arabic/harakat";
import FlippedText from "@/components/FlippedText";
import DisplayControls from "@/components/DisplayControls";

const STORAGE_KEY = "flipped-latin-settings";

type Settings = {
  sentenceId: string;
  mode: DisplayMode;
  arabicSize: number;
  latinSize: number;
  wordGap: number;
  latinGap: number;
  showAxis: boolean;
  showHarakat: boolean;
};

const DEFAULTS: Settings = {
  sentenceId: sampleSentences[0].id,
  mode: "flipped",
  arabicSize: 48,
  latinSize: 18,
  wordGap: 20,
  latinGap: 6,
  showAxis: false,
  showHarakat: true,
};

export default function Home() {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [showEnglish, setShowEnglish] = useState(false);
  // Prevents the save effect from overwriting localStorage with DEFAULTS
  // on the first render, before the load effect has run.
  const firstSave = useRef(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings((prev) => ({ ...prev, ...JSON.parse(raw) }));
    } catch {}
  }, []);

  useEffect(() => {
    if (firstSave.current) { firstSave.current = false; return; }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {}
  }, [settings]);

  const { sentenceId, mode, arabicSize, latinSize, wordGap, latinGap, showAxis, showHarakat } =
    settings;

  const sentence =
    sampleSentences.find((s) => s.id === sentenceId) ?? sampleSentences[0];

  function selectSentence(id: string) {
    setSettings((s) => ({ ...s, sentenceId: id }));
    setShowEnglish(false);
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col px-5 py-10 sm:px-8">
      <header className="mb-10">
        <p className="font-latin text-[11px] uppercase tracking-widest2 text-gold">
          Flipped Latin
        </p>
        <h1 className="mt-1 font-arabic text-2xl text-paper">
          مرآة الحروف — a mirrored-reading experiment
        </h1>
      </header>

      <section className="mb-8 rounded-xl border border-ink-line bg-ink-soft/60 px-5 py-10 sm:px-8">
        <FlippedText
          words={sentence.words}
          mode={mode}
          arabicSize={arabicSize}
          latinSize={latinSize}
          wordGap={wordGap}
          latinGap={latinGap}
          showAxis={showAxis}
          showHarakat={showHarakat}
        />

        {sentence.english && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={() => setShowEnglish((v) => !v)}
              className="font-latin text-xs uppercase tracking-wide text-paper-dim underline decoration-ink-line underline-offset-4 hover:text-gold"
            >
              {showEnglish ? sentence.english : "Reveal English"}
            </button>
          </div>
        )}
      </section>

      <div className="mb-8 flex flex-wrap justify-end gap-2">
        {sampleSentences.map((s) => (
          <button
            key={s.id}
            onClick={() => selectSentence(s.id)}
            className={[
              "rounded-full border px-3 py-1.5 font-arabic text-sm transition-colors",
              s.id === sentenceId
                ? "border-gold bg-gold/10 text-gold"
                : "border-ink-line text-paper-dim hover:border-gold/50 hover:text-paper",
            ].join(" ")}
          >
            {showHarakat ? s.arabic : stripHarakat(s.arabic)}
          </button>
        ))}
      </div>

      <DisplayControls
        mode={mode}
        onModeChange={(mode) => setSettings((s) => ({ ...s, mode }))}
        arabicSize={arabicSize}
        onArabicSizeChange={(arabicSize) => setSettings((s) => ({ ...s, arabicSize }))}
        latinSize={latinSize}
        onLatinSizeChange={(latinSize) => setSettings((s) => ({ ...s, latinSize }))}
        wordGap={wordGap}
        onWordGapChange={(wordGap) => setSettings((s) => ({ ...s, wordGap }))}
        latinGap={latinGap}
        onLatinGapChange={(latinGap) => setSettings((s) => ({ ...s, latinGap }))}
        showAxis={showAxis}
        onShowAxisChange={(showAxis) => setSettings((s) => ({ ...s, showAxis }))}
        showHarakat={showHarakat}
        onShowHarakatChange={(showHarakat) => setSettings((s) => ({ ...s, showHarakat }))}
      />

      <p className="mt-8 font-latin text-xs leading-relaxed text-paper-dim">
        This is the milestone-one test bed: hard-coded sentences, genuine CSS
        mirroring (<code className="text-gold">scale-x(-1)</code> on the
        rendered glyphs, never on the stored string), and live controls for
        type scale and spacing. Automatic transliteration and flashcards come
        after this feels right.
      </p>
    </main>
  );
}
