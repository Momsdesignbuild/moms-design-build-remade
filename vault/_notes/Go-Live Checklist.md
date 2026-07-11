---
title: "Go-Live Checklist"
type: doc
---

# Go-Live Checklist — DNS-flip day

The domain (`momsdesignbuild.com` + www) is already claimed on the Vercel project, dormant. Launch order:

1. **Audit the last unaudited pages** — `contact` + root `services` hub (render fine; byte-check meta/canonical/JSON-LD vs manifest). See [[Pages]].
2. **wp-content path rewrites** — the byte-copied Yoast schema references `momsdesignbuild.com/wp-content/...` image URLs; add rewrites so those paths resolve (schema URLs must not 404 post-launch).
3. **`SITE_LIVE=true`** — ungates robots.txt (currently noindex-safe).
4. **DNS flip** at their registrar → Vercel. TLS is automatic.
5. **Sanity publish webhook → revalidation** — so Summer's publishes appear without waiting for ISR (currently `revalidate: 3600`).
6. **siteSettings doc** for homepage knobs.
7. **Summer's Studio login + training** — drafts vs publish, Presentation tab, [[Web Bot Flow|#mdb-web-bot]] as her assistant.
8. **Newsletter → Mailchimp swap** (form stays, API route changes; subscribers exported from Sanity).
9. **Post-flip sweep** — verify a portfolio page, a post, sitemap.xml, robots.txt, GSC domain verification + sitemap submission, watch coverage for the 301'd tag/author archives (needs Jim's sign-off first — see [[Open Questions]]).
10. Old Flywheel hosting: keep until index settles, then Jim cancels.
