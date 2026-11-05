import { Playfair_Display } from "next/font/google";

// Heavy serif used only by the cities hub headline (the site-wide Playfair loads 400/500 only).
export const serifBlack = Playfair_Display({ subsets: ["latin"], weight: ["900"], display: "swap" });

export const SERIF = 'var(--font-serif, "Playfair Display", Georgia, serif)'; // ui-label: font stack, not words
export const SIZE_FULL = "(max-width: 1024px) 100vw, 66vw"; // ui-label: image sizes hint
export const SIZE_RAIL = "(max-width: 1024px) 74vw, 24vw"; // ui-label: image sizes hint
