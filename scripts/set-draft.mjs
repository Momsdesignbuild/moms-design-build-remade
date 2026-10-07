// Change fields on a page's DRAFT — the Codespace's one-liner for a words/photo edit.
//   node --env-file=.env.local scripts/set-draft.mjs <docId> <field.path>=<value> [more...]
//   e.g. set-draft.mjs homePage givingBack.heading="Hello"
//        set-draft.mjs post-fall-checklist excerpt="New excerpt" 'categories:=["Planning Resources"]'
// `=` sets a string; `:=` sets JSON (arrays, numbers, true/false, null).
// If the page has no draft yet, one is made from the published version; if a
// draft already exists (someone's unpublished work), THAT draft is edited —
// never skipped, never replaced. Nothing is published.
import { createClient } from '@sanity/client'

const [id, ...sets] = process.argv.slice(2)
if (!id || !sets.length) { console.error('usage: set-draft.mjs <docId> <field.path>=<value> [...]'); process.exit(1) }
const c = createClient({ projectId: 'wavk40jo', dataset: 'production', apiVersion: '2025-02-19', token: process.env.SANITY_API_TOKEN, useCdn: false })
const LOCKED = ['slug', 'sourceUrl', 'jsonLd', 'metaTitle', 'metaDescription', '_id', '_type']

const pubId = id.replace(/^drafts\./, ''), draftId = `drafts.${pubId}`
const patch = {}
for (const s of sets) {
  const m = s.match(/^([\w.[\]]+)(:?=)([\s\S]*)$/)
  if (!m) { console.error(`can't read "${s}" — use field=value or field:=json`); process.exit(1) }
  const [, path, op, raw] = m
  if (LOCKED.includes(path.split('.')[0])) { console.error(`${path} is locked (what Google ranks the page with) — ask Josh`); process.exit(2) }
  patch[path] = op === ':=' ? JSON.parse(raw) : raw
}

let draft = await c.getDocument(draftId)
let made = false
if (!draft) {
  const live = await c.getDocument(pubId)
  if (!live) { console.error(`no page with id ${pubId}`); process.exit(1) }
  const { _rev, _createdAt, _updatedAt, ...rest } = live
  draft = await c.createIfNotExists({ ...rest, _id: draftId })
  made = true
}
await c.patch(draftId).set(patch).commit()
console.log(`${made ? 'draft made from the live page' : 'existing draft edited'}: ${draftId}`)
for (const [k, v] of Object.entries(patch)) console.log(`  ${k} = ${JSON.stringify(v).slice(0, 120)}`)
