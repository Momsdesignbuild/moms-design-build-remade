// A private, 1-hour link that shows DRAFTS on the real site design — nothing is published.
//   node --env-file=.env.local scripts/preview-link.mjs /some-page/
// Uses Sanity's preview-secret flow (the same one the Studio's Presentation tab uses).
import { createClient } from '@sanity/client'
import { createPreviewSecret } from '@sanity/preview-url-secret/create-secret'

// Live on momsdesignbuild.com since 2026-10-07. PREVIEW_ORIGIN overrides (e.g. a test build).
export const ORIGIN = process.env.PREVIEW_ORIGIN || 'https://momsdesignbuild.com'

export async function previewLink(pathname) {
  const client = createClient({ projectId: 'wavk40jo', dataset: 'production', apiVersion: '2025-02-19', token: process.env.SANITY_API_TOKEN, useCdn: false })
  const { secret, expiresAt } = await createPreviewSecret(client, 'codespace', `${ORIGIN}/studio`)
  const url = `${ORIGIN}/api/draft-mode/enable?sanity-preview-secret=${secret}&sanity-preview-pathname=${encodeURIComponent(pathname)}`
  return { url, expiresAt }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { url, expiresAt } = await previewLink(process.argv[2] || '/')
  console.log(`Draft preview (private, expires ${expiresAt.toLocaleTimeString('en-US', { timeZone: 'America/Chicago' })} CT): ${url}`)
}
