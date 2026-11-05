import { Playfair_Display } from "next/font/google";

// Heavy serif used only by the cities hub headline (the site-wide Playfair loads 400/500 only).
export const serifBlack = Playfair_Display({ subsets: ["latin"], weight: ["900"], display: "swap" });

export const SERIF = 'var(--font-serif, "Playfair Display", Georgia, serif)'; // ui-label: font stack, not words
export const SIZE_FULL = "(max-width: 1024px) 100vw, 66vw"; // ui-label: image sizes hint
export const SIZE_RAIL = "(max-width: 1024px) 74vw, 24vw"; // ui-label: image sizes hint
export const SIZE_HALF = "(max-width: 1024px) 100vw, 50vw"; // ui-label: image sizes hint
export const SIZE_BOOK = "(max-width: 768px) 300px, 360px"; // ui-label: image sizes hint
export const SIZE_BOOK_SM = "(max-width: 768px) 200px, 300px"; // ui-label: image sizes hint
export const SHIMMER_CSS = "@keyframes shimmerSweep{0%{transform:translateX(-120%)}60%,100%{transform:translateX(220%)}} @media (prefers-reduced-motion:reduce){.shim{display:none}}"; // ui-label: css, not words
export const GUIDE_TAB_CSS = ".gtab{perspective:700px}.gbook{transform-origin:100% 50%;transform:rotateY(66deg);transition:transform .6s cubic-bezier(.2,.7,.2,1);filter:drop-shadow(-6px 8px 10px rgba(0,0,0,.35));animation:gpeek 10s 3.5s cubic-bezier(.4,0,.2,1) infinite backwards}.gtab:hover .gbook,.gtab:focus-visible .gbook{transform:rotateY(12deg) translateX(-4px)}@keyframes gpeek{0%,30%,100%{transform:rotateY(66deg)}9%,21%{transform:rotateY(14deg) translateX(-4px)}}@media (prefers-reduced-motion:reduce){.gbook{animation:none}}"; // ui-label: css, not words
