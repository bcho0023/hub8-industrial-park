export const property = {
  name: "Hub 8 Industrial Park",
  nameZh: "合发工业园",
  tagline: "Freehold Semi-Detached Industrial Park",
  subtitle: "Ampangan, Negeri Sembilan",
  logo: "/images/logo.png",

  developer: {
    name: "Kiara Kasturi Sdn Bhd",
    registration: "202201028083 (1494600-U)",
    parent: "Peter's Group of Companies",
    established: 1973,
    address:
      "Level 3, Wisma Peters, No.1, Jalan PJS 1/2, Taman Petaling Utama, 46150 Petaling Jaya, Selangor",
    generalLine: "03-7782 9988",
    website: "https://peters.com.my/",
  },

  contact: {
    phones: ["011 1300 3062", "011 1300 3063"],
    whatsapp: "601113003062",
  },

  stats: [
    { label: "Acres of Land", value: 20 },
    { label: "Land Title", displayValue: "Freehold" },
    {
      label: "Built-Up",
      rangeFrom: 3595,
      rangeTo: 7181,
      unit: "s.f.",
    },
    {
      label: "Typical Lot Sizes",
      rangeFrom: 7008,
      rangeTo: 9425,
      unit: "s.f.",
    },
  ] as const,

  about: {
    heading: "Unlock Your Future at Hub 8 Ampangan",
    paragraphs: [
      "Situated on 20 acres of prime freehold land, our industrial park offers an excellent opportunity for entrepreneurs to establish and grow their ventures through thoughtfully designed semi-detached industrial units built for functionality, efficiency, and long-term flexibility.",
      "Strategically located with direct access to the LEKAS Highway, the development provides seamless connectivity to your customers, vendors, and business partners, with having convenient access to Kuala Lumpur, Senawang, and Seremban for efficient and scalable operations.",
    ],
    image: "/images/about.jpg",
  },

  features: [
    {
      icon: "Warehouse" as const,
      title: "Floor Loading 15kPa",
      description: "Heavy-duty production floor for storage and manufacturing",
    },
    {
      icon: "Maximize" as const,
      title: "7.8m Ceiling Height",
      description: "Maximum floor to ceiling clearance for industrial operations",
    },
    {
      icon: "Sun" as const,
      title: "Natural Skylight",
      description: "Abundant natural lighting through skylight design",
    },
    {
      icon: "ShieldCheck" as const,
      title: "Guarded Community",
      description: "Safe and secure environment with controlled access",
    },
    {
      icon: "Building2" as const,
      title: "Double Volume Entrance",
      description: "Grand facade with impressive double volume frontage",
    },
    {
      icon: "Zap" as const,
      title: "3-Phase 200A Supply",
      description: "Industrial-grade electrical supply to main switch board",
    },
  ],

  floorplans: [
    {
      type: "A1",
      label: "Type A1",
      description: "2-Storey Semi-Detached Factory",
      specs: "35' x 70' · 3,595 s.f. built-up · 7,800 s.f. lot",
      image: "/blueprints/floorplan-A1.png",
      width: 875,
      height: 633,
      color: "#ec9011",
    },
    {
      type: "A2",
      label: "Type A2",
      description: "2-Storey Semi-Detached Factory",
      specs: "35' x 85' · 4,114 s.f. built-up · 8,700 s.f. lot",
      image: "/blueprints/floorplan-A2.png",
      width: 875,
      height: 633,
      color: "#baeec9",
    },
    {
      type: "B1",
      label: "Type B1",
      description: "3-Storey Semi-Detached Factory with Lift",
      specs: "35' x 70' · 5,924 s.f. built-up · 7,800 s.f. lot",
      image: "/blueprints/floorplan-B1.png",
      width: 875,
      height: 633,
      color: "#fecabc",
    },
    {
      type: "B2",
      label: "Type B2",
      description: "3-Storey Semi-Detached Factory with Lift",
      specs: "35' x 85' · 6,358 s.f. built-up · 8,700 s.f. lot",
      image: "/blueprints/floorplan-B2.png",
      width: 875,
      height: 633,
      color: "#8298e3",
    },
    {
      type: "B3",
      label: "Type B3",
      description: "3-Storey Semi-Detached Factory with Lift",
      specs: "40' x 85' · 7,181 s.f. built-up · 9,425 s.f. lot",
      image: "/blueprints/floorplan-B3.png",
      width: 875,
      height: 633,
      color: "#fdcd07",
    },
  ],

  sitePlan: {
    image: "/blueprints/siteplan.png",
    svg: "/blueprints/siteplan.svg",
    note: "Note: Selected lots may include additional land and lot sizes may vary. Please refer to the sales team for specific lot details.",
    legend: [
      {
        group: "2 Storey Semi-D",
        types: [
          { type: "A1", color: "#ec9011", lot: "35'x70'", builtUp: "3,595", lotSize: "7,800" },
          { type: "A2", color: "#baeec9", lot: "35'x85'", builtUp: "4,114", lotSize: "8,700" },
        ],
      },
      {
        group: "3 Storey Semi-D",
        types: [
          { type: "B1", color: "#fecabc", lot: "35'x70'", builtUp: "5,924", lotSize: "7,800" },
          { type: "B2", color: "#8298e3", lot: "35'x85'", builtUp: "6,358", lotSize: "8,700" },
          { type: "B3", color: "#fdcd07", lot: "40'x85'", builtUp: "7,181", lotSize: "9,425" },
        ],
      },
    ],
  },

  siteMap: {
    image: "/blueprints/sitemap.png",
    svg: "/blueprints/sitemap.svg",
  },

  units: [
    {
      type: "A1",
      color: "#ec9011",
      config: "2-Storey Semi-D",
      lotSize: "35' x 70'",
      lotSf: 7800,
      builtUp: 3595,
      floors: ["Ground Floor", "First Floor"],
      hasLift: false,
    },
    {
      type: "A2",
      color: "#baeec9",
      config: "2-Storey Semi-D",
      lotSize: "35' x 85'",
      lotSf: 8700,
      builtUp: 4114,
      floors: ["Ground Floor", "First Floor"],
      hasLift: false,
    },
    {
      type: "B1",
      color: "#fecabc",
      config: "3-Storey Semi-D with Lift",
      lotSize: "35' x 70'",
      lotSf: 7800,
      builtUp: 5924,
      floors: ["Ground Floor", "First Floor", "Second Floor"],
      hasLift: true,
    },
    {
      type: "B2",
      color: "#8298e3",
      config: "3-Storey Semi-D with Lift",
      lotSize: "35' x 85'",
      lotSf: 8700,
      builtUp: 6358,
      floors: ["Ground Floor", "First Floor", "Second Floor"],
      hasLift: true,
    },
    {
      type: "B3",
      color: "#fdcd07",
      config: "3-Storey Semi-D with Lift",
      lotSize: "40' x 85'",
      lotSf: 9425,
      builtUp: 7181,
      floors: ["Ground Floor", "First Floor", "Second Floor"],
      hasLift: true,
    },
  ],

  gallery: [
    { src: "/images/gallery-aerial.jpg", alt: "Aerial view of Hub 8 Industrial Park" },
    { src: "/images/gallery-aerial-2.jpg", alt: "Development aerial overview" },
    { src: "/images/gallery-2storey.jpg", alt: "2-storey factory facade" },
    { src: "/images/gallery-3storey.jpg", alt: "3-storey factory building" },
    { src: "/images/hero.jpg", alt: "Street-level view of Hub 8" },
    { src: "/images/gallery-section.jpg", alt: "Building cross-section view" },
  ],

  specifications: [
    { label: "Foundation", value: "Piled Foundation / Raft Foundation" },
    { label: "Superstructure", value: "Reinforced Concrete columns and beams" },
    { label: "Roof System", value: "Metal roof frame and decking" },
    {
      label: "Floor Design Loads",
      value: "Storage / Production areas: 10 – 15kPa\nOffice areas: 2.5kPa",
    },
    {
      label: "Wall & Finishes",
      value:
        "Brick walls / Metal deck cladding with plaster and paint. Ceramic wall tiles for toilets up to 1.5 meters",
    },
    {
      label: "Floors & Finishes",
      value:
        "Concrete floor for Production areas\nCement render for general and Office areas\nTiles for toilets",
    },
    { label: "Ceiling", value: "Exposed structure / reinforced concrete slab" },
    { label: "Windows", value: "Aluminium framed glass windows" },
    { label: "Doors", value: "Roller shutter / Glass door / Timber flush door" },
    { label: "Sanitary Installation", value: "WC, Basin and Taps" },
    {
      label: "Electrical Installation",
      value:
        "Power supply 150A – 200A (3 Phase) to main switch board only. Basic lighting and socket points to office area",
    },
    {
      label: "Compound Infrastructure",
      value: "Perma road / blockwall or metal fencing / gate",
    },
  ],

  distances: [
    { place: "Ampangan Centre", km: 5 },
    { place: "Senawang", km: 8 },
    { place: "Seremban", km: 10 },
    { place: "Seremban 2", km: 15 },
  ],

  location: {
    lat: 2.745806898753726,
    lng: 101.99303091271108,
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5!2d101.993!3d2.7458!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwNDQnNDUuMCJOIDEwMcKwNTknMzUuMCJF!5e0!3m2!1sen!2smy!4v1234567890",
    highlights: [
      "Direct Lekas Highway Access",
      "Fast Connectivity to Kuala Lumpur, Seremban, and Senawang",
    ],
  },

  navItems: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Gallery", href: "#gallery" },
    { label: "Location", href: "#location" },
    { label: "Site Plan", href: "#siteplan" },
    { label: "Floorplans", href: "#floorplans" },
    { label: "Site Progress", href: "#siteprogress" },
    { label: "About Us", href: "#aboutus" },
    { label: "Contact", href: "#contact" },
  ],
};
