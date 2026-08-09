"use client";

import { useState } from "react";
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
  onLatinChange?: (latin: string) => void;
};

export default function FlippedWord({
  pair,
  mode,
  arabicSize,
  latinSize,
  latinGap,
  showAxis,
  showHarakat,
  onLatinChange,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  const showLatin = mode !== "arabic";
  const arabicText = showHarakat ? pair.arabic : stripHarakat(pair.arabic);
  const editable = !!onLatinChange && showLatin;

  function startEdit() {
    if (!editable) return;
    setEditValue(pair.latin.toUpperCase());
    setEditing(true);
  }

  function commitEdit() {
    const trimmed = editValue.trim().toUpperCase();
    if (trimmed && trimmed !== pair.latin.toUpperCase()) {
      onLatinChange!(trimmed);
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") { e.currentTarget.blur(); }
    if (e.key === "Escape") { setEditing(false); }
  }

  return (
    <div className="relative flex flex-col items-center">
      <span
        style={{ fontSize: `${arabicSize}px` }}
        className="font-arabic leading-normal text-paper"
      >
        {arabicText}
      </span>

      {/*
        Always rendered so the Arabic word above never reflows when the
        display mode toggles. Visibility (not display) is toggled.
        In edit mode the input replaces the span at the same size.
      */}
      {editing ? (
        <input
          autoFocus
          value={editValue}
          onChange={(e) => setEditValue(e.target.value.toUpperCase())}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
          style={{ fontSize: `${latinSize}px`, marginTop: `${latinGap}px` }}
          className={[
            "font-latin font-medium uppercase leading-none tracking-widest2",
            "bg-transparent text-center text-gold outline-none",
            "border-b border-gold/60",
            "w-full min-w-[2ch]",
          ].join(" ")}
        />
      ) : (
        <span
          aria-hidden={!showLatin}
          onClick={startEdit}
          title={editable ? "Click to edit" : undefined}
          style={{ fontSize: `${latinSize}px`, marginTop: `${latinGap}px` }}
          className={[
            "font-latin font-medium uppercase leading-none tracking-widest2 text-gold",
            "inline-block",
            showLatin ? "visible" : "invisible select-none",
            mode === "flipped" ? "scale-x-[-1]" : "",
            editable ? "cursor-text hover:text-gold/70 transition-colors" : "select-none",
          ].join(" ")}
        >
          {pair.latin.toUpperCase()}
        </span>
      )}

      {showAxis && showLatin && (
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-full h-3 w-px -translate-x-1/2 bg-gold/40"
        />
      )}
    </div>
  );
}
