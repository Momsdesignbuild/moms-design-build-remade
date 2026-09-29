import { defineArrayMember, defineField, defineType } from 'sanity'

// The homepage's words and pictures (Josh, 9/29: Sanity holds the content,
// code holds the layout — Summer and Jazper edit here, no Claude needed).
// One document, id "homePage". Every field is optional: an empty field falls
// back to the wording/photo baked into the component, so the page never breaks.

const img = (name: string, title: string) =>
  defineField({
    name, title, type: 'image', options: { hotspot: true },
    fields: [{ name: 'alt', type: 'string', title: 'Alt text (describe the photo for Google + screen readers)' }],
  })
const s = (name: string, title: string) => defineField({ name, title, type: 'string' })
const t = (name: string, title: string, rows = 3) => defineField({ name, title, type: 'text', rows })
const link = (name: string, title: string) =>
  defineField({ name, title, type: 'object', fields: [s('label', 'Button text'), s('href', 'Links to (e.g. /contact)')] })

export default defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'intro', title: 'Statement + Awards' },
    { name: 'work', title: 'Work + Process' },
    { name: 'transformation', title: 'Before / After' },
    { name: 'services', title: 'Services' },
    { name: 'testimonials', title: 'Testimonials' },
    { name: 'journal', title: 'Blog' },
    { name: 'givingBack', title: 'Giving Back' },
    { name: 'closing', title: 'Closing + Newsletter' },
  ],
  fields: [
    defineField({
      name: 'hero', title: 'Hero (top of the page)', type: 'object', group: 'hero',
      fields: [
        s('kicker', 'Small line above the title'),
        s('title', 'Big title'),
        defineField({ name: 'video', title: 'Background video (mp4)', type: 'file', options: { accept: 'video/mp4' } }),
        img('poster', 'Still image shown while the video loads'),
        link('primaryCta', 'First button'),
        link('secondaryCta', 'Second button (blue)'),
      ],
    }),
    defineField({
      name: 'statement', title: 'Statement', type: 'object', group: 'intro',
      fields: [s('kicker', 'Small blue line'), t('text', 'The statement (fades in word by word)')],
    }),
    defineField({
      name: 'awards', title: 'Awards strip', type: 'object', group: 'intro',
      fields: [
        s('heading', 'Heading'),
        defineField({
          name: 'badges', title: 'Award badges (drag to reorder)', type: 'array',
          of: [defineArrayMember({ type: 'image', fields: [{ name: 'alt', type: 'string', title: 'Award name' }] })],
        }),
      ],
    }),
    defineField({
      name: 'work', title: 'Our Work carousel (projects come from the Portfolio order)', type: 'object', group: 'work',
      fields: [s('kicker', 'Small blue line'), s('heading', 'Heading')],
    }),
    defineField({
      name: 'anatomy', title: 'Anatomy of a Project (photos come from the Serene Shores portfolio page)', type: 'object', group: 'work',
      fields: [
        s('kicker', 'Small blue line'), s('heading', 'Heading'), s('linkLabel', 'Link text (goes to /process)'),
        defineField({
          name: 'steps', title: 'The four steps, in order', type: 'array', validation: (r) => r.max(4),
          of: [defineArrayMember({
            type: 'object',
            fields: [s('label', 'Label (e.g. Step 01)'), s('title', 'Title'), t('blurb', 'Text')],
            preview: { select: { title: 'title', subtitle: 'label' } },
          })],
        }),
      ],
    }),
    defineField({
      name: 'transformation', title: 'Before / After slider', type: 'object', group: 'transformation',
      fields: [s('kicker', 'Small blue line'), s('heading', 'Heading'), s('subline', 'Line under the heading'), img('before', 'Before photo'), img('after', 'After photo')],
    }),
    defineField({
      name: 'services', title: 'Services', type: 'object', group: 'services',
      fields: [
        s('kicker', 'Small blue line'), s('heading', 'Heading'),
        defineField({
          name: 'items', title: 'Service tiles (drag to reorder)', type: 'array',
          of: [defineArrayMember({
            type: 'object',
            fields: [s('title', 'Title'), t('description', 'Short description', 2), img('image', 'Photo'), s('href', 'Links to (e.g. /services/landscape-architecture)')],
            preview: { select: { title: 'title', media: 'image' } },
          })],
        }),
      ],
    }),
    defineField({
      name: 'testimonials', title: 'Testimonials (rotate every 7 seconds)', type: 'object', group: 'testimonials',
      fields: [
        defineField({
          name: 'quotes', title: 'Quotes — real client words only, no staff names', type: 'array',
          of: [defineArrayMember({
            type: 'object',
            fields: [t('text', 'Quote', 4), s('who', 'Who said it (e.g. Beth K.)'), s('linkLabel', 'Project link text (optional)'), s('linkHref', 'Project link (optional, e.g. /portfolio/azure-grand)')],
            preview: { select: { title: 'who', subtitle: 'text' } },
          })],
        }),
      ],
    }),
    defineField({
      name: 'journal', title: 'Blog section (the three newest posts show automatically)', type: 'object', group: 'journal',
      fields: [s('kicker', 'Small blue line'), s('heading', 'Heading'), s('linkLabel', 'Link text (goes to /blog)')],
    }),
    defineField({
      name: 'givingBack', title: 'Giving Back', type: 'object', group: 'givingBack',
      fields: [
        s('kicker', 'Small blue line'), s('heading', 'Heading'), t('quote', 'Quote', 2), t('body', 'Paragraph', 4),
        defineField({
          name: 'partners', title: 'Partner logos (each links to their site)', type: 'array',
          of: [defineArrayMember({
            type: 'object',
            fields: [s('name', 'Organization'), s('href', 'Their website'), defineField({ name: 'logo', title: 'Logo', type: 'image' })],
            preview: { select: { title: 'name', media: 'logo' } },
          })],
        }),
        img('image', 'Photo'), s('statNumber', 'Big number (e.g. 100%)'), t('statLabel', 'Line under the number', 2),
      ],
    }),
    defineField({
      name: 'closing', title: 'Closing banner', type: 'object', group: 'closing',
      fields: [s('kicker', 'Small line'), s('heading', 'Heading'), img('image', 'Photo'), link('cta', 'Button')],
    }),
    defineField({
      name: 'joinList', title: 'Newsletter sign-up', type: 'object', group: 'closing',
      fields: [s('kicker', 'Small blue line'), s('heading', 'Heading'), t('body', 'Paragraph'), img('image', 'Photo')],
    }),
  ],
  preview: { prepare: () => ({ title: 'Homepage' }) },
})
