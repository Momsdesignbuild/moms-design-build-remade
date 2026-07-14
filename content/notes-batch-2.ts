// Design Notes — batch 2 (deck-backed). Sources: NARI award submissions
// 2019–2024 mined from OneDrive. Same rules as project-notes.ts: no client
// surnames, no addresses, no job numbers, no pricing, no designer names.
import type { ProjectNotes } from './project-notes'

export const BATCH_2: Record<string, ProjectNotes> = {
  'lakeside-living': {
    story: [
      { kicker: 'Before', text: 'A new kitchen bump-out with a lake below it — and no way to sit outside without surrendering to the bugs, the rain, or the long sloping lawn that held the water at arm’s length.' },
      { kicker: 'The Idea', text: 'Replace the wood deck with an elevated bluestone patio raised to the interior level — a move that visually shrinks the slope and makes the lake appear closer from inside the house. Overhead, an operable louvered pergola with motorized screen walls decides, hour by hour, whether this is an open terrace or a sheltered room.' },
      { kicker: 'After', text: 'With the wall of Loewen glass doors folded open and the screens down, the house has never been so open. Three overhead heaters and a gas fire table carry damp evenings, the louvers shut themselves in rain, and the downspouts vanish inside the pergola’s architectural columns. The clients call it a lovely place for open-air naps.' },
    ],
    brief: [
      'Connect the new kitchen bump-out to the outdoors',
      'Shelter from bugs and rain — without losing the lake view',
      'Comfort on cool, damp days',
      'Direct access down to the lakefront yard',
    ],
    moves: [
      { title: 'The patio that moves the lake', detail: 'Elevating the patio to the interior floor level diminishes the long sloping lawn — from inside, the lake reads closer than it ever did from the old deck.' },
      { title: 'A roof with opinions', detail: 'Motorized pergola louvers with integral gutters close automatically in rain; oriented perpendicular to the house, they stream natural light indoors when open.' },
      { title: 'Walls that disappear', detail: 'Phantom screen walls descend from above for buggy evenings, then rise to merge the sheltered room with the open patio for big gatherings.' },
      { title: 'Columns doing secret work', detail: 'Downspouts from both the house and pergola roofs run hidden inside the architectural columns — runoff managed, sightlines clean.' },
    ],
    challenge: { title: 'The hard part', detail: 'Turning a sloping lakeside lawn into a broad entertainment terrace meant trading the wood deck for terraced stonework — a radiused Fond du Lac retaining wall flanking solid bluestone steps that walk the property down to the water.' },
    materials: ['StruXure louvered pergola', 'Phantom motorized screen walls', 'Bluestone patio & solid bluestone steps', 'Fond du Lac stone retaining wall', 'Loewen folding glass doors', 'Gas fire table & overhead electric heaters'],
    source: 'Awards/2019 COTY — Lakeside Living submission (Riemenschneider deck)',
  },

  'magnolia-vista': {
    story: [
      { kicker: 'Before', text: 'A single-level home in a new development with barely a tree in sight — and a primary bedroom that looked straight into the neighbors’ windows. The owners described it as living in a fishbowl.' },
      { kicker: 'The Idea', text: 'Two connected outdoor rooms: an entertaining space under a pergola that still lets light pour through the kitchen windows, and a private garden off the bedroom — closed to the neighborhood by a look-through stone portal wall that frames a magnolia tree beyond.' },
      { kicker: 'After', text: 'The pergola reads like it was built with the house — beams in powder-coated aluminum, trim in Azek, the wall’s siding color-matched to the original. A Kafka wax-granite path wanders the garden, dimmable pergola lights switch from inside, and the yard still stays open for running and playing.' },
    ],
    brief: [
      'Transform builder-grade landscaping into something personal',
      'Privacy for the bedroom — no more fishbowl',
      'An outdoor dining space for hosting friends and family',
      'Keep the light flowing into the kitchen and family room',
      'Make it look original to the house',
    ],
    moves: [
      { title: 'The portal wall', detail: 'A look-through wall of full natural stone veneer frames the magnolia beyond it — a focal point that blocks sightlines while giving the eye somewhere better to go. Over-mortared stone gives it soul.' },
      { title: 'Light-first pergola', detail: 'The pergola shades the patio without darkening the house — proportioned so natural light still filters through the kitchen windows, with electrical routed for future infrared heaters.' },
      { title: 'Two rooms, one garden', detail: 'The entertaining space and the private bedroom garden are separate but connected — intimate and grand at once, in neutrals that play off the house.' },
    ],
    challenge: { title: 'The hard part', detail: 'The existing rooflines were tall and never meant to take a pergola, the framing of the portal circle had to be perfect, poor soil had to be replaced wholesale for the plantings — and the long-lead aluminum beams made the whole schedule a planning exercise.' },
    materials: ['Full natural stone veneer portal wall', 'Powder-coated aluminum pergola beams', 'Kafka wax-granite path', 'Azek maintenance-free trim', 'Dimmable LED pergola lighting'],
    source: 'Awards/2024 NARI — Magnolia Vista submission',
  },

  'mediterranean-meets-minnesota': {
    story: [
      { kicker: 'Before', text: 'Three stacked cedar decks on a 1960s split-level above Prior Lake — rotting, failing, and finally unsafe. On a lot that plunges toward the water, those decks were the family’s only outdoor rooms.' },
      { kicker: 'The Idea', text: 'Rebuild all three levels as a Mediterranean-meets-California composition with a nod to Nordic hygge: stucco, tropical hardwood, fir beams and columns at the pergolas, natural stone, and tile decking — with arches repeating through the lighting, columns, pergola brackets, and fireplace.' },
      { kicker: 'After', text: 'A work-from-home wife gets her weather-proof, bug-proof outdoor office and a brushed-concrete yoga patio with a checkerboard stone inlay before the fireplace. The lake view survives from every level, and a limestone retaining wall replaced the rotted timber one that used to greet the water.' },
    ],
    brief: [
      'Replace the rotting triple-decks with more usable space',
      'Protection from weather, bugs, and sun — good enough to work outside',
      'The ease of California living, in Mediterranean dress',
      'Preserve the lake view from every main room',
    ],
    moves: [
      { title: 'Three decks, one language', detail: 'Kitchen level, family-room level, den level — rebuilt as a single composition in white stucco, natural wood, and grey accents, arches echoing through every detail.' },
      { title: 'Water-tight underneath', detail: 'The two stacked decks are dry below — multiple bladder systems with extensive drainage make the underside rooms real rooms.' },
      { title: 'The yoga patio', detail: 'The lowest level is brushed concrete — the surface the homeowner asked for to practice yoga — with a two-stone checkerboard inlay set before the fireplace.' },
      { title: 'Swings, engineered', detail: 'Both pergolas were engineered from the start to hang swings — leisure planned into the structure, not bolted on after.' },
    ],
    challenge: { title: 'The hard part', detail: 'A winter build on a steep lakeshore: keeping two stacked decks watertight below, replacing the failed timber retaining wall in limestone, and holding the Mediterranean lightness through a Minnesota January.' },
    materials: ['Stucco & tropical hardwood', 'Fir pergola beams and columns', 'Tile decking', 'Brushed concrete with checkerboard stone inlay', 'Limestone retaining wall'],
    source: 'Awards/2022 NARI — Mediterranean Meets Minnesota submission',
  },

  'minnetonka-lakescape': {
    story: [
      { kicker: 'Before', text: 'A brand-new home on a Lake Minnetonka bluff, and a memory the owners couldn’t shake: their mountain vacation home beside a stream. They wanted this landscape to carry all five elements — water, fire, wood, air, earth.' },
      { kicker: 'The Idea', text: 'Give each element a stage. A commissioned bubbling orb greets the front entry; a wood-burning fire pit perches on the bluff edge above the lake; new trees and deep gardens breathe through the yard; and a Cor-ten steel statement wall — book-ended by nine-foot basalt columns — plants the earth at the door.' },
      { kicker: 'After', text: 'A heated clay-paver driveway rolls to a natural stone walkway, hidden strip drainage rings the stone pool deck, and a Klingstone permeable path hairpins down the bluff to the lake — ATV-friendly, garden-lined, modern mountain from top to shore.' },
    ],
    brief: [
      'A finished driveway and permeable paths throughout the yard',
      'Gardens and native plantings through the bluff zone',
      'A pool deck, flat lawn for family games, and retaining walls',
      'Easy front-stoop access for aging parents — minimal steps',
      'The feel of their mountain vacation home',
    ],
    moves: [
      { title: 'The Cor-ten wall', detail: 'An 8-foot fully-footed block wall clad in Cor-ten steel, templated on-site to fit the crevices of its flanking basalt columns exactly — with a full-length annual planting bed on top, its irrigation and drainage hidden inside the wall.' },
      { title: 'Fire on the bluff', detail: 'The wood-burning fire pit sits at the bluff edge overlooking the lake — the element of fire, placed where the view earns it.' },
      { title: 'The disappearing drain', detail: 'Strip drainage around the pool is cut directly into the stone deck — protection you never see.' },
      { title: 'A path that switchbacks', detail: 'The Klingstone-finished permeable path makes hairpin turns through the bluff zone, giving comfortable — even ATV — access to the lake below.' },
    ],
    challenge: { title: 'The hard part', detail: 'The sheer tonnage of natural stone on a 30-plus-degree slope: hand-picked outcropping boulders, basalt columns hoisted by bobcat, and drainage engineered for every terrace between the house and the water.' },
    materials: ['Cor-ten steel feature wall', 'Basalt columns with pier-mount lanterns', 'Heated clay-paver driveway', 'Travertine & bluestone patios', 'Klingstone permeable path', 'Commissioned bubbling-orb water feature'],
    source: 'Awards/2023 NARI — Minnetonka Lakescape submission',
  },

  'minnetrista-lake-escape': {
    story: [
      { kicker: 'Before', text: 'A newly purchased Lake Minnetonka home with a freshly renovated interior — and a lackluster backyard dropping steeply to the water, hemmed in by bluff lines, lakeshore setbacks, and strict impervious-surface rules.' },
      { kicker: 'The Idea', text: 'Work with the grade instead of against it: build the firepit patio into the existing elevation so a natural path terraces from the side yard into the living space. Then use the rulebook creatively — a wooden “patio” with quarter-inch gaps doesn’t count against hardcover, and the hot tub tucks tight to the house to live inside the setback.' },
      { kicker: 'After', text: 'A sunken hot tub in an ipe surround, a frameless glass railing fastened to the deck fascia so the lake view runs unobstructed, a custom half-circle ipe bench that lets everyone face both the fire and the water — and a second-level overlook deck that added usable space without spending an inch of hardcover.' },
    ],
    brief: [
      'Update the decking and railing',
      'A firepit hangout and a sunken hot tub',
      'Level ground for lawn games',
      'Landscape lighting throughout',
      'Cozy for family nights, big enough for hosting',
    ],
    moves: [
      { title: 'The grade is the design', detail: 'The firepit patio is built into the existing elevation — grill, loungers, and fire all a few steps apart along one natural terraced path.' },
      { title: 'The hardcover loophole', detail: 'Gapped, un-dried wooden deck surfaces don’t count as impervious cover — so the overlook deck and wooden patio added living space the lot technically didn’t have.' },
      { title: 'Glass on the fascia', detail: 'Setbacks forbade a bigger deck, so the frameless glass railing mounts to the deck fascia with added blocking — no posts, no frames, no lake lost.' },
      { title: 'The half-circle bench', detail: 'A custom ipe arc at the firepit lets you watch the whole of Lake Minnetonka and the people around the fire at the same time.' },
    ],
    challenge: { title: 'The hard part', detail: 'Lakefront rules at their strictest: impervious-surface caps, a lakeshore setback pinning the hot tub against the house, and a bluff line nothing could disturb — every feature had to be argued into its exact spot.' },
    materials: ['Ipe hot-tub surround & custom half-circle bench', 'Frameless glass railing', 'Terraced patios', 'Custom basalt column post lights', 'Pervious paver driveway'],
    source: 'Awards/2022 NARI — Minnetrista Lake Escape submission',
  },

  'modern-mood': {
    story: [
      { kicker: 'Before', text: 'A 1990s primary bath where the toilet greeted you at the door, the vanity fought the door swing for elbow room, and the built-in tub took more than it gave.' },
      { kicker: 'The Idea', text: 'Rotate the plan. The tub turns 90 degrees and becomes a deep freestanding soak with a waterfall filler, the toilet moves out of the sightline, the vanity retreats from the entrance — and the shower grows, borrowing a storage nook from the garage attic so the floor plan never pays for it.' },
      { kicker: 'After', text: 'Herringbone tile underfoot, Italian subway tile and a glass-tile nook in the shower, penny-round on its floor, brass sconces on dimmers — fresh and open, still warm, and nothing colliding with anything anymore.' },
    ],
    brief: [
      'A larger shower with real storage',
      'A deeper tub',
      'Hide the toilet from the doorway view',
      'Better flow, better lighting, updated finishes',
    ],
    moves: [
      { title: 'The 90-degree turn', detail: 'Rotating the tub and toilet unlocked the whole room — openness where the layout used to pinch, and a proper home for each fixture.' },
      { title: 'The borrowed nook', detail: 'The shower expanded into the garage attic for a built-in storage niche — more shower without taking a single square foot from the bathroom floor.' },
      { title: 'A seat and a system', detail: 'Dedicated bench seating plus niches for shampoo and soap — the small architecture that makes a shower livable.' },
    ],
    challenge: { title: 'The hard part', detail: 'Moving the plumbing to the far wall and carving the nook into the attic framing — the invisible work that let a modest footprint behave like a much bigger room.' },
    materials: ['2×10 Olvia Italian subway tile', '12×24 herringbone tile floor', 'Penny-round shower floor', '24×48 polished porcelain shower walls', 'Freestanding tub with waterfall filler', 'Brass sconces & frameless glass enclosure'],
    source: 'Awards/2024 NARI — Modern Mood submission',
  },

  'old-world-english-manor': {
    story: [
      { kicker: 'Before', text: 'A twenty-year-old deck and screened porch that never matched the house beneath them — tiny posts, tired screens, and a shadowy void below that gave nothing back. The lake setback meant the footprint could not grow an inch.' },
      { kicker: 'The Idea', text: 'Recapture everything underneath. Dry in the deck completely, spread a natural sandstone patio across the full footprint, and dress it like an English manor library moved outdoors — coffered ceiling, interior-style wrapped columns, rich dark details.' },
      { kicker: 'After', text: 'An outdoor bar with a kegerator and solid bluestone countertop waits under the porch for game days. Custom carriage lights flank the columns, a stone-capped step runs the room’s full length with an LED channel hidden under its lip, and upstairs the new stainless railing finally lets the lake through.' },
    ],
    brief: [
      'Better weather protection in the existing screen porch',
      'Turn the wasted space under the deck into real rooms',
      'Match the exterior to the home’s interior architecture',
      'Entertaining space for small gatherings and larger parties',
    ],
    moves: [
      { title: 'The library ceiling', detail: 'A custom coffered ceiling carries from the main area into the bar — designed around the opposing center points of the two spaces to achieve the English manor-library feel.' },
      { title: 'Columns with secrets', detail: 'Interior-grade wrapped columns with custom boot and crown details hide the deck drainage system — and were designed to accept future hidden mobile screens.' },
      { title: 'The game-day bar', detail: 'Under the old porch: a bar with kegerator space, solid bluestone counter and backsplash, and a mount for the outdoor TV.' },
      { title: 'A step you can find in the dark', detail: 'The full-length stone-capped step carries a recessed LED strip in a custom groove under its tread — safety rendered as detail.' },
    ],
    challenge: { title: 'The hard part', detail: 'The lake setback froze the footprint, so every gain had to come from within it — a fully dried-in deck system above, waterproofing hidden behind cedar tongue-and-groove, and all of it detailed to old-world standards.' },
    materials: ['Natural sandstone patio', 'Coffered & cedar tongue-and-groove ceilings', 'Solid bluestone bar countertop', 'Custom Fine Arts carriage lights', 'Stainless steel cable railing', 'Vinyl window/screen combination panels'],
    source: 'Awards/2023 NARI — Old World English Manor submission',
  },

  'orono-overlook': {
    story: [
      { kicker: 'Before', text: 'A new build on Lake Minnetonka with a minimalist, Zen-leaning family — and a bluff lot wrapped in lake setbacks and hardcover limits that seemed to forbid everything they wanted.' },
      { kicker: 'The Idea', text: 'Make the restrictions design the space. Retaining walls push exactly to the lakeshore-setback line to carve a sunken walkout room off the basement — cozy, purposeful, and open to the water. In a leftover corner, a vaulted hot tub rises with stadium seating on one side and a storage bench on the other.' },
      { kicker: 'After', text: 'Black pavers, ipe wood, and Fond du Lac stone answer the house’s stone and siding; big steppers float in synthetic turf under the deck; a bed swing hangs in the corner under ambient light. Open and airy, but every space feels connected — and the lake view runs straight through the front door.' },
    ],
    brief: [
      'Minimalist, Zen style in timeless materials',
      'Work inside strict setbacks and hardcover limits',
      'Open and airy, with distinct connected spaces',
      'Feature the lake view — and find room for a hot tub',
    ],
    moves: [
      { title: 'The sunken room', detail: 'Retaining walls extended to the setback line create a sunken space right off the basement doors — a dark corridor transformed into a destination, without blocking the view above it.' },
      { title: 'The vaulted hot tub', detail: 'A tight corner became a raised hot tub with multi-level seating — storage bench left, stadium seating right — built for group entertaining.' },
      { title: 'Steppers in turf', detail: 'Large pavers laid into synthetic turf soften the underdeck area — hard materials, soft read.' },
      { title: 'An entrance worth the walk', detail: 'Seat walls and small tiers enclose the architect’s exterior fireplace by the front path, staging the through-the-house lake view as visitors arrive.' },
    ],
    challenge: { title: 'The hard part', detail: 'The clients wanted a walkout basement with a lake view on a grade that didn’t allow one — retaining walls at exactly the permitted heights, minimal grading inside the lakeshore setback, and steps built atop a concrete wall made it real.' },
    materials: ['Black paver patio', 'Ipe wood', 'Fond du Lac stone walls', 'Synthetic turf with paver steppers', 'Vaulted hot tub surround'],
    source: 'Awards/2023 NARI — Orono Overlook submission',
  },

  'refined-living': {
    story: [
      { kicker: 'Before', text: 'A dull, builder-grade deck on a tall house above the park — unlevel spaces, no privacy, and a railing that interrupted the very view it stood in front of.' },
      { kicker: 'The Idea', text: 'Rebuild the deck at the scale the house deserves: beefed-up posts wrapped in Azek that quietly swallow the downspouts, a screened lower level for bug-free privacy, and a louvered pergola above — flexible shelter, switched from inside the house.' },
      { kicker: 'After', text: 'Ipe decking replaced the cedar, stainless cable rail opened the park view back up, a Fond du Lac stone wall lifted the bluestone patio level, and infrared heaters stretched the season. Sleek black details answer the home’s windows — refined, exactly as advertised.' },
    ],
    brief: [
      'A deck that works across more of the year',
      'Less builder-grade, more beautiful',
      'Privacy below, views above',
      'Level, usable outdoor spaces',
    ],
    moves: [
      { title: 'Scale correction', detail: 'The existing deck and posts were beefed up to balance the height of the house — then wrapped in Azek with the downspouts concealed inside.' },
      { title: 'Two climates, one deck', detail: 'Fixed screens make the lower level a private, bug-free room; infrared heaters and fans up top keep the open deck in service deep into the shoulder seasons.' },
      { title: 'The louvered lid', detail: 'A louvered pergola flexes between sun and shelter — operated by switches inside the house.' },
      { title: 'Cable, not pickets', detail: 'Stainless cable railing replaced the view-blocking original — the park returns to every sightline from the back of the home.' },
    ],
    challenge: { title: 'The hard part', detail: 'No deck stairs meant no easy way up — the build ran on scaffolding, while the design balanced a tall house against a hillside by building off the home and integrating the landscape below.' },
    materials: ['Ipe decking', 'Louvered pergola', 'Stainless cable railing', 'Azek-wrapped columns', 'Fond du Lac stone wall & bluestone patio', 'Cedar tongue-and-groove ceiling with EPDM'],
    source: 'Awards/2024 NARI — Refined Living submission',
  },

  'sky-lane': {
    story: [
      { kicker: 'Before', text: 'They bought the house for what sat beyond it: a pastoral preserve that can never be developed. But the foreground was an elevated screen porch on spindly posts and a flat, empty lawn — with twenty-to-thirty-person gatherings on the calendar.' },
      { kicker: 'The Idea', text: 'Tuscany, tuned to a modern farmhouse. Three distinct paved rooms — lounging, sunning, dining — spill from the home’s lower level, anchored by a long custom fire feature with a remote-controlled 300k-BTU burner, a drink ledge, and an antiqued stain.' },
      { kicker: 'After', text: 'Natural limestone paving banks daytime warmth for evening dinners while the porcelain sundeck stays cool underfoot. A decorative lattice screen turns the underdeck into a finished room, layers of aspen and arborvitae swallow the neighbor’s fence — and the crew worked into winter snow to have it ready for spring.' },
    ],
    brief: [
      'An outdoor environment for frequent 20–30 person events',
      'Extend the lower-level entertainment space outdoors',
      'Showcase the preserve, screen the neighbors',
      'Tuscan spirit, modern farmhouse body',
    ],
    moves: [
      { title: 'Three rooms, no walls', detail: 'Distinct paved areas for lounging, sunning, and dining — each oriented to its purpose: the sundeck to the sun, the dining and lounge to the preserve views.' },
      { title: 'The fire line', detail: 'A long, elevated custom fire feature — remote control, adjustable 300k-BTU burner, drink ledge — gives the lounge its warmth, light, and center of gravity.' },
      { title: 'Warm stone, cool tile', detail: 'Limestone holds the day’s heat for evening guests; porcelain tile and planks stay cool, uniform, and stain-resistant where bare feet gather.' },
      { title: 'The finished underdeck', detail: 'A beadboard ceiling, proportioned columns, and a decorative lattice privacy panel turn the space under the porch into a real room that breathes.' },
    ],
    challenge: { title: 'The hard part', detail: 'A November 1st snowfall landed mid-build with spring as the deadline — the team worked through winter to hand over the space in time for the season it was designed for.' },
    materials: ['Natural limestone paving', 'Porcelain tile & plank surfaces', 'Custom 300k-BTU gas fire feature', 'Beadboard underdeck ceiling', 'Aspen & arborvitae screening layers'],
    source: 'Awards/2019 COTY — Sky Lane submission (Seaton deck)',
  },

  'urban-oasis': {
    story: [
      { kicker: 'Before', text: 'A new home in the heart of St. Paul with a backyard that didn’t match it — and an owner who carried a childhood memory of family time on a porch, wanting that feeling for her own kids.' },
      { kicker: 'The Idea', text: 'Not a standard porch — a three-and-a-half-season porch addition, contemporary enough to carry the newly remodeled interior outside a 1920s home. Around it: private nooks for lounging, a deck sized for the grill, and screening from the neighbors on both sides.' },
      { kicker: 'After', text: 'The fireplace sits deliberately off-center — aligned with the kitchen window so the view from the sink is flame instead of garage wall, and stacked with a second, lower gas fireplace outside for the patio seating. The dining table centers on the fire, traffic flows past the widened mudroom path, and the porch works nearly year-round.' },
    ],
    brief: [
      'A screened porch for hosting — the childhood-porch feeling',
      'Privacy from the neighbors north and south',
      'Outdoor use stretched across the seasons',
      'Contemporary style carrying the remodeled interior outside',
      'Room to grill all year — without a built-in',
    ],
    moves: [
      { title: 'The off-center fireplace', detail: 'Offsetting the fireplace aligned it with the kitchen window, made room for a second exterior gas fireplace below, and let the dining table center on the flame while traffic flows free.' },
      { title: 'Three-and-a-half seasons', detail: 'The clients upgraded from a standard porch to a 3½-season addition — a room that shrugs at everything except the deepest winter.' },
      { title: 'The grill deck', detail: 'An open deck on the north side doubles as grill station and entry platform — private, practical, and never built-in.' },
      { title: 'The mudroom, extended', detail: 'The porch absorbs the overflow of a too-small back entry — the family’s comings and goings finally have room.' },
    ],
    challenge: { title: 'The hard part', detail: 'Marrying a contemporary addition to a 1920s exterior while orchestrating privacy, fire, dining, and circulation in a city lot’s footprint — every element placed to serve at least two purposes.' },
    materials: ['3½-season porch construction', 'Stacked interior & exterior gas fireplaces', 'Grill deck', 'Privacy screening plantings'],
    source: 'Awards/2024 NARI — Urban Oasis submission',
  },

  'victoria-retreat': {
    story: [
      { kicker: 'Before', text: 'A steep lakeshore site the team had first landscaped in 2012, around a small events building that began life as a private home. Six years later the clients replaced it with a far larger conference facility — and the old landscape logic no longer fit the land.' },
      { kicker: 'The Idea', text: 'Let the ground move like the building: gradual curved paths replace straight stairs for accessible entry at both levels, radial landings and retaining walls echo the eyebrow roof, and a terraced hillside ripples down to the lake — slowing runoff for absorption before it reaches the water.' },
      { kicker: 'After', text: 'A travertine patio with a central fire pit holds crowds and quiet conversations alike. Basalt columns carry gas lanterns, custom wrought-iron rails guide every stair, and visitors find their way through gardens without a single sign — the hardscaping built while the building itself was still under construction, in time for opening day.' },
    ],
    brief: [
      'Tame a steep lakeshore around a much larger new building',
      'Accessible, intuitive wayfinding — no obtrusive signage, no steep stairs',
      'Artistic beauty with organic flow, engaging visitors with nature',
      'Ready for a hard grand-opening deadline',
    ],
    moves: [
      { title: 'Curves instead of stairs', detail: 'Gradual, meandering paths replace straight staircases — accessible entry at the main door and the lower level, with the walk itself part of the experience.' },
      { title: 'The terraced shoreline', detail: 'Stair-interval terraces step the hillside to the lake, improving access while slowing stormwater so it soaks in before reaching the water.' },
      { title: 'Reuse as respect', detail: 'Existing bluestone wall caps, a decorative Juliet railing, and established trees and plantings from the 2012 project were folded into the new landscape.' },
      { title: 'Light and iron', detail: 'Gas lanterns on basalt columns, extensive stair lighting, and custom grip-able wrought-iron rails keep the grounds safe after dark without breaking the calm.' },
    ],
    challenge: { title: 'The hard part', detail: 'Building the landscape while the building was still going up — crews working around other trades, equipment, and supplies, on a steep site, against a grand-opening date the clients would not move.' },
    materials: ['Travertine patio paving', 'Bluestone & limestone-blend walls', 'Basalt columns with gas lanterns', 'Custom wrought-iron railings', 'Lake-drawn automatic irrigation'],
    source: 'Awards/2019 COTY — Victoria Retreat submission (CharlsonMeadows deck, commercial)',
  },
}
