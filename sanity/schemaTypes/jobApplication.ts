import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'jobApplication',
  title: 'Job Application',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'position', title: 'Position', type: 'string' }),
    defineField({ name: 'message', title: 'Message / Experience', type: 'text' }),
    defineField({ name: 'resumeUrl', title: 'Resume link', type: 'string' }),
    defineField({ name: 'submittedAt', title: 'Submitted At', type: 'datetime' }),
  ],
  preview: { select: { title: 'name', subtitle: 'position' } },
})
