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

export function pick(cityProjects: Project[], everyProject: Project[], cat: Cat, n: number, used = new Set<string>(), wide = false): Photo[] {
  const out: Photo[] = []
  for (const pool of [all(cityProjects), all(everyProject)]) {
    for (const ph of pool) {
      if (out.length >= n) return out
      if (used.has(ph.url) || !CATS[cat].test(ph.alt ?? '') || NOT_A_PHOTO.test(ph.alt ?? '')) continue
      if (wide && ph.w < ph.h * 1.3) continue
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
