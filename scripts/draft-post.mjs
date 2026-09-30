// Create a blog post as a DRAFT in Sanity — a human publishes it in Studio.
//   node --env-file=.env.local scripts/draft-post.mjs post.json
// post.json: { "title", "excerpt", "categories": [...], "paragraphs": ["..", {"h2": ".."}, ".."], "photo": "pool" }
// "photo" = words to find an existing site photo by its alt text (the new catalog).
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import { previewLink } from './preview-link.mjs'

const c = createClient({ projectId: 'wavk40jo', dataset: 'production', apiVersion: '2024-01-01', token: process.env.SANITY_API_TOKEN, useCdn: false })
const p = JSON.parse(readFileSync(process.argv[2], 'utf8'))
const slug = p.title.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80)
const k = () => randomUUID().slice(0, 12)

let hero
if (p.photo) {
  const words = p.photo.toLowerCase().split(/\s+/).filter(Boolean)
  const imgs = await c.fetch(`*[_type == "portfolioProject"].gallery[defined(alt)]{ alt, "ref": asset._ref }`)
  const hit = imgs.flat().find((i) => words.every((w) => i.alt.toLowerCase().includes(w)))
  if (hit) hero = { _type: 'image', asset: { _type: 'reference', _ref: hit.ref }, alt: hit.alt }
}

const block = (x) => typeof x === 'string'
  ? { _type: 'block', _key: k(), style: 'normal', markDefs: [], children: [{ _type: 'span', _key: k(), marks: [], text: x }] }
  : { _type: 'block', _key: k(), style: 'h2', markDefs: [], children: [{ _type: 'span', _key: k(), marks: [], text: x.h2 }] }

const id = `drafts.post-${slug}`
await c.createOrReplace({
  _id: id,
  _type: 'post',
  title: p.title,
  slug: { _type: 'slug', current: slug },
  excerpt: p.excerpt,
  categories: p.categories ?? [],
  publishedAt: new Date().toISOString(),
  metaTitle: `${p.title} - Mom's Design Build`,
  metaDescription: p.excerpt,
  sourceUrl: `/${slug}/`,
  ...(hero ? { heroImage: hero } : {}),
  body: p.paragraphs.map(block),
})
console.log(`Draft saved: "${p.title}"${hero ? ` (photo: ${hero.alt})` : ''}`)
console.log(`Open in Studio: https://moms-design-build-remade-henna.vercel.app/studio/intent/edit/id=post-${slug};type=post/`)
const pv = await previewLink(`/${slug}/`)
console.log(`See the draft on the site (private, 1 hour, not published): ${pv.url}`)
console.log(`After Publish it lives at: https://moms-design-build-remade-henna.vercel.app/${slug}/`)
