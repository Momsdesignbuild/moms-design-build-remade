import { client } from '@/sanity/lib/client'
import AnatomyClient, { type AnatomyStep } from './AnatomyClient'
import { withDefaults, type HomeContent } from '@/sanity/lib/homeContent'

// The Moms Way, told through a real project (Serene Shores carries the full
// captioned 2d plan → 3d rendering → under construction → ta-da! sequence).
const COPY: Record<string, { label: string; title: string; blurb: string }> = {
  '2d plan': {
    label: 'Step 01',
    title: 'The Plan',
    blurb:
      'Every legacy starts on paper. Site studies, grading, sightlines — a 2D master plan that solves the property before a single stone moves.',
  },
  '3d rendering': {
    label: 'Step 02',
    title: 'The Rendering',
    blurb:
      'You walk your new backyard before it exists. Photoreal 3D lets you feel the spaces, veto ideas, and fall in love — while changes are still free.',
  },
  'under construction': {
    label: 'Step 03',
    title: 'The Build',
    blurb:
      'Our own crews, one accountable team. Design and build under one roof means the vision survives contact with the dirt.',
  },
  'ta-da!': {
    label: 'Step 04',
    title: 'Ta-da!',
    blurb:
      'The reveal. A finished space that matches the rendering you approved — down to the bluestone joints and the evening light.',
  },
}
const ORDER = ['2d plan', '3d rendering', 'under construction', 'ta-da!']

export default async function Anatomy({ content }: { content?: HomeContent['anatomy'] }) {
  const c = withDefaults({ kicker: 'The Moms Way', heading: 'Anatomy of a Project', linkLabel: 'See the Full Process' }, content)
  const gallery = await client.fetch<Array<{ caption?: string; url: string; alt?: string }>>(
    `*[_type == "portfolioProject" && slug.current == "serene-shores"][0]
      .gallery[]{ caption, "url": asset->url, alt }`
  )
  // step copy: Sanity (by position) over the baked-in COPY; photos stay keyed to the gallery captions
  const steps: AnatomyStep[] = ORDER.flatMap((key, n) => {
    const g = (gallery ?? []).find((x) => x.caption?.toLowerCase().trim() === key)
    const copy = withDefaults(COPY[key], content?.steps?.[n])
    return g ? [{ ...copy, image: g.url, alt: g.alt || copy.title }] : []
  })
  if (steps.length < 4) return null
  return <AnatomyClient steps={steps} kicker={c.kicker} heading={c.heading} linkLabel={c.linkLabel} />
}
