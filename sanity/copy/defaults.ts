// The starting words + photos for every page that has no editor of its own.
// This ONE file feeds three things: the Studio fields (sanity/copy/schema.ts
// builds a field per entry here), the seed script (scripts/seed-page-copy.mjs
// copies it into Sanity once), and the live site (an empty Studio field falls
// back to the value here). After the seed, the Studio wins; editing this file
// never changes the live site. Plain data only: no imports, no code.
//
// Conventions: a photo is I(url, alt). In a paragraph, *stars* highlight words.

export const I = (url: string, alt = '') => ({ url, alt })

const CDN = 'https://cdn.sanity.io/images/wavk40jo/production/'

export const COPY = {
  // ── Site-wide: menus, contact details, footer ──
  nav: {
    header: [
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'About', href: '/about' },
      {
        label: 'Process',
        href: '/process',
        children: [
          { label: 'Homeowner Portal', href: '/homeowner-portal' },
          { label: "The Mom's Way", href: '/process' },
        ],
      },
      {
        label: 'Services',
        href: '/services',
        children: [
          { label: 'Landscape Architecture', href: '/services/landscape-architecture' },
          { label: 'Interior Design & Remodeling', href: '/services/interior-design-and-remodeling' },
          { label: 'Residential Fine Gardening', href: '/services/garden-management' },
          // yes, "commerical": the live slug carries this typo; keeping it preserves the URL
          { label: 'Commercial Maintenance', href: '/services/commerical-maintenance' },
        ],
      },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
    ],
    footerLinks: [
      { label: 'Home', href: '/' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'About', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Blog', href: '/blog' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
    ],
    // icons are picked by the name: Instagram, Facebook, Pinterest, LinkedIn, Houzz
    socials: [
      { label: 'Instagram', href: 'https://www.instagram.com/momsdesignbuild/' },
      { label: 'Facebook', href: 'http://www.facebook.com/momsdesignbuild' },
      { label: 'Pinterest', href: 'https://www.pinterest.com/momsdesignbuild/' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/momsdesignbuild' },
      { label: 'Houzz', href: 'http://www.houzz.com/pro/momsdesignbuild' },
    ],
    addressLines: ['12275 Weckman Road', 'Shakopee, MN 55379'],
    addressLink: 'https://www.google.com/maps/search/12275+Weckman+Road+Shakopee+MN+55379',
    phone: '952.277.6667',
    phoneHref: 'tel:+19522776667',
    email: 'hello@momsdesignbuild.com',
    copyright: "Mom's Design Build. All Rights Reserved. | BC# 638384",
  },

  // ── About ──
  about: {
    metaTitle: "About Mom's Design Build - Landscape & Remodeling Design",
    metaDescription: "Discover the talented team behind Mom's Design Build, an award-winning landscape and interior remodel design firm based in Minnesota.",
    heroImage: I(CDN + '7eea8bef60c3713a0431574b13024cba6eb7ee2f-2560x1581.jpg', "Mom's Design Build - Meet the Team!"),
    storyHeading: 'The Story Behind the Name',
    story: [
      'Simple as it may seem, *the Mom’s name refers to a philosophy*—a belief we hold that people matter.',
      'Founder Jim Sweeney grew up in a lively home with eight siblings—filled with laughter, occasional bickering, and the constant hustle of meals and daily chaos. As the story goes, Jim recalls the one thing rising above the chaos was his mom’s unwavering care and strength. In her presence, he always found a listening ear, a devoted problem solver, and a steadfast champion of his spirit.',
      'In 1993, Jim founded Mom’s Landscaping with those qualities in mind. He set out to build a company that would be a champion for the human spirit. A company who would embody a relentless desire to serve others.',
      'Through building strong relationships and a commitment to quality, Mom’s Landscaping grew from just a couple of guys with a lawnmower into *the most award-winning design-build firm in the Midwest*—now known as Mom’s Design Build. Jim Sweeney and his business partner Craig Weckman have a half century of combined experience in design and construction. Their vast knowledge in the industry and progressive vision have a proven track record. Jim and Craig credit their success to the talented, professional, and service-focused team at Mom’s whose skill and artistry are lived out every day.',
    ],
    teamHeading: 'Meet Our Award-Winning Team',
    // job titles come from each person's Team Members page; here you set the order, the photo and the link
    team: [
      { name: "Jim Sweeney", href: '/team/jim-sweeney', photo: I(CDN + '70186490433697653f87fe3f4e28deca0789249d-1024x1024.jpg', "Jim B&W Mom's Design Build") },
      { name: "Craig Weckman", href: '/team/craig-weckman', photo: I(CDN + '9b03bc4b6fba9f9a6d9abb896950c93b024affb4-1024x1024.jpg', "Craig Weckman - COO at Mom's Design Build") },
      { name: "Shanna Ballsrud", href: '/team/shanna-ballsrud', photo: I(CDN + '632b29fc689935e7d6cea75dfc0c17cd08a7c3a7-1200x1200.jpg', "Shanna Ballsrud - Controller, Systems Developer, and HR at Mom's Design Build in MN") },
      { name: "Becca Bastyr", href: '/team/becca-bastyr', photo: I(CDN + '015079607ddfeb5f76a201410bf8f24acfdde6d6-1024x1024.jpg', "Becca Bastyr - Mom's Design Build Senior Landscape Designer") },
      { name: "Heather Sweeney", href: '/team/heather-sweeney', photo: I(CDN + 'ed37799df8fd3c3982cb1396c98a7a76bae6deb0-1024x1024.jpg', "Heather Sweeney - Senior Landscape Designer at Mom's Design Build") },
      { name: "Aaron Calley", href: '/team/aaron-calley', photo: I(CDN + '30f7172255e7d6e9955e94d298caadc716285d95-1200x1200.jpg', "Aaron Calley - Senior Landscape Designer at Mom's Design Build - Most Awarded Design Build Firm in the Midwest") },
      { name: "Melissa Mlejnek", href: '/team/melissa-mlejnek', photo: I(CDN + '9136ae17e40dd6a507d269c3d3d9af13db3001bc-1024x1024.jpg', "Melissa Mlejnek - Senior Interior Designer - Mom's Design Build") },
      { name: "Owen Sweeney", href: '/team/owen-sweeney', photo: I(CDN + '360eb27d6d1b830b982ce36f80c29357b7c52f2c-1024x1024.jpg', "Owen Sweeney - Landscape Designer - Mom's Design Build") },
      { name: "Brittney Udenberg", href: '/team/brittney-udenberg', photo: I(CDN + '5125fa61dc71a8db6f5266d8832c07262c1044e4-1024x1024.jpg', "Brittney Udenberg - Designer at Mom's Design Build") },
      { name: "Melanie Bolson", href: '/team/melanie-bolson', photo: I(CDN + 'dfd559bc5f26a0836faa553629f83dbe2841fd1a-1200x1200.jpg', "Melanie Bolson - Special Projects Manager and Designer at Mom's Design Build - The Most Awarded Design Build Firm in MN") },
      { name: "Cherilyn Tangen", href: '/team/cherilyn-tangen', photo: I(CDN + 'ac692b8ab5929453e0c02dcdbca8e8c305d49aad-1024x1024.jpg', "Cherilyn Tangen - Office Manager at Mom's Design Build") },
      { name: "Natalie Hahn", href: '/team/natalie-hahn', photo: I(CDN + '29fda6846ad76f983f558193edcf9d0951887b3a-1024x1024.jpg', "Natalie Hahn - Director of Fine Gardening at Mom's Design Build") },
      { name: "Mike Weckman", href: '/team/mike-weckman', photo: I(CDN + '34e46a4a72851ae5a184c474c6adcd7dabb68881-1024x1024.jpg', "Mike Weckman - Senior Carpenter at Mom's Design Build") },
      { name: "Kelly Lindell", href: '/team/kelly-lindell', photo: I(CDN + 'f7c4351e6a6e2b10c8d6734ca5a2457ace8e2595-1024x1024.jpg', "Kelly Lindell - Director of Operations at Mom's Design Build, Minnesota") },
      { name: "Alex Birkenbeuel", href: '/team/alex-birkenbeuel', photo: I(CDN + '8c7192e2fd6a062739c188da4d2c0c9f3767809a-1024x1024.jpg', "Alex Birkenbeuel - Commerical Maintenance & Operations Manager - Mom's Design Build") },
      { name: "Kelley Woodhead", href: '/team/kelley-woodhead', photo: I(CDN + '69a5256da77cecab3e4e514c0b60c111a6733101-1024x1024.jpg', "Kelley Woodhead - Project Manager - Mom's Design Build") },
      { name: "Tony Denman", href: '/team/tony-denman', photo: I(CDN + '74b00bb35a4bf0aa30deb119addd695872b34b4e-1024x1024.jpg', "Tony Denman - Project Manager - Mom's Design Build") },
      { name: "Chris Moller", href: '/team/chris-moller', photo: I(CDN + 'a102606db43edcfd2b1d625110869b3d24c81bd1-1024x1024.jpg', "Chris Moller - Production Specialty Manager at Mom's Design Build") },
      { name: "Alyssa Stommel", href: '/team/alyssa-stommel', photo: I(CDN + '29a85c802d484e8ef9d39258d9acb68981f70866-1200x1200.jpg', "Alyssa Stommel - Project Coordinator at Mom's Design Build - Most Awarded Design Build Firm in the Midwest") },
      { name: "Cara Anderson", href: '/team/cara-anderson', photo: I(CDN + '1a76ee8840fc2cb1f8d313112551545af74cd188-1024x1024.jpg', "Project Coordinator at Mom's Design Build - Most Awarded Design Build Firm in the Midwest") },
      { name: "Heather Kubista", href: '/team/heather-kubista', photo: I(CDN + 'c22b38f68e98a49d5686e9c9574506468817eed8-1024x1024.jpg', "Heather Kubista - Project Coordinator at Mom's Design Build - Seamlessly Blending Indoor & Outdoor Living Since 1993") },
      { name: "Jay Forbes", href: '/team/jay-forbes', photo: I(CDN + 'b06b0d13451ce3f6f7ea6410a3366873853bdd82-1024x1024.jpg', "Jay Forbes - Project Coordinator - Mom's Design Build") },
      { name: "Summer Ostendorf", href: '/team/summer-ostendorf', photo: I(CDN + 'e63d8ff6f2331ed31d22e90b018b0170861b6c1b-1024x1024.jpg', "Summer Ostendorf - Director of Marketing - Mom's Design Build") },
      { name: "Ingrid Liljenquist", href: '/team/ingrid-liljenquist', photo: I(CDN + '84ade2ee920cb1b830204fa75a0730e90b30945c-1024x1024.jpg', "Ingrid Liljenquist - Marketing Coordinator at Mom's Design Build") },
      { name: "Jazper Wiebusch", href: '/team/jazper-wiebusch', photo: I(CDN + '889be4555ddc033829a5eb60939ddfeff26e9d31-1024x1024.jpg', "Social Media Specialist at Mom's Design Build - The Most Awarded Design Build Firm in the Midwest - Jazper Wiebusch") },
      { name: "Joshua Montanez", href: '/team/joshua-montanez', photo: I(CDN + '840f202afd4c76eecb7fb3cd7698d784f9d12896-1200x1200.jpg', "Joshua Montanez - Business Systems and Automations Specialist at Mom's Design Build MN") },
    ] as { name: string; href: string; photo: { url: string; alt: string } }[],
    missionHeading: 'Our Mission',
    mission: 'To serve people through the fusion of anthropology, horticulture, and architecture, in order to discover, create, and enhance distinctive places.',
    valuesHeading: 'Core Values',
    values: ['People Matter', 'Show Up and Give a $#!T', 'Respect', 'Be Grateful and Positive', 'Prepare and Adapt', 'Make a Better Tomorrow'],
    ctaLabel: 'Meet With Us',
    ctaHref: '/contact',
  },

  // ── Process ──
  process: {
    metaTitle: "Home & Landscape Design Process - Mom's Design Build Company",
    metaDescription: "Mom's Design Build is with you throughout the whole design build process from consultation to a tour of your new space. Let's make your project a reality.",
    eyebrow: 'The Process',
    heading: 'The Mom’s Way',
    subline: 'From first conversation to happily ever after.',
    steps: [
      {
        title: 'Creative Process',
        paras: [
          'Finding the right designer for your home is an important decision, as is selecting the company that will install it. We believe that by being both your design and build company, Mom’s will ultimately make your life a little bit easier and your lifestyle a lot more satisfying.',
          'To help you see the advantage of a seamless vision from beginning to end, let us introduce you to our unique process. It is the attention to detail in every step that makes your project a success!',
        ],
        photo: I(CDN + '2b4e6787fd4bac092a117cc4aedc320deca4f735-7161x4776.jpg'),
      },
      {
        title: 'Initial Consultation and Design Interview',
        paras: [
          'The first meeting is for us to get to know you and to be introduced to your space. To inspire you, we will proudly show off some of our past achievements. Your designer will listen to your personal dreams and lifestyle needs to inspire a plan for you and your space. At the end of this introductory assessment, we provide a cost estimate for the next phase: developing a comprehensive design.',
          'After receiving the design fee, we are able to move forward and develop a physical plan for the space that you and the designer have envisioned. At this point, the designer will ask for any surveys or architectural plans you may have.',
          'To tailor a space around your unique preferences, your designer will spend time becoming acquainted with you, your tastes and your goals for your lifestyle.',
          'You may choose to explore magazines and websites such as Pinterest and Houzz to build a collection of images that strike your fancy. This can help you (and us) hone in on your style preferences. In the end, we want you to say, “Mom’s gets me!”',
        ],
        photo: I(CDN + '1f939b035c27489dc0ae038fcbce57c3b8d66481-750x501.jpg'),
      },
      {
        title: 'Design Development and Concept Presentation',
        paras: [
          'After gathering the necessary information, the designer heads back to the drawing board where the magic making begins. The designer melds your insights with his or her own creative inspirations drawn from architecture, art, science and the world around us. This culminates into a design – not just any design, mind you, a design that is a meaningful reflection of your unique style and accomplishes your goals for how you will experience your home.',
          'The concept presentation is the exciting moment when the designers share their vision for your space: a presentation that includes 3-D renderings, picture pages, perhaps some samples of proposed materials and a feasibility study assessing project costs. These tools facilitate moving onto the next step…turning your dream into reality! The designer works with you to determine the actual scope of the project and to refine some of the details. If needed, we can also recommend an efficient approach to phasing out the construction.',
        ],
        photo: I(CDN + 'eaed7d324d0437f2b6ced1645242478d2bef0d0a-500x375.jpg'),
      },
      {
        title: 'Architectural Detailing, Engineering & Construction Documentation',
        paras: [
          'Mom’s projects often include custom-designed structures. They are placed and personalized not only to be functional, but to also enhance the overall setting and to beautifully tell the story of your space and how you live. To ensure the story endures, a structural engineer may be brought in to develop the details of design and construction. Depending on the project, engineering may be required by the city, and additional detailing may also be required. We think you’ll agree that the extra cost is worth it.',
        ],
        photo: I(CDN + 'ce6de2ed591aa08acbfc1c846d1dab1da11008fa-500x324.png'),
      },
      {
        title: 'Selections',
        paras: [
          'Get ready for the really fun part! Even if you typically don’t find pleasure in choosing things like fabrics, lighting, furniture, stone and other decorative elements, your designer is there to guide you and help make it an enjoyable process. It’s this personal attention that results in a project with artistry, energy and soul. You’re going to love it! Seriously.',
        ],
        photo: I(CDN + 'fac2b7742dd5c5c059e1721d65f0b5de37e6899d-350x290.jpg'),
      },
      {
        title: 'Breaking Ground',
        paras: [
          'Welcome to the wonderful (and somewhat messy) world of construction. This is the phase we like to call, “Muscle, brawn, grit and finesse.” It’s where our proficient teams skillfully merge old world craftsmanship with new world technology as they dive right in to shape your distinctive space. (Here’s a little secret: As tough and focused as these guys may seem, truth is, they’re sensitive craftsmen who understand your daily life goes on amidst their fast-paced activity.)',
        ],
        photo: I(CDN + '5a69ef7e4226443dc7a2fbc4b0bb24f516b5be96-350x290.jpg'),
      },
      {
        title: 'Your Dreams Realized',
        paras: [
          'Alas! It’s time to pop open some bubbly and celebrate the achievement of your new lifestyle investment: your completed living space! Your designer (by now your new best friend) will take you on an in-depth tour throughout the finished spaces to highlight the design features, discuss proper maintenance and answer your questions. Hugs all around!',
        ],
        photo: I(CDN + '068f4ebb8e9b9a867062e26db520ad0f6a58c5c5-500x334.jpg'),
      },
      {
        title: 'Happily Ever After',
        paras: [
          'Your relationship with Mom’s doesn’t have to end there. We want your newly created space – and your delight in it – to last for a long, long, LONG time! With that in mind, we have created a Fine Gardening Division to help you care for your new landscape. We offer flexible service plans to tailor our maintenance offerings to your property.',
        ],
        photo: I(CDN + '29f097e61ea26ae6b5f374a70d7dd672bbf6e247-750x500.jpg'),
      },
      {
        title: 'Best in Class Warranty',
        paras: [
          'Mom’s will take care of you. We want your new space to endure the test of time. To that end, we have developed our warranty with you in mind. We offer a 1-year plant warranty, 5-year hardscape warranty, 10-year deck warranty and so much more! Our goal is your peace of mind. Download the full warranty here.',
        ],
        warrantyButtons: true,
      },
    ] as { title: string; paras: string[]; photo?: { url: string; alt: string }; warrantyButtons?: boolean }[],
    warrantyLabel: 'Best in Class Warranty',
    warrantyUrl: 'https://cdn.sanity.io/files/wavk40jo/production/25db9c7900412d5804296d38abb9eb145bb8c1ab.pdf',
    guidelinesLabel: 'Minimum Performance Guidelines',
    guidelinesUrl: 'https://www.paradeofhomes.org/resources/managing-your-home/minimum-performance-guidelines/',
    ctaEyebrow: 'Your Turn',
    ctaHeading: 'Build Your Legacy',
    ctaText: 'Ready to begin the Mom’s Way? Let’s talk.',
    ctaLabel: 'Meet With Us',
    ctaHref: '/contact',
  },

  // ── Contact ── (address, phone and email come from the site-wide details)
  contact: {
    metaTitle: "Contact Mom's Design Build - Landscape & Interior Design",
    metaDescription: "Mom's Design Build offers custom luxury landscaping, remodeling & gardening services to the Twin Cities, MN and surrounding areas. Let's chat!",
    heading: 'Let’s Talk',
    subline: "Ready to start your project? We'd love to hear from you.",
    infoHeading: 'Get in Touch',
    addressLabel: 'Address',
    phoneLabel: 'Phone',
    emailLabel: 'Email',
    formHeading: 'Send a Message',
    careerHeading: 'Looking for a Career?',
    careerText: 'Help us build a better tomorrow by joining our team today! A variety of full-time and part-time positions are available!',
    careerLabel: 'Career Opportunities',
    careerHref: '/careers',
  },

  // ── Services (the page with the four cards) ──
  services: {
    metaTitle: "Landscaping & Home Remodeling in Minnesota - Mom's Design Build Services",
    metaDescription: "Mom's Design Build offers luxury landscape architecture and design, interior design and remodeling, & Fine Gardening in MN. Contact us today!",
    hiddenHeading: 'Our Services — Landscaping & Home Remodeling in Minnesota',
    learnMoreLabel: 'Learn More',
    cards: [
      {
        title: 'Landscape Architecture',
        href: '/services/landscape-architecture',
        image: I(CDN + '04e8d131adca65ec9a98361a52ab66ed44f4e409-768x431.jpg', "Mom's Design Build Landscape Architecture — outdoor living design in Minnesota"),
        description: 'We tailor each outdoor living space to suit your lifestyle: from colorful gardens, cozy fire pits, peaceful water features and patios to outdoor kitchens, pavilions, and pool houses. We will help you dream and create your ideal outdoor living environment!',
      },
      {
        title: 'Interior Design and Remodeling',
        href: '/services/interior-design-and-remodeling',
        image: I(CDN + '91c34d378586d02a69723e86369183298f13df30-768x512.jpg', "Mom's Design Build Interior Design and Remodeling — custom spaces in Minnesota"),
        description: 'Whether your project is new construction, remodeling, or an addition, we combine beauty and function to create custom spaces to fit your lifestyle. From beginning to end– the design, selections, ordering, and building are handled seamlessly by our team.',
      },
      {
        title: 'Residential Fine Gardening',
        href: '/services/garden-management',
        image: I(CDN + '955df2aa9dba1df55b7259322038aca03f43ef6d-768x512.jpg', "Mom's Fine Gardening — residential garden maintenance in Minnesota"),
        description: 'Our team of horticulturists and gardeners deliver a comprehensive offering of landscape management services including annual container design, bi-weekly maintenance packages, disease and pest control, pond and spa treatments, and seasonal decorating.',
      },
      {
        title: 'Commercial Maintenance',
        href: '/services/commerical-maintenance',
        image: I(CDN + '76b6e92d3cbfa29d0db6230a4f610adec8971951-768x512.jpg', "Mom's Commercial Maintenance — professional grounds care in Minnesota"),
        description: "Your property is often the first impression your business makes, and we ensure it's stunning. Mom's Commercial Maintenance delivers customized plans, luxury-level service, and responsive support to keep your grounds clean, professional, and disruption-free year-round.",
      },
    ],
  },

  // ── Careers, Portfolio, Blog, Team: the intro text on each list page ──
  careers: {
    metaTitle: "Careers At Mom's Design Build - Explore Job Opportunities",
    metaDescription: "Mom's Design Build is looking for talented applicants from designers to builders in MN. Explore our job openings and submit your application today!",
    heading: 'Careers',
    intro: "We're always looking for talented, passionate people to join our team. Be part of Minnesota's most award-winning design-build firm.",
    ctaText: "Don't see the right role? We'd still love to hear from you.",
    ctaLabel: 'Meet With Us',
    ctaHref: '/contact',
  },
  portfolio: {
    metaTitle: "Landscape & Interior Design Build Portfolio - Mom's Design Build",
    metaDescription: "Mom's Design Build has completed a variety of custom luxury interior and landscape projects for our clients in Minnesota. Explore our design-build portfolio today!",
    heading: 'Portfolio',
  },
  blog: {
    metaTitle: "Mom's Design Build Blog - Explore Home & Landscape Design",
    metaDescription: "The Mom's Design Build Blog is composed of various current trends and home design ideas that are sure to inspire your next project.",
    heading: 'The Blog',
    subline: 'Current trends, project stories, and home & landscape design ideas.',
    latestLabel: 'Latest',
    readLabel: 'Read the Story →',
  },
  team: {
    metaTitle: "Team Members Archive - Mom's Design Build",
    metaDescription: "Meet the designers, project managers, and craftspeople behind Mom's Design Build — the most awarded landscape design firm in the Midwest.",
    heading: 'Our Team',
  },
  // ── Commercial Maintenance (CM): its own section at /commercial, own header + footer ──
  cm: {
    metaTitle: "Commercial Landscape Maintenance & Snow Removal in the Twin Cities - Mom's Commercial Maintenance",
    metaDescription: "Mom's Commercial Maintenance, a division of Mom's Design Build: turf management, seasonal clean-up, fine gardening, irrigation, snow and ice management, holiday decorating and palm trees for Twin Cities commercial properties.",
    logo: I(CDN + '4e380cc16154871226fe0a20a5d57357c8202f4b-999x194.png', "Mom's Commercial Maintenance, a division of Mom's Design Build"),
    servicesLabel: 'Services',
    propertiesLabel: 'Service Areas',
    aboutLabel: 'About',
    ctaLabel: 'Meet With Us',
    moreLabel: 'More',
    moreItems: [
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
    ],
    blogLabel: 'Blog',
    contactMetaTitle: "Contact Mom's Commercial Maintenance - Twin Cities Commercial Grounds & Snow",
    contactMetaDescription: "Meet with Mom's Commercial Maintenance about commercial landscape maintenance, snow removal and seasonal services for your Twin Cities property.",
    contactHeading: 'Meet With Us',
    contactSubline: 'Tell us about your property and we will build a plan around your schedule and your standards.',
    otherServicesHeading: 'Residential & Design-Build',
    otherServices: [
      { label: 'Landscape Architecture', href: '/services/landscape-architecture' },
      { label: 'Interior Design & Remodeling', href: '/services/interior-design-and-remodeling' },
      { label: 'Residential Fine Gardening', href: '/services/garden-management' },
    ],
    careersLabel: "Mom's Design Build Careers",
    heroImage: I(CDN + '8db9cd9d931f3443822eb032c576f49ced32a482-2400x1600.jpg', "A commercial property maintained by Mom's Commercial Maintenance"),
    seasonsImage: I(CDN + '5d382e460a015cf152496efda47d158f66b4efb3-1920x1080.jpg', "A commercial building with a manicured lawn and gardens, maintained by Mom's Commercial Maintenance"),
    seasonsVideo: 'https://cdn.sanity.io/files/wavk40jo/production/73b8b5364a6483ece52e0c51e28ef2e38f316b17.mp4', // the full-screen scroll scene after the hero: summer, fall, winter (8s, desktop)
    seasonsVideoMobile: 'https://cdn.sanity.io/files/wavk40jo/production/7fc14f95129bde394ff62071b7f800e98e411963.mp4', // lighter 960px file for phones
    seasonsStatement: 'A property doesn\'t fall apart overnight. It slips one season at a time, so nobody notices', // lights up word by word as the scene scrolls
    seasonsStatementAccent: 'until the day a customer does.', // serif italic
    seasons: [
      { label: 'Summer', service: 'Turf Management & Fine Gardening' },
      { label: 'Fall', service: 'Spring & Fall Clean-Up' },
      { label: 'Winter', service: 'Snow & Ice Management' },
    ],
    heroKicker: "A Division of Mom's Design Build",
    heroHeading: "Mom's Commercial Maintenance",
    heroLine1: 'Your property,',
    heroLine2: 'always ready.', // shown in the serif italic accent
    intro: [
      "Clean, well-maintained grounds speak volumes before anyone walks through the door. Our role is to ensure that impression is always a positive one, without adding to your daily responsibilities.",
      "We take a proactive approach to commercial maintenance, building a customized plan that aligns with your property's needs, schedule, and standards. By anticipating issues and staying ahead of seasonal demands, we help you avoid disruptions and maintain a consistently professional environment, backed by fast, responsive communication whenever you need us, and luxury-level service.",
      "With a focus on curb appeal, presentation, and long-term property health, we ensure your outdoor spaces remain an asset to your business, not a distraction. We look forward to serving you!",
    ],
    servicesHeading: 'Seven Services, One Team',
    learnMoreLabel: 'Learn More',
    services: [
      {
        title: 'Turf Management',
        slug: 'turf-management',
        metaTitle: "Commercial Lawn Maintenance & Turf Management in the Twin Cities - Mom's Commercial Maintenance",
        metaDescription: "Commercial lawn maintenance for Twin Cities properties: weekly mowing, trimming and edging, fertilization, weed control, aeration and overseeding.",
        sections: [{"heading": "Weekly care that keeps turf consistent", "body": ["Turf looks its best when it is cared for on a steady rhythm. Weekly visits keep mowing, trimming and edging consistent, so your property never looks a week behind and the first impression at the front door stays sharp.", "Mowing at the right height, keeping edges crisp along walks, curbs and beds, and trimming around signs, lights and landscape features are the details visitors notice without knowing why. We handle them every visit so you do not have to think about them."]}, {"heading": "Fertilization and weed control", "body": ["Healthy turf starts below the surface. Seasonal fertilizing feeds the lawn through the growing season, and targeted weed control keeps weeds from taking over the thin spots. The result is thicker, greener turf that holds up to foot traffic and Minnesota summers."]}, {"heading": "Aeration, de-thatching and overseeding", "body": ["Compaction from foot traffic and equipment squeezes the air and water out of the soil. Aeration opens it back up, de-thatching clears the buildup that blocks water and nutrients, and overseeding fills in thin areas. For Minnesota's cool-season grasses, late summer into early fall is the best window for this work, and we plan it into your season."]}],
        included: ["Weekly mowing", "Trimming and edging", "Seasonal fertilizing", "Weed control", "Aeration", "De-thatching", "Overseeding"],
        faqs: [{"q": "How often will you mow?", "a": "Weekly visits are the standard rhythm for commercial turf during the growing season. We build the schedule around your property and adjust it as the season changes."}, {"q": "Do you handle fertilizer and weed control?", "a": "Yes. Seasonal fertilizing and weed control are part of our turf management service, along with aeration, de-thatching and overseeding."}, {"q": "Can turf care be combined with other services?", "a": "Yes. Many properties pair turf management with bed care, irrigation and seasonal clean-ups, so one team keeps the whole property consistent."}],
        image: I(CDN + '7c4889c910a73b5374b4b3c99ef8bce2467fa384-600x400.jpg', 'Commercial turf management in the Twin Cities'),
        summary: 'Weekly mowing, trimming and edging, plus fertilization and weed control.',
        body: [
          'Our turf management service provides consistent, professional care to keep your lawn healthy, green, and well-maintained. With weekly visits, our team handles mowing, trimming, edging, and overall turf upkeep, along with targeted treatments like fertilization and weed control as needed.',
          'Services also include seasonal fertilizing, weed control, aeration, de-thatching, and overseeding.',
        ],
      },
      {
        title: 'Spring & Fall Clean-Up',
        slug: 'spring-and-fall-cleanup',
        metaTitle: "Commercial Fall Cleanup & Leaf Removal in the Twin Cities - Mom's Commercial Maintenance",
        metaDescription: "Commercial fall cleanup and leaf removal for Twin Cities properties, plus spring clean-ups that leave your grounds ready for the season.",
        sections: [{"heading": "Why fall cleanup matters in Minnesota", "body": ["Leaves left on turf and beds do more than look messy. A heavy mat of leaves smothers grass, traps moisture and can set the stage for snow mold once snow cover arrives. Leaves and debris also clog drains and collect along walks and entrances, where they become a slipping hazard.", "A thorough fall cleanup removes leaves, debris and buildup before winter, so the property goes into the cold season clean and healthy and comes out of it ready to grow."]}, {"heading": "Leaf removal and debris clearing", "body": ["Our crews clear leaves and debris from lawns, beds and the edges of drives and walkways, and leave the grounds tidy and presentable. Timing matters: we schedule around when the leaves actually come down rather than a fixed date, because that changes from year to year."]}, {"heading": "Spring cleanup that gets you ready for the season", "body": ["Winter leaves its mark: debris, matted leaves and buildup along edges and beds. A spring cleanup clears it all out, so turf and plantings wake up to a clean start and your property looks ready for customers the moment the weather turns."]}],
        included: ["Leaf removal", "Debris and buildup removal", "Bed clean-out", "Seasonal fall cleanup", "Seasonal spring cleanup"],
        faqs: [{"q": "When should fall cleanup happen?", "a": "After most leaves have fallen and before the first lasting snow. The right dates move with the weather each year, so we schedule around the season."}, {"q": "Do you do spring cleanups too?", "a": "Yes. We handle both spring and fall cleanups so your grounds are ready for each season."}, {"q": "Can fall cleanup be part of a year-round plan?", "a": "Yes. It pairs naturally with turf management, bed care and snow and ice management under a single plan."}],
        image: I(CDN + '272f159c60188ecfd90e65e22620fc8b89a88a2a-750x500.jpg', 'Seasonal commercial landscape clean-up'),
        summary: 'Thorough seasonal clean-ups that leave your grounds ready for the next season.',
        body: [
          'Keep your property looking polished year-round with thorough seasonal cleanups. We remove debris, leaves, and buildup to ensure your properties landscape is clean, healthy, and ready for the next season.',
          "Commercial fall cleanup and leaf removal for properties across the Twin Cities: leaves, debris and buildup cleared before winter, and the same again in spring.",
        ],
      },
      {
        title: 'Fine Gardening & Bed Care',
        slug: 'fine-gardening-and-bed-care',
        metaTitle: "Commercial Landscape Maintenance & Garden Bed Care in the Twin Cities - Mom's Commercial Maintenance",
        metaDescription: "Commercial landscape maintenance for Twin Cities properties: bed care, pruning, edging and seasonal container design.",
        sections: [{"heading": "Beds that stay sharp all season", "body": ["Plantings are the part of a property people notice most, and the part that suffers fastest when it is neglected. Our team provides detailed care: pruning to keep plants healthy and shapely, crisp edging that frames every bed, and regular upkeep so nothing looks overgrown or tired."]}, {"heading": "Seasonal container design", "body": ["Containers give a property a fresh look through each season. We design seasonal containers for entrances, patios and storefronts, so the plantings at your door change with the year and always feel intentional."]}, {"heading": "Fine-gardening standards for commercial properties", "body": ["Mom's Design Build is known for fine gardening and design, and our commercial team brings that same eye for detail to commercial grounds. The goal is simple: stunning curb appeal, year round."]}],
        included: ["Pruning", "Edging", "Garden bed care", "Seasonal container design", "Ongoing plant care"],
        faqs: [{"q": "What does bed care include?", "a": "Pruning, edging and the regular upkeep that keeps plantings healthy and looking their best."}, {"q": "Do you design seasonal containers?", "a": "Yes. We design seasonal containers for entrances and common areas so they stay fresh as the seasons change."}, {"q": "Is this separate from turf management?", "a": "They are separate services that work well together. Many properties combine them so lawns and beds are cared for by one team."}],
        image: I(CDN + 'ee26e289601cf0b738446987912b6c9f864499c7-2560x1920.jpg', 'Commercial garden bed care and seasonal containers'),
        summary: 'Pruning, edging and seasonal container design for beds that stay sharp.',
        body: [
          'Elevate your landscape with expertly maintained garden beds and plantings. We provide detailed care, including pruning, edging, and seasonal container design to keep everything looking sharp and vibrant.',
          "Here's to stunning curb appeal year round!",
          "Commercial landscape maintenance for beds, containers and plantings, kept sharp all season.",
        ],
      },
      {
        title: 'Irrigation',
        slug: 'irrigation',
        metaTitle: "Commercial Irrigation Services in the Twin Cities - Mom's Commercial Maintenance",
        metaDescription: "Commercial irrigation start-ups, winterizations, adjustments and audits, plus pond and water feature care, for Twin Cities properties.",
        sections: [{"heading": "Seasonal start-ups and adjustments", "body": ["What keeps a landscape thriving? Water, applied at the right time in the right amount. Every spring we start up your system, check it and adjust it so zones cover what they should, and we fine-tune through the season as plantings and weather change."]}, {"heading": "Audits and winterization", "body": ["An irrigation audit finds the problems that waste water and leave dry spots: heads that are misaligned, zones that overlap, coverage that no longer matches the landscape. In fall we winterize the system before the ground freezes, so lines are protected through the Minnesota winter."]}, {"heading": "Ponds and water features", "body": ["We also service ponds and water features, with professional start-ups, routine maintenance and cleaning, and seasonal shutdowns. It keeps every water element on your property running smoothly and looking its best."]}],
        included: ["Spring start-ups", "System adjustments", "Irrigation audits", "Fall winterization", "Pond and water feature start-ups", "Pond and water feature maintenance and cleaning", "Seasonal shutdowns"],
        faqs: [{"q": "Why does irrigation need winterizing?", "a": "Water left in lines can freeze and damage pipes and heads. Winterizing before the ground freezes protects the system."}, {"q": "What is an irrigation audit?", "a": "A review of how your system is covering the landscape, so we can find and fix wasted water and dry spots."}, {"q": "Do you maintain ponds and water features?", "a": "Yes. We handle start-ups, routine maintenance and cleaning, and seasonal shutdowns."}],
        image: I(CDN + '20706c9761e94fa60e830a578c480bc88d2732f7-2000x1767.jpg', 'Commercial irrigation and water feature service'),
        summary: 'Start-ups, winterizations, adjustments and audits, plus pond and water feature care.',
        body: [
          'What keeps a landscape thriving? Water, applied at the right time, in the right amount. Our irrigation services are designed to deliver exactly that, with seasonal start-ups, winterizations, and precise system adjustments to keep everything running efficiently. We also perform detailed irrigation audits to ensure your landscape is receiving optimal coverage without waste.',
          'In addition, we service ponds and water features with professional start-ups, routine maintenance and cleaning, and seasonal shutdowns, keeping every element of your outdoor space operating smoothly and looking its best.',
        ],
      },
      {
        title: 'Snow & Ice Management',
        slug: 'snow-and-ice-management',
        metaTitle: "Commercial Snow Removal & Snow Plowing in the Twin Cities - Mom's Commercial Maintenance",
        metaDescription: "Commercial snow removal, snow plowing and ice management for Twin Cities properties: prompt plowing, de-icing and monitoring to keep you safe and open.",
        sections: [{"heading": "Plowing, de-icing and monitoring", "body": ["Minnesota's winters are unpredictable, and a property that is not cleared is a property that is not open for business. Our snow and ice management covers the full job: prompt plowing, de-icing, and monitoring conditions so we are ready when the weather turns."]}, {"heading": "Safe and accessible for customers and staff", "body": ["Snow and ice are a safety and liability concern as much as a convenience one. We focus on the areas that matter most: parking lots, drive lanes, entrances and walkways, so customers, tenants and employees can arrive safely and your business stays open."]}, {"heading": "A plan in place before the first storm", "body": ["The best snow season is one planned before it starts. We build a plan around your property and your priorities, and we recommend getting it set in early fall, before the first snowfall, so your property is covered from the start of winter."]}],
        included: ["Snow plowing", "Snow removal", "De-icing", "Condition monitoring", "Parking lots", "Drive lanes", "Walkways and entrances"],
        faqs: [{"q": "When do you plow?", "a": "We monitor conditions and plow based on the plan we build with you. The details are set around your property and its priorities."}, {"q": "Do you de-ice as well as plow?", "a": "Yes. Plowing, de-icing and monitoring are all part of our snow and ice management."}, {"q": "When should we set up a snow plan?", "a": "Early fall, before the first snowfall, is the best time so your property is covered from the start of winter."}],
        image: I(CDN + '0a399add959a6b7a18510ecc61c8f5ced0642059-1265x921.jpg', 'Commercial snow and ice management'),
        summary: 'Prompt plowing, de-icing and monitoring to keep your property safe and open.',
        body: [
          "Minnesota's winters are unpredictable. Count on our reliable snow and ice management to keep your property safe and accessible. Our team provides prompt plowing, de-icing, and monitoring to minimize hazards and business disruptions.",
          "Commercial snow removal and snow plowing for parking lots, drive lanes and walkways, with de-icing and monitoring through every storm.",
        ],
      },
      {
        title: 'Holiday Decorating',
        slug: 'holiday-decorating',
        metaTitle: "Commercial Holiday Decorating in the Twin Cities - Mom's Commercial Maintenance",
        metaDescription: "Commercial holiday decorating for Twin Cities businesses: garland, wreaths, lights and containers, hand-made with natural greens.",
        sections: [{"heading": "Hand-made with natural greens", "body": ["Our holiday decor is built by hand from natural greens, sticks and berries, with a creative assortment of lights, containers, window boxes, garland wraps, kissing balls and wreaths. It gives a business a warmth that off-the-shelf decorations cannot match."]}, {"heading": "Fifteen years decorating the Metro", "body": ["Our seasoned elves have been decorating in the Metro for over 15 years. We make your business merry and bright with garland, wreaths, door charms and more, designed for your entrance and your storefront."]}],
        included: ["Garland", "Wreaths", "Door charms", "Lights", "Containers", "Window boxes", "Garland wraps", "Kissing balls"],
        faqs: [{"q": "What is the decor made from?", "a": "It is hand-made with natural greens, sticks and berries."}, {"q": "What can you decorate?", "a": "Entrances, doors, windows, storefronts and containers: garland, wreaths, door charms, lights, window boxes, garland wraps and kissing balls."}, {"q": "When should we plan holiday decorating?", "a": "The earlier the better, so we have time to design and build for your space."}],
        image: I(CDN + '635fe0bd0a3edf608b5b8d1ae7a15faa5441f77d-750x563.jpg', 'Commercial holiday decorating'),
        summary: 'Garland, wreaths, lights and containers, hand-made with natural greens.',
        body: [
          'Garland, wreaths, door charms and more. We will make your business merry and bright for the holidays. Our seasoned elves have been decorating in the Metro over 15 years!',
          'Think a creative assortment of lights, containers, window boxes, garland wraps, kissing balls and wreaths; all hand-made with natural greens, sticks and berries.',
        ],
      },
      {
        title: 'Palm Trees',
        slug: 'palm-trees',
        metaTitle: "Palm Trees for Minnesota Commercial Spaces - Mom's Commercial Maintenance",
        metaDescription: "Add a taste of the tropics to your Minnesota commercial space with palm trees from Mom's Commercial Maintenance.",
        sections: [{"heading": "A taste of the tropics, in Minnesota", "body": ["Palm trees add instant atmosphere. For restaurants, lobbies, patios and event spaces that want to stand out, a few well-placed palms change how a space feels and give guests something they do not expect to see in Minnesota."]}, {"heading": "Tell us about your space", "body": ["Every space is different. Tell us about yours, and we will help you decide what fits and where it should go."]}],
        included: ["Palm trees for commercial spaces", "Placement guidance"],
        faqs: [{"q": "How do we get started?", "a": "Contact us and tell us about your space. We will go from there."}, {"q": "Can palm trees be part of a maintenance plan?", "a": "Yes. We can add them to a year-round plan alongside your other services."}],
        image: I(CDN + '934edee2ffbc934e8261e9855f274d143795556f-750x500.jpg', 'Palm trees for Minnesota commercial spaces'),
        summary: 'A taste of the tropics for spaces that are anything but traditional.',
        body: [
          "You're anything but traditional, so why should your space be? Experience Minnesota with a taste of the tropics by adding Palm Trees to your space!",
        ],
      },
    ],
    // The 20 west-metro cities from the 10/27 keyword research (ordered by search volume),
    // plus Shakopee and Prior Lake. Swap for the service areas on Summer's new Google Business Profile.
    cities: [
      { name: 'Minneapolis', slug: 'minneapolis', intro: ["Minneapolis commercial properties range from downtown office buildings and North Loop mixed-use sites to neighborhood retail and multifamily communities. Tight sites with limited room to stack snow and busy walkways make planning ahead matter, in winter and the rest of the year. We provide snow removal, fall cleanup and year-round grounds care for properties like these in {city}."] },
      { name: 'Bloomington', slug: 'bloomington', intro: ["Bloomington is one of the metro's largest commercial hubs, with office and hotel campuses along I-494, big retail centers and warehouse space. Large lots and heavy traffic make dependable snow removal and clean grounds a priority. We provide snow removal, fall cleanup and year-round grounds care for properties like these in {city}."] },
      { name: 'Maple Grove', slug: 'maple-grove', intro: ["Maple Grove is a fast-growing commercial and residential community, with retail centers, medical offices and newer multifamily properties. Newer landscapes need consistent care to stay sharp, and big parking areas need reliable plowing. We provide snow removal, fall cleanup and year-round grounds care for properties like these in {city}."] },
      { name: 'Edina', slug: 'edina', intro: ["Edina's commercial areas include the shops and restaurants around 50th & France, the Southdale area and office parks along Highway 100 and I-494. Visitors here expect polished grounds in every season. We provide snow removal, fall cleanup and year-round grounds care for properties like these in {city}."] },
      { name: 'Eden Prairie', slug: 'eden-prairie', intro: ["Eden Prairie is home to corporate campuses, shopping centers and multifamily communities. Large, well-landscaped sites benefit from one team that handles turf, beds, snow and seasonal cleanups. We provide snow removal, fall cleanup and year-round grounds care for properties like these in {city}."] },
      { name: 'Minnetonka', slug: 'minnetonka', intro: ["Minnetonka commercial properties include retail around Ridgedale, office parks along I-394 and Highway 169, and properties closer to the lake. Mature landscapes with many trees mean a lot of leaves in fall, which makes a thorough cleanup important. We provide snow removal, fall cleanup and year-round grounds care for properties like these in {city}."] },
      { name: 'St. Louis Park', slug: 'st-louis-park', intro: ["St. Louis Park mixes shopping and dining at Excelsior & Grand and the West End with office buildings and multifamily properties along Highway 100 and I-394. Busy, walkable sites need clear walks and clean grounds all year. We provide snow removal, fall cleanup and year-round grounds care for properties like these in {city}."] },
      { name: 'Plymouth', slug: 'plymouth', intro: ["Plymouth's commercial properties include corporate and medical offices along Highway 55 and I-494, retail centers and industrial buildings. Large lots and many entrances mean snow management plans need to be thought out in advance. We provide snow removal, fall cleanup and year-round grounds care for properties like these in {city}."] },
      { name: 'Hopkins', slug: 'hopkins', intro: ["Hopkins has a busy downtown along Mainstreet, light industrial areas near Shady Oak Road and retail along Excelsior Boulevard. Walkable storefronts and shared lots need clear walks and tidy grounds year-round. We provide snow removal, fall cleanup and year-round grounds care for properties like these in {city}."] },
      { name: 'Golden Valley', slug: 'golden-valley', intro: ["Golden Valley's commercial properties include office buildings, medical offices and multifamily communities along Highway 55 and Highway 100. Properties here often want reliable, professional grounds care that runs quietly in the background. We provide snow removal, fall cleanup and year-round grounds care for properties like these in {city}."] },
      { name: 'Chanhassen', slug: 'chanhassen', intro: ["Chanhassen's commercial areas include downtown retail and offices along Highway 5 and Highway 101, plus homeowner association communities. Properties with mature plantings need consistent bed care and thorough fall cleanups. We provide snow removal, fall cleanup and year-round grounds care for properties like these in {city}."] },
      { name: 'Chaska', slug: 'chaska', intro: ["Chaska has a historic downtown, retail and industrial areas near Highway 41 and Highway 212, and growing residential neighborhoods. Mixed property types call for a maintenance plan built around each site. We provide snow removal, fall cleanup and year-round grounds care for properties like these in {city}."] },
      { name: 'Shakopee', slug: 'shakopee', intro: ["Shakopee is where Mom's Design Build is based. The city's commercial properties include retail along Highway 169 and Highway 101, industrial parks, entertainment venues like Canterbury Park and growing multifamily communities. We provide snow removal, fall cleanup and year-round grounds care for properties like these in {city}."] },
      { name: 'Prior Lake', slug: 'prior-lake', intro: ["Prior Lake's commercial properties include retail and offices along Highway 13 and County Road 21, along with lakeside communities and homeowner associations. Lake-area properties often have many trees, which means a lot of leaves to clear in fall. We provide snow removal, fall cleanup and year-round grounds care for properties like these in {city}."] },
      { name: 'Wayzata', slug: 'wayzata', intro: ["Wayzata's downtown on Lake Minnetonka is full of boutiques, restaurants and offices where curb appeal is part of the experience. Entrances, containers and plantings need to look sharp in every season. We provide snow removal, fall cleanup and year-round grounds care for properties like these in {city}."] },
      { name: 'Orono', slug: 'orono', intro: ["Orono's commercial properties are smaller nodes and homeowner association communities around Lake Minnetonka. Many sites are tree-lined and sit on larger lots, which makes fall cleanup and winter access especially important. We provide snow removal, fall cleanup and year-round grounds care for properties like these in {city}."] },
      { name: 'Excelsior', slug: 'excelsior', intro: ["Excelsior's Water Street downtown, with its restaurants, shops and lakefront, draws visitors all year. Storefronts here benefit from tidy plantings, seasonal containers and clear walks in winter. We provide snow removal, fall cleanup and year-round grounds care for properties like these in {city}."] },
      { name: 'Shorewood', slug: 'shorewood', intro: ["Shorewood's commercial properties include small retail and office buildings along Highway 7 and homeowner association communities. Properties here often have mature landscaping that rewards steady care. We provide snow removal, fall cleanup and year-round grounds care for properties like these in {city}."] },
      { name: 'Deephaven', slug: 'deephaven', intro: ["Deephaven is mostly lakeside residential, with small commercial properties and association-managed communities. Shared grounds and entrances need dependable seasonal care. We provide snow removal, fall cleanup and year-round grounds care for properties like these in {city}."] },
      { name: 'Long Lake', slug: 'long-lake', intro: ["Long Lake has a small downtown and local retail and office properties along its main streets. Small sites do best with a clear plan and a team that shows up consistently. We provide snow removal, fall cleanup and year-round grounds care for properties like these in {city}."] },
      { name: 'Medina', slug: 'medina', intro: ["Medina's commercial properties include businesses along Highway 55, light industrial buildings and the Hamel area, often on larger lots. Bigger properties need plans for plowing, turf and fall cleanup that cover the whole site. We provide snow removal, fall cleanup and year-round grounds care for properties like these in {city}."] },
      { name: 'Minnetrista', slug: 'minnetrista', intro: ["Minnetrista is a growing community of homeowner associations and small commercial properties near Highway 7 and Highway 110. Spread-out sites call for a dependable crew and a plan that covers the whole year. We provide snow removal, fall cleanup and year-round grounds care for properties like these in {city}."] },
    ],
    cityMetaTitle: "Snow Removal & Commercial Landscape Maintenance in {city}, MN - Mom's Commercial Maintenance",
    cityMetaDescription: "Snow removal, snow plowing, fall cleanup and commercial landscape maintenance for properties in {city}, Minnesota, from Mom's Commercial Maintenance.",
    cityHeading: 'Snow Removal & Commercial Maintenance in {city}',
    includedHeading: 'What’s Included',
    faqHeading: 'Common Questions',
    cityServicesHeading: 'Our Commercial Services in {city}',
    citySections: [{"heading": "Snow removal and snow plowing in {city}", "body": ["Winter in {city} can shut down a property fast. Our snow and ice management covers plowing, de-icing and monitoring for parking lots, drive lanes, entrances and walkways, so customers, tenants and employees can get in safely and your business stays open.", "Setting up a snow plan in early fall, before the first snowfall, means your {city} property is covered from the start of winter."]}, {"heading": "Fall cleanup and leaf removal in {city}", "body": ["Leaves and debris left on turf and beds smother grass, clog drains and make walkways slippery. Our fall cleanup and leaf removal clears them so your {city} property heads into winter clean and healthy, and our spring cleanup gets it ready again once the snow is gone."]}, {"heading": "Year-round grounds care in {city}", "body": ["Between snow and cleanup, the rest of the year is turf management, bed care, irrigation, holiday decorating and more. One team can handle all of it for your {city} property, with one plan built around your schedule and your standards."]}],
    cityFaqs: [{"q": "Do you serve all of {city}?", "a": "Yes. We serve {city} and the surrounding Twin Cities communities."}, {"q": "Can we start with snow removal or fall cleanup?", "a": "You can start with the service you need most and add more as you go. Many properties begin with one and grow into a full year-round plan."}, {"q": "How do we get a plan for our {city} property?", "a": "Use the Meet With Us button and tell us about your property. We build a customized plan around your property, your schedule and your standards."}],
    cityBody: [
      "Your property is often the first impression your business makes. Mom's Commercial Maintenance keeps commercial grounds in {city} clean, healthy and professional all year, with a customized plan built around your property, your schedule and your standards.",
      "From snow removal and snow plowing in the winter to fall cleanup, leaf removal and weekly turf care the rest of the year, one team handles the whole year, with fast, responsive communication whenever you need us.",
    ],
    propertiesHeading: 'Serving the Greater Twin Cities Area',
    propertiesAnchorNote: 'Southwest Metro of Minnesota and surrounding communities',
    propertiesBody: "We proudly serve the Southwest Metro area of Minnesota and surrounding communities. Whether you manage a single building or oversee multiple properties, our team delivers dependable, professional service tailored to your needs, schedule, and operational requirements.",
    properties: ['Multifamily communities', 'Retail strip centers', 'Industrial & warehouse buildings', 'HOAs', 'Office buildings', 'Banks', 'Medical & dental offices', 'Other commercial properties'],
    closingHeading: 'Ready for a property that makes the right first impression?',
    closingBody: "We build a customized plan around your property, your schedule and your standards.",
    aboutMetaTitle: "About Mom's Commercial Maintenance - A Division of Mom's Design Build",
    aboutMetaDescription: "Mom's Commercial Maintenance is the commercial grounds division of Mom's Design Build, serving the Twin Cities.",
    aboutHeading: "About Mom's Commercial Maintenance",
    aboutBody: [
      "Mom's Commercial Maintenance is a division of Mom's Design Build, the most awarded landscape design firm in the Midwest. We bring the same standards to commercial properties: dependable care day in and day out, fast responsive communication, and luxury-level service.",
      "We understand the expectations that come with managing commercial spaces, and we are committed to keeping your outdoor spaces an asset to your business, not a distraction.",
      "Our commercial team handles the work that keeps a property running day to day: weekly turf care, bed and container care, irrigation, seasonal clean-ups and, in winter, snow and ice management. One team means one point of contact and one standard across the whole year.",
      "Mom's Design Build is based in Shakopee and serves the Twin Cities. Whether you manage a single building or a portfolio of properties, we start by learning what your property needs and build a plan around it.",
    ],
    aboutLinkLabel: "Learn more about Mom's Design Build",
  },

}

export type CopyKey = keyof typeof COPY
