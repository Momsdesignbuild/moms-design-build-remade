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
export const GUIDE_TAB_CSS = ".gh{box-shadow:-3px 4px 12px rgba(0,0,0,.35),inset 1px 1px 0 rgba(255,255,255,.4);transition:width .45s cubic-bezier(.2,.7,.2,1),box-shadow .15s}.gh:hover,.gh:focus-visible{width:62px}.gh-taunt{animation:ghw 3s cubic-bezier(.3,0,.2,1) 1}@keyframes ghw{0%,100%{width:32px}18%,76%{width:62px}}.gh:active{box-shadow:inset 0 5px 14px rgba(0,0,0,.45),inset 0 -1px 0 rgba(255,255,255,.2)}@media (max-width:767px){.gh:hover,.gh:focus-visible{width:56px}@keyframes ghw{0%,100%{width:28px}18%,76%{width:56px}}}@media (prefers-reduced-motion:reduce){.gh-taunt{animation:none}}"; // ui-label: css, not words
