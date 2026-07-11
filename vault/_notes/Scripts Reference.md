---
title: "Scripts Reference"
type: doc
---

# Scripts Reference — everything in `scripts/`

All run from the repo root on Josh's mini (they need `~/mdb-mirror` + `.env.local`).

## Source of truth

- **`wp-manifest.json`** — 365 content pages: titleTag, metaDescription, canonical, og, Yoast jsonLd verbatim, gallery (order/alt/caption/local file), story text, stats. Built by **`build-manifest.mjs`** from the mirror.
- **`their-portfolio-grid.json`** — the 70 portfolio cards in THEIR curated order with THEIR hand-picked card photos. The only authority on portfolio order.
- **`page-exclusions.json`** — deliberate per-page deviations (written by enrichment, read by verifiers).

## Enrichment (mirror → Sanity)

- **`build-project-page.mjs <slug>`** — portfolio: gallery w/ alts+captions, lead/hero, mixed text+image body (structure-aware walk, links preserved), designer scrubbing, pixel badge detection (sharp whiteFrac, alpha-flattened), video census + ffmpeg compression, live JSON-LD, per-page OVERRIDES map (`forceBadges`/`forcePhotos`/`removePhotos`/`stripCaptions`/`setCaptions`, `file.jpg#2` = nth occurrence).
- **`build-blog-post.mjs <slug> [--page]`** — post bodies: paragraphs, h2–h6, lists, strong/em/links, inline images w/ alts, cover-dupe skip, live JSON-LD. `--page` writes a `page`-type doc instead (used for privacy-policy, contact/thanks, …).
- **`build-blog-cards.mjs`** — the 205 slim post docs (hero from og:image, publishedAt, categories inline). ⚠️ createOrReplace — re-running wipes later patches; categories are folded in for this reason.

## Verification (receipts)

- **`verify-project-page.mjs <slug>`** — the 10-check receipt vs their live site. Green = done.
- **`verify-blog-post.mjs <slug>`** — same idea for posts (root-path canonical parity).
- **`verify-services-migration.mjs`** — 45/45 byte-equal receipts for the services migration (local-only).
- **`spot-check-live.mjs [slugs…]`** — is the mirror still current vs their live page?

## Eyes

- **`look.mjs <url> <out.png>`** — full-page screenshot, scrolls through so whileInView animations fire (playwright-core + system Chrome, `waitUntil:'load'` because autoplay video never reaches networkidle).
- **`contact-sheet.mjs out.png slug1 slug2…`** — 5-up stitched review sheet.

## The vault

- **`build-vault.mjs`** — regenerates `vault/` from the manifest: one note per page (frontmatter status/canonical/counts), wikilinks mirroring each page's REAL internal body links (graph view = the site's link structure), section indexes, Home hub. The **STATUS map at the top is the progress board — update it when pages ship.** `_notes/`, `_assets/`, `.obsidian` survive regens.

## Deploy

`npm run build && vercel --prod --yes` (Josh's mini, prod). The web-bot uses `npx vercel` previews only — see [[Web Bot Flow]].
