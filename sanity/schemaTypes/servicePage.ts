import { defineField, defineType } from 'sanity'

// Services content (44 pages: hubs, sub-services, city pages) — migrated from
// the hand-built route files July 9 so marketing can edit every word/photo in
// the Studio. DESIGN stays in code: `template` picks one of the four renderers
// in components/services/ServicePageBody.tsx; `cardsSet` picks which shared
// nav-card grid a cardsGrid body block renders (card grids are navigation,
// deliberately NOT per-page-editable so 37 pages can't drift apart).
export default defineType({
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title (Studio label)', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'slug', title: 'Path under /services/', type: 'slug',
      description: 'e.g. "landscape-architecture/pools" — changing this breaks the URL; leave alone',
      validation: r => r.required(),
    }),
    defineField({
      name: 'template', title: 'Renderer template', type: 'string',
      options: { list: ['hub', 'standard', 'interior', 'division', 'portal'] },
      readOnly: true,
      validation: r => r.required(),
    }),
    defineField({
      name: 'cardsSet', title: 'Card grid set', type: 'string',
      options: { list: ['landscape', 'interiorHub'] },
      readOnly: true,
    }),
    defineField({ name: 'divisionLogoUrl', title: 'Division logo URL (division template only)', type: 'string', readOnly: true }),
    defineField({
      name: 'body', title: 'Page content', type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' }, { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' }, { title: 'H4', value: 'h4' },
            { title: 'H5', value: 'h5' }, { title: 'H6', value: 'h6' },
            { title: 'Quote', value: 'blockquote' },
            { title: 'Quote attribution', value: 'attrib' },
          ],
          lists: [{ title: 'Bullet', value: 'bullet' }],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link', type: 'object', title: 'Link',
                fields: [{ name: 'href', type: 'string', title: 'URL' }],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'alt', type: 'string', title: 'Alt text' }],
        },
        {
          name: 'ctaButton', type: 'object', title: 'CTA Button',
          fields: [
            { name: 'text', type: 'string', title: 'Button text' },
            { name: 'href', type: 'string', title: 'Link' },
          ],
          preview: { select: { title: 'text', subtitle: 'href' } },
        },
        {
          name: 'cardsGrid', type: 'object', title: 'Sub-service card grid',
          fields: [{
            name: 'note', type: 'string', title: 'Note', readOnly: true,
            initialValue: 'Shared navigation card grid — rendered by code, edits happen in the codebase',
          }],
          preview: { prepare: () => ({ title: '▦ Sub-service card grid (shared, code-rendered)' }) },
        },
      ],
    }),
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3 }),
    defineField({ name: 'ogImageUrl', title: 'OG image URL', type: 'string' }),
    defineField({ name: 'ogImageWidth', title: 'OG image width', type: 'number', hidden: true }),
    defineField({ name: 'ogImageHeight', title: 'OG image height', type: 'number', hidden: true }),
    defineField({ name: 'ogImageType', title: 'OG image MIME type', type: 'string', hidden: true }),
    defineField({ name: 'sourceUrl', title: 'Canonical path (verbatim from WP)', type: 'string', readOnly: true }),
    defineField({ name: 'jsonLd', title: 'Yoast JSON-LD (verbatim from live WP)', type: 'text', rows: 4, readOnly: true }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
})
