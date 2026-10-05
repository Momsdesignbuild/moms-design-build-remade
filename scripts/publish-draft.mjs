// Publish Sanity drafts — the Codespace's "publish" for content (Josh 10/5: the team
// should never need to open the Studio). Only run when the person has said "publish".
//   node --env-file=.env.local scripts/publish-draft.mjs <docId> [<docId>…] [--allow-seo]
// Refuses if a draft changes what the page ranks with (address, meta title/description,
// canonical source, JSON-LD) unless --allow-seo is passed because they explicitly asked.
import { createClient } from '@sanity/client'

const args = process.argv.slice(2)
const allowSeo = args.includes('--allow-seo')
const ids = args.filter((a) => !a.startsWith('--')).map((a) => a.replace(/^drafts\./, ''))
if (!ids.length) { console.error('usage: publish-draft.mjs <docId> [...] [--allow-seo]'); process.exit(1) }

const c = createClient({ projectId: 'wavk40jo', dataset: 'production', apiVersion: '2025-02-19', token: process.env.SANITY_API_TOKEN, useCdn: false })
const SEO = ['slug', 'metaTitle', 'metaDescription', 'sourceUrl', 'jsonLd', 'seo']
const same = (a, b) => JSON.stringify(a ?? null) === JSON.stringify(b ?? null)

const tx = c.transaction()
for (const id of ids) {
  const [draft, live] = await Promise.all([c.getDocument(`drafts.${id}`), c.getDocument(id)])
  if (!draft) { console.error(`no draft for ${id} (nothing to publish)`); process.exit(1) }
  const seoChanged = live ? SEO.filter((f) => !same(draft[f], live[f])) : []
  if (seoChanged.length && !allowSeo) {
    console.error(`${id}: the draft changes ${seoChanged.join(', ')} (what Google ranks the page with). Not published. Re-run with --allow-seo only if they asked for that change.`)
    process.exit(2)
  }
  const { _id, _rev, _updatedAt, _createdAt, ...fields } = draft
  void _id; void _rev; void _updatedAt
  tx.createOrReplace({ ...fields, _id: id, _createdAt: live?._createdAt ?? _createdAt }).delete(`drafts.${id}`)
  console.log(`${live ? 'updating' : 'creating'} ${id}${seoChanged.length ? ` (SEO fields changed: ${seoChanged.join(', ')})` : ''}`)
}
await tx.commit()
console.log(`published ${ids.length}. The page updates in a few seconds; lists (blog, portfolio) within a minute.`)
