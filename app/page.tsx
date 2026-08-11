"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { WordPair } from "@/types/arabic";
import { sampleSentences } from "@/lib/data/sample";
import { stripHarakat } from "@/lib/arabic/harakat";
import { useDisplaySettings, displayControlProps } from "@/lib/settings";
import FlippedText from "@/components/FlippedText";
import DisplayControls from "@/components/DisplayControls";
import ArabicInput from "@/components/ArabicInput";
import FloatingSettingsButton from "@/components/FloatingSettingsButton";
import SettingsSheet from "@/components/SettingsSheet";

const SENTENCE_STORAGE_KEY = "flipped-latin-sentence";

export default function Home() {
  const [settings, setSettings] = useDisplaySettings();
  const [sentenceId, setSentenceId] = useState(sampleSentences[0].id);
  const [showEnglish, setShowEnglish] = useState(false);
  const [customWords, setCustomWords] = useState<WordPair[] | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const firstSentenceSave = useRef(true);

  useEffect(() => {
    const saved = localStorage.getItem(SENTENCE_STORAGE_KEY);
    if (saved && sampleSentences.some((s) => s.id === saved)) setSentenceId(saved);
  }, []);

  useEffect(() => {
    if (firstSentenceSave.current) { firstSentenceSave.current = false; return; }
    try {
      localStorage.setItem(SENTENCE_STORAGE_KEY, sentenceId);
    } catch {}
  }, [sentenceId]);

  const { mode, arabicSize, latinSize, wordGap, latinGap, showAxis, showHarakat } = settings;

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
    setSentenceId(id);
    setShowEnglish(false);
    setCustomWords(null);
  }

  const controlProps = displayControlProps(settings, setSettings);

  return (
    <>
      <main className="mx-auto flex min-h-dvh max-w-2xl flex-col px-5 pt-10 pb-28 sm:px-8">
        <header className="mb-10 flex items-start justify-between">
          <div>
            <p className="font-latin text-[11px] uppercase tracking-widest2 text-gold">
              Flipped Latin
            </p>
            <h1 className="mt-1 font-arabic text-2xl text-paper">
              مرآة الحروف — a mirrored-reading experiment
            </h1>
          </div>
          <Link
            href="/cards"
            className="mt-1 font-latin text-xs uppercase tracking-wide text-paper-dim underline decoration-ink-line underline-offset-4 hover:text-gold"
          >
            Flashcards →
          </Link>
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
