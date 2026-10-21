// One-time: fill the Studio "page text" documents (About, Process, Contact, Services,
// Careers, Portfolio, Blog, Team, Menus) with what the site shows today, from
// sanity/copy/defaults.ts. createIfNotExists: it never overwrites Studio edits.
//   node --env-file=.env.local scripts/seed-page-copy.mjs [--dry]
import { createClient } from '@sanity/client'
import { COPY } from '../sanity/copy/defaults.ts'

const dry = process.argv.includes('--dry')
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

let n = 0
const key = () => `k${(n++).toString(36)}`

// { url: ".../<id>-<w>x<h>.<ext>", alt } -> a Sanity image field; lists get _key
function toDoc(v) {
  if (Array.isArray(v)) return v.map((x) => (x && typeof x === 'object' ? { _key: key(), ...toDoc(x) } : x))
  if (v && typeof v === 'object') {
    if (typeof v.url === 'string' && v.url.startsWith('https://cdn.sanity.io/images/')) {
      const m = v.url.match(/production\/([a-f0-9]+)-(\d+x\d+)\.(\w+)$/)
      if (!m) throw new Error('not a Sanity image url: ' + v.url)
      return { _type: 'image', asset: { _type: 'reference', _ref: `image-${m[1]}-${m[2]}-${m[3]}` }, ...(v.alt ? { alt: v.alt } : {}) }
    }
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, toDoc(x)]))
  }
  return v
}

for (const [k, v] of Object.entries(COPY)) {
  const doc = { _id: `copy-${k}`, _type: `copy_${k}`, ...toDoc(v) }
  if (dry) { console.log(doc._id, Object.keys(doc).length, 'fields'); continue }
  await client.createIfNotExists(doc)
  console.log('ok', doc._id)
}
