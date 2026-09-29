import { sanityFetch } from './live'
import type { HomeContent } from './homeContent'

// Homepage content from the "homePage" Sanity document (schema:
// sanity/schemaTypes/homePage.ts). Asset URLs are resolved here so the
// components just get strings.
const QUERY = `*[_id == "homePage"][0]{
  hero{ kicker, title, "videoUrl": video.asset->url, "posterUrl": poster.asset->url, primaryCta, secondaryCta },
  statement{ kicker, text },
  awards{ heading, "badges": badges[]{ "url": asset->url, alt } },
  work{ kicker, heading },
  anatomy{ kicker, heading, linkLabel, steps[]{ label, title, blurb } },
  transformation{ kicker, heading, subline,
    "beforeUrl": before.asset->url, "beforeAlt": before.alt,
    "afterUrl": after.asset->url, "afterAlt": after.alt },
  services{ kicker, heading, "items": items[]{ title, description, href, "image": image.asset->url, "alt": image.alt } },
  testimonials{ "quotes": quotes[]{ text, who, linkLabel, linkHref } },
  journal{ kicker, heading, linkLabel },
  givingBack{ kicker, heading, quote, body, statNumber, statLabel,
    "image": image.asset->url, "imageAlt": image.alt,
    "partners": partners[]{ name, href, "logo": logo.asset->url } },
  closing{ kicker, heading, cta, "image": image.asset->url, "imageAlt": image.alt },
  joinList{ kicker, heading, body, "image": image.asset->url, "imageAlt": image.alt }
}`

export async function getHomeContent(): Promise<HomeContent> {
  const { data } = await sanityFetch({ query: QUERY })
  return (data as HomeContent | null) ?? {}
}
