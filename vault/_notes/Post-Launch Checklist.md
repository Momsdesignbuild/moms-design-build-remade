---
title: "Post-Launch Checklist"
type: doc
---

# Post-Launch Checklist — after the DNS flip

Everything to do in the days right after momsdesignbuild.com starts pointing
at this site (see [[Go-Live Checklist]] for the flip itself). Written 8/19,
before launch — some items are already done/automated now, on purpose, so
there's less to hold in your head on the actual day.

## Already done, nothing to do
- **Revalidation webhook code + secret** — `app/api/revalidate/route.ts`
  exists, `SANITY_REVALIDATE_SECRET` is already set in Vercel Production.
  The only remaining step is registering the webhook itself in Sanity's
  dashboard (below) — once that's clicked, Studio publishes show up on the
  live site within seconds instead of waiting up to an hour.

## One manual click, needed before or right at launch
- **Register the Sanity webhook** (needs a Sanity project Administrator —
  our API token isn't privileged enough to do this by API):
  1. Go to `manage.sanity.io` → project `wavk40jo` → API → Webhooks → Create
  2. Name: `Revalidate on publish`
  3. Dataset: `production`
  4. URL: `https://momsdesignbuild.com/api/revalidate` (use
     `https://moms-design-build-remade.vercel.app/api/revalidate` if setting
     this up *before* the DNS flip, then edit the URL after — don't forget
     that edit, it's easy to set-and-forget on the wrong domain)
  5. Trigger on: Create, Update, Delete
  6. HTTP method: POST
  7. Secret: same value as `SANITY_REVALIDATE_SECRET` in Vercel. Run this
     to see it, then paste into the Secret field:
     ```bash
     cd ~/moms-design-build-remade && vercel env pull --environment=production /tmp/prod.env && grep SANITY_REVALIDATE_SECRET /tmp/prod.env && rm /tmp/prod.env
     ```

## Right after the flip (same day)
- [ ] `SITE_LIVE=true` — ungates robots.txt (see [[Go-Live Checklist]] #3)
- [ ] Verify a portfolio page, a blog post, `sitemap.xml`, and `robots.txt`
      on the real domain — not just the vercel.app one
- [ ] Google Search Console: verify the `momsdesignbuild.com` domain
      property, submit the sitemap
- [ ] Watch GSC coverage for the 301'd tag/author archive redirects — this
      needs Jim's sign-off first, see [[Open Questions]]
- [ ] Confirm the wp-content path rewrites resolve (the byte-copied Yoast
      schema references old `momsdesignbuild.com/wp-content/...` image
      URLs — those must not 404 post-launch, see [[Go-Live Checklist]] #2)
- [ ] Spot-check forms still submit correctly on the real domain (contact,
      careers apply, newsletter)

## First couple weeks
- [ ] Watch Search Console daily for crawl errors / indexing issues, not
      just once
- [ ] Confirm the newsletter form is actually hitting Mailchimp, not the
      old Sanity-storage version (see [[Go-Live Checklist]] #8)
- [ ] Begin the Front Load SEO strategy — backlinks, on-page product
      mentions, technical — see [[SEO Rules]] for the full plan
- [ ] Keep the old Flywheel/WordPress hosting running until the new site's
      index has settled in Search Console, then Jim cancels it (see
      [[Go-Live Checklist]] #10) — don't cancel early "to save money," a
      dropped old site before Google re-indexes the new one costs rankings
