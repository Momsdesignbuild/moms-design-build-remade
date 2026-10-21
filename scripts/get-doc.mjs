// What a page's words say RIGHT NOW in Sanity: the published version, and the draft if
// someone has one, with the fields that differ. Answer "what does the X page say" from
// this, never from the code or from sanity/copy/defaults.ts (those are only starting text).
//   node scripts/get-doc.mjs <docId> [field.path]      e.g.  get-doc.mjs copy-about mission
import { createClient } from '@sanity/client'

const [id, path] = process.argv.slice(2)
if (!id) { console.error('usage: get-doc.mjs <docId> [field.path]'); process.exit(1) }
if (!process.env.SANITY_API_TOKEN) { console.error('Missing SANITY_API_TOKEN (a Codespace secret); ask Josh.'); process.exit(1) }
const c = createClient({ projectId: 'wavk40jo', dataset: 'production', apiVersion: '2025-02-19', token: process.env.SANITY_API_TOKEN, useCdn: false })
const pubId = id.replace(/^drafts\./, '')
const [pub, draft] = await Promise.all([c.getDocument(pubId), c.getDocument(`drafts.${pubId}`)])
if (!pub && !draft) { console.error(`No page with id ${pubId}`); process.exit(1) }

const pick = (d) => (path ? path.split('.').reduce((o, k) => (o == null ? o : o[k]), d) : d)
const strip = (v) => JSON.parse(JSON.stringify(v, (k, x) => (k.startsWith('_') && k !== '_key' ? undefined : x)))
const show = (v) => console.log(JSON.stringify(strip(v), null, 2))

console.log(`PUBLISHED (live on the site)${pub ? `, last changed ${pub._updatedAt}` : ': none'}`)
if (pub) show(pick(pub))
if (!draft) { console.log('\nNo unpublished draft: the live version above is the latest.'); process.exit(0) }
console.log(`\nDRAFT (not live yet), last changed ${draft._updatedAt}`)
show(pick(draft))
const keys = [...new Set([...Object.keys(pub || {}), ...Object.keys(draft)])].filter((k) => !k.startsWith('_'))
const differs = keys.filter((k) => JSON.stringify(strip(pub?.[k] ?? null)) !== JSON.stringify(strip(draft[k] ?? null)))
console.log(`\nFields the draft changes: ${differs.length ? differs.join(', ') : 'none (identical to live)'}`)
