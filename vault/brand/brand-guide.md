---
title: "Brand Guide: colours and fonts"
type: doc
---

# Mom's Design Build: colours and fonts

From MDB's brand guide (sent by Josh, 2026-10-05). Use these, never invented
colours or "close enough" shades.

## Colours (use the WEB values on the site)

| Colour | Web HEX | RGB | Print (CMYK · PMS) | Belongs to |
|---|---|---|---|---|
| **Teal** | `#00B4D1` | 0 180 209 | 75 0 15 0 · PMS 3125 C | Mom's Design Build (main brand) |
| **Grey** | `#53565A` | 83 86 90 | 65 57 56 34 · Cool Gray 11 C | All three: MDB, Fine Gardening, Commercial Maintenance (body text, headings) |
| **Coral** | `#FF6D6A` | 255 109 106 | 0 59 50 0 · PMS 2345 C | Mom's Fine Gardening only |
| **Green** | `#5EAD4F` | 94 173 79 | 61 5 74 5 · PMS 7743 C | Mom's Commercial Maintenance only |

Rules:
- Teal is MDB's colour. Coral appears only on Fine Gardening pages, green only
  on Commercial Maintenance pages. Don't mix them onto other pages.
- Grey is the text colour everywhere.

**Known mismatch (not fixed yet, ask Josh before touching):** the site's main
button/link teal is `#00AEC7` (`--color-brand` in `app/globals.css`), copied
from the old WordPress site. The brand guide's web teal is `#00B4D1`, which the
service-page subheads already use. Also `--color-brand-coral` is set to teal,
a naming leftover; the real coral is `#FF6D6A`.

## Fonts

| Role | Font | Notes |
|---|---|---|
| **Primary** | **Century Gothic Pro** | Headings and body per the brand guide. Commercial font: needs a web licence before it can be loaded on the site. |
| **Secondary** | **Playfair Display** | Free (Google Fonts). Accents, quotes, elegant serif touches. |

**What the site uses today:** Futura PT (headings) and Proxima Nova (body),
because the rebuild mirrors the old WordPress site's look (Josh 10/1). Moving
to Century Gothic Pro + Playfair Display is a site-wide change: only on Josh's
or Summer's explicit say-so, and only once the Century Gothic web licence is
sorted.
