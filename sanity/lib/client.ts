import { createClient } from 'next-sanity'

// Preview server only: SANITY_PREVIEW=1 shows unpublished drafts, so a page can be reviewed on a private link
// before it goes live. Production never sets it, so nothing changes there.
const preview = process.env.SANITY_PREVIEW === '1'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  // All fetches happen server-side at build/ISR time — the apicdn cache only
  // adds staleness (builds kept baking hours-old content). Always hit the live API.
  useCdn: false,
  ...(preview ? { perspective: 'drafts' as const, token: process.env.SANITY_API_READ_TOKEN } : {}),
})
