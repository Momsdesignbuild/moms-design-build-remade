// Image entries for sitemap.xml.
//
// WordPress's sitemap listed each page's photos. The rebuild's did not, so after the Oct 7 2026
// go-live Google had no list of the new image addresses (image-search impressions fell about 80%).
// Every page's images live in Sanity as `{ asset: { _ref: "image-<hash>-<w>x<h>-<ext>" } }` somewhere inside
// the document (hero, gallery, body blocks, photo rows). Sanity's query language cannot walk nested
// objects, so we walk the fetched document here.
//
// The address we list is the same-domain one the pages themselves emit in their srcset
// (/_next/image/?url=<cdn.sanity.io address>&w=1920&q=75), so it matches what Google finds on the page.

const BASE_URL = "https://momsdesignbuild.com"
const MAX_PER_PAGE = 200 // Google's limit is 1,000 per URL; the biggest gallery has about 45

type Json = unknown

/** "image-<hash>-<w>x<h>-<ext>" -> https://cdn.sanity.io/images/<project>/<dataset>/<hash>-<w>x<h>.<ext> */
export function sanityImageUrl(ref: string, projectId: string, dataset: string): string | null {
  const m = /^image-([A-Za-z0-9]+)-(\d+x\d+)-([a-z0-9]+)$/.exec(ref)
  if (!m) return null
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${m[1]}-${m[2]}.${m[3]}`
}

/** The on-site address Next serves for an image at its widest standard size. */
export function siteImageUrl(cdnUrl: string): string {
  return `${BASE_URL}/_next/image/?url=${encodeURIComponent(cdnUrl)}&w=1920&q=75`
}

/** Every image asset reference inside a document, in the order they appear, without repeats. */
export function imageRefsIn(doc: Json): string[] {
  const seen = new Set<string>()
  const walk = (node: Json) => {
    if (!node || typeof node !== "object") return
    if (Array.isArray(node)) return node.forEach(walk)
    const obj = node as Record<string, Json>
    const asset = obj.asset as { _ref?: unknown } | undefined
    if (asset && typeof asset._ref === "string" && asset._ref.startsWith("image-")) seen.add(asset._ref)
    for (const v of Object.values(obj)) walk(v)
  }
  walk(doc)
  return [...seen]
}

/** Site image addresses for a document, ready for a sitemap entry's `images`. Never throws. */
export function sitemapImagesFor(doc: Json, projectId: string, dataset: string): string[] {
  try {
    return imageRefsIn(doc)
      .map((ref) => sanityImageUrl(ref, projectId, dataset))
      .filter((u): u is string => !!u)
      .slice(0, MAX_PER_PAGE)
      .map(siteImageUrl)
  } catch {
    return []
  }
}
