import { Noto_Sans_Armenian, Noto_Serif_Armenian } from "next/font/google";
import localFont from "next/font/local";

export const sans = Noto_Sans_Armenian({
  subsets: ["armenian", "latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-nran-sans",
  adjustFontFallback: true,
});

export const serif = Noto_Serif_Armenian({
  subsets: ["armenian", "latin"],
  weight: "variable",
  display: "swap",
  variable: "--font-nran-serif",
  adjustFontFallback: false,
});

export const display = localFont({
  src: "../fonts/grapalat-italic.otf",
  variable: "--font-nran-display",
  display: "swap",
  weight: "400",
  style: "italic",
  adjustFontFallback: false,
  fallback: ["Noto Serif Armenian", "serif"],
});
