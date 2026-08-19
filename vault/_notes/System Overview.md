---
title: "System Overview"
type: doc
---

# System Overview — how everything connects

Mom's Design Build (MDB) = residential landscape design/build firm, Minneapolis. Client of Steady Scaling (Josh). Two machines, two jobs:

| Machine | What lives there |
|---|---|
| **Josh's Mac mini** (`joshsmacmini1@100.69.233.64`) | The website rebuild: this repo, the 5.6GB WordPress mirror (`~/mdb-mirror`), all migration scripts, Josh's main Claude session + memory |
| **MDB Mini** (`momsdesignbuildmini@100.71.24.20`) | moms-bot — the AI back office (Slack bots, OneDrive brain, digests, crew board) **plus a clone of this repo** that powers [[Web Bot Flow|#mdb-web-bot]] |

**Git is the sync point between the two clones. Always pull before working.**

## The website in one paragraph

momsdesignbuild.com rebuilt from WordPress/Flywheel to **Next.js 16 + Sanity + Tailwind v4 on Vercel** (`moms-design-build-remade.vercel.app`; the real domain is claimed on the Vercel project, dormant — launch is a DNS flip). Every migrated page carries the **same SEO as WordPress** — meta title/description, canonical, og:*, Yoast JSON-LD **byte-for-byte**, same photos in the same order with the same alt text — while the visuals got an editorial upgrade. Zero WordPress dependency remains. Content is editable in Sanity Studio (`/studio`) by Summer (marketing); design lives in code.

## The two halves (the idea that explains everything)

- **Content** = Sanity documents. Every word, photo, and page of an existing kind. Editing content needs no deploy — publish in Studio and the site updates.
- **Design** = this repo's code. What pages look like. New designs need code, a preview deploy, and Josh's approval.

Page-type inventory, routes, doc shapes: [[Page Types and Structure]].

## What's done (July 11)

- All 70 portfolio projects, all 205 blog posts (at root paths, URL parity), blog index (search/categories/newsletter capture), 45 services pages (byte-receipts), careers hub + 10 listings + working apply form, 21 team bios, about, process, homeowner-portal, privacy policy, sitemap parity (374 URLs), category archives, tag/author 301s.
- Remaining: SEO audit of `contact` + root `services` hub (render fine, heads unchecked), the [[Go-Live Checklist]], and the [[Open Questions]] parked with Jim/Owen.

## Who's who

- **Jim & Owen** — owners. Big-picture only; Jim literally counts photos. Everything must be provably complete.
- **Summer** — marketing; edits the site in Studio and via [[Web Bot Flow|#mdb-web-bot]].
- **Cherilyn** — office ops (crew boards, QuickBooks side — out of website scope).
- **Josh** — Steady Scaling; the only person who can approve production deploys and design changes.

## The paper trail

- `~/Desktop/moms-handoff.md` (both machines) — the live agent ledger. Update it when you change state.
- This vault (`vault/` in the repo) — memory written as things happen: `website/change-log.md`, `decisions/`, `campaigns/`, `content/`, `brand/`, plus `_notes/` (hand-written, permanent). The old auto-regenerated per-page mirror was retired 8/19 — see [[../decisions/2026-08-19-vault-remodel]] — and lives on only as history in `_archive/`.
- Claude memory on Josh's mini — accumulated war-wisdom.
