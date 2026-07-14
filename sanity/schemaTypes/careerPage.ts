import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'careerPage',
  title: 'Career Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Position Title (as on WP, e.g. PROJECT COORDINATOR)', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug (WP path segment)', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'order', title: 'Tile order (their careers-grid DOM order)', type: 'number' }),
    defineField({
      name: 'published',
      title: 'Live on the careers page? (off = draft, like WP drafts — Summer toggles roles on/off as MDB hires)',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'photo', title: 'Culture photo (their loop-grid tile background — no alt on WP, CSS background)',
      type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
    }),
    defineField({ name: 'facts', title: 'Job facts (their icon-list, verbatim order)', type: 'array', of: [{ type: 'string' }] }),
    defineField({
      name: 'body', title: 'Job description (their text-editor widgets, structure preserved)',
      type: 'array', of: [{ type: 'block' }],
    }),
    defineField({ name: 'applyHref', title: 'APPLY button href (theirs, verbatim)', type: 'string' }),
    defineField({ name: 'prevHref', title: 'Their post-navigation prev href', type: 'string' }),
    defineField({ name: 'nextHref', title: 'Their post-navigation next href', type: 'string' }),
    defineField({ name: 'metaTitle', title: 'Meta Title (WP titleTag)', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3 }),
    defineField({ name: 'sourceUrl', title: 'Canonical path (from WP tag)', type: 'string', readOnly: true }),
    defineField({ name: 'jsonLd', title: 'Yoast JSON-LD (verbatim from live WP)', type: 'text', rows: 4, readOnly: true }),
  ],
  preview: { select: { title: 'title', media: 'photo' } },
})
