import type { ProjectNotes } from './project-notes'

// Batch 4 — projects without award decks; grounded ONLY in their published
// WP copy (wpStory), captions, and badges. Six thin-source slugs omitted
// rather than padded: outdoor-escape, rain-garden, the-majestic-mississippi,
// sunset-swim, splendor-on-summit, private-poolside-retreat.

export const BATCH_4: Record<string, ProjectNotes> = {
  'over-the-top': {
    story: [
      {
        kicker: 'The Ask',
        text: 'A Lake Minnetonka family wanted their outdoors back — not a room that replaced it, but a space every bit as outdoors as it ever was, only comfortable enough to live in.',
      },
      {
        kicker: 'After',
        text: 'Now they eat almost every meal out there — breakfast, lunch, and dinner. They read out there. They sit out late with the screens down and the 360-degree sounds of the night. In their own words: “We live out there.”',
      },
    ],
    brief: [
      'An outdoor space comfortable enough for all-day living',
      'Screens for late nights without losing the night sounds',
      'Room where family and friends actually want to hang out',
    ],
    moves: [
      {
        title: 'Screens down, night on',
        detail: 'Drop-down screens keep the space open to the sounds of a Lake Minnetonka night while making late evenings comfortable — outdoors preserved, discomfort removed.',
      },
      {
        title: 'Three meals a day',
        detail: 'The space was built for living, not visiting — the homeowners now take nearly every meal outside, from breakfast through late dinner.',
      },
    ],
    source: 'WP published copy',
  },

  'pool-on-parade': {
    story: [
      {
        kicker: 'The Idea',
        text: 'Distinctive, purpose-driven spaces that foster comfort — whether for everyday family use or larger gatherings — across a Corcoran backyard built to be used in every season.',
      },
      {
        kicker: 'After',
        text: 'Year-round enjoyment with a sense of comfort and protection in each space — a backyard notable enough to earn a feature in the Star Tribune.',
      },
    ],
    brief: [
      'Distinct spaces with a clear purpose for each',
      'Comfort for everyday family use and larger gatherings alike',
      'A backyard usable year-round',
    ],
    moves: [
      {
        title: 'Purpose-driven zones',
        detail: 'Each area of the yard was designed around a specific use, so daily family life and big gatherings each have a place that fits.',
      },
      {
        title: 'Comfort in every season',
        detail: 'The design provides a sense of comfort and protection throughout each space, keeping the backyard in service well beyond a Minnesota summer.',
      },
    ],
    source: 'WP published copy',
  },

  'private-resort': {
    story: [
      {
        kicker: 'The Idea',
        text: 'Blend luxury indoor comfort with elevated outdoor living: a resort-style pool, a covered pavilion, a custom outdoor kitchen, and a fireplace lounge composed into one seamless Stillwater retreat.',
      },
      {
        kicker: 'After',
        text: 'Thoughtful lighting, layered landscaping, and architectural detail keep the home inviting through the seasons. The homeowners put it best: “Sometimes you don’t truly know what you want until someone shows it to you.”',
      },
    ],
    brief: [
      'A private backyard retreat with resort-level amenities',
      'Seamless spaces for entertaining and relaxation',
      'A home that feels inviting and functional in every season',
    ],
    moves: [
      {
        title: 'The resort composition',
        detail: 'Pool, covered pavilion, outdoor kitchen, and fireplace lounge arranged as one continuous space — entertaining flows without seams.',
      },
      {
        title: 'Light and layers',
        detail: 'Thoughtful lighting and layered landscaping carry the space through the seasons, keeping it functional long after summer.',
      },
    ],
    source: 'WP published copy',
  },

  'rustic-chateau': {
    story: [
      {
        kicker: 'The Feel',
        text: '“You really feel like you’re part of the outdoors,” says the homeowner. The design blurs the line between house and landscape in Deephaven.',
      },
      {
        kicker: 'At Night',
        text: 'Her favorite time is evening, when layers of lighting cast a soft glow — “It is magical to be out there.” The award-winning project went on to be featured in the Star Tribune and Martha Stewart’s blog.',
      },
    ],
    brief: [
      'An outdoor space that feels like part of the outdoors',
      'Evenings worth staying out for',
    ],
    moves: [
      {
        title: 'Layered lighting',
        detail: 'Lighting is built in layers, so evening falls softly across the space instead of switching on — the homeowner calls the effect magical.',
      },
      {
        title: 'Part of the outdoors',
        detail: 'The design keeps the landscape primary: the built elements join the outdoors rather than replacing it.',
      },
    ],
    source: 'WP published copy',
  },

  'rustic-farmhouse': {
    story: [
      {
        kicker: 'The Idea',
        text: 'A kitchen that balances warm, rustic wood tones against clean, modern finishes — inviting without being heavy, polished without going cold.',
      },
      {
        kicker: 'After',
        text: 'Custom cabinetry, a statement wood backsplash, and a large central island give the room its visual interest and its everyday utility — a space equally right for cooking, gathering, and daily life.',
      },
    ],
    brief: [
      'A warm, rustic-inspired kitchen with modern polish',
      'Real everyday functionality, not just looks',
      'Durable materials made for gathering and daily living',
    ],
    moves: [
      {
        title: 'The statement backsplash',
        detail: 'A wood backsplash detail anchors the room, carrying the rustic warmth into the work zone.',
      },
      {
        title: 'The big island',
        detail: 'A large central island does double duty as visual centerpiece and the kitchen’s everyday workhorse.',
      },
      {
        title: 'Warm meets clean',
        detail: 'Rich wood tones are balanced with clean-lined modern finishes, keeping the farmhouse feel fresh.',
      },
    ],
    materials: ['Custom cabinetry', 'Statement wood backsplash', 'Large central island'],
    source: 'WP published copy',
  },

  'serene-shores': {
    story: [
      {
        kicker: 'Before',
        text: 'A brand-new home on Prior Lake, a blank lakeside lot — and a rulebook: lakeshore setbacks squeezing the buildable area and strict impervious-surface limits capping what could be installed at all.',
      },
      {
        kicker: 'The Idea',
        text: 'Work inside the rules instead of against them. Steppers and three-foot pathways threaded with planting beds connect the spaces without counting against lot coverage — keeping the yard open and the lake views intact.',
      },
      {
        kicker: 'After',
        text: 'A firepit area, hot tub, cooking space, lounge beds, and dining area — connected, versatile, and dressed in materials that blend with the house. A sideyard retaining wall and stone stairway make the way down easy, with a touch of casual luxury.',
      },
    ],
    brief: [
      'An open yard that keeps the lake views',
      'Connected, versatile entertaining spaces',
      'Materials and colors that blend with the new house',
      'Firepit, hot tub, cooking area, lounge beds, and dining',
    ],
    moves: [
      {
        title: 'Coverage without hardcover',
        detail: 'Steppers and 3-foot pathways with planting beds create connection space that never counts against the impervious-surface cap.',
      },
      {
        title: 'The stone stairway',
        detail: 'A sideyard retaining wall and stone stairway solve the grade to the backyard — functional passage, finished like a feature.',
      },
      {
        title: 'Open to the lake',
        detail: 'The plan holds the middle of the yard open, so every entertaining space keeps its sightline to the water.',
      },
    ],
    challenge: {
      title: 'The hard part',
      detail: 'Lakeshore setbacks limited development toward the water and pinched the sideyards, while impervious-surface restrictions capped installation options — the whole program had to fit inside both.',
    },
    source: 'WP published copy',
  },

  'simple-splash': {
    story: [
      {
        kicker: 'Before',
        text: 'When this couple bought their Deephaven home, the narrow sloping yard didn’t bother them. Then the family grew — the kids needed a safe place to play, and the parents imagined a poolscape for relaxing and entertaining.',
      },
      {
        kicker: 'The Idea',
        text: 'Terrace the slope instead of fighting it. The site’s challenges became levels — and a kid-friendly limestone jumping ledge that moonlights as a wet bar until the planned pool house and outdoor kitchen arrive.',
      },
      {
        kicker: 'After',
        text: 'A spectacular terraced retreat that serves the whole family. In the homeowners’ words: “We love the design and feel blessed to have this wonderful space to make memories for many years ahead.”',
      },
    ],
    brief: [
      'A safe place for the kids to play',
      'A poolscape for relaxing and entertaining friends',
      'A plan that works with a narrow, sloping yard',
    ],
    moves: [
      {
        title: 'The terraced retreat',
        detail: 'The narrow slope was cut into terraces, turning the yard’s biggest problem into its structure.',
      },
      {
        title: 'The jumping ledge',
        detail: 'A kid-friendly limestone jumping ledge doubles as the wet bar — one stone gesture serving both generations.',
      },
      {
        title: 'Built for what’s next',
        detail: 'The design already accounts for the planned pool house and outdoor kitchen — phase two has a place waiting.',
      },
    ],
    materials: ['Limestone jumping ledge'],
    source: 'WP published copy',
  },

  'sticks-and-stones': {
    story: [
      {
        kicker: 'The Idea',
        text: 'Architectural structure meeting natural elements: a custom wood pergola anchoring a courtyard of layered stonework, integrated water features, and lush planting beds.',
      },
      {
        kicker: 'After',
        text: 'The space moves with the calendar — vibrant summer gatherings, cozy fall evenings around the fire — with soft lighting and planned zones for lounging, dining, and entertaining extending the home outdoors.',
      },
    ],
    brief: [
      'A timeless courtyard for entertaining',
      'Multi-season use, summer through fall',
      'Defined zones for lounging, dining, and gathering',
    ],
    moves: [
      {
        title: 'The pergola anchor',
        detail: 'A custom wood pergola centers the courtyard, filtering light and throwing seasonal shade.',
      },
      {
        title: 'Texture in layers',
        detail: 'Layered stonework, water features, and planting beds keep the space moving — texture and sound doing the decorating.',
      },
      {
        title: 'Zones that flow',
        detail: 'Lounging, dining, and entertaining each get a planned zone, connected so the courtyard reads as one room.',
      },
    ],
    materials: ['Custom wood pergola', 'Layered natural stonework', 'Integrated water features'],
    source: 'WP published copy',
  },

  'terraced-paradise': {
    story: [
      {
        kicker: 'Before',
        text: 'A steeply sloped backyard in a golf club community, one existing upper patio — and, memorably, an excessive number of snakes in residence.',
      },
      {
        kicker: 'The Idea',
        text: 'Tier the slope into levels that start at the basement door and work down: pool, sport and gaming area, a gas firepit with a view, lounging in sun and shade, and a dedicated edible garden. Rock mulch and minimized grass answered the snake problem by design.',
      },
      {
        kicker: 'After',
        text: 'A stunning multi-tiered space the whole family uses year-round — all-inclusive, low-maintenance, and fun, exactly as they envisioned it.',
      },
    ],
    brief: [
      'Transform a steep slope into a private family oasis',
      'A pool, sport area, and firepit with a view',
      'Spaces for all ages — all-inclusive and fun',
      'Low-maintenance landscape with an edible garden',
      'Fewer places for snakes to hide',
    ],
    moves: [
      {
        title: 'The tiers',
        detail: 'Multiple levels step down from the basement door, each with a purpose — pool, play, fire, lounge — turning the grade into the plan.',
      },
      {
        title: 'Designing out the snakes',
        detail: 'Rock mulch areas and minimized lawn removed the hiding places — a pest problem solved with hardscape, not chemicals.',
      },
      {
        title: 'The edible garden',
        detail: 'A dedicated growing space made the low-maintenance landscape productive, not just pretty.',
      },
    ],
    source: 'WP published copy',
  },

  'tudor-revival': {
    story: [
      {
        kicker: 'Before',
        text: 'A Minneapolis side yard with horrible soil, an unfortunate electrical service location, and awkward elevations between driveway and doors — next to a freshly remodeled kitchen that deserved better.',
      },
      {
        kicker: 'The Idea',
        text: 'Smart material selections, innovative construction techniques, and a stepped design: landings and stairs that flow organically from the patio doors down to the lawn, reading as intentional architecture rather than an afterthought.',
      },
      {
        kicker: 'After',
        text: 'A traditional outdoor living environment with a modern touch — colors and shapes so well integrated it looks like an extension of the house itself, with plantings placed for privacy and balance.',
      },
    ],
    brief: [
      'A low-maintenance side-yard dining and entertaining space',
      'Flow directly from the newly remodeled kitchen',
      'Intentional — not an afterthought',
    ],
    moves: [
      {
        title: 'The stepped descent',
        detail: 'Landings and stairs flow organically from the patio doors to the lawn, solving the elevation problem as the design’s signature.',
      },
      {
        title: 'An extension of the house',
        detail: 'Colors, angles, and shapes are integrated with the architecture so completely the yard reads as part of the building.',
      },
      {
        title: 'Privacy, planted',
        detail: 'Strategic plantings screen the space and balance the geometry.',
      },
    ],
    challenge: {
      title: 'The hard part',
      detail: 'Horrible soil conditions, a badly placed electrical service, and the elevations of the driveway and doors — answered with material choices and construction technique rather than compromise.',
    },
    source: 'WP published copy',
  },

  'unlocking-luxury': {
    story: [
      {
        kicker: 'The Idea',
        text: 'Give an apartment community an outdoor space with hospitality-inspired amenities — structured landscaping, layered hardscapes, and gathering areas that welcome residents like guests.',
      },
      {
        kicker: 'After',
        text: 'Fire features, lounge spaces, and architectural lighting carry the space through the seasons — comfort, functionality, and an identity boost for the whole property.',
      },
    ],
    brief: [
      'A residents’ outdoor space with hospitality polish',
      'Gathering areas that build community',
      'Year-round comfort and visual appeal',
    ],
    moves: [
      {
        title: 'Hospitality thinking',
        detail: 'The amenity deck borrows from hotels: structured landscaping and layered hardscape composing distinct, welcoming gathering areas.',
      },
      {
        title: 'Seasons covered',
        detail: 'Fire features, lounge zones, and architectural lighting keep the space beautiful and usable as the calendar turns.',
      },
    ],
    source: 'WP published copy',
  },

  'urban-retreat': {
    story: [
      {
        kicker: 'The Idea',
        text: 'A Minneapolis courtyard where timeless architectural detail meets relaxed outdoor living — pergola, stone, and layered planting defining rooms without walls.',
      },
      {
        kicker: 'After',
        text: 'Warm textures and soft lighting carry the courtyard from summer entertaining to cozy fall evenings — defined spaces for dining, entertaining, and gathering in one cohesive flow.',
      },
    ],
    brief: [
      'An urban courtyard with timeless character',
      'Defined spaces for dining, entertaining, and gathering',
      'Beauty that holds from summer into fall',
    ],
    moves: [
      {
        title: 'Rooms without walls',
        detail: 'A custom pergola, natural stonework, and layered landscaping define distinct spaces while keeping one cohesive flow.',
      },
      {
        title: 'Warmth by design',
        detail: 'Warm textures, soft lighting, and careful material selections make the courtyard as right for a fall evening as a summer party.',
      },
    ],
    materials: ['Custom pergola', 'Natural stonework'],
    source: 'WP published copy',
  },

  'whimsical-paradise': {
    story: [
      {
        kicker: 'Before',
        text: 'Dying 30-year-old blue spruces were taking the privacy of an extraordinary Eden Prairie front-yard water feature with them. A new tree line meant years of waiting; the city wouldn’t allow a tall fence.',
      },
      {
        kicker: 'The Idea',
        text: 'Privacy as art, delivered in real time: free-standing timber-framed panels of laser-cut, powder-coated steel, plus a clever sliding entry gate that looks handsome open or closed. Shrinking the pond made room for a sitting area with a fireplace and nostalgic paving.',
      },
      {
        kicker: 'After',
        text: 'The homeowners, the neighbors, and the city all agree — every stakeholder’s goals were beautifully achieved, and the unique-shaped yard finally became usable and cozy.',
      },
    ],
    brief: [
      'Replace the privacy the dying spruces once gave — without waiting years',
      'Work within the city’s fence rules',
      'Make the unusually shaped yard usable and cozy',
    ],
    moves: [
      {
        title: 'Privacy as art',
        detail: 'Free-standing, timber-framed art panels — laser-cut and powder-coated — screen the yard instantly, no tall fence required and no decade of tree growth.',
      },
      {
        title: 'The sliding gate',
        detail: 'A creative entry gate slides rather than swings, and looks intentional in both positions.',
      },
      {
        title: 'A smaller pond, a bigger life',
        detail: 'Shrinking the water feature made room for a charming sitting area with a fireplace and nostalgic paving.',
      },
    ],
    materials: ['Timber-framed laser-cut steel art panels', 'Powder-coated metalwork', 'Nostalgic paving'],
    source: 'WP published copy',
  },
}
