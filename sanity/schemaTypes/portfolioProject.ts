import { defineField, defineType } from 'sanity'
import { orderRankField } from '@sanity/orderable-document-list'

export default defineType({
  name: 'portfolioProject',
  title: 'Portfolio Project',
  type: 'document',
  fields: [
    // Drag position in the Studio's orderable list — drives the /portfolio
    // grid AND the homepage 3x3. Seeded from the legacy numeric `order`.
    orderRankField({ type: 'portfolioProject' }),
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: r => r.required() }),
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3 }),
    defineField({ name: 'heroImage', title: 'Card Image (grid only)', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'leadImage', title: 'Page Lead Image (WP page hero, carries WP alt)', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt text' }] }),
    defineField({ name: 'gallery', title: 'Gallery', type: 'array', of: [{ type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt text' }, { name: 'caption', type: 'string', title: 'Visible caption (from WP figcaption)' }] }] }),
    defineField({ name: 'description', title: 'Description', type: 'array', of: [{ type: 'block' }, { type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', title: 'Alt text' }, { name: 'galleryGroup', type: 'number', title: 'Inline gallery group (multi-gallery pages)' }] }] }),
    defineField({ name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'videoUrl', title: 'Video URL (Vimeo/YouTube embed)', type: 'url' }),
    defineField({ name: 'designerName', title: 'Designer Name', type: 'string' }),
    defineField({ name: 'designerSlug', title: 'Designer Slug (for team page link)', type: 'string' }),
    defineField({ name: 'featured', title: 'Featured', type: 'boolean', initialValue: false }),
    // Legacy numeric order (WP-migration capture). Superseded by orderRank —
    // hidden so nobody edits a number that no longer does anything.
    defineField({ name: 'order', title: 'Sort Order (legacy)', type: 'number', hidden: true }),
    defineField({ name: 'location', title: 'Location (City, ST)', type: 'string' }),
    defineField({ name: 'galleryBadges', title: 'Award badges found inside the WP gallery (pixel-detected)', type: 'array', of: [{ type: 'image', fields: [{ name: 'alt', type: 'string', title: 'Alt text' }] }] }),
    defineField({ name: 'completedYear', title: 'Completed year (from WP datePublished when page lacks a Completed block)', type: 'string' }),
    defineField({ name: 'sourceUrl', title: 'Original WP URL', type: 'string', readOnly: true }),
    defineField({ name: 'jsonLd', title: 'Yoast JSON-LD (verbatim from WP)', type: 'text', rows: 4, readOnly: true }),
  ],
  preview: {
    select: { title: 'title', media: 'heroImage' },
  },
})
