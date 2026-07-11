---
title: "Page Types and Structure"
type: doc
---

# Page Types and Structure — the site's anatomy

The reference for anyone (human or bot) creating or editing pages. For each type: where it renders, which Sanity document drives it, and what the fields mean. **Always fetch one existing doc of a type and mirror its field shapes before creating** — portable text blocks need `_key`s, images are `{_type:'image', asset:{_type:'reference', _ref:'image-…'}, alt}`.

Sanity project `wavk40jo`, dataset `production`. Studio: `https://moms-design-build-remade.vercel.app/studio`.

## 1. Blog post — `post`

- **Route:** `app/(site)/[slug]/page.tsx` — posts serve at **ROOT** paths (`/deck-trends-2026`), exactly like WordPress. `/blog/<slug>` 301s to root. Never "fix" this.
- **Doc id convention:** `wp-post-<slug>` (migrated) — new posts can use any id but keep the `slug` field root-level.
- **Fields:** `title`, `slug`, `metaTitle`, `metaDescription`, `heroImage` (the card/cover + og image), `body` (portable text: paragraphs, h2–h6, bullet/number lists, links, inline images with alt), `publishedAt`, `categories` (array of strings — powers the index pills), `jsonLd` (migrated posts: byte-copied Yoast — LOCKED), `sourceUrl`.
- **Index:** `/blog` — magazine layout, featured latest, client-side search, category pills, Load More, newsletter signup (`/api/newsletter` → `subscriber` docs).

## 2. Portfolio project — `portfolioProject`

- **Route:** `app/(site)/portfolio/[slug]/page.tsx` — the showout template: cinematic hero (video or lead photo), dossier bar (location/completed/badges), staged story (pull-quotes, before/after drag-sliders, caption rows, TA-DA masonry), lightbox gallery, More Projects grid.
- **Fields:** `title`, `slug`, `heroImage` (grid CARD — their hand-picked photo, don't swap casually), `leadImage` (the click-in hero, must be ≥1200px wide), `gallery` (ordered images w/ `alt` + `caption` — **order and alts are SEO-sacred**), `description` (block+image body), `heroVideoUrl`/`videoUrl` (self-hosted mp4), `location`, `completedYear`, `galleryBadges`, `designerName` (**INTERNAL ONLY** — never rendered), `jsonLd` (LOCKED), `sourceUrl`, `orderRank` (drag-to-reorder in Studio; homepage 3×3 + /portfolio grid follow it).
- Gallery staging rules (sliders, badge detection, caption rows) live in the enrichment script + `LightboxGallery` — see [[Scripts Reference]].

## 3. Career listing — `careerPage`

- **Route:** `app/(site)/careers/[slug]/page.tsx` — facts panel + structured body + APPLY button + prev/next + photo grid. Hub at `/careers` (photo-tile grid).
- **Apply form** posts to `/api/apply` → `jobApplication` docs (visible in Studio under Job Applications).

## 4. Service / city / info-hub page — `servicePage`

- **Route:** `app/(site)/services/...` via `components/services/ServicePageBody.tsx` — 5 templates selected by the `template` field (`standard` for sub-service/city pages, `portal` for step guides, plus hub/division variants).
- **Fields:** `title`, `slug` (full path, e.g. `services/landscape-architecture/edina`), `template`, `body` (portable text with FAQs/testimonials), `cardsSet` (which shared nav card grid renders — the grids themselves live in code `serviceCards.ts`, deliberately NOT per-page editable: shared navigation), `metaTitle`, `metaDescription`, `jsonLd` (LOCKED on migrated pages), og fields.
- 45 migrated pages have byte-equal receipts (`scripts/verify-services-migration.mjs`).

## 5. Simple info page — `page`

- **Route:** single-segment slugs render via `app/(site)/[slug]/page.tsx` fallback; nested slugs (`contact/thanks`) via the `app/(site)/[...path]/page.tsx` catch-all. Clean title + portable-text body. **Any URL, no code needed.**
- **Doc id convention:** `wp-page-<slug>` (slashes → dashes). Fields: `title`, `slug` (full path with slashes), `metaTitle`, `metaDescription`, `body`, `jsonLd`, `sourceUrl`.

## 6. Team member — `teamMember`

- **Route:** `app/(site)/team/[slug]/page.tsx`. Bio + portrait, WP-verbatim alts/canonicals. ⚠️ The public-designer-name question is still with Jim/Owen — see [[Open Questions]].

## Support types

- `siteSettings` — homepage/site-wide knobs (sparse; homepage is mostly code).
- `subscriber` — newsletter emails. `jobApplication` — apply-form submissions. Both write-only from the site's API routes.

## Things that are CODE, not content

Homepage (sacred — Josh only), about + process (bespoke designs), the services card grids, header/footer, the portfolio staging logic. If a request needs a new LOOK, it's Lane 2 in [[Web Bot Flow]]: branch → preview deploy → Josh's "ship".

## SEO on every page

See [[SEO Rules]]. Short version: migrated pages' `jsonLd`/`sourceUrl`/canonical/meta are byte-copied WordPress values and are **off-limits**; new pages get a real ~60-char metaTitle ending "- Mom's Design Build" and ~155-char metaDescription, and leave `jsonLd` empty.
