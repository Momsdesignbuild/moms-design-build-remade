import { defineField, defineType } from 'sanity'
import { REFERENCE_FIELDS, SKILLS, TEXT_FIELDS, YES_NO } from '../../components/careers/applicationFields'

const yesNo = { list: ['Yes', 'No'], layout: 'radio' as const, direction: 'horizontal' as const }

export default defineType({
  name: 'jobApplication',
  title: 'Job Application',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string' }),
    defineField({ name: 'submittedAt', title: 'Submitted At', type: 'datetime' }),
    defineField({ name: 'resume', title: 'Resume', type: 'file' }),
    ...TEXT_FIELDS.map(([name, title, max]) =>
      defineField({ name, title, type: max > 200 ? 'text' : 'string' }),
    ),
    ...YES_NO.map(([name, title]) => defineField({ name, title, type: 'string', options: yesNo })),
    defineField({
      name: 'references',
      title: 'References',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: REFERENCE_FIELDS.map(([name, title]) => defineField({ name, title, type: 'string' })),
          preview: { select: { title: 'firstName', subtitle: 'company' } },
        },
      ],
    }),
    ...SKILLS.map(([name, title]) => defineField({ name, title, type: 'array', of: [{ type: 'string' }] })),
    // applications sent through the short form (before 2026-10-05)
    defineField({ name: 'message', title: 'Message / Experience (old form)', type: 'text' }),
    defineField({ name: 'resumeUrl', title: 'Resume link (old form)', type: 'string' }),
  ],
  preview: { select: { title: 'name', subtitle: 'position' } },
})
