@AGENTS.md

# Hub 8 Industrial Park — Property Website

## Tech Stack
- Next.js 14+ (App Router), Tailwind CSS 4+, GSAP + ScrollTrigger, PhotoSwipe, Panzoom.js, Lucide React
- Fonts: DM Serif Display (display) + DM Sans (body) via next/font/google
- All latest lib versions

## Property
- Hub 8 Industrial Park (合发工业园), Ampangan, Negeri Sembilan
- Freehold, 26 acres, 46 semi-detached industrial units (2 & 3 storey)
- Developer: Kiara Kasturi Sdn Bhd (Peter's Group, est. 1973)
- Contact: 011 1300 3062 / 011 1300 3063

## Design
- Luxury minimal, scroll-driven single-page site
- Neutral palette (warm whites, soft greys, charcoal) + yellow accent (#fccf08) sparingly
- GSAP animations: subtle, max 1.2s, respect prefers-reduced-motion

## Assets
- 6 high-res JPG renders in /brochure-images/ (optimized copies in /public/images/)
- Blueprints/floorplans: PENDING from client — using placeholders
- Content data: /src/data/property.ts

## Key Rules
- Single property site, no CMS, no auth, Vercel deploy
- GSAP dynamically imported (no SSR)
- Mobile-first responsive
- Target 90+ Lighthouse performance
