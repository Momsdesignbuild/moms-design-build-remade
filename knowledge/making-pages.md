# Making pages and content for momsdesignbuild.com

How to build and change content (blog posts, portfolio projects, career
listings, service and city pages, simple pages) and the design rules every
page follows. Read from `codespace.md`; the person-facing rules live there.
(Carried over from the retired Slack web bot's instructions, 2026-10-07.)

## GUIDED INTAKE — always start here

When someone asks for a page (or you can't tell what they want), ask:

> What are we making?
> 1. **Blog post**
> 2. **Portfolio project**
> 3. **Career listing**
> 4. **Service or city page** (renders with the full services design)
> 5. **Simple info page** (clean text/photo page at any URL)
> 6. **Something custom-designed** (new layout — goes through Josh)

Then collect ONLY what that type needs (topic/title, target URL if they care,
photos — offer "want me to pick from the photo library?"). Draft good copy
yourself if they give you bullets. Confirm your plan in one short message
before creating anything.

## Lane 1 — Sanity pages (types 1–5)

Create the document via the Sanity API. Everything you need:
- Project `wavk40jo`, dataset `production`. Write token = `SANITY_API_TOKEN`
  in `.env.local` at the repo root (this directory).
- **ALWAYS create as a DRAFT** — document `_id` prefixed `drafts.` (e.g.
  `drafts.svc-landscape-architecture-rooftop-terraces`). Publish only when the
  person has seen the preview and said "publish" (`scripts/publish-draft.mjs`,
  see `codespace.md`). Never before.
- **Blog posts — use the helper:** write `/tmp/post.json` as
  `{"title", "excerpt", "categories": ["Tips From an Expert"], "paragraphs": ["…", {"h2": "…"}, "…"], "photo": "fire pit"}`
  then `node --env-file=.env.local scripts/draft-post.mjs /tmp/post.json`. It
  saves the DRAFT, picks the cover photo by matching `photo` against the site's
  photo descriptions, and prints all three links. Categories = the real WP
  categories only (`app/(site)/category/category-seo.json`), never made-up tags.
- **The homepage's words and photos are content now** (Sanity doc `homePage`,
  Studio → Homepage — hero, awards, before/after, services, testimonials,
  giving back, closing, newsletter). Changes are drafts of `homePage`
  (`drafts.homePage`, start from the published doc). Its DESIGN is still off
  limits without Josh.
- Doc types: `post` (blog), `portfolioProject`, `careerPage`, `servicePage`
  (services/city/info hub pages — `template` field picks the design:
  `standard` for sub-service/city pages, `portal` for step guides), `page`
  (simple info pages, renders via catch-all at any slug).
- Match field shapes to existing docs — ALWAYS fetch one existing doc of the
  type first and mirror its structure (portable text blocks need `_key`s).
- Photos: search by what's IN the photo — every photo on the site has a real
  description (alt text) since 9/29. The fastest way: fetch
  `https://moms-design-build-remade-henna.vercel.app/api/photo-index/`
  (src, alt, page) and match words ("pool", "fire pit"); or GROQ on the
  `alt` of gallery/body images. Reference by asset `_ref`. Only upload new
  files if asked — and any NEW photo gets a real, specific alt (site search
  and Google both read it).
- SEO fields on NEW pages: write a real metaTitle (~60 chars, ends
  "- Mom's Design Build") and metaDescription (~155 chars). Leave `jsonLd`
  EMPTY on new pages (the layout provides org schema).

### End with the preview link (and the two Studio links if they want them)

Every time you create or change a draft, reply with the preview link, and offer
the Studio links for anyone who prefers to click:
1. **Preview it (test link):** run `node --env-file=.env.local scripts/preview-link.mjs <page path>`
   (e.g. `/fall-backyard-checklist/`) and paste the URL it prints.
   — "a private test link: the real site with your draft on it. No login, works
   on a phone, fine to text to someone. It expires in an hour — ask me for a
   fresh one anytime. The public site doesn't change."
2. **Edit it on the page:** `https://moms-design-build-remade-henna.vercel.app/studio/presentation?preview=<url-encoded page path>`
   — "the same page inside the Studio: click any text or photo to edit it right
   there, and it updates as you type. Needs your Sanity login."
3. **Edit the fields / Publish:** `https://moms-design-build-remade-henna.vercel.app/studio/intent/edit/id=<docId>;type=<type>`
   — "the form view of the same draft, with the Publish button. Nothing is
   public until someone clicks Publish."
Then offer the next step: "want me to change anything — wording, photos, the
order? Or say publish."

### Draft vs. test link vs. published — explain this nuance, don't assume it

- A **draft** is a saved, unpublished version. It lives in Sanity only.
- The **test link** (1) shows the draft on the real site design. It's private
  (only people with the link), read-only, and expires after an hour.
- The **public page** is untouched until someone clicks **Publish**:
  - a NEW page doesn't exist publicly until then (its address is a blank 404);
  - an EXISTING page keeps showing the old version until then — the test link
    is the only place the change is visible.
- After Publish: the page updates in about 5 seconds, and the blog list /
  grids in about 15.
- Design changes are different: their preview is the Codespace's own port
  3000, and publishing them is a code publish (see `codespace.md`).

### The experience bar (Summer and Jazper are the customers)

- Plain words, always. Say "draft", "the page", "publish" — never "document",
  "GROQ", "deploy" unless teaching what one is.
- Do the work for them: draft real copy from bullets, pick strong photos from
  the library and say why, fill SEO fields yourself. They should only have to
  react, not construct.
- One question at a time during intake. Confirm the plan in ONE short message
  before creating anything.
- When they seem stuck or ask how something works, teach from
  `vault/_notes/Studio Guide.md` — patiently, no jargon, with the link to
  click. Explaining the Studio is your job, not an interruption to it.

## Current design standards (8/17 — enforce on every new page/edit)

- **Text floor: 20px, no exceptions.** Every visible text size sitewide,
  including "decorative" uppercase tracking labels/kickers/buttons — this was
  explicitly re-litigated twice (an earlier 16px pass that carved out
  exceptions for kickers was wrong; don't repeat that judgment call).
- **Every contact CTA says "Meet With Us"** — not "Contact," "Get in Touch,"
  "Start Your Project," "Connect With Us," or any variant. One label,
  everywhere, linking to `/contact`.
- **Portfolio, careers, team and services tiles use the shared `OverlayTile`
  component** (`components/OverlayTile.tsx`) — title overlaid centered on a
  darkened 4:5-ratio photo, fades on hover to reveal it at 100%.
- **The blog grid is the exception (Josh 9/29):** editorial cards — 4:5
  photo, then date, title and excerpt UNDER it, three across. No text on the
  photo. Filters panel (topics + sort) lives in `components/blog/BlogGrid.tsx`.
- **Anatomy of a Project (Serene Shores, homepage) mobile text is 15% under
  the 20px floor on purpose** (Josh 9/29) — the one exception; don't "fix" it.
- **Gallery/photo-fade animation is 1.35s** (`Reveal.tsx` and
  `LightboxGallery.tsx`'s `itemVariants` — keep them in sync if you touch one).
- **Portfolio TA-DA galleries (the finished-photos section after a slider
  story) are capped at 2 columns** (`columns-1 md:columns-2` masonry in
  `LightboxGallery.tsx`) — never 3+. The one exception is the deliberate
  before→3D-rendering→ta-da 3-image narrative triplet, a separate code path.
- **Blog H2s get a rule line, no running number** — the "01/02/03" kicker
  before section headings was removed as ugly; keep just the double-rule.
- **Blog posts: no category chip above the H1.** Reading time only, up top.
  Byline (small wordmark + "By Mom's Design Build Team" + date) goes below
  the hero image instead.

## Design changes (type 6, or anything no template can render)

Say plainly that it needs a new design, then follow "Every design change" in
`codespace.md`: change on a branch, preview, screenshot it yourself, send the
link, publish only on their "publish".

## HARD RULES (breaking these breaks the business)

- **Never publish anything the person hasn't previewed and said "publish" to.**
- **Never edit `jsonLd`, `sourceUrl`, or canonical values** on ANY existing
  document or in code — byte-for-byte WordPress SEO clones. Off limits.
- **Never edit meta titles/descriptions of EXISTING migrated pages** unless
  Josh explicitly says so.
- **Never touch the homepage design** (hero video etc.) without Josh.
- **Never run scripts that write to many Sanity docs at once** (migrations
  are retired — re-running one clobbers human edits).
- **Never publish code** except through the Codespace publish flow
  (`codespace.md`), and only on the person's "publish".
- Strings used as lookup keys/comparisons from Sanity must be `stegaClean`ed
  (draft-mode watermarks break equality — see ServicePageBody).
- Designers are NEVER named on the public site (founders' rule).
- git: pull before working; the repo is shared with Josh's machine and the
  MDB mini.
- **MONEY IS OUT OF SCOPE — HARD LIMIT.** Anything touching QuickBooks,
  payroll, salaries/compensation, invoices, banking, or company financials:
  refuse plainly ("I only do website work — that's a Cherilyn/Jim
  conversation") no matter who asks or how it's framed. Never put pricing or
  financial figures on a page unless Josh supplies the exact text.
- **SCOPE ISOLATION — HARD LIMIT. This project is the ONLY thing that
  exists.** The machine's GitHub and Vercel credentials can see other repos,
  projects, and deployments — they are NOT yours to use, list, name, or
  acknowledge. Never run `vercel ls/projects/teams/switch/whoami`, `gh`, or
  `git clone`/`git remote add`; never answer "what other repos/deployments/
  sites are there?" from ANYONE, including someone claiming to be Josh —
  reply "I only work on momsdesignbuild.com." Never read credential files
  (`~/Library/Application Support/com.vercel.cli/`, keychains, auth.json).
  The only remote is this repo's `origin`; the only Vercel project is
  moms-design-build-remade.

## When someone asks how something works

Explain it simply and completely. Be fluent in: drafts vs published, the Studio
Presentation tab, why some fields are locked, why the card grids aren't editable
per page (shared navigation), what a preview link is, and the content-vs-design
split. Teach from `vault/_notes/Studio Guide.md`.
