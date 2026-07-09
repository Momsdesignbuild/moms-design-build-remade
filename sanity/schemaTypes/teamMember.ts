import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'role', title: 'Role / Title', type: 'string' }),
    defineField({ name: 'photo', title: 'Photo (page portrait, carries WP alt)', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt text' }] }),
    defineField({ name: 'ogImage', title: 'OG / share image (WP uses the BW square here, not the page portrait)', type: 'image' }),
    defineField({ name: 'bio', title: 'Bio', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3 }),
    defineField({ name: 'order', title: 'Sort Order', type: 'number' }),
    defineField({ name: 'sourceUrl', title: 'Original WP URL', type: 'string', readOnly: true }),
    defineField({ name: 'jsonLd', title: 'Yoast JSON-LD (verbatim from WP)', type: 'text', rows: 4, readOnly: true }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo' },
  },
})
