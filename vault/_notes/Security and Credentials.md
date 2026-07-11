---
title: "Security and Credentials"
type: doc
---

# Security and Credentials

## July 11 sweep (the big one)

- The repo had been **public with an old Sanity write token in git history** → token **rotated everywhere** (both minis + Vercel prod, old revoked, forms retested), repo now **private**.
- MDB mini's GitHub access = **fine-grained PAT scoped to ONLY this repo** (no expiry). Josh's account-wide GitHub creds erased from that machine's keychain.
- Web-bot lockdown: `.claude/settings.json` tool-level denies (moms-bot repo unreadable from the web-bot; `vercel` account commands, `gh`, `git clone` blocked) + charter scope-isolation and money hard-limits — see [[Web Bot Flow]].
- Cleanup: dead GitHub repos and Vercel projects deleted; **momsdesignbuild.com + www claimed on the `moms-design-build-remade` Vercel project** (dormant — launch = DNS flip only).

## Standing rules

- Sanity write token lives in `.env.local` (repo root, git-ignored) on both machines + Vercel env. If it leaks: rotate in sanity.io/manage, update both minis + Vercel, revoke old, retest `/api/apply` + `/api/newsletter`.
- Vercel preview URLs are login-protected — unshipped work is only visible to Josh.
- Never commit tokens; the near-loss event (weeks uncommitted + secret in history) is why the ledger now says commit/push through every session.

## Expiry watch

- **Watchdog:** `com.momsbot.expiry-watchdog` on the MDB Mini, monthly → alerts #mdb-bot at ≤45 days; a monthly all-healthy heartbeat. No heartbeat = the watchdog itself is dead.
- **Never expire:** Sanity, Slack, Anthropic, Vercel auth, the repo-scoped GitHub PAT.
- **Self-renewing:** QuickBooks refresh, Hover, Graph webhooks (watch the renewal JOBS, not dates).
- **Dated:** Azure Graph secret 2028-04-19. Tailscale: Josh's mini key **2026-08-27 ⚠️**, MDB mini 2026-12-15 — disable key expiry in the Tailscale admin to make permanent.
