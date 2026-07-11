---
title: "Studio Guide"
type: doc
---

# Studio Guide — editing the site, in plain language

Written for Summer (and anyone non-technical). The [[Web Bot Flow|#mdb-web-bot]] Slack bot teaches from this note — it should explain these ideas freely and patiently.

## The one idea

The website has two halves. **Content** (words, photos, pages of an existing kind) lives in Sanity and you can change it yourself — no developer, no deploy. **Design** (what pages look like) is code — ask in #mdb-web-bot and Josh approves new designs.

## Getting around the Studio

`https://moms-design-build-remade.vercel.app/studio` (after launch: momsdesignbuild.com/studio)

The sidebar, top to bottom:
- **Portfolio (drag to reorder)** — drag projects and the homepage 3×3 + /portfolio grid follow that order instantly.
- **Service & Info Pages, Blog Posts, Career Pages, Team Members, Site Pages** — everything else you'd edit.
- **Job Applications / Subscribers** — what the website's forms collect. Read-only in spirit: people's submissions.

## Drafts vs Published (the safety net)

Editing never changes the live site directly. Your edits create a **draft**; the public site keeps showing the last published version until you press **Publish**. Not sure? Leave it as a draft — nothing is public. The Slack bot works the same way: it only ever creates drafts; a human presses Publish.

## Seeing a page live before anyone else (Presentation)

The **Presentation** tab in the Studio shows the real page, real design, with your draft content flowing in **as you type**. Click any text or photo on the page and the Studio jumps to that field. This is the testing preview — when the bot makes you a page, it sends a link straight into this view.

## Why some fields are locked 🔒

Fields like `jsonLd`, `sourceUrl`, and meta titles on migrated pages are byte-exact copies of the old WordPress SEO — that's what keeps Google rankings safe through the switch. They're read-only on purpose ([[SEO Rules]]). Also: the card grids at the bottom of service pages are shared navigation, edited once in code — not per-page.

## Asking the bot (#mdb-web-bot)

Describe what you want in normal words: "I want a blog post about spring garden prep with 3 photos from the library." The bot asks what it needs, writes a draft, and replies with two links — one to see the page live, one to edit the fields. Nothing goes public until a person clicks Publish. If your idea needs a brand-new design, the bot will say so and route it through Josh.

Two rules it lives by: it never publishes, and it never touches money topics (pricing, invoices, payroll — that's a Cherilyn/Jim conversation).
