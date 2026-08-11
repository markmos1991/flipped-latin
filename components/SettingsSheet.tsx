"use client";

import { useEffect, useRef } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function SettingsSheet({ open, onClose, children }: Props) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);

  // Lock body scroll while sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // ── Drag-to-close on the handle ──────────────────────────────────────────
  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    dragStart.current = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
    if (sheetRef.current) sheetRef.current.style.transition = "none";
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (dragStart.current === null) return;
    const delta = Math.max(0, e.clientY - dragStart.current);
    if (sheetRef.current) sheetRef.current.style.transform = `translateY(${delta}px)`;
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (dragStart.current === null) return;
    const delta = Math.max(0, e.clientY - dragStart.current);
    dragStart.current = null;
    if (sheetRef.current) {
      sheetRef.current.style.transition = "";
      sheetRef.current.style.transform = "";
    }
    if (delta > 80) onClose();
  }

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden
        onClick={onClose}
        className={[
          "fixed inset-0 z-50 bg-black/60 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* Sheet panel */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label="Display settings"
        className={[
          "fixed bottom-0 left-0 right-0 z-[60]",
          "flex max-h-[85dvh] flex-col",
          "rounded-t-2xl border-t border-ink-line bg-ink-soft",
          "transition-transform duration-300 ease-out",
          open ? "translate-y-0" : "translate-y-full",
        ].join(" ")}
      >
        {/* Drag handle — touch target is deliberately generous */}
        <div
          className="flex touch-none cursor-grab justify-center pb-2 pt-3 active:cursor-grabbing"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          aria-hidden
        >
          <div className="h-1 w-10 rounded-full bg-paper-dim/30" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pb-3">
          <p className="font-latin text-[11px] uppercase tracking-widest2 text-gold">
            Display settings
          </p>
          <button
            onClick={onClose}
            aria-label="Close settings"
            className="flex h-7 w-7 items-center justify-center rounded-full text-paper-dim transition-colors hover:text-paper"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <line x1="1" y1="1" x2="13" y2="13" />
              <line x1="13" y1="1" x2="1" y2="13" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div
          className="overflow-y-auto px-5 pb-6"
          style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
