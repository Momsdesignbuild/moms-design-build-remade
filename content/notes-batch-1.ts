// Design Notes batch 1 — deck-backed entries (2017–2024 NARI submissions).
// Same rules as project-notes.ts: additive only; no client surnames,
// addresses, job numbers, prices, or designer names in rendered fields.
import type { ProjectNotes } from './project-notes'

export const BATCH_1: Record<string, ProjectNotes> = {
  'azure-grand': {
    story: [
      { kicker: 'Before', text: 'A backyard the family never quite knew how to use: awkward space under the deck, natural stone patios that shifted and heaved with the seasons, and a pool that felt too small for the way they wanted to live.' },
      { kicker: 'The Idea', text: 'Center everything. A new 20-by-42-foot pool lands perfectly on the axis of the curved upper deck, a hot tub takes the place of a former staircase, and the dead zone in front of the fireplace becomes a full outdoor kitchen with a coffered beadboard ceiling floating beneath the deck.' },
      { kicker: 'After', text: 'Three cooking surfaces vent invisibly behind board-and-batten, book-matched marble climbs the backsplash in one seamless sheet, and a bed swing sways on the lower deck with a straight view of the water. Even the old pool’s bluestone coping lives on — reborn as trim at the column bases.' },
    ],
    brief: [
      'Make sense of the unused space under the deck and around the pool',
      'Replace shifting natural stone with surfaces that stay put',
      'A bigger pool, a hot tub, and serious storage',
      'A grand space for outdoor cooking',
      'Less planting, lower maintenance everywhere',
    ],
    moves: [
      { title: 'The kitchen under the deck', detail: 'An awkward seating area in front of the fireplace became a full kitchen and bar: gas grill, flat top, and side burner with hidden vent hoods, two fridges, a pot-filler, and a counter-height bar top facing the pool.' },
      { title: 'A ceiling brought down to earth', detail: 'The 13-foot void beneath the deck felt cavernous — a custom coffered beadboard ceiling brings the scale down and carries new lighting without touching the decking system above.' },
      { title: 'The hot tub trade', detail: 'Two staircases became one, and the freed corner of the upper deck became a circular hot tub wrapped in a curved stone wall and wood decking, with a hanging swing beside it.' },
      { title: 'Old stone, new job', detail: 'The original pool’s bluestone coping was salvaged and reused as kickboard trim at the deck column bases — history folded into the new build.' },
    ],
    challenge: { title: 'The hard part', detail: 'City zoning demanded extensive water mitigation and capped hardcover — the design squeaked under the maximum by three-tenths of a percent. Then saturated soils forced helical piers down thirty feet to carry the pool footing, and rotting cladding on the existing structures had to be rebuilt in composite before anything could shine.' },
    materials: ['Book-matched marble counters & backsplash', 'Stone veneer with reclaimed bluestone trim', 'Coffered beadboard ceiling', 'Metal-clad Parisian-style awning', 'Tropical hardwood stoop', 'Synthetic turf game lawn'],
    source: 'Awards/2024/NARI — Azure Grand submission (Veldman)',
  },

  'beaus-forever-bloom': {
    story: [
      { kicker: 'Before', text: 'A sloped side yard with one important maple tree — and a mother who wanted a place to remember her son Beau, a space that would celebrate who he was rather than dwell on his loss.' },
      { kicker: 'The Idea', text: 'Build the garden around his spirit. Corten steel sculptures carry the raw, artistic feel of the graffiti art he loved; the “Beau” structure stands exactly his height; and a basalt fountain holds little bird-bath bowls where friends still leave the tiny objects he collected.' },
      { kicker: 'After', text: 'The firepit lights with the flip of a switch in the front corner of the yard, close enough to wave neighbors up as they pass. The fountain fills itself. The maple he used to climb still stands at the center of it all — and from the front porch, his mother can see the whole garden bloom.' },
    ],
    brief: [
      'A beautiful space for friends and family to remember Beau',
      'Features that capture who he was',
      'Protect the maple tree that mattered to him',
      'Warm and welcoming, yet private',
    ],
    moves: [
      { title: 'Sculpture at his scale', detail: 'Every sculpture is corten steel for a raw, artsy character — including a movable metal skateboard that drifts around the garden, and a “Beau” structure built to his exact height.' },
      { title: 'A fountain for tiny things', detail: 'The basalt water feature doubles as a resting place for remembrance: bird-bath bowls hold the small objects his friends leave, and one of its stones doubles as a seat.' },
      { title: 'The front-corner firepit', detail: 'Placed deliberately where the neighborhood walks by, so gathering happens naturally — switch-lit, effortless, always ready.' },
      { title: 'Care that runs itself', detail: 'The fountain auto-fills from the irrigation system and the natural stone patio blends into the existing bluestone wall — a memorial that never becomes a chore.' },
    ],
    challenge: { title: 'The hard part', detail: 'Designing remembrance without heaviness — a garden that honors a life while staying uplifting. And doing it around a protected maple, on a small sloped lot, under hardcover restrictions that turned the fountain path into a diamond stone border set flush in the grass.' },
    materials: ['Corten steel sculptures', 'Basalt column water feature', 'Natural stone patio', 'Stacked bluestone retaining wall', 'Switch-lit gas firepit'],
    source: 'Awards/2024/NARI — Beau’s Forever Bloom submission (Taunton)',
  },

  'blissful-basement': {
    story: [
      { kicker: 'Before', text: 'An unfinished basement and a builder’s stock floor plan that didn’t fit the family living above it — two young boys, a shuffleboard table they refused to lose, and parents who wanted everyone in the same room.' },
      { kicker: 'The Idea', text: 'Flip the whole layout. Moving the bar to the opposite side made room for a larger island, and moving the fireplace into the entertainment area put every screen, flame, and sofa where the family actually gathers. Three televisions mean the boys can game while the grown-ups watch the match.' },
      { kicker: 'After', text: 'Their old concert posters hang spotlit in a custom niche with a stone drink ledge beside the shuffleboard. Honed marble herringbone backs the open shelving, reeded wood textures the TV wall, and the lighting layers down from game night to movie dark.' },
    ],
    brief: [
      'A basement that grows with two young boys',
      'Room to host friends and family, big groups and small',
      'Space for game nights, holidays — and the shuffleboard stays',
      'Flexible enough for kids and adults at once',
    ],
    moves: [
      { title: 'The flip', detail: 'The bar swapped sides of the basement entirely — buying a larger island, a bigger fridge for overflow, closed storage below and open shelves above for the good glassware.' },
      { title: 'The poster wall', detail: 'Pre-marriage concert posters became the design’s soul: a dedicated niche with a stone drink ledge and dimmable spotlights, right beside the shuffleboard.' },
      { title: 'Three screens, one room', detail: 'Kids game with their AirPods in while parents watch the film — togetherness by way of smart zoning rather than separate rooms.' },
      { title: 'Light for every hour', detail: 'Layered lighting from sconces to backsplash glow — and deliberately no pendants over the island, because two boys throw a football down the long way of this basement.' },
    ],
    challenge: { title: 'The hard part', detail: 'Reworking a builder’s pre-drawn layout into a custom one — relocating the fireplace across the room, integrating it into the entertainment wall with vertical large-format tile, and keeping a bold pattern moment in every space without letting the whole read busy.' },
    materials: ['Honed marble herringbone backsplash', 'Large-format vertical fireplace tile', 'Reeded wood TV wall', 'Patterned tile flooring', 'Stone drink ledge'],
    source: 'Awards/2023/NARI — Blissful Basement working files (Hoines)',
  },

  'classy-cavern': {
    story: [
      { kicker: 'Before', text: 'An outdated basement under a finished home — and a wine collection, gathered over years, with nowhere to be seen.' },
      { kicker: 'The Idea', text: 'A temperature-controlled wine showcase as the centerpiece, a bar dressed in unlacquered brass and blue-black stone, and separate zones for poker, shuffleboard, mixing drinks, and the big game by the fireplace.' },
      { kicker: 'After', text: 'Warm wood floors meet waterfall-edge stone counters, a hammered brass sink catches the light, and a mirrored back wall doubles the depth of the room. Black round ceiling insets float over the bar like a wink — cavern by name, classy by every detail.' },
    ],
    brief: [
      'A space to entertain friends, family, and company parties',
      'Showcase the wine collected over the years',
      'Barware on open shelving',
      'Several distinct entertaining areas',
      'Under-counter refrigeration for hosting',
    ],
    moves: [
      { title: 'The wine showcase', detail: 'A custom temperature-controlled glass wine room — with a stone-and-framing thermal break engineered so the heated floors and the chilled glass could coexist.' },
      { title: 'Brass, hammered and raw', detail: 'Unlacquered brass shelves, a hammered brass sink, and fixtures with black-and-gold-leafed interiors give the bar its glow — warmth played against the blue-black stone.' },
      { title: 'The mirror trick', detail: 'A perfectly-leveled mirrored back wall bounces natural and ambient light through the basement, adding depth where a foundation wall used to stop the eye.' },
      { title: 'Shelves across the window', detail: 'Glass shelving hung meticulously across the window required hidden ceiling framing to carry the weight of glass, bottles, and barware.' },
    ],
    challenge: { title: 'The hard part', detail: 'Building a chilled glass wine room over heated floors meant framing a thermal break six inches proud of the flooring — and the entire basement had to be leveled first. All of it done gently, with the family living overhead: vents protected, pathways covered, cleaned as the crew went.' },
    materials: ['Temperature-controlled wine showcase', 'Natural stone waterfall counters', 'Unlacquered brass shelving & hammered brass sink', 'Real wood flooring', 'Reeded wood island detail'],
    award: { name: 'NARI Minnesota 2024 Remodeler of the Year — Gold', category: 'Basement' },
    source: 'Awards/2024/NARI — Classy Cavern submission (Santos)',
  },

  'colonial-portico': {
    story: [
      { kicker: 'Before', text: 'For fifteen years the porch addition off the back of the house was the room nobody wanted: damp, dim, swallowing the small backyard, blocking the light, and forcing every trip outside through a space that never earned its keep.' },
      { kicker: 'The Idea', text: 'Take it down and build a barrel-vaulted portico in its place — following the old roofline to spare the siding, with one gentle curve reaching over a new pass-through window to the kitchen.' },
      { kicker: 'After', text: 'Pewter limestone decks the stoop, dentil and crown moulding echo the home’s front entry, and staggered cedar shakes at the peak give it a coastal accent. Shortening the kitchen window even bought the homeowners more counter and cabinets inside. Light is back, and so is the backyard.' },
    ],
    brief: [
      'A covered transition between home and outdoors',
      'A pass-through window from the kitchen to the covered space',
      'Connect the dining-room doors and the sunroom door',
      'Honor the home’s traditional details',
      'More light inside, airy spaces outside',
    ],
    moves: [
      { title: 'The barrel vault', detail: 'The portico ceiling curves inverse to the roof above it — a small piece of architecture that turns a walkway into a moment.' },
      { title: 'Stone over structure', detail: 'The stoop is a carpentry grid system decked in pewter limestone — natural stone underfoot, engineered support beneath.' },
      { title: 'The pass-through', detail: 'A double set of double-hung windows opens the kitchen to a stone bar top outside; shortening the old window let the cabinets and counters grow inside.' },
      { title: 'Details that already lived here', detail: 'Dentil moulding, crown details, a metal roof, whites and creamy greys with a touch of blue — the new build borrows its language from the home’s own front entry.' },
    ],
    challenge: { title: 'The hard part', detail: 'Geometry in service of light: the curved roof had to clear the upper-story windows, still cover the pass-through, and land on the old roofline so the existing siding never had to come off.' },
    materials: ['Pewter limestone decking', 'Barrel-vault portico ceiling', 'Metal roofing', 'Azek trim & finishes', 'Cedar shake accents', 'Stone pass-through bar top'],
    source: 'Awards/2023/NARI — Colonial Portico submission (Vogt)',
  },

  'cov-restaurant': {
    story: [
      { kicker: 'Before', text: 'A painfully narrow strip beside Minnesota’s most upscale shopping mall, overlooking a parking lot instead of a bay — and a restaurateur who wanted his guests to feel like they’d stepped onto a Nantucket porch.' },
      { kicker: 'The Idea', text: 'Root the patio in a legacy. When no nursery could supply the gnarled specimen the vision demanded, a twelve-inch Kentucky coffeetree was bought off a homeowner’s front lawn and planted so the classic white pergola seems to have grown around it for decades.' },
      { kicker: 'After', text: 'Facing porch swings hang on rope, crushed New Hampshire seashells ring the fire bowl, and Phantom screens with clear vinyl walls blur where inside ends. The client’s verdict: “They nailed it” — and plans to replicate the design in other cities.' },
    ],
    brief: [
      'An iconic Nantucket outdoor environment for a new restaurant',
      'Make guests feel hosted at an estate, not seated at a mall',
      'An atmosphere strong enough to transport people',
      'All-season, all-weather durability for a commercial patio',
    ],
    moves: [
      { title: 'The storied tree', detail: 'A 20-year-old Kentucky coffeetree — slow-growing, tidy, spring sun and summer shade — planted in structured soil so the concrete and IPE deck never choke its roots.' },
      { title: 'Swings built for service', detail: 'Classic Nantucket porch swings adapted to rope suspension and tethered to the deck with springs — the romance without the liability.' },
      { title: 'Walls that disappear', detail: 'Phantom screens and clear vinyl panels satisfy health codes while the indoor and outdoor rooms read as one — patrons shielded from prying eyes but able to spot arriving guests.' },
      { title: 'New England, authenticated', detail: 'Custom painted Azek planters and flower boxes, wind-rated Tuuci umbrellas that stay out all season, stain-resistant Crypton cushions for a dog-friendly patio, and hand-spun gas fire.' },
    ],
    challenge: { title: 'The hard part', detail: 'Conjuring an estate atmosphere on a narrow commercial strip with a parking-lot view — the client called the seating layout the biggest challenge, and the answer was an environment so complete that the architect’s original plan (a concrete slab and a row of tables) is impossible to imagine now.' },
    materials: ['Kentucky coffeetree in structured soil', 'IPE deck', 'Tuuci wind-rated umbrellas', 'Phantom screens & clear vinyl walls', 'Custom Azek planters', 'Crushed New Hampshire seashells'],
    source: 'Awards/2018/COTY — CōV Edina commercial specialty deck',
  },

  'dreamy-santorini': {
    story: [
      { kicker: 'Before', text: 'A newly built house with a backyard the builder never touched: sloped, shady, scattered with decaying trees. A young couple, three small children, and memories of a honeymoon in Santorini.' },
      { kicker: 'The Idea', text: 'Bring the Aegean to Minnesota. White-painted brick, solid bluestone in place of sea-blue, strong vertical lines, and a four-tier patio stepping down the slope — living room, dining room, kitchen, each on its own terrace.' },
      { kicker: 'After', text: 'The see-through fireplace reads hearth-height from the sofas and table-height from dinner. Diamond patterns cut into the sandstone echo through the chimney shroud and the firebox. And the gravel bocce court is secretly the smartest thing in the yard — an oversized French drain disguised as a game.' },
    ],
    brief: [
      'Tame a sloped, shady yard the builder left behind',
      'Host everything from Friday BBQs to birthday parties',
      'A design that remembers Santorini',
      'Space that works for three young children',
    ],
    moves: [
      { title: 'Four terraces, one slope', detail: 'Retaining walls step the yard down through living, dining, and kitchen levels — the firebox sits hearth-height at the sofas and exactly table-height at the dining terrace.' },
      { title: 'The bocce-court drain', detail: 'The lowest, wettest spot in the yard became a gravel bocce court that is actually the water-catchment system — hidden strip drains along the masonry feed it invisibly.' },
      { title: 'Diamonds everywhere', detail: 'Custom 6-inch tumbled bluestone inlays pattern the patio; the diamond repeats in the chimney shroud, the firebox shape, and the Acurio panels concealing storage under the deck.' },
      { title: 'A kitchen with tiers of its own', detail: 'The angled L-shaped kitchen serves 36-inch counters for cooking, counter seating for kids, and 42-inch bar seating for adults — with a 42-inch infrared grill and a top-sunken ice well.' },
    ],
    challenge: { title: 'The hard part', detail: 'Making four different floor heights feel like one composition — bluestone steps threaded precisely between masonry elements, columns extended to the upper deck to merge the spaces, and the hot tub tucked behind a wrapping wall for the shortest winter dash from the house.' },
    materials: ['Tumbled bluestone diamond inlays', 'White-painted brick masonry', 'Solid bluestone countertops & caps', 'Timber pergola', '42-inch infrared grill & sunken ice well', 'Acurio architectural panels'],
    award: { name: 'NARI Minnesota 2023 Contractor of the Year — Gold', category: 'Residential Landscape Design & Outdoor Living' },
    source: 'Awards/2023/NARI — Dreamy Santorini submission (Copelan)',
  },

  'excelsior-escape': {
    story: [
      { kicker: 'Before', text: 'A brand-new lakefront build on a tight lot: a 50-foot shoreline setback, a bluff you can barely touch, close neighbors on both sides, and a steep drop from the upper level to the water.' },
      { kicker: 'The Idea', text: 'Let the deck flow downhill. Its steps widen into open seating at a synthetic turf terrace — the owner’s yoga retreat — where a movable firepit sits precisely on the sightline where deck meets water horizon.' },
      { kicker: 'After', text: 'The hot tub hides in an inlet of the house itself, steps from the basement door, its access vault disguised as a stair tread. Cable railing keeps every view clear, black IPE decking keeps it modern, and Starlight granite walls hold the one flat stretch of lawn the kids claimed for play.' },
    ],
    brief: [
      'Take full advantage of the lake views',
      'A hangout close to the upper deck',
      'Privacy from tight neighboring lots',
      'True indoor-outdoor living',
      'Grill, hot tub, and firepit for entertaining',
    ],
    moves: [
      { title: 'Steps that become seats', detail: 'The custom deck stairs widen and open at the turf level into an expansive seating edge — one gesture handling circulation, gathering, and the transition from architecture to landscape.' },
      { title: 'The hidden hot tub', detail: 'Tucked into a niche of the home for privacy and year-round access, with a hinged vault door built into the top step for maintenance nobody ever sees.' },
      { title: 'The horizon firepit', detail: 'Placed at the turf’s edge exactly where the view lines up with the water — and left movable, so the yoga lawn stays open.' },
      { title: 'Flat, against the odds', detail: 'A French drain runs beneath the sod parallel to the hot tub vault, swallowing bluff runoff so the final grade could stay level for play.' },
    ],
    challenge: { title: 'The hard part', detail: 'The lake owns the first fifty feet: all hardcover set back, only stairs and landings allowed in the bluff impact zone, and decks and walls counting against the total — which is exactly why they were woven into the design as usable space rather than fought.' },
    materials: ['IPE black decking', 'Stainless cable railing', 'Starlight granite retaining walls', 'Bluestone landings', 'Synthetic turf yoga terrace'],
    award: { name: 'NARI 2025 Remodeler of the Year — Regional Winner', category: 'Residential Landscape Design & Outdoor Living' },
    source: 'Awards/2024/NARI — Excelsior Escape submission (Krengel)',
  },

  'garden-grandeur': {
    story: [
      { kicker: 'Before', text: 'A bare, boring backyard with zero design elements — and homeowners dreaming of the ultimate gathering spot for their family, their big circle of friends, and her product-photography business.' },
      { kicker: 'The Idea', text: 'An extra-long pool for big parties and long summer nights, wrapped in the quiet, serene feel of Nantucket: natural stone, warm tones, and clear pathways linking pool, patio, dining, and fire pit as separate rooms of one garden.' },
      { kicker: 'After', text: 'A diamond pattern hand-worked into the concrete rings the pool, fountains arc into the water, and an antique-style wooden diving board waits at the deep end. The plantings were chosen to bloom in waves — a different “wow” every season, and a new backdrop for every photograph.' },
    ],
    brief: [
      'An extra-long pool for hosting big parties and summer kids',
      'Staging spots to photograph products for her business',
      'Quiet and serene — like Nantucket',
      'Grilling and dining near the back door',
      'A wood-burning fire pit that never looks like a chore',
    ],
    moves: [
      { title: 'Rooms without walls', detail: 'Kitchen, dining, fire pit, pool, and lounge each hold their own space, connected by clear pathways and separated by larger plantings — cohesion with distinct addresses.' },
      { title: 'The diamond deck', detail: 'A diamond design worked into the concrete around the pool’s edge — slow, exacting craftsmanship for a detail most builders would never attempt.' },
      { title: 'Fire in the floor', detail: 'The wood-burning fire pit is built directly into the patio: minimal maintenance, no freestanding eyesore, and flames at courtyard level.' },
      { title: 'A pool you can supervise from anywhere', detail: 'The water is deliberately visible from every main room inside the house — the kids swim, the parents see.' },
    ],
    challenge: { title: 'The hard part', detail: 'The grade change meant the retaining walls had to rise in phases so equipment could still reach the pool dig — while keeping the family’s garage in service through construction, and holding a clean upper terrace for the pool house they plan to build one day.' },
    materials: ['Natural stone hardscape', 'Hand-tooled diamond concrete pool surround', 'Antique-style wooden diving board', 'Pool fountains', 'Synthetic turf accents', 'Cedar pergola & privacy fencing'],
    source: 'Awards/2024/NARI — Garden Grandeur submission (Hammel)',
  },

  'hearth-hideaway': {
    story: [
      { kicker: 'Before', text: 'A builder-grade deck on a crisp new white house, a yard with no landscaping and too much slope, and a wife with a saved folder full of fireplace-and-pergola inspiration photos.' },
      { kicker: 'The Idea', text: 'When the home’s footprint allowance is already maxed out, put the fireplace on the deck. A white stucco fireplace with a custom arch — matching the arches inside the house — anchors one end under a cedar pergola, turning a plain platform into a room.' },
      { kicker: 'After', text: 'Azek wraps every column and edge, aluminum rail replaced high-maintenance cedar, and below, sandstone with black limestone inlay meets a short retaining wall that quietly levels the dining terrace. Under the deck: synthetic turf, soft and shaded, claimed immediately by the kids.' },
    ],
    brief: [
      'Dress up a builder-grade deck into real architecture',
      'A furniture plan that finally makes sense',
      'Patio space big enough for dining and a fire pit',
      'The fireplace and pergola from her inspiration photos',
      'Low maintenance, minimal plantings, shaded play space below',
    ],
    moves: [
      { title: 'The fireplace on the deck', detail: 'With the building footprint maxed, the fireplace moved up onto the deck itself — white stucco with a custom arch echoing the home’s interior arches, cedar mantel warm against the crisp cladding.' },
      { title: 'Builder-grade, erased', detail: 'Azek column wraps, fascia, and trim detail run the deck’s perimeter and down the staircase; the cedar handrail gave way to aluminum.' },
      { title: 'One small wall, two rooms', detail: 'A short retaining wall levels just the section of yard needed for dining and lounge — a minor elevation change that draws a clear line between open lawn and gathered space.' },
      { title: 'Water, handled invisibly', detail: 'A catchment system lives inside the synthetic turf build-up and a small rain garden hides in the tree planting — the city’s mitigation requirement, made into landscape.' },
    ],
    challenge: { title: 'The hard part', detail: 'Zoning twice over: no room left in the building footprint for the fireplace the client most wanted (solved on the deck), and mandatory water mitigation for any new hardscape (solved under the turf and inside a rain garden).' },
    materials: ['White stucco arched fireplace', 'Cedar pergola & custom mantel', 'Azek wraps, fascia & trim', 'Sandstone patio with black limestone inlay', 'Synthetic turf play space', 'Aluminum railing'],
    award: { name: 'NARI Minnesota 2024 Remodeler of the Year — Gold', category: 'Residential Landscape Design & Outdoor Living' },
    source: 'Awards/2024/NARI — Hearth Hideaway submission (Veeser)',
  },

  'lake-house-lavatory': {
    story: [
      { kicker: 'Before', text: 'Five feet by five feet, a lone pedestal sink, and the busiest crossroads in the house — off the mudroom, beside the kitchen, on the way out the door. A farmhouse powder room that had to serve two young girls now and their teenage years later.' },
      { kicker: 'The Idea', text: 'Treat the tiny room like jewelry. A vanity hand-drawn for a local furniture builder, inspired by a piece the family already loved, with cane wicker drawer panels and deep full-extension drawers for the everyday stash.' },
      { kicker: 'After', text: 'Handmade encaustic tile — from the city the client once called home — spreads like a painted canvas underfoot. Star pendants echo the tile’s geometry overhead, sconces with lucite tails dim from makeup-bright to nightlight, and the wall-mounted faucet buys back every inch of marble counter.' },
    ],
    brief: [
      'Flexibility for a busy family with two young girls',
      'A space that grows with them into their teens',
      'Quick stash spots for everyday items',
      'Still pretty and functional for guests',
    ],
    moves: [
      { title: 'The hand-drawn vanity', detail: 'Designed in-house and built by a local furniture maker — cane wicker panels, two deep full-extension drawers — furniture first, fixture second.' },
      { title: 'Tile with a hometown', detail: 'Handmade encaustic tiles from the client’s former city replaced dark wood flooring — a black-and-white painted canvas the whole room plays from.' },
      { title: 'Light on dimmers, mood on demand', detail: 'A geometric fixture over the mirror pulls the eye up; jewelry-like sconces with lucite tails and linen shades dim independently, from event-makeup bright to entertaining glow.' },
      { title: 'Counter space from thin air', detail: 'Under-mounting the sink in marble and moving the faucet to the wall opened real landing space in a five-foot room — plus a wall niche and floating shelves for the rest.' },
    ],
    challenge: { title: 'The hard part', detail: 'Twenty-five square feet, no storage, no counter — every solution had to do two jobs, from the seat-height fountain stone to drawers sized for toiletries to lighting that redraws the room’s size.' },
    materials: ['Handmade encaustic tile flooring', 'Custom cane-wicker vanity', 'Marble sink with curved backsplash', 'Champagne brass wall-mounted faucet', 'Wire-brushed floating shelves', 'Custom wallpaper'],
    source: 'Awards/2022/NARI — Lake House Lavatory regional submission',
  },

  'lakeside-leisure': {
    story: [
      { kicker: 'Before', text: 'A lakefront home with a small, high-maintenance cedar deck, stairs in the wrong place, seating nowhere, a neighbor too close on the south side — and lake views the house itself kept interrupting.' },
      { kicker: 'The Idea', text: 'Double the deck and open the wall. A centrally-placed set of French doors with sidelites replaced the old bank of kitchen windows, so the lake greets you from inside the house — then composite decking and cable rail carry the view out without a single visual snag.' },
      { kicker: 'After', text: 'Pergolas run the full back of the home, their rafters aligned so the rhythm reads true from the deck, the living room, and the great room below. Hanging egg chairs sway in the covered under-deck room, and the relocated south staircase quietly doubles as the privacy screen they always wanted.' },
    ],
    brief: [
      'More outdoor living — dining, lounging, and shade',
      'One area fully protected from rain',
      'Privacy from the south neighbor',
      'A better deck in every way: size, views, access, materials',
      'Low maintenance, everywhere',
    ],
    moves: [
      { title: 'Twice the deck, none of the upkeep', detail: 'The deck doubled in size in TimberTech composite with stainless cable and aluminum rail — durability that never blocks the water.' },
      { title: 'The French-door move', detail: 'A bank of kitchen windows and an awkward pedestrian door became one centered French-door system with sidelites — smoother kitchen flow, a straight exit to the deck, and a lake view from inside.' },
      { title: 'Stairs as screen', detail: 'The staircase moved to the south edge where it blocks the neighbor’s sightline, a second stair opened front-yard access, and the space underneath became a dried-in outdoor room.' },
      { title: 'Forty-five pieces per column', detail: 'Tapered craftsman columns carry from deck to pergolas to the rebuilt bedroom balcony — each one assembled on site from forty-five separate pieces.' },
    ],
    challenge: { title: 'The hard part', detail: 'A full restructuring of the south retaining wall — large boulders placed one by one to win the flat yard — with deck crews and landscape crews stacked on the same tight site, one unable to start until the other finished beneath them.' },
    materials: ['TimberTech composite decking', 'Stainless cable & aluminum railing', 'Azek beadboard ceiling & column wraps', 'Cedar-toned pergolas', 'Boulder retaining walls', 'Hanging egg chairs'],
    source: 'Awards/2024/NARI — Lakeside Leisure submission (Erickson)',
  },
}
