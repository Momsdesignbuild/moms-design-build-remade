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

/** up to n mini photos for a city: its own projects first (one per project, then more), then nearby cities, then pool photos */
export function cityPhotos(everyProject: Project[], city: string, nearby: string[], n: number): Photo[] {
  const out: Photo[] = [], seen = new Set<string>()
  const add = (ph?: Photo) => { if (ph && out.length < n && !seen.has(ph.url) && !NOT_A_PHOTO.test(ph.alt ?? '')) { seen.add(ph.url); out.push(ph) } }
  const mine = projectsIn(everyProject, city)
  mine.forEach((p) => add(p.hero))
  for (let i = 0; out.length < n && mine.some((p) => p.gallery[i]); i++) mine.forEach((p) => add(p.gallery[i]))
  nearby.forEach((c) => projectsIn(everyProject, c).forEach((p) => add(p.hero)))
  pick([], everyProject, 'pool', n).forEach(add)
  return out
}

export type Tokens = { city: string; region: string; near: string; work: string }
export const fillAll = (s: string, t: Tokens) =>
  s.replaceAll('{city}', t.city).replaceAll('{region}', t.region).replaceAll('{near}', t.near).replaceAll('{work}', t.work)
