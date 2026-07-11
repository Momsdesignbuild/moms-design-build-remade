---
title: "The Method"
type: doc
---

# The Method — the carbon-copy pipeline

Proven on all 70 portfolio pages and all 205 blog posts. Copy it, don't reinvent it. Per page, in order — each step gates the next:

1. **Spot-check the mirror against their LIVE page** — `node scripts/spot-check-live.mjs <slug>`. Their Flywheel site changes and goes down (has twice); never trust the mirror blind.
2. **Enrich** — `node scripts/build-project-page.mjs <slug>` (portfolio) or `build-blog-post.mjs <slug>` (posts; `--page` for page-type docs). WATCH THE FLAGS it prints: designer mentions, pixel-detected badges, photos broken on their live site, multiple videos.
3. **Batch ~5 pages, ONE deploy** — `npm run build && vercel --prod --yes`. Deploys are whole-site; never deploy concurrently with another agent (claim it in the handoff ledger).
4. **Verify with receipts** — `node scripts/verify-project-page.mjs <slug>` / `verify-blog-post.mjs`. The 10 checks vs THEIR live site: meta title, meta description, canonical, JSON-LD byte-or-date-normalized, gallery count+order+alts, visible text presence, video parity, all images 200, no designer mentions. A page is done when this passes, **not before**. Deliberate deviations live in `scripts/page-exclusions.json` — the receipt says "24 shown of 29", it never silently lies.
5. **LOOK at the page** — `node scripts/contact-sheet.mjs out.png slug1 slug2…` (5-up stitched, scrolls so animations fire) or `scripts/look.mjs <url> <out.png>`. Layout jank the checks can't see only dies when someone looks.

## Craft rules that saved us repeatedly

- **Fix the RULE, not the page.** Every complaint becomes a generic rule; page-specific hacks go in the OVERRIDES map with a comment.
- **Read the actual pixels/files when confused** — alt text lies; a camera-named JPG was a NARI badge.
- **Announce the next slug from `their-portfolio-grid.json`**, never from memory (two pages got built out of order by memory-counting).
- Their WP emits garbage HTML (paragraphs as bare text nodes beside `<p>` tags, glued ¶s, mixed absolute/relative canonicals) — extraction **walks node structure**, never per-`<p>` selection.
- Their site outages must not fail OUR receipts — the verifier retries and soft-skips live checks when Flywheel is down.
- **Verify like a paranoid.** Deployed ≠ done. Byte-diff the JSON-LD, curl every image for 200s, screenshot. Previous bots died self-reporting success ("22/22 photos!" — it was 11, doubled).

## Starting a new front

Clone the pattern, don't force-fit: `build-<type>-page.mjs` (manifest → live JSON-LD verbatim → images w/ alts → structured body → Sanity doc) + `verify-<type>-page.mjs` (same 10 checks, adjusted GROQ/path). One page first, show Josh, then batch. Full detail in the handoff doc.

See [[Scripts Reference]] · [[SEO Rules]] · [[Landmines]]
