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
        // SEO clone payloads are rendered raw into <script>/<link> tags —
        // stega's invisible characters must never touch them.
        const last = props.sourcePath.at(-1)
        if (last === 'jsonLd' || last === 'sourceUrl' || last === 'canonical') return false
        return props.filterDefault(props)
      },
    },
  }),
  serverToken: token,
  browserToken: token,
})
