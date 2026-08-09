"use client";

import { DisplayMode } from "@/types/arabic";

type Props = {
  mode: DisplayMode;
  onModeChange: (m: DisplayMode) => void;
  arabicSize: number;
  onArabicSizeChange: (n: number) => void;
  latinSize: number;
  onLatinSizeChange: (n: number) => void;
  wordGap: number;
  onWordGapChange: (n: number) => void;
  latinGap: number;
  onLatinGapChange: (n: number) => void;
  showAxis: boolean;
  onShowAxisChange: (b: boolean) => void;
  showHarakat: boolean;
  onShowHarakatChange: (b: boolean) => void;
};

const MODES: { value: DisplayMode; label: string }[] = [
  { value: "arabic", label: "Arabic only" },
  { value: "flipped", label: "Arabic + Flipped Latin" },
  { value: "normal", label: "Arabic + Normal Latin" },
];

function Slider({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5 text-xs text-paper-dim">
      <span className="flex items-center justify-between font-latin tracking-wide">
        <span>{label}</span>
        <span className="text-gold">{value}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  );
}

export default function DisplayControls({
  mode,
  onModeChange,
  arabicSize,
  onArabicSizeChange,
  latinSize,
  onLatinSizeChange,
  wordGap,
  onWordGapChange,
  latinGap,
  onLatinGapChange,
  showAxis,
  onShowAxisChange,
  showHarakat,
  onShowHarakatChange,
}: Props) {
  return (
    <div className="rounded-lg border border-ink-line bg-ink-soft p-4 sm:p-5">
      <p className="mb-3 font-latin text-[11px] uppercase tracking-widest2 text-paper-dim">
        Display mode
      </p>
      <div className="mb-5 flex flex-wrap gap-2">
        {MODES.map((m) => (
          <button
            key={m.value}
            onClick={() => onModeChange(m.value)}
            className={[
              "rounded-full border px-3 py-1.5 font-latin text-xs tracking-wide transition-colors",
              mode === m.value
                ? "border-gold bg-gold/10 text-gold"
                : "border-ink-line text-paper-dim hover:border-gold/50 hover:text-paper",
            ].join(" ")}
          >
            {m.label}
          </button>
        ))}
      </div>

      <p className="mb-3 font-latin text-[11px] uppercase tracking-widest2 text-paper-dim">
        Typography &amp; spacing
      </p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        <Slider
          label="Arabic size"
          value={arabicSize}
          min={24}
          max={72}
          onChange={onArabicSizeChange}
        />
        <Slider
          label="Latin size"
          value={latinSize}
          min={10}
          max={36}
          onChange={onLatinSizeChange}
        />
        <Slider
          label="Word gap"
          value={wordGap}
          min={4}
          max={48}
          onChange={onWordGapChange}
        />
        <Slider
          label="Latin gap"
          value={latinGap}
          min={0}
          max={24}
          onChange={onLatinGapChange}
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
        <label className="flex items-center gap-2 font-latin text-xs tracking-wide text-paper-dim">
          <input
            type="checkbox"
            checked={showHarakat}
            onChange={(e) => onShowHarakatChange(e.target.checked)}
            className="h-3.5 w-3.5 accent-[#C9A227]"
          />
          Show harakat
        </label>
        <label className="flex items-center gap-2 font-latin text-xs tracking-wide text-paper-dim">
          <input
            type="checkbox"
            checked={showAxis}
            onChange={(e) => onShowAxisChange(e.target.checked)}
            className="h-3.5 w-3.5 accent-[#C9A227]"
          />
          Show mirror-axis mark
        </label>
      </div>
    </div>
  );
}
