import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'subscriber',
  title: 'Newsletter Subscriber',
  type: 'document',
  fields: [
    defineField({ name: 'email', title: 'Email', type: 'string', validation: r => r.required() }),
    defineField({ name: 'subscribedAt', title: 'Subscribed At', type: 'datetime' }),
    defineField({ name: 'source', title: 'Source', type: 'string' }),
  ],
  preview: { select: { title: 'email', subtitle: 'subscribedAt' } },
})
