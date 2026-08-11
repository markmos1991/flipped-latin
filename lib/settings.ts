"use client";

import { useEffect, useRef, useState } from "react";
import { DisplayMode } from "@/types/arabic";

// Shared across every page — one settings sheet, one persisted shape, so
// type scale / spacing / harakat preferences carry over between the
// renderer, the deck, and practice instead of resetting per page.
const STORAGE_KEY = "flipped-latin-settings";

export type DisplaySettings = {
  mode: DisplayMode;
  arabicSize: number;
  latinSize: number;
  wordGap: number;
  latinGap: number;
  showAxis: boolean;
  showHarakat: boolean;
};

export const DEFAULT_DISPLAY_SETTINGS: DisplaySettings = {
  mode: "flipped",
  arabicSize: 48,
  latinSize: 18,
  wordGap: 20,
  latinGap: 6,
  showAxis: false,
  showHarakat: true,
};

// Size/spacing defaults tuned to the viewport width. Only applied on a
// first visit with nothing saved yet — saved settings always win.
function deviceDefaults(): Partial<DisplaySettings> {
  const w = window.innerWidth;
  if (w < 640)  return { arabicSize: 34, latinSize: 13, wordGap: 10, latinGap: 4 };
  if (w < 1024) return { arabicSize: 44, latinSize: 16, wordGap: 16, latinGap: 5 };
  return               { arabicSize: 52, latinSize: 20, wordGap: 24, latinGap: 6 };
}

export function useDisplaySettings() {
  const [settings, setSettings] = useState<DisplaySettings>(DEFAULT_DISPLAY_SETTINGS);
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

  return [settings, setSettings] as const;
}

// Builds the onXChange callback set DisplayControls expects, bound to a
// given setSettings — identical wiring on every page that renders it.
export function displayControlProps(
  settings: DisplaySettings,
  setSettings: React.Dispatch<React.SetStateAction<DisplaySettings>>
) {
  return {
    mode: settings.mode,
    onModeChange: (mode: DisplayMode) => setSettings((s) => ({ ...s, mode })),
    arabicSize: settings.arabicSize,
    onArabicSizeChange: (arabicSize: number) => setSettings((s) => ({ ...s, arabicSize })),
    latinSize: settings.latinSize,
    onLatinSizeChange: (latinSize: number) => setSettings((s) => ({ ...s, latinSize })),
    wordGap: settings.wordGap,
    onWordGapChange: (wordGap: number) => setSettings((s) => ({ ...s, wordGap })),
    latinGap: settings.latinGap,
    onLatinGapChange: (latinGap: number) => setSettings((s) => ({ ...s, latinGap })),
    showAxis: settings.showAxis,
    onShowAxisChange: (showAxis: boolean) => setSettings((s) => ({ ...s, showAxis })),
    showHarakat: settings.showHarakat,
    onShowHarakatChange: (showHarakat: boolean) => setSettings((s) => ({ ...s, showHarakat })),
  };
}
