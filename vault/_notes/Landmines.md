---
title: "Landmines"
type: doc
---

# Landmines — every one of these burned an agent once

- **`useCdn` must stay `false`** in `sanity/lib/client.ts` — CDN cache bakes hours-stale content into builds.
- **Sanity CDN serves deleted assets from edge cache for days** — a 200 on a cdn.sanity.io URL proves nothing; verify with GROQ counts.
- **~40 asset URLs are HARDCODED in components** (`grep -r cdn.sanity.io app components`) — asset cleanup must check code refs; the July 1 wipe killed the site logo this way.
- **Never delete Sanity assets without backup + Josh's explicit go.** Restore trick: SHA-1-match originals in `~/mdb-mirror` and re-upload → identical content-hash IDs → same URLs heal. CDN-downloaded copies re-encode and will NOT match.
- **createOrReplace wipes patched fields** — the blog-cards rebuild erased categories once. Fold data into the builder or re-patch after.
- **Stega watermarks break string equality in draft mode** — `stegaClean()` anything used as a lookup key/dedupe (broke card grids + blog pills for editors; public unaffected). Preview-only weirdness = check this first.
- **Never wrap a pre-transformed Sanity URL in next/image** — double compression (Sanity q75 → Vercel q75) made every hero soft. One encoder. Heroes: raw URL + `quality={90}` (Next 16 needs `images.qualities:[75,90]` or it silently coerces to 75).
- **First image widget in WP post-content = the page lead** (our hero) — skip it in body flow or it doubles.
- **17 WP projects lead with award-badge images** — hero must be the first *real* photo; pixel-detect badges (alt text lies both ways).
- **WP body text**: full Elementor layout nested in `theme-post-content`; paragraphs appear as bare text nodes NEXT TO `<p>` tags — walk node structure, never per-`<p>` selection.
- **`while read` skips the last line of a file without a trailing newline** — a batch item went silently unprocessed; full-sweep verification caught it.
- **`grep -c` counts lines, not occurrences** — minified HTML makes it lie.
- **Playwright on video pages:** `waitUntil:'load'`, never networkidle (autoplay video streams forever); scroll through the page or whileInView content screenshots blank.
- **Their Flywheel site times out regularly** — retry + soft-skip live checks; don't fail our receipts on their outage.
- **`scripts/sanity-asset-map.json` + `upload-carbon-copy.mjs` are STALE** (pre-wipe IDs) — don't reuse.
- **doctor-detail** (another client) also uses localhost:3000 — phantom 404s in dev logs are that project, not MDB.
- **The mini's old `webdev` MCP (port 4001) points at a DEAD repo + WRONG Sanity project** (`awv91t3x`) — never use its website tools.
- Deploys are whole-site — **never deploy concurrently with another agent**; claim it in the handoff ledger.
