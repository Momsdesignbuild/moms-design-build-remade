import { sanityFetch } from './live'

export type Photo = { url: string; alt: string; w: number; h: number }
export type Project = { title: string; slug: string; location: string; hero?: Photo; gallery: Photo[] }

const IMG = `{ alt, "url": asset->url, "w": asset->metadata.dimensions.width, "h": asset->metadata.dimensions.height }`

export async function getProjects(): Promise<Project[]> {
  const { data } = await sanityFetch({
    query: `*[_type == "portfolioProject" && !(_id in path("drafts.**"))] | order(orderRank) {
      title, "slug": slug.current, "location": coalesce(location, ""),
      "hero": coalesce(leadImage, heroImage) ${IMG},
      "gallery": gallery[] ${IMG}
    }`,
  })
  return (data as Project[]).map((p) => ({ ...p, gallery: (p.gallery ?? []).filter((g) => g?.url) }))
}

// "EDINA, MN" / "Saint Paul, MN" -> "edina" / "st. paul"
export const cityKey = (s: string) =>
  s.replace(/,\s*mn$/i, '').replace(/\s+/g, ' ').trim().toLowerCase().replace(/^saint /, 'st. ')

export const projectsIn = (all: Project[], city: string) => all.filter((p) => cityKey(p.location) === cityKey(city))

const CATS = {
  pool: /pool|spa\b|splash|swim/i,
  deck: /deck|patio|paver|terrace|porch|walkway|stoop/i,
  living: /outdoor kitchen|kitchen exterior|fireplace|fire pit|fire feature|pergola|pavilion|outdoor living|grill/i,
  interior: /interior|remodel|bath|basement|bedroom|living room|kitchen design|cabinet/i,
} as const
export type Cat = keyof typeof CATS

const all = (ps: Project[]) => ps.flatMap((p) => [...(p.hero ? [p.hero] : []), ...p.gallery])

/** n photos of one kind: this city's own work first, then the rest of the portfolio. Never repeats a url. */
const NOT_A_PHOTO = /render|before|sketch|concept|3d|plan view|rendering/i

export function pick(cityProjects: Project[], everyProject: Project[], cat: Cat, n: number, used = new Set<string>(), wide = false, minW = 0): Photo[] {
  const out: Photo[] = []
  // sharpest first: this city's photos at full size, then everyone's, then (only if still short) anything
  for (const [pool, floor] of [[all(cityProjects), minW], [all(everyProject), minW], [all(cityProjects), 0], [all(everyProject), 0]] as [Photo[], number][]) {
    for (const ph of pool) {
      if (out.length >= n) return out
      if (used.has(ph.url) || !CATS[cat].test(ph.alt ?? '') || NOT_A_PHOTO.test(ph.alt ?? '')) continue
      if (wide && ph.w < ph.h * 1.3) continue
      if (ph.w < floor) continue
      if (cat === 'living' && /interior/i.test(ph.alt ?? '')) continue
      used.add(ph.url); out.push(ph)
    }
  }
  return out
}

/** one thumbnail for a city: its first project's cover, else the first pool photo overall */
export function cityThumb(everyProject: Project[], city: string): Photo | undefined {
  return projectsIn(everyProject, city).find((p) => p.hero)?.hero ?? pick([], everyProject, 'pool', 1)[0]
}

export const fill = (s: string, city: string) => s.replaceAll('{city}', city)

/** up to n mini photos for a city: its own projects first, then nearby cities, then anyone's. Photos already `used` elsewhere are skipped, so rows never repeat. */
export function cityPhotos(everyProject: Project[], city: string, nearby: string[], n: number, used = new Set<string>()): Photo[] {
  const out: Photo[] = []
  const add = (ph?: Photo) => { if (ph && out.length < n && !used.has(ph.url) && ph.w >= 900 && !NOT_A_PHOTO.test(ph.alt ?? '')) { used.add(ph.url); out.push(ph) } }
  const mine = projectsIn(everyProject, city)
  mine.forEach((p) => add(p.hero))
  for (let i = 0; out.length < n && mine.some((p) => p.gallery[i]); i++) mine.forEach((p) => add(p.gallery[i]))
  nearby.forEach((c) => projectsIn(everyProject, c).forEach((p) => { add(p.hero); p.gallery.slice(0, 2).forEach(add) }))
  all(everyProject).forEach(add)
  return out
}

/** the one photo that fits a tile of the given width/height ratio best: sharp (1800px+), not a render, never used before */
export function bestPhoto(everyProject: Project[], city: string, nearby: string[], target: number, used: Set<string>): Photo | undefined {
  const pools = [all(projectsIn(everyProject, city)), nearby.flatMap((c) => all(projectsIn(everyProject, c))), all(everyProject)]
  for (const pool of pools) {
    let best: Photo | undefined, bs = Infinity
    for (const ph of pool) {
      if (used.has(ph.url) || NOT_A_PHOTO.test(ph.alt ?? '') || ph.w < 1800) continue
      const alt = ph.alt ?? ''
      const sc = Math.abs(Math.log(ph.w / ph.h / target)) - (/pool|patio|deck|landscape|outdoor|backyard|terrace|garden|lake/i.test(alt) ? 0.35 : 0) + (/interior|kitchen|bath|living room|lighting|bedroom|basement/i.test(alt) ? 0.7 : 0)
      if (sc < bs) { bs = sc; best = ph }
    }
    if (best) { used.add(best.url); return best }
  }
}

export type Tokens = { city: string; region: string; near: string; work: string }
export const fillAll = (s: string, t: Tokens) =>
  s.replaceAll('{city}', t.city).replaceAll('{region}', t.region).replaceAll('{near}', t.near).replaceAll('{work}', t.work)
