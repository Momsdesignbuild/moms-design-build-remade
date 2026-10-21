import { defineField, defineType } from 'sanity'
import { COPY, type CopyKey } from './defaults'

// Builds one Studio document per entry in defaults.ts, one field per value, so
// the Studio form always matches what the page reads. Add a value to a default
// and its field appears; nothing else to wire.

const TITLES: Record<CopyKey, string> = {
  nav: 'Menus, contact details & footer',
  about: 'About page',
  process: 'Process page',
  contact: 'Contact page',
  services: 'Services page (the four cards)',
  careers: 'Careers page intro',
  portfolio: 'Portfolio page intro',
  blog: 'Blog page intro',
  team: 'Our Team page intro',
}

const humanize = (k: string) => {
  const s = k.replace(/([A-Z])/g, ' $1').toLowerCase()
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const isImage = (v: unknown): v is { url: string; alt?: string } =>
  !!v && typeof v === 'object' && typeof (v as { url?: unknown }).url === 'string' &&
  (v as { url: string }).url.startsWith('https://cdn.sanity.io/images/')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Sample = any

function field(name: string, sample: Sample, siblings: Sample[] = [sample]): ReturnType<typeof defineField> {
  const title = humanize(name)
  if (isImage(sample)) {
    return defineField({
      name, title, type: 'image', options: { hotspot: true },
      fields: [{ name: 'alt', type: 'string', title: 'Alt text (describe the photo for Google + screen readers)' }],
    })
  }
  if (typeof sample === 'boolean') return defineField({ name, title, type: 'boolean' })
  if (typeof sample === 'string') {
    const long = siblings.some((s) => typeof s === 'string' && s.length > 80)
    return long
      ? defineField({ name, title, type: 'text', rows: 4 })
      : defineField({ name, title, type: 'string' })
  }
  if (Array.isArray(sample)) {
    const first = sample[0]
    if (typeof first === 'string') {
      const long = sample.some((s: string) => s.length > 80)
      return defineField({ name, title: `${title} (drag to reorder)`, type: 'array', of: [{ type: long ? 'text' : 'string', ...(long ? { rows: 4 } : {}) }] })
    }
    return defineField({
      name, title: `${title} (drag to reorder)`, type: 'array',
      of: [{ type: 'object', fields: objectFields(sample), preview: { select: { title: previewKey(first) } } }],
    })
  }
  return defineField({ name, title, type: 'object', fields: objectFields([sample]) })
}

const previewKey = (o: Sample) => ['title', 'label', 'name'].find((k) => k in o) ?? Object.keys(o)[0]

// union of the keys across every item, so an optional field still gets a box
function objectFields(items: Sample[]) {
  const keys = [...new Set(items.flatMap((o) => Object.keys(o)))]
  return keys.map((k) => {
    const vals = items.map((o) => o[k]).filter((v) => v !== undefined)
    return field(k, vals[0], vals)
  })
}

const SEO_HELP: Record<string, string> = {
  metaTitle: 'The blue link in Google. Keep it under about 60 characters. Changing it changes how this page ranks, so only on purpose.',
  metaDescription: 'The grey text under the link in Google. Keep it under about 160 characters. Changing it changes how often people click.',
}

export const copyTypes = (Object.keys(COPY) as CopyKey[]).map((key) =>
  defineType({
    name: `copy_${key}`,
    title: TITLES[key],
    type: 'document',
    fieldsets: [{ name: 'seo', title: 'Google search: title and description (changes how this page ranks)', options: { collapsible: true, collapsed: true } }],
    fields: objectFields([COPY[key]]).map((f) =>
      f.name in SEO_HELP ? { ...f, fieldset: 'seo', title: f.name === 'metaTitle' ? 'Page title in Google' : 'Description in Google', description: SEO_HELP[f.name] } : f,
    ),
    preview: { prepare: () => ({ title: TITLES[key] }) },
  }),
)

export const copyDocs = (Object.keys(COPY) as CopyKey[]).map((key) => ({
  id: `copy-${key}`,
  type: `copy_${key}`,
  title: TITLES[key],
}))
