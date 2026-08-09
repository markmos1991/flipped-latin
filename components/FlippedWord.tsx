"use client";

import { WordPair, DisplayMode } from "@/types/arabic";
import { stripHarakat } from "@/lib/arabic/harakat";

type Props = {
  pair: WordPair;
  mode: DisplayMode;
  arabicSize: number;
  latinSize: number;
  latinGap: number;
  showAxis: boolean;
  showHarakat: boolean;
};

export default function FlippedWord({
  pair,
  mode,
  arabicSize,
  latinSize,
  latinGap,
  showAxis,
  showHarakat,
}: Props) {
  const showLatin = mode !== "arabic";
  const arabicText = showHarakat ? pair.arabic : stripHarakat(pair.arabic);

  return (
    <div className="relative flex flex-col items-center">
      <span
        style={{ fontSize: `${arabicSize}px` }}
        className="font-arabic leading-normal text-paper"
      >
        {arabicText}
      </span>

      {/*
        Always rendered — never conditionally removed — so this box keeps
        reserving its width and height whether or not Latin is showing.
        That's what stops the Arabic word above from reflowing or
        resizing when the display mode toggles. Visibility (not
        `display`) is what's toggled, so the space stays reserved.
      */}
      <span
        aria-hidden={!showLatin}
        style={{ fontSize: `${latinSize}px`, marginTop: `${latinGap}px` }}
        className={[
          "font-latin font-medium uppercase leading-none tracking-widest2 text-gold",
          "inline-block select-none",
          showLatin ? "visible" : "invisible",
          mode === "flipped" ? "scale-x-[-1]" : "",
        ].join(" ")}
      >
        {pair.latin.toUpperCase()}
      </span>

      {showAxis && showLatin && (
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-full h-3 w-px -translate-x-1/2 bg-gold/40"
        />
      )}
    </div>
  );
}