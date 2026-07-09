import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '@/sanity/lib/client'

// The Studio's Presentation tab calls this to switch the site into draft
// mode (validates a secret minted by the Studio — not publicly usable).
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: process.env.SANITY_API_READ_TOKEN }),
})
