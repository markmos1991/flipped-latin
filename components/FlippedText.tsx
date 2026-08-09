"use client";

import { WordPair, DisplayMode } from "@/types/arabic";
import FlippedWord from "./FlippedWord";

type Props = {
  words: WordPair[];
  mode: DisplayMode;
  arabicSize: number;
  latinSize: number;
  wordGap: number;
  latinGap: number;
  showAxis: boolean;
  showHarakat: boolean;
  onWordChange?: (index: number, latin: string) => void;
};

export default function FlippedText({
  words,
  mode,
  arabicSize,
  latinSize,
  wordGap,
  latinGap,
  showAxis,
  showHarakat,
  onWordChange,
}: Props) {
  return (
    <div
      dir="rtl"
      className="flex flex-wrap items-start justify-start"
      style={{ gap: `${wordGap}px` }}
    >
      {words.map((pair, i) => (
        <FlippedWord
          key={`${pair.arabic}-${i}`}
          pair={pair}
          mode={mode}
          arabicSize={arabicSize}
          latinSize={latinSize}
          latinGap={latinGap}
          showAxis={showAxis}
          showHarakat={showHarakat}
          onLatinChange={onWordChange ? (latin) => onWordChange(i, latin) : undefined}
        />
      ))}
    </div>
  );
}
