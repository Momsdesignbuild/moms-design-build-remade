// Run from the repo root: node --experimental-strip-types scripts/test-sitemap-images.mts
import assert from "node:assert/strict"
// @ts-expect-error node needs the .ts extension here; tsconfig has allowImportingTsExtensions off
import { imageRefsIn, sanityImageUrl, siteImageUrl, sitemapImagesFor } from "../sanity/lib/sitemap-images.ts"

const A = "image-0041433e4d4013533f29296df0acafcb81dff112-2400x1600-jpg"
const B = "image-aaaabbbbccccddddeeeeffff00001111aaaa2222-1200x800-png"

assert.equal(sanityImageUrl(A, "proj", "production"), "https://cdn.sanity.io/images/proj/production/0041433e4d4013533f29296df0acafcb81dff112-2400x1600.jpg")
assert.equal(sanityImageUrl("file-abc-pdf", "proj", "production"), null, "files are not images")
assert.equal(sanityImageUrl("image-nonsense", "proj", "production"), null)

// nested: hero, gallery, body blocks, photo rows; the same image twice counts once; non-image assets ignored
const doc = {
  heroImage: { asset: { _ref: A, _type: "reference" } },
  gallery: [{ asset: { _ref: B } }, { asset: { _ref: A } }],
  body: [{ _type: "block", children: [{ text: "x" }] }, { _type: "photoRow", images: [{ asset: { _ref: B } }] }],
  poster: { asset: { _ref: "file-xyz-mp4" } },
}
assert.deepEqual(imageRefsIn(doc), [A, B])
assert.deepEqual(imageRefsIn(null), [])
assert.deepEqual(imageRefsIn("text"), [])

const out = sitemapImagesFor(doc, "proj", "production")
assert.equal(out.length, 2)
assert.ok(out[0].startsWith("https://momsdesignbuild.com/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fproj%2Fproduction%2F0041433e"))
assert.ok(out[0].endsWith("&w=1920&q=75"))
assert.equal(siteImageUrl("https://cdn.sanity.io/images/p/d/h-1x1.jpg"), "https://momsdesignbuild.com/_next/image/?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fp%2Fd%2Fh-1x1.jpg&w=1920&q=75")

// capped, and a hostile document never throws
const many = { items: Array.from({ length: 500 }, (_, i) => ({ asset: { _ref: `image-${"a".repeat(38)}${String(i).padStart(2, "0")}-10x10-jpg` } })) }
assert.equal(sitemapImagesFor(many, "p", "d").length, 200, "capped at 200 per page")
const loop: Record<string, unknown> = {}; loop.self = loop
assert.deepEqual(sitemapImagesFor(loop, "p", "d"), [], "circular data returns [] instead of throwing")
console.log("ok: sitemap image helper")
