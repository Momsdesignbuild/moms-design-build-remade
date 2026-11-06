// Old WordPress image addresses -> the Sanity-hosted copy.
//
// WordPress wrote each upload several times (name-1024x683.jpg, name-768x512.jpg, name-scaled.jpg ...)
// and its pages pointed at those resized copies, so those are the addresses Google Images had indexed.
// The redirect map only holds the original files, so every resized address 404'd after the Oct 7 2026
// go-live and image-search impressions fell about 80% in a week. This finds the original behind a
// resized address and keeps the old width (Sanity resizes with ?w=).

const SIZE_SUFFIX = /-(\d{2,4})x(\d{2,4})(?=\.[A-Za-z0-9]+$)/
const SCALED_SUFFIX = /-(?:scaled|rotated)(?=\.[A-Za-z0-9]+$)/i

export function resolveWpImage(
  pathname: string,
  map: Record<string, string>,
  origin = "https://momsdesignbuild.com",
): string | null {
  const exact = map[`${origin}${pathname}`]
  if (exact) return exact

  // Resized copy: look up the original, then ask Sanity for the width the old file had.
  // Try the plainest guess first: "...-rotated-1024x683.jpg" is a size copy of "...-rotated.jpg", which is a real file name.
  const size = pathname.match(SIZE_SUFFIX)
  const sizeless = pathname.replace(SIZE_SUFFIX, "")
  const candidates = [sizeless, sizeless.replace(SCALED_SUFFIX, ""), pathname.replace(SCALED_SUFFIX, "")]
  const found = candidates.find((c) => c !== pathname && map[`${origin}${c}`])
  if (!found) return null
  const target = map[`${origin}${found}`]
  if (!size) return target
  const width = Number(size[1])
  return `${target}${target.includes("?") ? "&" : "?"}w=${width}&auto=format`
}
