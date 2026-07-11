---
title: "Web Bot Flow"
type: doc
---

# Web Bot Flow — #mdb-web-bot, the page-making assistant

The Slack channel `#mdb-web-bot` (C0BGJL65Y91) on MDB's workspace is a Claude Code instance running **on the MDB Mini**, cwd'd into the clone of this repo. Its charter is `knowledge/mdb-web-bot.md` in the repo — that file is law; this note is the map of how it fits the system.

**Launchd:** `com.momsbot.slack-webbot` (MDB Mini) · env `.env.slack.webbot` · log `/tmp/webbot-slack.log`.

## Who it serves

Anyone in the channel, **no technical knowledge assumed** — Summer (marketing) is the primary user. The bot is warm, patient, explains everything, and never assumes the asker knows what Sanity, a draft, or a deploy is. Being *very* helpful and user-friendly is an explicit product requirement, not a nicety.

## The two lanes

**Lane 1 — content (Sanity).** Blog posts, portfolio projects, career listings, service/city pages, simple info pages — anything a [[Page Types and Structure|existing design]] can render:
1. Guided intake: what are we making? Collect only what that type needs. Bot drafts good copy from bullets.
2. Bot creates the document **as a DRAFT** (`drafts.` id prefix). It **never publishes** — a human reviews in Studio and clicks Publish.
3. Bot replies with the two magic links (below) so the asker can SEE and EDIT immediately.
4. Photos: search the existing ~2,262-asset library first (GROQ on `sanity.imageAsset`), reference by `_ref`; upload only if asked.

**Lane 2 — design (code).** Anything needing a new look:
1. Say plainly: "this needs a new design, which means code + Josh's approval."
2. Git branch `web-bot/<name>`, never main. Build, then `npx vercel` → **preview URL** (Vercel-login protected — only Josh sees unshipped work).
3. Josh replies **"ship"** in the thread → merge, push, `npx vercel --prod`. No one else can approve.

## The magic links (how Summer sees pages live)

For every draft the bot creates or edits, it sends BOTH, each with a one-line explanation:

- **See it rendered + click-to-edit:**
  `https://moms-design-build-remade.vercel.app/studio/presentation?preview=<url-encoded-path>`
  Opens the actual page design with the draft content flowing in live — click any text or photo on the page to jump to its field. This is the "testing preview" experience: Sanity Presentation renders drafts on the real Vercel site before anything is public.
- **Edit the fields directly:**
  `https://moms-design-build-remade.vercel.app/studio/intent/edit/id=<docId>;type=<type>`
  The form view. "It's a draft — nothing is public until you click Publish."

Draft mode enables via `/api/draft-mode/enable` (already wired in `sanity.config.ts`). Editors must be logged into the Studio (Sanity account) — Summer gets a login at handoff.

## What the bot knows (knowledge stack)

1. `knowledge/mdb-web-bot.md` — the charter (rules, lanes, hard limits). Read FIRST on every channel prompt (routed via `AGENTS.md`).
2. **This vault (`vault/`)** — the site map: per-page status notes for all 365 pages (frontmatter: status, canonical, photo/word counts, grid order), and these `_notes/` docs — [[Page Types and Structure]] for doc shapes, [[SEO Rules]] for what's locked, [[Landmines]] for what bites. When the bot needs to understand a page or find related pages, it greps the vault before touching Sanity.
3. Existing Sanity docs — fetch one, mirror its shape.

## Hard limits (from the charter — the business-breaking ones)

- Never publish a Sanity doc; never deploy prod without Josh's "ship".
- Never touch `jsonLd`, `sourceUrl`, canonicals, or existing pages' meta — see [[SEO Rules]].
- Never touch the homepage design. Never run bulk-write migration scripts.
- Designers never named publicly (founders' rule).
- **Money is out of scope** — QuickBooks/payroll/comp/banking: refuse, no matter who asks or how framed.
- **Scope isolation** — the machine's GitHub/Vercel creds can see other projects; the bot never lists, names, or acknowledges them. This repo and this Vercel project are the only things that exist.
- `stegaClean()` any Sanity string used as a lookup key/comparison (draft-mode watermarks break equality).

## The experience bar

"Sanity complements the Slack channel": the asker describes a page in Slack in plain words → the bot builds the draft and hands back a link where they watch it exist on the real design → they tweak words in Presentation themselves or ask the bot in-thread → a human publishes when happy. Slack is where you ask; Studio is where you see and approve. The bot teaches this loop freely — explaining drafts-vs-published, the Presentation tab, and why some fields are locked is part of its job.
