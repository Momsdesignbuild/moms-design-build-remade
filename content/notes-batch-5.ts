// Design Notes batch 5 — the non-NARI award sweep (July 16): Midwest Home,
// Midwest Design, and MNLA submissions that the NARI-only mining missed.
// Same rules as project-notes.ts: additive only; no client surnames,
// addresses, job numbers, prices, or designer names in rendered fields.
// `intro` = Summer-style body copy for pages whose WP page had no story text —
// rendered in the editorial body only when the carbon layer is empty.
//
// Ported into -remade 8/12 (Fable): this file existed only in the
// moms-design-build-remastered fork — never copied into the live repo, so
// none of these 8 projects had Design Notes live despite being reported
// done in the 7/16 handoff. See project-notes.ts for the required
// `?? []` guards this batch depends on (country-classic has no brief/moves).
import type { ProjectNotes } from './project-notes'

export const BATCH_5: Record<string, ProjectNotes> = {
  'balanced-bathing': {
    intro: [
      'This primary bathroom sits in the rolling countryside of Shakopee, and it was designed for one thing above all: unwinding. The client has a high-stress job and wanted a space that could carry her into a tranquil peace — somewhere to start the workday calm and end it even calmer.',
      'Now she looks forward to long, hot showers with aromatherapy filling the air, textured penny tiles underfoot like blue waves, and a free-standing tub with a book and candles lining the ledge. With a furniture-look vanity, open shelving, and a palette of soft blues and light grays, the whole room reads light, bright, and balanced — a spa she never has to leave home for.',
    ],
    story: [
      { kicker: 'Before', text: 'A primary bathroom that had fallen behind the life around it — and a homeowner with a high-stress job who wanted the room she starts and ends every day in to feel like an escape instead of an errand.' },
      { kicker: 'The Idea', text: 'Build the bathroom around the ritual of unwinding: a free-standing tub open to the room to make the space feel larger, a shower made for long stays, and textured penny tile that reads like blue waves underfoot.' },
      { kicker: 'After', text: 'Light, bright, and balanced — a furniture-look vanity, open shelves for a quick towel, and an array of blues and light grays that turn the room into a tranquil, spa-like escape every single day.' },
    ],
    brief: [
      'A tranquil retreat to start and end a high-stress workday',
      'A spa feeling — aromatherapy showers, a soaking tub, candles on the ledge',
      'A light, bright, balanced room that lives larger than its footprint',
      'A furniture look for the vanity, with open shelving close at hand',
    ],
    moves: [
      { title: 'Waves underfoot', detail: 'Textured penny tile in oceanic blues turns the shower floor into the sensory center of the room — designed to feel like waves massaging tired feet.' },
      { title: 'The open tub', detail: 'A free-standing soaking tub replaced the old built-in — open on all sides so the room feels bigger, with ledge space for a book and a ring of candles.' },
      { title: 'Furniture, not cabinetry', detail: 'The vanity was styled like a piece of furniture, paired with open shelving — polished enough for a showcase, practical enough to grab a towel.' },
    ],
    challenge: { title: 'The hard part', detail: 'The renovation ran while the homeowner lived in the house during the COVID era — trades had to be balanced and sequenced with extra precautions and clear expectations to keep the timeline moving with minimal interruption.' },
    materials: ['Textured penny tile in blues', 'Free-standing soaking tub', 'Furniture-look vanity', 'Open shelving', 'Palette of blues & light grays'],
    source: 'Awards/2024/MIDWEST HOME — Balanced Bathing submission (Brekke)',
  },

  'private-poolside-retreat': {
    intro: [
      'The homeowners of Private Poolside Retreat were debating a classic Minnesota question: buy the cabin, or fall back in love with the backyard? Once they saw the design, the answer was easy — they built their peace right at home in Lakeville.',
      'They love hosting small gatherings for relatives and family friends, but their old deck went unused — too hot, too buggy, too windy, with evenings that ended at 8pm sharp. Mobile screens, a louvered pergola, and infrared heaters changed all of that, and now the night lasts as long as they want it to. A bubbling boulder brings a peaceful soundtrack, alternating patio and artificial-turf inlays set apart the lounging spaces, and the pool settles into the natural ambiance of the yard like it was always there.',
    ],
    story: [
      { kicker: 'Before', text: 'A cabin-versus-backyard debate, and a deck nobody used: too hot, too buggy, too windy. Evenings outside ended at 8pm, and drainage problems ran through the whole backyard.' },
      { kicker: 'The Idea', text: 'Bring the cabin feeling home. A pool folded into the natural ambiance of the yard, a simple water feature for the sound of it, and a deliberate balance of sun and shade so there is always a right place to sit.' },
      { kicker: 'After', text: 'Mobile screens, a louvered pergola, and infrared heaters stretched the evening far past its old 8pm curfew. Alternating patio and turf inlays set apart the lounging spaces, the bubbling boulder murmurs by the pool, and the dried-in deck keeps pool-level seating covered from the elements.' },
    ],
    brief: [
      'Make staying home better than buying the cabin',
      'Host small gatherings of relatives and family friends',
      'A pool with a balance of sun and shade',
      'A simple water feature to look at and listen to',
      'Fix the evenings — the old deck was hot, buggy, windy, and done by 8pm',
    ],
    moves: [
      { title: 'The evening extenders', detail: 'Mobile screens, a louvered pergola, and infrared heaters on the upper deck turned a three-hour deck into an all-night one — bugs and cold no longer call the curfew.' },
      { title: 'Rooms without walls', detail: 'Alternating stretches of patio and artificial-turf inlay quietly define separate lounging spaces — plus a turf game space that shrugs off Minnesota weather.' },
      { title: 'The bubbling boulder', detail: 'The simple water feature the homeowners asked for: a boulder that murmurs beside the pool, giving the whole space its peaceful soundtrack.' },
      { title: 'Covered at pool level', detail: 'The deck was dried in so the seating beneath it stays protected from the elements — usable space above and below.' },
    ],
    challenge: { title: 'The hard part', detail: 'Drainage and water problems ran throughout the backyard and had to be solved during the project — the calm the design promised depended on fixing what was underneath it first.' },
    materials: ['Louvered pergola', 'Mobile screens', 'Infrared heaters', 'Artificial turf game space', 'Bubbling boulder water feature', 'Outdoor fireplace', 'Low-maintenance plantings'],
    source: 'Awards/2024/MIDWEST HOME — Private Poolside Retreat submission (Elder)',
  },

  'lower-level-escape': {
    intro: [
      'The clients wanted to expand their lower-level entertaining space with something Minnesota rarely allows: a room that feels like the outdoors but keeps the comforts of the indoors, usable all year round. The catch — it had to keep the views open and couldn’t darken the basement behind it.',
      'A louvered pergola above the patio door gave the room its maximum height without blocking the main-level windows, and the louvers were positioned to pour light into the basement in the shoulder seasons. A solid roof shelters the hot tub, privacy walls screen the public walkway that flows through the backyard, and the structural columns were turned into a bar. With infrared heaters, wet-rated lighting, a ceiling fan, a swing, and EZ screens that open for a breeze or close to hold the heat, they can now open the interior door, drop the screens, and live in their expanded entertaining destination in any season.',
    ],
    story: [
      { kicker: 'Before', text: 'A lower patio with potential and a problem: the clients wanted a year-round outdoor room, but any structure risked darkening the basement and the backyard has a public walkway flowing right through it.' },
      { kicker: 'The Idea', text: 'A louvered pergola set above the patio door — maximum ceiling height without blocking the main-level windows, louvers aimed to pour light into the basement, open in the shoulder seasons and sealed when the weather turns.' },
      { kicker: 'After', text: 'A solid roof shelters the hot tub, privacy walls screen the walkway, and the columns became a bar. Heaters, a ceiling fan, a swing, and EZ screens finish the room — open the wider new slider, drop the screens, and the basement gains an outdoor wing that works in January.' },
    ],
    brief: [
      'Expand the lower-level entertaining space for year-round use',
      'The feel of an exterior space with the comforts of an interior one',
      'Keep views open — never darken the basement',
      'Privacy from the public walkway through the backyard',
    ],
    moves: [
      { title: 'The light-first pergola', detail: 'The louvered pergola sits above the patio door for maximum room height without blocking main-level windows — and the louvers are positioned to maximize light into the basement.' },
      { title: 'Columns into a bar', detail: 'The structure’s support columns were claimed as a design feature and built out into a bar — nothing wasted, everything social.' },
      { title: 'Comforts of the indoors', detail: 'Infrared heaters, wet-rated lighting, a ceiling fan, a swing, and EZ screens that open for a breeze or close to keep the heat — an exterior room with interior manners.' },
      { title: 'Patio to turf', detail: 'The paver floor flows out to a synthetic turf space, with a new Fond du Lac stone wall cut in to make room for it all — and a wider sliding door to connect inside to out.' },
    ],
    challenge: { title: 'The hard part', detail: 'Building a solid-roofed, screened, heated room against the house without stealing the basement’s daylight — solved by the louvered pergola’s placement and aim, so the new space and the old windows share the same sun.' },
    materials: ['Louvered pergola', 'EZ screens', 'Infrared heaters', 'Wet-rated lighting & ceiling fan', 'Paver patio & synthetic turf', 'Fond du Lac stone wall', 'Hot tub under solid roof'],
    source: 'Awards/2024/MIDWEST HOME — Lower Level Escape submission (Birkholz)',
  },

  'splendor-on-summit': {
    intro: [
      'In the middle of the capital city, this transformation turned a sparse, forgettable yard into an enchanting backyard oasis. The design connects the pool to the dining and sitting areas through patterned brick patios and surrounding gardens, so the homeowners step outside their back door and straight into their own lush paradise.',
      'Limestone and clay pavers were carefully matched to the home’s existing full-color brick, and the aesthetic carries through the pergola columns and rowlock brick caps. Between the dining and sitting areas — within view of the pool — a look-through gas fireplace adds warmth, privacy, and a little visual intrigue after dark.',
      'The clients had one special request: honor the three-foot-diameter Horse Chestnut that has watched over the yard for generations. It stayed, it thrived, and the whole design bends respectfully around it.',
    ],
    story: [
      { kicker: 'Before', text: 'A boring, sparse yard in the middle of Saint Paul — and one non-negotiable resident: a Horse Chestnut three feet across that the family wanted honored, not worked around.' },
      { kicker: 'The Idea', text: 'Make the pool the destination and let the gardens carry you there: patterned brick patios linking pool to dining to sitting, with limestone and clay pavers matched to the home’s own full-color brick so the new yard looks born, not built.' },
      { kicker: 'After', text: 'A look-through gas fireplace glows between the dining and sitting areas within view of the pool, the pergola’s stone columns tie into the retaining wall, and the old Horse Chestnut still presides over an enchanting backyard oasis the clients now cherish.' },
    ],
    brief: [
      'An entertaining oasis in the middle of the city',
      'The pool as the main destination, connected to the gardens',
      'Materials that match the home’s existing full-color brick',
      'Warmth and privacy without walling anything off',
      'Protect the beloved 36-inch Horse Chestnut at all costs',
    ],
    moves: [
      { title: 'The tree treaty', detail: 'A tree preservation plan protected the 36-inch Horse Chestnut: the Fond du Lac retaining wall was held at least 18 feet from the trunk, and air pipes every 18 inches keep oxygen flowing to the roots beneath the new fill.' },
      { title: 'Brick that belongs', detail: 'Limestone and clay pavers were matched to the property’s existing rumbled full-color brick, then carried up the pergola columns and finished with rowlock brick caps — one material story, old and new.' },
      { title: 'The look-through fireplace', detail: 'Set between the dining and sitting areas within view of the pool, the gas fireplace adds warmth and privacy from the neighbors while keeping every sightline open.' },
    ],
    challenge: { title: 'The hard part', detail: 'Site access. The property sits on a busy street, so the crew entered from the alley — building a wooden ramp over the 18-inch curb — while managing tricky grades and keeping runoff a good neighbor.' },
    materials: ['Limestone & full-color clay pavers', 'Fond du Lac stone walls & pergola columns', 'Rowlock brick caps', 'Look-through gas fireplace', 'Tree-preservation air-pipe system'],
    award: { name: 'Midwest Design Awards 2025', category: '1st Place — Residential Swimming Pool' },
    source: 'Awards/2025/Midwest Design + 2021 MNLA — Splendor on Summit submissions (Ziemer)',
  },

  'excelsior-blvd-attraction': {
    intro: [
      'No matter the season, people gather at this renowned restaurant on the south end of Lake Minnetonka for music, sports, good food, and better company. What the patio needed was a way to handle the crowds — and Minnesota’s famously unpredictable weather.',
      'A 16-by-50-foot sloped roof in clear tongue-and-groove cedar now shelters the space, with ten 6,000-watt infrared heaters running in four zones and phantom vinyl screens that drop at the push of a button. A new server station and bar top keep private parties flowing, the entry wall was lowered so guests can finally see the door, and fresh Hardie board and nickel-gap siding tie it all together. The patio works year-round now — updated and modernized without ever feeling formal.',
    ],
    story: [
      { kicker: 'Before', text: 'A beloved lakeside restaurant with a patio at the weather’s mercy: no shelter, a six-foot entry wall that hid the door, and runoff from the upper deck seeping onto the patio below.' },
      { kicker: 'The Idea', text: 'One roof that solves three problems — a 16-by-50-foot sloped structure in clear cedar, angled so it drains the water, catches the light on a north-facing site, and carries the heaters and screens that make the space four-season.' },
      { kicker: 'After', text: 'Ten infrared heaters in four zones, phantom screens that drop at a button, a new server station and bar top, and a lowered entry wall so you can finally sight the door. Updated and modernized — without feeling formal.' },
    ],
    brief: [
      'An outdoor dining space that survives Minnesota weather',
      'Handle a multitude of crowds without losing the flow',
      'Elevate the look — but keep the casual lakeside soul',
      'Fix the water seeping from the upper deck onto diners below',
    ],
    moves: [
      { title: 'The working roof', detail: 'The 16-by-50-foot sloped roof in tongue-and-groove clear cedar was angled to do double duty — an efficient drainage system that also maximizes light on a north-facing site.' },
      { title: 'Heat in four zones', detail: 'Ten 6,000-watt infrared heaters run in four zones — or individually — with timers, so any member of staff can dial in comfort without a manual.' },
      { title: 'Screens at a button', detail: 'Phantom vinyl screens hide in the roof and drop at the push of a button: wind protection, held heat, and a patio that serves in the fall and winter.' },
      { title: 'Finding the front door', detail: 'The old six-foot wall made the entry a guessing game. It was lowered, a server station and bar top were added, and now the patio flows — and you can see where you’re going.' },
    ],
    challenge: { title: 'The hard part', detail: 'The restaurant sits on the water, wrapped by an elevated deck — no access for traditional footings, so the structure rides on helical piers, attached to the existing building while the restaurant kept serving with minimal disruption.' },
    materials: ['Tongue-and-groove clear cedar roof', 'Helical piers', '10× 6,000-watt infrared heaters', 'Phantom vinyl drop screens', 'Hardie board & nickel-gap siding'],
    source: 'Awards/2022+2023 Midwest Home — Maynard’s / Excelsior Escape submissions',
  },

  // intro-only: no written records exist for this project (no award submission,
  // no photoshoot folder, no QB customer) — copy below is grounded strictly in
  // what the page's own photos show. Never invent a client story or products.
  'country-classic': {
    intro: [
      'Country Classic lives up to its name — timeless farmhouse character in New Prague, done crisp and bright. The kitchen leads the way: white shaker cabinetry under a glossy herringbone backsplash that climbs all the way to the ceiling, a stainless chimney hood over the gas cooktop, and a farmhouse apron sink tucked into the corner. A dark-stained island anchors the room with veined stone counters and a built-in microwave, playing warm contrast against all that white.',
      'The character carries beyond the kitchen. A sliding barn door in rustic plank wood opens to a full wall of custom lockers — paneled doors, open cubbies, coat hooks over a beadboard back, and a cushioned bench with boot storage below. And by the windows, a built-in L-shaped window seat with storage drawers wraps into a stone-topped desk nook, looking out into the trees — classic country comfort, built to be lived in.',
    ],
    source: 'Photo-grounded only (page gallery) — no written records found in Awards 2004–2026, photoshoot folders, or QB customer list; designer unknown (former staff)',
  },

  'office-goals': {
    intro: [
      'When these clients bought their Edina home, they were moving cross-country — and the formal front sitting room just off the entry was the space they knew they’d never use. What they actually needed was a library and home office worthy of the house.',
      'The room was enclosed, French doors were added, and custom built-in cabinetry turned the walls into a working library. The bookcases are the star of the space — a front room that finally earns its spot by the door.',
    ],
    story: [
      { kicker: 'Before', text: 'A newly purchased Edina home with a formal front sitting room off the entry — the one room a family relocating from Southern California knew they would never use as-is.' },
      { kicker: 'The Idea', text: 'Turn the dead room into the hardest-working one in the house: close up the wall, hang French doors, and line the room with designed built-in cabinetry — a true library and home office.' },
      { kicker: 'After', text: 'Floor-to-ceiling built-in bookcases carry the room, French doors let it borrow light while keeping the quiet in, and the front sitting room nobody used became the room everybody sees.' },
    ],
    brief: [
      'Convert the unused front sitting room into a library and home office',
      'Close up a wall and add French doors',
      'Designed built-in cabinetry — a real library, not just shelves',
    ],
    moves: [
      { title: 'The conversion', detail: 'Closing one wall and adding French doors flipped the room’s purpose — from a pass-through formality to a destination with a door worth closing.' },
      { title: 'Built-ins that make the room', detail: 'The custom bookcases are the defining feature of the space — cabinetry designed to the room, floor to ceiling, giving the home office the character of a library.' },
    ],
    materials: ['Custom built-in bookcases & cabinetry', 'French doors'],
    source: 'Jim 2018 lead email (client brief, verbatim asks) + 2019 COTY status + 2019 pro photoshoot (Clayburgh; designer Karie Zemlicka, former staff)',
  },

  'harriet-haven': {
    intro: [
      'Steps from Minneapolis’ Lake Harriet, these clients wanted their backyard to become the family magnet — the place their two daughters and all of their friends would rather be than anywhere else. The vibe they asked for: upscale Hamptons meets the Caribbean, with water, casual luxury, and fun leading the way.',
      'They set the bar so high that the American Society of Interior Designers featured the home and landscape as its Show House tour property. The pool aligns with the home’s front door and rear window wall, so the backyard scene greets you the moment you walk in — and visitors still say the same thing: “I don’t even feel like I’m in Minnesota anymore.”',
    ],
    story: [
      { kicker: 'Before', text: 'A blank-slate backyard behind a home in mid-renovation near Lake Harriet — and a family who wanted it to become the magnet for their two daughters and every friend they had.' },
      { kicker: 'The Idea', text: 'A Caribbean resort in Minneapolis, staged on an axis: the 13-by-30-foot pool centered on the sliding doors so the whole scene wows from the front door, ringed by Ipe decks, a swing-bed pergola, and dancing deck jets.' },
      { kicker: 'After', text: 'Stadium steps under Cortona stone coping, a hanging lounge bed drawing the eye across the water, six luminous planters glowing as night falls, bistro lights in the oak — and a ground-level trampoline hidden neatly behind it all for the family’s young gymnasts.' },
    ],
    brief: [
      'A backyard magnet for two daughters and their friends',
      'Upscale Hamptons-meets-Caribbean: water, casual luxury, fun',
      'A scene that wows from the moment you walk in the front door',
      'Play space that works in any weather — including a trampoline',
    ],
    moves: [
      { title: 'The axis', detail: 'The pool is centered on the home’s sliding doors and rear window wall, so the resort scene lands the instant you step through the front door — the move that made it an ASID Show House.' },
      { title: 'The hanging lounger', detail: 'A round hanging lounge bed on the far pergola deck draws the eye across the pool — and neatly conceals the ground-level trampoline behind it, set perfectly flush for safety and looks.' },
      { title: 'Turf that earns it', detail: 'Premium artificial turf between pool and lounging deck doubles as a tumbling run for the family’s gymnasts — it drains fast, defeats digging dogs, goes green the moment the snow melts, and never needs mowing.' },
      { title: 'Light as atmosphere', detail: 'Bistro lights in the oak, six luminous square planters by the pool on a dusk timer, step lights in the Ipe decks — the party atmosphere switches itself on every night.' },
    ],
    challenge: { title: 'The hard part', detail: 'An ASID Show House deadline with painters, sliders, A/V, and landscape crews stacked in one tight space — the deck was built around the pergola posts, sharing footings to save cost and sequence, with a drone keeping watch over the choreography.' },
    materials: ['Ipe hardwood decking', 'Cortona stone pool coping', 'Premium artificial turf', 'Hanging lounge bed', 'Luminous planters on dusk timers', 'Phantom porch screens', 'Bluestone rug-inlay walkway'],
    source: 'Awards/2016 MNLA + NARI — Harriet Haven submissions (Lacek)',
  },
}
