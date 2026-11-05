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
export const GUIDE_TAB_CSS = ".gnudge{animation:gnudge 10s 3.5s ease-in-out infinite backwards}.gnudge-arrow{animation:garrow 10s 3.5s ease-in-out infinite backwards}@keyframes gnudge{0%,24%,100%{transform:translateX(0)}5%{transform:translateX(-16px)}10%{transform:translateX(-3px)}15%{transform:translateX(-12px)}20%{transform:translateX(0)}}@keyframes garrow{0%,24%,100%{transform:translateX(0)}6%,16%{transform:translateX(-4px)}11%{transform:translateX(1px)}}.group:hover .gnudge{animation:none;transform:translateX(-10px);transition:transform .35s cubic-bezier(.2,.7,.2,1)}@media (prefers-reduced-motion:reduce){.gnudge,.gnudge-arrow{animation:none}}"; // ui-label: css, not words
