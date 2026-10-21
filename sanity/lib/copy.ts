import { sanityFetch } from './live'
import { COPY, type CopyKey } from '../copy/defaults'

// The words and photos for a page, from its Studio document ("copy-<key>").
// Anything the document leaves empty falls back to the starting value in
// sanity/copy/defaults.ts. Photos come back as { url, alt }.

const CDN = 'https://cdn.sanity.io/images/wavk40jo/production/'

// { asset: { _ref: "image-<id>-<w>x<h>-<ext>" }, alt } -> { url, alt }
function resolve(v: unknown): unknown {
  if (Array.isArray(v)) return v.map(resolve)
  if (v && typeof v === 'object') {
    const o = v as Record<string, unknown>
    const ref = (o.asset as { _ref?: string } | undefined)?._ref
    if (ref?.startsWith('image-')) {
      const [, id, dims, ext] = ref.split('-')
      return { url: `${CDN}${id}-${dims}.${ext}`, alt: (o.alt as string) ?? '' }
    }
    return Object.fromEntries(Object.entries(o).filter(([k]) => !k.startsWith('_')).map(([k, x]) => [k, resolve(x)]))
  }
  return v
}

const empty = (v: unknown) => v === null || v === undefined || v === '' || (Array.isArray(v) && v.length === 0)

// objects merge field by field; a list the editors have filled replaces the default list
function merge<T>(def: T, doc: unknown): T {
  if (empty(doc)) return def
  if (Array.isArray(def) || typeof def !== 'object' || def === null) return doc as T
  if (typeof doc !== 'object') return def
  const out: Record<string, unknown> = { ...(def as object) }
  for (const [k, v] of Object.entries(doc as object)) {
    if (!empty(v)) out[k] = k in out ? merge(out[k], v) : v
  }
  return out as T
}

export async function getCopy<K extends CopyKey>(key: K): Promise<(typeof COPY)[K]> {
  const { data } = await sanityFetch({ query: `*[_id == $id][0]`, params: { id: `copy-${key}` } })
  return merge(COPY[key], resolve(data))
}
