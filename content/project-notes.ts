// Per-project editorial "Design Notes" — mined from MDB's own award
// submissions, material lists, and job records on OneDrive. ADDITIVE ONLY:
// the WP body text, H1, meta, and schema on each page stay byte-frozen.
// RULES: no client surnames, no addresses, no pricing, no designer names.

export type ProjectNotes = {
  story?: Array<{ kicker: string; text: string }> // the before→after narrative, grounded in the designer's own written overview
  brief: string[] // what the clients asked for (anonymized, from the award brief)
  moves: Array<{ title: string; detail: string }> // the design/build moves that answered it
  challenge?: { title: string; detail: string } // the hard part, told straight
  materials?: string[] // real products/materials — Front Load keywords
  award?: { name: string; category: string }
  source: string // internal provenance, never rendered
}

import { BATCH_1 } from './notes-batch-1'
import { BATCH_2 } from './notes-batch-2'
import { BATCH_3 } from './notes-batch-3'
import { BATCH_4 } from './notes-batch-4'

const CORE: Record<string, ProjectNotes> = {
  'countryside-collective': {
    story: [
      {
        kicker: 'Before',
        text: 'It began as an empty backyard — a stamped-concrete pad, a wide lawn, and a big extended family with nowhere to gather. They asked for a pool that could hold everyone, shelter from the sun and the mosquitoes, a hot tub they could actually reach in January, and one more thing: make it playful.',
      },
      {
        kicker: 'The Idea',
        text: 'Instead of fighting the slope, the design sank the pool house into it — so it reads like a swim-up bar, one natural step down from the water. And it sits exactly centered on the main house, so the whole scene greets you the moment you walk in the front door.',
      },
      {
        kicker: 'After',
        text: 'Now the porcelain deck stays cool underfoot while turf squares quietly swallow the rainwater. Screens drop at dusk against the mosquitoes, fountains soften the evening for the neighbors, and when the first snow lands on the standing-seam roof, the hot tub is three warm steps away. A backyard oasis for gathering, unwinding, and enjoying the countryside.',
      },
    ],
    brief: [
      'A pool built for entertaining a large extended family',
      'Seamless indoor–outdoor flow',
      'Shelter from sun and mosquitoes without losing the view',
      'A hot tub steps from the main house — usable in a Minnesota winter',
      'Easy-care materials, casual-modern style, playful spirit',
    ],
    moves: [
      {
        title: 'The swim-up pool house',
        detail:
          'The pool house is sunken into the existing grade so it reads like a swim-up bar — and it sits centered on the main house, so the view greets you the moment you walk in the front door.',
      },
      {
        title: 'Drainage you will never see',
        detail:
          'The turf squares between the pavers are not decoration — drainage tile hides beneath the synthetic turf, moving water invisibly so the deck needed no strip drains at all.',
      },
      {
        title: 'A deck that stays cool',
        detail:
          'Large-format European porcelain tile keeps the pool deck cool underfoot and reads sleek and modern — each oversized tile precision-graded so nothing wobbles.',
      },
      {
        title: 'Built for every season',
        detail:
          'Automated screens drop for mosquito and weather protection, the sunken hot tub stays reachable in January, and fire and water features carry the space deep into fall. The fountains even soften voices for the neighbors at night.',
      },
    ],
    challenge: {
      title: 'The hard part',
      detail:
        'The vinyl pool had to sit close enough to the pool house foundation to earn the swim-up feel, far enough to protect the structure — with roof snow-shed mapped so it could never land on the pool cover. Precision grading held every oversized tile to an eighth-inch-per-foot slope.',
    },
    materials: [
      'Large-format European porcelain tile decking',
      'Synthetic turf over concealed drainage tile',
      'Automated screen system',
      'Natural stone pillars · standing-seam metal roof',
      'Aspens, boxwood, evergreens & allium for four-season structure',
    ],
    award: {
      name: 'NARI Minnesota 2025 Remodeler of the Year — Regional Winner',
      category: 'Residential Landscape Design / Outdoor Living',
    },
    source: 'Awards/2025/NARI — Countryside Collective submission (job 52137)',
  },

  'heart-of-home': {
    story: [
      { kicker: 'Before', text: 'A 1992 lakeside home with views across the pond — and a layout that refused to enjoy them. Small windows, a cooktop marooned on the island, popcorn ceilings, and odd closets scattered where rooms wanted to breathe.' },
      { kicker: 'The Idea', text: 'Open the back of the house to the water with bigger windows and doors, unify the main floor on white oak, and turn the most awkward closet in the house into the best moment in it — a walk-through bar connecting the living room to the formal dining room.' },
      { kicker: 'After', text: 'Sunlight lands on marble and soapstone now. Arched doorways echo into arched built-ins beside the fireplace, a plaster hood crowns the range, and the pantry hides inside one sleek cabinet. Warm, timeless, and finally worthy of the view.' },
    ],
    brief: [
      'Take advantage of the views across the pond',
      'A luxury kitchen — function and finishes both',
      'Brighten the whole back of the house',
      'Unify the flooring and fix the lighting',
      'Popcorn ceilings: gone',
    ],
    moves: [
      { title: 'The walk-through bar', detail: 'An awkward oversized closet became a chic walk-through bar in clear alder tongue-and-groove — now the connective tissue between living and formal dining.' },
      { title: 'Windows where walls were', detail: 'Larger windows and new doors across the back of the house flooded the kitchen and living room with the light the pond had been offering all along.' },
      { title: 'Arches, echoed', detail: 'Every entrance gained an arch, and the arches repeat in custom built-ins flanking the fireplace — one geometry carried through the whole floor.' },
      { title: 'Craft in the details', detail: 'The first row of zellige backsplash set vertically for a custom read, a 14-inch soapstone backsplash rising to the window, and a hand-plastered range hood.' },
    ],
    challenge: { title: 'The hard part', detail: 'Reworking the spine of a 30-year-old floor plan — removing the railing between kitchen and living room, opening the dining-room wall, and squaring the island — without losing the warmth that made it a lake home in the first place.' },
    materials: ['White oak flooring throughout', 'Marble & soapstone surfaces', 'Zellige tile backsplash', 'Clear alder tongue-and-groove', 'Plaster-finished range hood'],
    source: 'Awards/2025/NARI — Heart of Home submission (job 27150)',
  },

  'cedar-and-stone': {
    story: [
      { kicker: 'Before', text: 'A newly purchased property, three boys, and a plan: a pool, a pool house, and a summer where nobody asks for a screen. One problem — bluff setbacks made the obvious backyard build impossible.' },
      { kicker: 'The Idea', text: 'Move the pool house to the side of the home and sink the whole scene 30 inches below the driveway — instant privacy, with a full-height stone wall shielding the pool from the road. A dramatic arched entry leads to a vaulted hall under a multi-tier chandelier, changing room on one side, bath on the other.' },
      { kicker: 'After', text: 'Hand-crafted cedar arches echo the home\u2019s mountain-lodge bones, Kasota limestone tops the outdoor kitchen, and the shaded lounge holds the whole family plus the neighbors. Underused side yard, now the center of summer.' },
    ],
    brief: [
      'A custom pool with a real pool house — bathroom included',
      'A screen-free summer retreat for three boys',
      'Serious entertaining space after years of a small backyard',
      'A compact outdoor kitchen and a shaded lounge',
      'A refreshed exterior palette for the whole home',
    ],
    moves: [
      { title: 'The sunken oasis', detail: 'Pool and pool house sit 30 inches below driveway level — a cohesive, private world, with the redesigned driveway and roundabout solving the setback math.' },
      { title: 'Arches, handcrafted', detail: 'The cedar arches were templated and built on-site, materials hand-picked to minimize seams — old-world charm earned the slow way.' },
      { title: 'Stone that matches the house', detail: 'A full-height fieldstone privacy wall mirrors the home\u2019s veneer, and even the vent covers and outlet backplates were custom-cut from Kasota stone.' },
      { title: 'Everything in its place', detail: 'Symmetrical along its axis: pool centered on the pool house, kitchen and lounge flanking it, an outdoor shower on the exterior wall so nobody drips through the changing room.' },
    ],
    challenge: { title: 'The hard part', detail: 'The bluff setbacks that killed the backyard plan became the design: relocating the build beside the home meant re-engineering the driveway, sinking the site, and holding the whole composition symmetrical anyway.' },
    materials: ['Hand-built cedar arches', 'Kasota limestone counters & custom vent covers', 'Fieldstone veneer privacy wall', 'Board-and-batten interiors', 'Milk-glass lighting & basin sink'],
    source: 'Awards/2025/NARI — Cedar & Stone submission (job 30714)',
  },

  'neighborhood-commons': {
    story: [
      { kicker: 'Before', text: 'A corner lot with a high water table, a wetland setback eating thirty feet of the yard, and a family who wanted one thing: the backyard where everyone ends up.' },
      { kicker: 'The Idea', text: 'Aim everything at the living room. The bubbling-rock water feature sits on a straight axis from the sofa, the turf stepper path lines up behind it, and white pines wrap the corner for seclusion. Then load the edges: pizza oven, hot tub, fire table, and a wood-burning firepit under the pergola.' },
      { kicker: 'After', text: 'Porcelain pavers keep it modern and easy, hidden drainage under the patio handles the water table, and the space swings from lively get-togethers to quiet family nights without changing clothes.' },
    ],
    brief: [
      'A dedicated entertainment area built for gatherings',
      'An outdoor kitchen and grilling station — pizza included',
      'A custom fire feature as the evening focal point',
      'A casual lounge that works as the guys\u2019 hangout',
    ],
    moves: [
      { title: 'The living-room axis', detail: 'Water feature and turf steppers align on a straight sightline from the main living room — the backyard composes itself from the couch.' },
      { title: 'A floating bar', detail: 'A custom metal frame suspends the bar countertop, keeping the outdoor kitchen open and sleek where it meets the reworked deck steps.' },
      { title: 'Privacy, planted', detail: 'White pines wrap the corner lot into seclusion, and the planting palette was picked for full sun and a high water table — beauty that survives its site.' },
      { title: 'Water you never see', detail: 'An underground drainage system beneath the patio quietly moves surface water to the low point of the property.' },
    ],
    challenge: { title: 'The hard part', detail: 'A 30-foot wetland setback where only patios could encroach — and only by 4.5 feet — plus a 30% hardcover cap. Every major feature (pergola, hot tub, kitchen) had to land outside the zone, and the design still had to feel inevitable.' },
    materials: ['Porcelain pavers', 'Wood-burning firepit & pergola', 'Custom pizza oven', 'Bubbling-rock water feature', 'White pine screening'],
    source: 'Awards/2025/NARI — Neighborhood Commons submission (job 60418)',
  },

  'cool-california': {
    story: [
      { kicker: 'Before', text: 'The underside of a deck: dead space, damp shade, and a big family that loves to host with nowhere protected to do it.' },
      { kicker: 'The Idea', text: 'Turn under-deck into outdoor rooms. A kitchen with two L-shaped islands slides beneath the porch — with a pass-through window to the basement bar — while a dried-in ceiling extends to a louvered pergola centered on a see-through wood-burning fireplace you can watch from three rooms at once.' },
      { kicker: 'After', text: 'White stucco, stained wood, and cool stone read California-Scandinavian; infrared heaters and convertible screen-vinyl windows stretch the season to three-and-a-half; and the fire pit circle out front stays kid-country for s\u2019mores.' },
    ],
    brief: [
      'An outdoor kitchen protected from the elements — usable most of the year',
      'Reclaim the dead space under the existing deck',
      'Distinct zones for dining, lounging, and the kids',
      'Seamless access from the house',
    ],
    moves: [
      { title: 'The pass-through', detail: 'A basement bar window became a slider door and pass-through — drinks and plates move between inside and outside without a staircase involved.' },
      { title: 'One fireplace, three rooms', detail: 'The see-through wood-burning fireplace anchors the interior lounge, the outdoor dining, and the pergola lounge simultaneously — every seat gets flame.' },
      { title: 'Geometry doing the work', detail: 'Arches, circles, and axes line up: the lounge arch centers on the fireplace, the fire pit circle aligns with the walkway, interior arcs echo into the patio.' },
      { title: 'Three-and-a-half seasons', detail: 'Infrared heaters plus convertible screen/vinyl windows and a dried-in ceiling mean a Minnesota outdoor kitchen that laughs at October.' },
    ],
    challenge: { title: 'The hard part', detail: 'Building rooms under a structure that was never meant to hold them — precise island framing, concealed drainage overhead and below, detailed window trim, and a foundation shored up to carry the new life.' },
    materials: ['White stucco & painted Azek', 'Custom stone veneer (fireplace, fire pit, kitchen)', 'Louvered pergola', 'Infrared heaters & convertible screen-vinyl windows', 'Stained-wood ceilings'],
    source: 'Awards/2025/NARI — Cool California submission (job 61004)',
  },

  'starry-sips-scenes': {
    story: [
      { kicker: 'Before', text: 'A bare basement. Concrete, framing, potential — and a family that wanted a destination, not a storage floor.' },
      { kicker: 'The Idea', text: 'A speakeasy. Real clay brick — sourced genuine, cut thin — walls the entrance; an antique door sets the vintage tone; gold textured wallpaper wraps the booth. Past the bar, a theater color-drenched in space grey waits under a custom star-panel ceiling.' },
      { kicker: 'After', text: 'Movie nights happen under a starry sky now. The wet bar anchors the hosting, the infrared sauna sits steps from the bath, the workout room wears coral, the guest suite ocean blue — one basement, five moods, zero reasons to leave.' },
    ],
    brief: [
      'A high-end theater with surround sound and room for watch parties',
      'A stylish bar built for hosting',
      'A private exercise room',
      'A comfortable guest suite',
      'A sauna near the bath',
    ],
    moves: [
      { title: 'Brick with history, priced with sense', detail: 'Genuine clay brick cut thin for interior use — the character of real masonry on the entrance wall without the mass or the cost.' },
      { title: 'The starry ceiling', detail: 'A custom star-panel ceiling turns the theater into a night sky — the room\u2019s namesake moment.' },
      { title: 'The speakeasy door', detail: 'An antique door, hunted down to match the vision, opens the gold-wallpapered booth — an entrance that feels like a password.' },
      { title: 'Light as a dimmer switch for mood', detail: 'Ambient, entertainment, and bar lighting layers swing the same rooms from cozy to party without moving a chair.' },
    ],
    challenge: { title: 'The hard part', detail: 'Making five very different rooms — theater, speakeasy, gym, guest suite, sauna — read as one composed space: moody neutrals tied through texture and lighting, with bold color saved for where it delights.' },
    materials: ['Genuine thin-cut clay brick', 'Custom star-panel ceiling', 'Gold textured wallpaper', 'Infrared sauna', 'Surround-sound theater system'],
    source: 'Awards/2025/NARI — Starry Sips & Scenes submission (job 78401)',
  },

  'ember-spa': {
    story: [
      { kicker: 'Before', text: 'A DIY gone wrong. The homeowners started the bathroom themselves, hit the wall every DIYer knows, and made the call — small, outdated, congested, and now half-demolished.' },
      { kicker: 'The Idea', text: 'Move the shower entirely. That single decision made room for a washer and dryer behind a sliding door, a no-step aging-in-place shower with a bench and reachable shelving, and a round soaking tub under soft light.' },
      { kicker: 'After', text: 'A thrifted vanity matched to the home\u2019s honey-oak trim, an arched wall detail echoed in the mirrors, marble trim around wood-look porcelain — a bathroom that works for every year of life ahead of it.' },
    ],
    brief: [
      'Add a washer and dryer — discreetly',
      'A shower designed for aging in place',
      'Colors and design cohesive with the rest of the home',
      'Keep the existing windows',
    ],
    moves: [
      { title: 'The relocation', detail: 'Shifting the shower\u2019s location freed the floor plan: laundry tucked behind a sleek slider, a walk-in closet added on the path from the bedroom.' },
      { title: 'No step, no compromise', detail: 'The curbless shower has a built-in bench and accessible shelving — safety engineered in, spa looks kept.' },
      { title: 'The thrifted vanity', detail: 'A found vanity and countertop matched to the home\u2019s honey-oak window trim — then a custom cabinet built to pair with it perfectly.' },
      { title: 'Arches, again', detail: 'An arched wall niche carries a mirror and shelf; the vanity mirrors repeat the curve — small architecture doing quiet work.' },
    ],
    challenge: { title: 'The hard part', detail: 'A true curbless shower means lowering the floor joists themselves to create drainage slope — engineer involved, structure respected. Then the oversized porcelain bench demanded reinforced framing, specialty brackets, and custom waterproofing.' },
    materials: ['Wood-look porcelain shower tile', 'Large-format porcelain bench', 'Marble trim & countertops', 'Round soaking tub', 'Custom-matched cabinetry'],
    source: 'Awards/2025/NARI — Ember Spa submission (job 80916)',
  },
}

export const PROJECT_NOTES: Record<string, ProjectNotes> = {
  ...BATCH_1,
  ...BATCH_2,
  ...BATCH_3,
  ...BATCH_4,
  ...CORE,
}
