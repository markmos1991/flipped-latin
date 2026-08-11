"use client";

import { useState, useEffect, useRef } from "react";
import { DisplayMode, WordPair } from "@/types/arabic";
import { sampleSentences } from "@/lib/data/sample";
import { stripHarakat } from "@/lib/arabic/harakat";
import FlippedText from "@/components/FlippedText";
import DisplayControls from "@/components/DisplayControls";
import ArabicInput from "@/components/ArabicInput";
import FloatingSettingsButton from "@/components/FloatingSettingsButton";
import SettingsSheet from "@/components/SettingsSheet";

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

// Returns size/spacing defaults tuned to the viewport width.
// Only applied on first visit — saved localStorage settings always win.
function deviceDefaults(): Partial<Settings> {
  const w = window.innerWidth;
  if (w < 640)  return { arabicSize: 34, latinSize: 13, wordGap: 10, latinGap: 4 };
  if (w < 1024) return { arabicSize: 44, latinSize: 16, wordGap: 16, latinGap: 5 };
  return               { arabicSize: 52, latinSize: 20, wordGap: 24, latinGap: 6 };
}

export default function Home() {
  const [settings, setSettings] = useState<Settings>(DEFAULTS);
  const [showEnglish, setShowEnglish] = useState(false);
  const [customWords, setCustomWords] = useState<WordPair[] | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const firstSave = useRef(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setSettings((prev) => ({ ...prev, ...JSON.parse(raw) }));
      } else {
        setSettings((prev) => ({ ...prev, ...deviceDefaults() }));
      }
    } catch {
      setSettings((prev) => ({ ...prev, ...deviceDefaults() }));
    }
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

  const activeWords = customWords ?? sentence.words;

  function handleWordChange(index: number, latin: string) {
    setCustomWords((prev) => {
      const source = prev ?? sentence.words;
      const next = [...source];
      next[index] = { ...next[index], latin };
      return next;
    });
  }

  function selectSentence(id: string) {
    setSettings((s) => ({ ...s, sentenceId: id }));
    setShowEnglish(false);
    setCustomWords(null);
  }

  const controlProps = {
    mode, onModeChange: (mode: DisplayMode) => setSettings((s) => ({ ...s, mode })),
    arabicSize, onArabicSizeChange: (arabicSize: number) => setSettings((s) => ({ ...s, arabicSize })),
    latinSize, onLatinSizeChange: (latinSize: number) => setSettings((s) => ({ ...s, latinSize })),
    wordGap, onWordGapChange: (wordGap: number) => setSettings((s) => ({ ...s, wordGap })),
    latinGap, onLatinGapChange: (latinGap: number) => setSettings((s) => ({ ...s, latinGap })),
    showAxis, onShowAxisChange: (showAxis: boolean) => setSettings((s) => ({ ...s, showAxis })),
    showHarakat, onShowHarakatChange: (showHarakat: boolean) => setSettings((s) => ({ ...s, showHarakat })),
  };

  return (
    <>
      <main className="mx-auto flex min-h-dvh max-w-2xl flex-col px-5 pt-10 pb-28 sm:px-8">
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
            words={activeWords}
            mode={mode}
            arabicSize={arabicSize}
            latinSize={latinSize}
            wordGap={wordGap}
            latinGap={latinGap}
            showAxis={showAxis}
            showHarakat={showHarakat}
            onWordChange={handleWordChange}
          />

          {!customWords && sentence.english && (
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

        <div className="rounded-lg border border-ink-line bg-ink-soft p-4 sm:p-5">
          <ArabicInput onSubmit={(words) => { setCustomWords(words); setShowEnglish(false); }} />
        </div>

        <p className="mt-8 font-latin text-xs leading-relaxed text-paper-dim">
          This is the milestone-one test bed: hard-coded sentences, genuine CSS
          mirroring (<code className="text-gold">scale-x(-1)</code> on the
          rendered glyphs, never on the stored string), and live controls for
          type scale and spacing. Automatic transliteration and flashcards come
          after this feels right.
        </p>
      </main>

      <FloatingSettingsButton onClick={() => setSheetOpen(true)} />

      <SettingsSheet open={sheetOpen} onClose={() => setSheetOpen(false)}>
        <DisplayControls {...controlProps} />
      </SettingsSheet>
    </>
  );
}
