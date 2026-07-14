import { client } from '@/sanity/lib/client'
import WorkCarouselClient, { type WorkCard } from './WorkCarouselClient'

type Row = {
  title: string
  slug: string
  location?: string
  card?: { url: string; w: number }
  lead?: string
}

/** Our Work — Apple-carousel of the first 10 projects by Studio order.
 * Cards show the SAME photo as the /portfolio/ grid (heroImage), so the
 * homepage mirrors the portfolio exactly (Josh 7/14: lead-image cards read
 * as the wrong/old portfolio). Card-resolution rule still applies: some of
 * THEIR grid photos are 300–750px thumbnails — those fall back to the
 * hi-res lead so nothing renders soft. */
export default async function WorkCarousel() {
  const rows = await client.fetch<Row[]>(
    `*[_type == "portfolioProject"] | order(orderRank) [0...10] {
      title,
      "slug": slug.current,
      location,
      "card": heroImage.asset->{ "url": url, "w": metadata.dimensions.width },
      "lead": leadImage.asset->url
    }`
  )
  const projects: WorkCard[] = rows
    .map((r) => ({
      title: r.title,
      slug: r.slug,
      location: r.location,
      image: (r.card && r.card.w >= 900 ? r.card.url : r.lead || r.card?.url) ?? '',
    }))
    .filter((p) => p.image)
  return <WorkCarouselClient projects={projects} />
}
