---
title: "MDB Site Rebuild — Hub"
status: live-approved
---

# Mom's Design Build — Site Rebuild Hub

WordPress → Next.js 16 + Sanity + Vercel. SEO carbon copy, out-designed look.
**Live:** https://moms-design-build-remade.vercel.app · **Theirs:** https://momsdesignbuild.com

**Progress: 361/365 pages shipped** (+ custom homepage)

## Homepage
Custom cinematic design (deliberate departure from WP). Hero video, Service Offerings, Our Work placeholder, Giving Back.
![[_assets/home-top.png]]

## Sections
- [[Portfolio]] — ✅ ALL 70 projects enriched + 10/10-verified (July 7 marathon) + hero-res & q90 sweeps
- [[Blog]] — ✅ index (magazine look, search, categories, newsletter) + ALL 205 post bodies at ROOT paths
- [[Pages]] — ✅ services migration 45/45 byte-receipts, privacy-policy, application form, 3 hard-404s fixed; contact + services hub render but are SEO-unaudited
- [[Services]] — ✅ 4 division/hub pages verified
- [[Team]] — ✅ 21 bios verified (public designer-name question still with Jim/Owen)
- [[Careers]] — ✅ hub + 10 listings, 103/103 receipts, working apply form

## The system, documented (hand-written, survives regens)
- [[_notes/System Overview]] — two machines, two jobs, how everything connects
- [[_notes/Web Bot Flow]] — how #mdb-web-bot makes pages (Slack → Sanity drafts / code previews)
- [[_notes/Page Types and Structure]] — every page type: route, Sanity doc, template, field shapes
- [[_notes/The Method]] — the carbon-copy pipeline that shipped 70/70 and 205/205
- [[_notes/SEO Rules]] — what is sacred (byte-for-byte schema, canonicals, founders' rule)
- [[_notes/Scripts Reference]] — every script in scripts/ and what it does
- [[_notes/Landmines]] — every mistake that burned an agent once
- [[_notes/Security and Credentials]] — July 11 sweep, token rotation, expiry watch
- [[_notes/Go-Live Checklist]] — the DNS-flip day list
- [[_notes/Open Questions]] — decisions parked with Josh/Jim/Owen
- [[_notes/Studio Guide]] — plain-language editing guide for Summer (the bot teaches from it)

## The remastered fork (the redesign skunkworks)
Same SEO layer, new look — private repo `moms-design-build-remastered`, own Vercel project, robots blocked, reads the same Sanity read-only. **Live:** https://moms-design-build-remastered.vercel.app
Homepage, portfolio grid + all 70 detail pages redesigned (Bria editorial × Apple motion). **Design Notes:** 53/70 projects (31 deck-backed from mined award submissions, 22 from WP copy). Every portfolio note in this vault shows the three sites side by side.

## Status legend
`live-verified` = receipts passed vs their live site · `live-approved` = Josh eyeballed + signed off · `live-unaudited` = renders real content, SEO head not yet byte-checked · `todo` = not built

Regenerate: `node scripts/build-vault.mjs` (everything except _notes/, _assets/, .obsidian is rebuilt from wp-manifest.json)
