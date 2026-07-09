import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  // All fetches happen server-side at build/ISR time — the apicdn cache only
  // adds staleness (builds kept baking hours-old content). Always hit the live API.
  useCdn: false,
})
