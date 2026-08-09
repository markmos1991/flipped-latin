"use client";

import { useState } from "react";
import { WordPair } from "@/types/arabic";
import { AnalysedWord } from "@/lib/arabic/transliterate";

type Props = {
  onSubmit: (words: WordPair[]) => void;
};

export default function ArabicInput({ onSubmit }: Props) {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/analyse-arabic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ arabic: value.trim() }),
      });

      if (!res.ok) throw new Error("Analysis failed");

      const { words }: { words: AnalysedWord[] } = await res.json();

      onSubmit(
        words.map((w) => ({ arabic: w.surface, latin: w.transliteration }))
      );
    } catch {
      setError("Could not analyse — check the text and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="font-latin text-[11px] uppercase tracking-widest2 text-paper-dim">
        Try your own Arabic
      </label>
      <textarea
        dir="rtl"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="اكتب أو الصق النص العربي هنا…"
        rows={3}
        className={[
          "w-full resize-none rounded-lg border bg-ink-soft px-4 py-3",
          "font-arabic text-lg leading-relaxed text-paper",
          "placeholder:text-paper-dim/50",
          "border-ink-line focus:border-gold/50 focus:outline-none",
        ].join(" ")}
      />
      {error && (
        <p className="font-latin text-xs text-red-400">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading || !value.trim()}
        className={[
          "self-end rounded-full border px-4 py-2",
          "font-latin text-xs uppercase tracking-wide transition-colors",
          loading || !value.trim()
            ? "cursor-not-allowed border-ink-line text-paper-dim/40"
            : "border-gold/60 text-gold hover:bg-gold/10",
        ].join(" ")}
      >
        {loading ? "Analysing…" : "Render →"}
      </button>
    </form>
  );
}
