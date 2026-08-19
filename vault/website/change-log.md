---
title: "Website Change Log"
type: log
---

# Change Log

Every site change, dated, newest first. What changed, why, and the result
when it's known. This is how a conversation three weeks from now knows what
already happened.

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
