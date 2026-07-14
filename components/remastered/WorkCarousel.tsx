import { client } from '@/sanity/lib/client'
import WorkCarouselClient, { type WorkCard } from './WorkCarouselClient'

/** Our Work — Apple-carousel of the first 10 projects by Studio order. */
export default async function WorkCarousel() {
  const projects = await client.fetch<WorkCard[]>(
    `*[_type == "portfolioProject"] | order(orderRank) [0...10] {
      title,
      "slug": slug.current,
      location,
      "image": coalesce(leadImage.asset->url, heroImage.asset->url)
    }`
  )
  return <WorkCarouselClient projects={projects.filter((p) => p.image)} />
}
