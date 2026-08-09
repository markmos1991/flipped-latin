import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ink-on-paper palette: a near-black warm ink background,
        // parchment text, and a gold-leaf accent used sparingly for
        // the Flipped Latin layer so it reads as "annotation" rather
        // than primary text.
        ink: {
          DEFAULT: "#13100D",
          soft: "#1B1713",
          line: "#2A2420",
        },
        paper: {
          DEFAULT: "#F3ECDD",
          dim: "#C9BFA9",
        },
        gold: {
          DEFAULT: "#C9A227",
          soft: "#8A7332",
        },
      },
      fontFamily: {
        arabic: ["var(--font-arabic)", "serif"],
        latin: ["var(--font-latin)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.18em",
      },
      keyframes: {
        sweep: {
          "0%": { transform: "translateX(6px)", opacity: "0" },
          "40%": { opacity: "1" },
          "100%": { transform: "translateX(-6px)", opacity: "0" },
        },
      },
      animation: {
        sweep: "sweep 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
