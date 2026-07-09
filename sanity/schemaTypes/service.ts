import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3 }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'shortDescription', title: 'Short Description', type: 'text', rows: 2 }),
    defineField({ name: 'body', title: 'Body', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true } }] }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
    defineField({ name: 'sourceUrl', title: 'Original WP URL', type: 'string', readOnly: true }),
    defineField({ name: 'jsonLd', title: 'Yoast JSON-LD (verbatim from WP)', type: 'text', rows: 4, readOnly: true }),
  ],
  preview: {
    select: { title: 'title', media: 'heroImage' },
  },
})
