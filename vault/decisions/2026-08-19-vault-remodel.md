---
title: "Decision: retire the per-page vault mirror"
type: decision
date: 2026-08-19
---

# Retire the per-page vault mirror

**Decision:** Archive `vault/blog/`, `portfolio/`, `careers/`, `team/`,
`pages/`, `services/` (one note per page, mirroring Sanity content) and stop
maintaining them. Replace with `decisions/`, `campaigns/`, `content/`,
`brand/`, `inbox/`, and `website/change-log.md`.

**Why:** The mirror existed to verify the WordPress → Sanity migration
didn't lose or corrupt anything — it worked, and the migration is done. Two
problems going forward:
1. It requires a regeneration script (`scripts/build-vault.mjs`) that was
   never actually committed to this repo — referenced in the docs, but not
   present, so there was nothing to even re-run.
2. Even if it existed, periodic regeneration means it's only ever accidentally
   current — it had already drifted a month behind the live site by the time
   this was noticed (last touched 7/13, repo had commits through 8/19).

What Josh actually wants going forward isn't a content snapshot — it's
cross-conversation continuity: Summer (or anyone) should be able to start a
new conversation weeks later and have the AI already know what happened and
why. A regenerated mirror can't do that; a log that's written as things
happen can.

**How to apply:** Don't rebuild the per-page mirror or look for
`build-vault.mjs`. If a future conversation needs current site content,
read Sanity directly (or view the live page) rather than trusting any vault
note as a content source of truth. Use this folder for decisions like this
one, `campaigns/` for marketing campaigns, `content/` for the content
calendar, `brand/` for voice/audience/competitor notes, and
`website/change-log.md` for every site change.
