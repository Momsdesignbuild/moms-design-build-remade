// Lists unpublished Sanity drafts, so a code publish can say plainly what is still waiting.
//   node scripts/list-drafts.mjs
import { createClient } from '@sanity/client'
const token = process.env.SANITY_API_TOKEN
if (!token) process.exit(0) // no key here (e.g. CI): nothing to list
const c = createClient({ projectId: 'wavk40jo', dataset: 'production', apiVersion: '2025-02-19', token, useCdn: false })
const drafts = await c.fetch('*[_id in path("drafts.**")]{ _id, _type, "name": coalesce(title, name, _id) }')
if (!drafts.length) process.exit(0)
console.log(`\nUnpublished words/photos still waiting in Sanity (${drafts.length}):`)
for (const d of drafts.slice(0, 15)) console.log(`  - ${d.name}  [${d._id.replace(/^drafts\./, '')}]`)
console.log('If this change needs them, publish them too (node scripts/publish-draft.mjs <id>), or the site goes live with the new layout and the old words.\n')
