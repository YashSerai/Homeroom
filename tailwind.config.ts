import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F5F0E4",
        "paper-light": "#FAF6EC",
        ink: "#1C1917",
        "ink-soft": "#3A3733",
        forest: "#1F3D2E",
        "forest-light": "#2D5A44",
        terracotta: "#B85A38",
        sage: "#8FA89A",
        "sage-light": "#C4D2C9",
        stone: "#78716C",
        "stone-light": "#D6CFC2",
        gold: "#B6843A"
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      boxShadow: {
        paper: "0 22px 60px rgba(31, 61, 46, 0.12)"
      }
    }
  },
  plugins: [tailwindcssAnimate]
};

export default config;

