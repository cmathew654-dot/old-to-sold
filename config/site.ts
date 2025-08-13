// URL validation helper
function validateUrl(url: string | undefined, fallback: string): string {
  if (!url) return fallback

  try {
    new URL(url)
    return url
  } catch {
    return fallback
  }
}

export const siteConfig = {
  name: "Old to Sold",
  tagline: "We turn old stuff into sold stuff.",
  description: "Premium consignment resale - turning your treasures into cash",
  url: validateUrl(process.env.NEXT_PUBLIC_SITE_URL, "https://oldtosold.com"),

  // Contact Information
  contact: {
    email: "cyril@old2sold.com",
    phone: "(555) 123-4567",
  },

  // Location
  location: {
    cityState: process.env.NEXT_PUBLIC_CITY_STATE || "San Francisco, CA",
    address: "123 Main Street",
    zipCode: "12345",
  },

  // External Links
  ebayStoreUrl: validateUrl(process.env.NEXT_PUBLIC_EBAY_STORE_URL, "https://www.ebay.com/usr/oldtosold"),
  calendlyUrl: validateUrl(process.env.NEXT_PUBLIC_CALENDLY_URL, "https://calendly.com/c-mathew654"),

  // Brand Colors
  brandColors: {
    primary: "#0B3D2E",
    accent: "#F0C419",
    text: "#111827",
    background: "#F8FAFC",
    muted: "#9CA3AF",
    white: "#FFFFFF",
    black: "#000000",
  },

  // Brand Fonts
  brandFonts: {
    heading: "Manrope",
    body: "Inter",
    mono: "Roboto Mono",
  },

  // Navigation
  nav: {
    main: [
      { name: "Home", href: "/" },
      { name: "Catalog", href: "/catalog" },
      { name: "Sell with Us", href: "/sell" },
      { name: "FAQ", href: "/faq" }, // Moved FAQ to main nav
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
    footer: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Shipping & Returns", href: "/shipping" }, // Replaced FAQ with shipping info
    ],
  },

  // SEO
  seo: {
    keywords: [
      "consignment",
      "resale",
      "vintage",
      "luxury goods",
      "secondhand",
      "designer items",
      "antiques",
      "collectibles",
    ],
  },

  // Social Media (placeholder)
  social: {
    facebook: "https://facebook.com/oldtosold",
    instagram: "https://instagram.com/oldtosold",
    twitter: "https://twitter.com/oldtosold",
  },
} as const

export type SiteConfig = typeof siteConfig
