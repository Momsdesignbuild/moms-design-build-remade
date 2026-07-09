'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { presentationTool } from 'sanity/presentation'
import { visionTool } from '@sanity/vision'
import { media } from 'sanity-plugin-media'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import { schemaTypes } from './sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  projectId: 'wavk40jo',
  dataset: 'production',
  title: "Mom's Design Build",
  schema: {
    types: schemaTypes,
  },
  plugins: [
    structureTool({
      // Marketer-friendly sidebar: drag-to-reorder portfolio first, then the
      // content types people actually edit. Empty/dev types live below the
      // divider rather than cluttering the top.
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            orderableDocumentListDeskItem({
              type: 'portfolioProject',
              title: 'Portfolio (drag to reorder)',
              S,
              context,
            }),
            S.documentTypeListItem('servicePage').title('Service & Info Pages'),
            S.documentTypeListItem('post').title('Blog Posts'),
            S.documentTypeListItem('careerPage').title('Career Pages'),
            S.documentTypeListItem('teamMember').title('Team Members'),
            S.documentTypeListItem('page').title('Site Pages'),
            S.divider(),
            S.documentTypeListItem('siteSettings').title('Site Settings'),
            S.documentTypeListItem('jobApplication').title('Job Applications'),
            S.documentTypeListItem('subscriber').title('Subscribers'),
          ]),
    }),
    // Presentation: the live site in a pane next to the fields — edits render
    // as you type, click content on the page to jump to its field.
    presentationTool({
      previewUrl: {
        previewMode: { enable: '/api/draft-mode/enable' },
      },
    }),
    media(),
    visionTool({ defaultApiVersion: '2024-01-01' }),
  ],
})
