#!/usr/bin/env python3
"""
Migrate portfolio projects from moms-design-build-copy HTML → Sanity.
"""

import re
import os
import json
import time
import urllib.request

# ── Config ────────────────────────────────────────────────────────────────────
COPY_DIR  = os.path.expanduser(
    "~/repos/Steady-Scaling-LLC/clients/client-work/moms-design-build-copy/portfolio"
)
MAP_FILE  = os.path.expanduser(
    "~/repos/Steady-Scaling-LLC/clients/client-work/moms-design-build-remade/scripts/wp-to-sanity-map.json"
)
PROJECT_ID  = "wavk40jo"
DATASET     = "production"
API_VERSION = "2024-01-01"
TOKEN       = os.environ.get("SANITY_API_TOKEN") or open(
    os.path.expanduser("~/repos/Steady-Scaling-LLC/clients/client-work/moms-design-build-remade/.env.local")
).read().split("SANITY_API_TOKEN=")[1].split("\n")[0].strip()

# Known title overrides where slug-to-title isn't enough
TITLE_OVERRIDES = {
    "cov-restaurant": "COV Restaurant",
    "beaus-forever-bloom": "Beau's Forever Bloom",
    "excelsior-blvd-attraction": "Maynard's Excelsior",
    "the-majestic-mississippi": "The Majestic Mississippi",
    "emerald-copper-craftsman": "Emerald & Copper Craftsman",
    "infinity-beyond": "Infinity & Beyond",
    "cedar-and-stone": "Cedar & Stone",
}

def slug_to_title(slug: str) -> str:
    if slug in TITLE_OVERRIDES:
        return TITLE_OVERRIDES[slug]
    return " ".join(w.capitalize() for w in slug.split("-"))

# ── Load image map ─────────────────────────────────────────────────────────────
print("Loading image map...")
with open(MAP_FILE) as f:
    img_map = json.load(f)

def sanity_ref_from_cdn(cdn_url: str) -> str | None:
    m = re.search(r'/([a-f0-9]+-\d+x\d+\.\w+)$', cdn_url)
    if not m:
        return None
    filename = m.group(1)
    name, ext = filename.rsplit('.', 1)
    return f"image-{name}-{ext}"

def wp_url_to_asset_ref(wp_url: str) -> str | None:
    cdn = img_map.get(wp_url)
    if cdn:
        return sanity_ref_from_cdn(cdn)
    # Strip WP thumbnail size suffix (-WxH before extension)
    base = re.sub(r'-\d+x\d+(\.\w+)$', r'\1', wp_url)
    cdn = img_map.get(base)
    if cdn:
        return sanity_ref_from_cdn(cdn)
    return None

def make_image_obj(asset_ref: str) -> dict:
    return {"_type": "image", "asset": {"_type": "reference", "_ref": asset_ref}}

# ── Parse HTML ─────────────────────────────────────────────────────────────────
def parse_project(slug: str, html: str) -> dict | None:
    title = slug_to_title(slug)

    # Meta description
    desc_m = re.search(
        r'<meta[^>]+name=["\']description["\'][^>]+content=["\'](.*?)["\']', html
    )
    meta_desc = desc_m.group(1).strip() if desc_m else ""

    # OG image — attributes can be in either order in the tag
    og_img_m = re.search(
        r'<meta[^>]+content=["\']([^"\']+)["\'][^>]+og:image', html
    )
    hero_ref = None
    hero_wp_url = None
    if og_img_m:
        hero_wp_url = og_img_m.group(1)
        hero_ref = wp_url_to_asset_ref(hero_wp_url)

    # Gallery — only from src/data-src HTML attributes, NOT from JS strings
    # Match src="..." srcset="..." data-src="..." within actual HTML tags
    attr_imgs = re.findall(
        r'(?:src|data-src|data-lazy-src|data-srcset)=["\']([^"\']+)["\']',
        html
    )
    # Also catch srcset with multiple URLs
    srcset_imgs = re.findall(r'https://momsdesignbuild\.com/wp-content/uploads/[^\s,]+', " ".join(attr_imgs))

    # Collect all candidate WP image URLs from HTML attributes only
    wp_imgs = []
    for val in attr_imgs:
        # Each val might be a URL or srcset string
        found = re.findall(
            r'https://momsdesignbuild\.com/wp-content/uploads/[^\s"\'<>,]+\.(?:jpg|jpeg|png|webp)',
            val
        )
        wp_imgs.extend(found)

    # Deduplicate and filter
    skip_patterns = ['logo', 'icon', 'mdb-logo', 'color_rgb', '-220x53', '-150x150']
    seen = set()
    gallery_refs = []
    for wp_url in wp_imgs:
        if any(p in wp_url.lower() for p in skip_patterns):
            continue
        base = re.sub(r'-\d+x\d+(\.\w+)$', r'\1', wp_url)
        if base in seen:
            continue
        seen.add(base)
        ref = wp_url_to_asset_ref(wp_url)
        if ref and ref != hero_ref:
            gallery_refs.append(ref)

    print(f"  {slug}: '{title}' | hero={'✓' if hero_ref else '✗'} | gallery={len(gallery_refs)}")

    doc = {
        "_type": "portfolioProject",
        "_id": f"portfolio-{slug}",
        "title": title,
        "slug": {"_type": "slug", "current": slug},
        "order": 0,
        "featured": False,
    }
    if meta_desc:
        doc["metaDescription"] = meta_desc
    if hero_ref:
        doc["heroImage"] = {
            **make_image_obj(hero_ref),
            "hotspot": {"x": 0.5, "y": 0.5, "_type": "sanity.imageHotspot"},
            "crop": {"top": 0, "bottom": 0, "left": 0, "right": 0, "_type": "sanity.imageCrop"},
        }
    if gallery_refs:
        doc["gallery"] = [make_image_obj(r) for r in gallery_refs]

    return doc

# ── POST to Sanity ─────────────────────────────────────────────────────────────
def sanity_mutate(mutations: list) -> dict:
    url = f"https://{PROJECT_ID}.api.sanity.io/v{API_VERSION}/data/mutate/{DATASET}"
    payload = json.dumps({"mutations": mutations}).encode()
    req = urllib.request.Request(
        url, data=payload,
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {TOKEN}"},
        method="POST",
    )
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())

# ── Main ───────────────────────────────────────────────────────────────────────
copy_dir = os.path.expanduser(COPY_DIR)
slugs = sorted([d for d in os.listdir(copy_dir) if os.path.isdir(os.path.join(copy_dir, d))])

print(f"\nFound {len(slugs)} portfolio projects\n")

docs = []
for i, slug in enumerate(slugs):
    html_path = os.path.join(copy_dir, slug, "index.html")
    if not os.path.exists(html_path):
        continue
    with open(html_path, encoding="utf-8", errors="ignore") as f:
        html = f.read()
    doc = parse_project(slug, html)
    if doc:
        doc["order"] = i + 1
        docs.append(doc)

print(f"\n✓ Parsed {len(docs)} projects. Uploading to Sanity...\n")

BATCH = 10
ok = 0
errors = []
for i in range(0, len(docs), BATCH):
    batch = docs[i:i+BATCH]
    mutations = [{"createOrReplace": d} for d in batch]
    try:
        sanity_mutate(mutations)
        ok += len(batch)
        print(f"  ✓ {i+1}–{i+len(batch)}: {', '.join(d['slug']['current'] for d in batch)}")
    except Exception as e:
        errors.append(str(e))
        print(f"  ✗ batch {i+1}–{i+len(batch)} failed: {e}")
    time.sleep(0.3)

print(f"\n{'='*50}")
print(f"Done: {ok}/{len(docs)} uploaded")
if errors:
    print(f"Errors: {errors}")
