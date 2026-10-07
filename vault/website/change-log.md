---
title: "Website Change Log"
type: log
---

# Change Log

Every site change, dated, newest first. What changed, why, and the result
when it's known. This is how a conversation three weeks from now knows what
already happened.

## 2026-10-07

- **Josh:** homepage header no longer vanishes when scrolling back up, and no blank white bar when bouncing past the top.
- 2026-10-07 Josh: homepage header no longer goes blank white after scrolling down and back up, or pulling the page past the top (hero frame follows scroll exactly; no bounce past the top), homepage
- **Slack web bot retired.** `#mdb-web-bot`, its instructions
  (`knowledge/mdb-web-bot.md`), the `/website` command and the Web Bot Flow
  note are gone. The shared Codespace is the only assistant for this site;
  its rules live in `knowledge/codespace.md`.

## 2026-10-06

- **Every WordPress redirect loaded** — Josh exported the Redirection plugin
  list (251 rules); 233 added in `wp-redirects.json`, 19 of them re-pointed
  because their targets were dead on the old site too. All 384 addresses in
  the old site's sitemap load on the new one (crawl 10/7).
- **Job application form rebuilt** to ask every question the WordPress form
  asked (address, licenses, education, three references, resume upload,
  skills). Applications land in Studio under Job Application.
- **Garden Management page:** Summer's new Seasonal Container Design photo
  and copy copied over from the live site.

## 2026-10-05

- **Shared Codespace** for Josh, Summer and Jazper: one workspace, plain
  English requests, preview, "publish". `main` now needs a pull request.
- **Basements page fixed** (was a 404) and 16 old-address redirects found by
  crawling the live site.

## 2026-10-01

- **Service pages mirror the live site** (all 37): same layout, top videos
  and photos, bigger text.

## 2026-09-29 / 30

- Homepage words and photos moved into Sanity. Blog cards back to 4:5 with a
  filter panel. Site search: pages, team by name, and a 2,249-photo catalog;
  descriptions written for 1,793 photos that had none. Summer's live-site
  additions since 8/19 ported (two portfolio projects, two posts, warranty
  PDF, three team members). SEO parity fixes from the live-vs-rebuild audit.

## 2026-08-19

- **Post-Launch Checklist written** ([[../_notes/Post-Launch Checklist]]) —
  the old Go-Live Checklist only had a single bullet for everything after
  the DNS flip. While building it, found the Sanity→Vercel revalidation
  webhook's code and secret were already in place (23 days old, never
  wired up) — tried to finish the job by registering the webhook itself,
  but our Sanity API token isn't an Administrator, which webhook creation
  requires. Left the exact dashboard values in the checklist for whoever
  has admin access to click through — it's a 5-minute manual step now
  instead of a rediscovery later.
- **Vault remodeled.** The old per-page content mirror (`vault/blog/`,
  `portfolio/`, etc.) was a migration-verification tool — useful while moving
  WordPress content into Sanity, dead weight now that the migration is done
  and it had gone stale (last regenerated 7/13, a month behind the live
  site). Archived to [[../_archive/Migration-Hub|_archive/]]. Replaced with
  this change-log + [[../decisions|decisions/]] + [[../campaigns|campaigns/]]
  structure — memory that's written as things happen instead of regenerated
  periodically, so it can't go stale the same way. See
  [[../decisions/2026-08-19-vault-remodel|the decision note]].
- **Header transparency bug fixed** (homepage hero). Scrolling back up to the
  top after scrolling down could leave the header stuck solid white instead
  of going transparent over the hero video — a race between the header's
  scroll measurement and Framer Motion's own scroll-driven animation.
  Fixed in `components/Header.tsx` + `components/remastered/FramedHero.tsx`
  by computing the threshold from the hero's static (non-animated) container
  instead of an animated child. Verified with a scripted scroll test —
  no more flicker.
- Local dev environment stood up on Summer's Mac: GitHub CLI, Vercel CLI,
  repo cloned, `.env.local` wired to Sanity + Vercel, `/website` slash
  command added so Summer can talk to Claude without touching git/Sanity
  directly (see [[../../knowledge/mdb-web-bot|the bot's own instructions]]).
