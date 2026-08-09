"use client";

type Props = {
  onClick: () => void;
};

export default function FloatingSettingsButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      aria-label="Open display settings"
      className={[
        "fixed right-5 z-40",
        "flex h-12 w-12 items-center justify-center",
        "rounded-full border border-gold/60 bg-ink-soft shadow-lg shadow-black/40",
        "text-gold transition-all hover:bg-gold/10 active:scale-95",
      ].join(" ")}
      style={{ bottom: "calc(1.5rem + env(safe-area-inset-bottom, 0px))" }}
    >
      {/* Horizontal sliders icon */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden
      >
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="20" y2="18" />
        <circle cx="9" cy="6" r="2.5" fill="currentColor" stroke="none" />
        <circle cx="15" cy="12" r="2.5" fill="currentColor" stroke="none" />
        <circle cx="9" cy="18" r="2.5" fill="currentColor" stroke="none" />
      </svg>
    </button>
  );
}
