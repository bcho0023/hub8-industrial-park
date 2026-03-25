export const property = {
  name: "Hub 8 Industrial Park",
  nameZh: "合发工业园",
  tagline: "Freehold Semi-Detached Industrial Park",
  subtitle: "Ampangan, Negeri Sembilan",

  developer: {
    name: "Kiara Kasturi Sdn Bhd",
    registration: "202201028083 (1494600-U)",
    parent: "Peter's Group of Companies",
    established: 1973,
    address:
      "Level 3, Wisma Peters, No.1, Jalan PJS 1/2, Taman Petaling Utama, 46150 Petaling Jaya, Selangor",
    generalLine: "03-77829988",
  },

  contact: {
    phones: ["011 1300 3062", "011 1300 3063"],
  },

  stats: [
    { value: 46, label: "Industrial Units" },
    { value: 26, label: "Acres of Land" },
    { value: 5, label: "Unit Types" },
    { label: "Freehold", displayValue: "Freehold" },
  ] as const,

  about: {
    heading: "Unlock Your Future at Hub 8 Ampangan",
    paragraphs: [
      "Situated on 26 acres of prime freehold land, our industrial park offers a remarkable opportunity for entrepreneurs to establish their ventures. Our park boasts of 46 semi-detached units comprising 2 and 3 storey lots.",
      "These units are meticulously designed to cater to diverse business needs, each built to maximise functionality and efficiency. We are also a guarded community, providing a safe and secure environment for all occupants.",
      "Come, elevate your ambitions at Hub 8 today.",
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

  units: [
    {
      type: "A1",
      config: "2-Storey Semi-D",
      lotSize: "35' x 70'",
      lotSf: 7800,
      builtUp: 3595,
      floors: ["Ground Floor", "First Floor"],
      hasLift: false,
      blueprint: "/blueprints/placeholder.svg",
    },
    {
      type: "A2",
      config: "2-Storey Semi-D",
      lotSize: "35' x 85'",
      lotSf: 8700,
      builtUp: 4114,
      floors: ["Ground Floor", "First Floor"],
      hasLift: false,
      blueprint: "/blueprints/placeholder.svg",
    },
    {
      type: "B1",
      config: "3-Storey Semi-D with Lift",
      lotSize: "35' x 70'",
      lotSf: 7800,
      builtUp: 5924,
      floors: ["Ground Floor", "First Floor", "Second Floor"],
      hasLift: true,
      blueprint: "/blueprints/placeholder.svg",
    },
    {
      type: "B2",
      config: "3-Storey Semi-D with Lift",
      lotSize: "35' x 85'",
      lotSf: 8700,
      builtUp: 6358,
      floors: ["Ground Floor", "First Floor", "Second Floor"],
      hasLift: true,
      blueprint: "/blueprints/placeholder.svg",
    },
    {
      type: "B3",
      config: "3-Storey Semi-D with Lift",
      lotSize: "40' x 85'",
      lotSf: 9425,
      builtUp: 7181,
      floors: ["Ground Floor", "First Floor", "Second Floor"],
      hasLift: true,
      blueprint: "/blueprints/placeholder.svg",
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
    lat: 2.7258,
    lng: 102.0086,
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5!2d102.0086!3d2.7258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMsKwNDMnMzMuMCJOIDEwMsKwMDAnMzEuMCJF!5e0!3m2!1sen!2smy!4v1234567890",
    highlights: [
      "Direct Lekas Highway Access",
      "Fast Connectivity to Kuala Lumpur, Seremban, and Senawang",
    ],
  },

  navItems: [
    { label: "Home", href: "#hero" },
    { label: "Features", href: "#features" },
    { label: "About", href: "#about" },
    { label: "Gallery", href: "#gallery" },
    { label: "Floorplans", href: "#floorplans" },
    { label: "Location", href: "#location" },
    { label: "Contact", href: "#contact" },
  ],
};
