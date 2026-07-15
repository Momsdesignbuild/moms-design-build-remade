import { defineLive } from 'next-sanity/live'
import { client } from './client'

// Visual editing / live preview plumbing. sanityFetch serves published
// content to visitors, but inside the Studio's Presentation tab (draft mode)
// it serves live drafts with stega overlays — click text on the page, land on
// the field. SanityLive streams content updates.
const token = process.env.SANITY_API_READ_TOKEN

export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    stega: {
      studioUrl: '/studio',
      filter: (props) => {
        // Never stega-tag mechanical fields: SEO clone payloads rendered raw
        // into <script>/<link> tags, and values the code COMPARES or uses as
        // lookup keys (template/cardsSet — invisible chars broke the service
        // card grids in draft mode, July 11).
        const MECHANICAL = new Set([
          'jsonLd', 'sourceUrl', 'canonical', 'template', 'cardsSet',
          'divisionLogoUrl', 'href', 'style', 'listItem', 'ogImageUrl',
          'ogImageType', 'slug', 'current', 'url', 'videoUrl',
        ])
        const last = String(props.sourcePath.at(-1))
        if (MECHANICAL.has(last)) return false
        return props.filterDefault(props)
      },
    },
  }),
  serverToken: token,
  browserToken: token,
})
