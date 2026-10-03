import type { Metadata } from "next";
import { Noto_Naskh_Arabic, Space_Grotesk } from "next/font/google";
import "./globals.css";

// Noto Naskh Arabic: a naskh face drawn for screens. Lighter strokes and
// open counters (ق ف و م stay readable at small sizes on the dark
// background) — Amiri, used before, read as too heavy.
const arabicFont = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-arabic",
  display: "swap",
});

// Space Grotesk: a geometric, wide-set sans. Chosen deliberately over
// a default like Inter because its uppercase letterforms (Q, A, W)
// stay distinct after horizontal mirroring — the whole premise of
// the experiment depends on that legibility surviving the flip.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-latin",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Flipped Latin",
  description:
    "An experimental mirrored-transliteration renderer for practising right-to-left Arabic reading.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${arabicFont.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
