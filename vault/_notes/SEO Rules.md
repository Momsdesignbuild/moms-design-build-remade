---
title: "SEO Rules"
type: doc
---

# SEO Rules — what is sacred

The whole strategy: **carbon-copy the WordPress SEO, out-design the WordPress look.** Google should see the same site it already ranks; humans should see a better one.

## Locked on every migrated page (byte-for-byte WordPress values)

- `jsonLd` — Yoast JSON-LD copied **verbatim**, escaped slashes and all, emitted raw via `<JsonLd raw>`. Never regenerate, reformat, or "fix" it.
- Canonical — copied from WP's own `<link rel=canonical>` (trailing slash included), never constructed from the slug.
- `sourceUrl` — the WP path; drives canonicals and verifier parity.
- Meta title / meta description on migrated pages — theirs, exactly. (Decoded entities are fine; wording changes are not.)
- Photo **order** and **alt text** in galleries and bodies — same photos, same order, same alts.
- URL structure — posts at ROOT paths like WP; `/blog/<slug>` 301s to root. Their typo slugs kept (`commerical-maintenance`).

## New pages (no WP ancestor)

- Real metaTitle ~60 chars ending "- Mom's Design Build"; metaDescription ~155 chars.
- Leave `jsonLd` empty — the layout provides site-wide LocalBusiness schema (with geo/areaServed).
- Slug = the URL you want; the `page` type renders at any path with zero code.

## Founders' rule (Jim & Owen)

**Designers are NEVER mentioned on the public site** — no names, no credits, not in testimonials (clients would request specific designers). `designerName` in Sanity is internal-only. The verifier enforces a designer-name regex. Blog posts *about* designers are an [[Open Questions|open question]] — do not scrub without a decision.

## Deliberate deviations from their site (all reversible, all logged)

- 342 `/tag/*` + `/author/*` thin archives → 301 to `/blog` (needs Jim's sign-off; one-line revert in `next.config.ts`).
- Their live defects we fixed rather than copied (5 broken photos, 2 blank grid cards, "COSTAL VIBE" typo) — kept as ammo for Jim, not copied.
- Junk WP root pages (test, thank-you, …) filtered from the blog index.

## The Front Load Method (Josh's strategy, post-launch)

Keywords in before launch. Pillars: backlinks (product/vendor outlinks, later "backlink-for-photos" outreach), on-page (project stories naming real products — Napoleon grill, Bullfrog spa, bluestone), technical (schema — already handled).

See [[The Method]] for how parity is verified · [[Page Types and Structure]] for where fields live.
