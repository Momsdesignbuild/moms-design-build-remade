// Shared navigation card grids for service pages — extracted verbatim from the
// pre-migration route files (July 9). These are NAVIGATION, kept in code on
// purpose: one definition serves ~38 pages, so they can't drift page-to-page.
export type ServiceCard = { title: string; href: string; bg: string };

// the 17-card landscape sub-service grid (used by the LA hub + its sub-pages)
export const LANDSCAPE_CARDS: ServiceCard[] = [
  {
    "title": "CUSTOM DECKS",
    "href": "/services/landscape-architecture/custom-decks/",
    "bg": "https://cdn.sanity.io/images/wavk40jo/production/ba642e307e44df34d2f961b0071997a044876354-750x500.jpg"
  },
  {
    "title": "FIRE",
    "href": "/services/landscape-architecture/fire/",
    "bg": "https://cdn.sanity.io/images/wavk40jo/production/bdb4a80ce41395cb7a1c5780c55d3581f6e3b26f-1600x2400.jpg"
  },
  {
    "title": "GARDENS",
    "href": "/services/landscape-architecture/gardens/",
    "bg": "https://cdn.sanity.io/images/wavk40jo/production/57d5761f853fbd7677e1a6b319a4de33a89fe965-750x500.jpg"
  },
  {
    "title": "FRONT ENTRIES",
    "href": "/services/landscape-architecture/front-entries/",
    "bg": "https://cdn.sanity.io/images/wavk40jo/production/434e9f29ed5429f397f305bb09a87edbdf5e55fd-2400x1600.jpg"
  },
  {
    "title": "AUTOMATED MOTORIZED SCREENS",
    "href": "/services/landscape-architecture/automated-motorized-screens/",
    "bg": "https://cdn.sanity.io/images/wavk40jo/production/552880aa664f08fd9af9dea4393033b774bfb149-1600x2400.jpg"
  },
  {
    "title": "HOT TUBS",
    "href": "/services/landscape-architecture/hot-tubs/",
    "bg": "https://cdn.sanity.io/images/wavk40jo/production/a244476d866f539dbd245a9e9c28649c99c60dbd-2400x1600.jpg"
  },
  {
    "title": "LANDSCAPE LIGHTING",
    "href": "/services/landscape-architecture/landscape-lighting/",
    "bg": "https://cdn.sanity.io/images/wavk40jo/production/3901cb5f53a1c38f871f6aa477b49b294a873197-1079x720.jpg"
  },
  {
    "title": "PATIOS",
    "href": "/services/landscape-architecture/patios/",
    "bg": "https://cdn.sanity.io/images/wavk40jo/production/3bd75843eaee0c0e6b3e0c7306ad454db14042f2-2400x1601.jpg"
  },
  {
    "title": "POOLS",
    "href": "/services/landscape-architecture/pools/",
    "bg": "https://cdn.sanity.io/images/wavk40jo/production/e6006c77d9df8d2f92f5f5381ef328887191dac8-2048x1366.jpg"
  },
  {
    "title": "OUTDOOR KITCHENS",
    "href": "/services/landscape-architecture/outdoor-kitchens/",
    "bg": "https://cdn.sanity.io/images/wavk40jo/production/c479c812c1bca9f12e961929ca252187e9ab5938-1600x1585.jpg"
  },
  {
    "title": "PERGOLAS AND PAVILIONS",
    "href": "/services/landscape-architecture/pergolas-and-pavilions/",
    "bg": "https://cdn.sanity.io/images/wavk40jo/production/2174226bc79ca2569b07f917f03136ffce55bad4-2500x1667.jpg"
  },
  {
    "title": "RECREATION",
    "href": "/services/landscape-architecture/recreational-spaces/",
    "bg": "https://cdn.sanity.io/images/wavk40jo/production/d93f4c5cbe1f6b32d903824fbb42b46a850acdf3-750x500.jpg"
  },
  {
    "title": "NATURAL STONEWORK",
    "href": "/services/landscape-architecture/natural-stonework/",
    "bg": "https://cdn.sanity.io/images/wavk40jo/production/d43c929141a6b66b07a07b7016cd9b45a01a3b8e-2560x1716.jpg"
  },
  {
    "title": "WATER FEATURES",
    "href": "/services/landscape-architecture/water-features/",
    "bg": "https://cdn.sanity.io/images/wavk40jo/production/e95812dc4475dd143cdcaa4b05695fadefc6cdcd-2500x1667.jpg"
  },
  {
    "title": "METALWORK",
    "href": "/services/landscape-architecture/metalwork/",
    "bg": "https://cdn.sanity.io/images/wavk40jo/production/1ffa778ddafbf51ee6703659d2fa8f2e75245622-750x1120.webp"
  },
  {
    "title": "RETAINING WALLS",
    "href": "/services/landscape-architecture/retaining-walls/",
    "bg": "https://cdn.sanity.io/images/wavk40jo/production/30773c3bc37b607627a122a48f886396bb8cc485-1601x2400.jpg"
  },
  {
    "title": "COMMERCIAL SPACES",
    "href": "/commercial-spaces/",
    "bg": "https://cdn.sanity.io/images/wavk40jo/production/8c23685643bec67498b4f92d7628fbb8387db08c-2400x1600.jpg"
  }
];

// the interior hub's 3-card grid
export const INTERIOR_HUB_CARDS: ServiceCard[] = [
  {
    "title": "KITCHENS",
    "href": "/services/landscape-architecture/kitchen-interior-remodeling/",
    "bg": "https://cdn.sanity.io/images/wavk40jo/production/e8a89a12d85b1b115c9966e277c9c37745ba9c70-2400x1600.jpg"
  },
  {
    "title": "BATHROOMS",
    "href": "/services/landscape-architecture/bathroom-remodeling/",
    "bg": "https://cdn.sanity.io/images/wavk40jo/production/48a36201edec7e61fab8970e763c677e82674523-2400x1601.jpg"
  },
  {
    "title": "LIVING & COMMON AREAS",
    "href": "/services/interior-design-and-remodeling/living-and-common-area-remodeling/",
    "bg": "https://cdn.sanity.io/images/wavk40jo/production/c7f944134634480eae2b0dd964e16d8641465a16-2400x1601.jpg"
  }
];

export const CARD_SETS: Record<string, ServiceCard[]> = {
  landscape: LANDSCAPE_CARDS,
  interiorHub: INTERIOR_HUB_CARDS,
};
