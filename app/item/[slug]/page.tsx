import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Mail, MapPin, ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import { ProductJsonLd } from "@/components/json-ld"
import { siteConfig } from "@/config/site"
import { StatusBadge } from "@/components/status-badge"
import { PriceChip } from "@/components/price-chip"
import type { Metadata } from "next"

// Sample catalog data (same as catalog page)
const catalogItems = [
  {
    id: 1,
    slug: "vintage-denim-jacket-levis",
    title: "Vintage Levi's Denim Jacket",
    category: "Clothing",
    condition: "B" as const,
    priceList: 125,
    status: "available" as const,
    thumbnail: "/vintage-denim-jacket.png",
    ebayUrl: "https://www.ebay.com/item/123456789",
    description:
      "Classic Levi's denim jacket from the 1980s. Features original brass buttons and authentic distressing.",
    specs: ["Size: Medium", "Material: 100% Cotton Denim", "Era: 1980s", "Brand: Levi's"],
    images: ["/vintage-denim-jacket.png", "/vintage-denim-jacket.png", "/vintage-denim-jacket.png"],
  },
  {
    id: 2,
    slug: "antique-brass-lamp",
    title: "Antique Brass Table Lamp",
    category: "Home & Garden",
    condition: "A" as const,
    priceList: null,
    status: "available" as const,
    thumbnail: "/antique-brass-table-lamp.png",
    ebayUrl: "https://www.ebay.com/item/987654321",
    description:
      "Beautiful antique brass table lamp with original patina. Perfect for adding vintage charm to any room.",
    specs: ["Height: 24 inches", "Base: 6 inch diameter", "Material: Solid Brass", "Era: 1940s"],
    images: ["/antique-brass-table-lamp.png", "/antique-brass-table-lamp.png"],
  },
  {
    id: 3,
    slug: "designer-silk-scarf-hermes",
    title: "Designer Silk Scarf",
    category: "Accessories",
    condition: "A" as const,
    priceList: 280,
    status: "sold" as const,
    thumbnail: "/luxury-silk-scarf.png",
    description: "Luxurious silk scarf with intricate pattern. Previously owned but in excellent condition.",
    specs: ['Size: 36" x 36"', "Material: 100% Silk", "Care: Dry clean only", "Origin: France"],
    images: ["/luxury-silk-scarf.png", "/luxury-silk-scarf.png"],
  },
  {
    id: 4,
    slug: "vintage-record-player-technics",
    title: "Vintage Technics Turntable",
    category: "Electronics",
    condition: "B" as const,
    priceList: 450,
    status: "available" as const,
    thumbnail: "/placeholder-ppls4.png",
    description: "Professional-grade Technics turntable in working condition. Perfect for vinyl enthusiasts.",
    specs: ["Model: SL-1200", "Speed: 33⅓ and 45 RPM", "Drive: Direct Drive", "Condition: Fully functional"],
    images: ["/placeholder-ppls4.png", "/placeholder-ppls4.png"],
  },
  {
    id: 5,
    slug: "mid-century-coffee-table",
    title: "Mid-Century Coffee Table",
    category: "Furniture",
    condition: "C" as const,
    priceList: 195,
    status: "hold" as const,
    thumbnail: "/mid-century-modern-coffee-table.png",
    description: "Authentic mid-century modern coffee table with tapered legs. Shows some wear consistent with age.",
    specs: ['Dimensions: 48" x 24" x 16"', "Material: Walnut veneer", "Era: 1960s", "Style: Mid-Century Modern"],
    images: ["/mid-century-modern-coffee-table.png", "/mid-century-modern-coffee-table.png"],
  },
  {
    id: 6,
    slug: "vintage-camera-canon-ae1",
    title: "Canon AE-1 Film Camera",
    category: "Electronics",
    condition: "A" as const,
    priceList: 320,
    status: "available" as const,
    thumbnail: "/placeholder-uno0w.png",
    description: "Classic Canon AE-1 35mm SLR camera. Fully functional with original lens.",
    specs: ["Type: 35mm SLR", "Lens: 50mm f/1.8", "Condition: Excellent working order", "Includes: Original case"],
    images: ["/placeholder-uno0w.png", "/placeholder-uno0w.png"],
  },
  {
    id: 7,
    slug: "designer-handbag-coach",
    title: "Coach Leather Handbag",
    category: "Accessories",
    condition: "B" as const,
    priceList: null,
    status: "available" as const,
    thumbnail: "/coach-leather-handbag.png",
    ebayUrl: "https://www.ebay.com/item/456789123",
    description: "Authentic Coach leather handbag in classic brown. Shows minimal signs of wear.",
    specs: ["Material: Genuine Leather", "Color: Brown", 'Dimensions: 12" x 8" x 4"', "Hardware: Brass"],
    images: ["/coach-leather-handbag.png", "/coach-leather-handbag.png"],
  },
  {
    id: 8,
    slug: "antique-wooden-dresser",
    title: "Antique Oak Dresser",
    category: "Furniture",
    condition: "B" as const,
    priceList: 385,
    status: "sold" as const,
    thumbnail: "/antique-oak-dresser.png",
    description: "Beautiful antique oak dresser with original hardware. Perfect for bedroom or dining room storage.",
    specs: ["Material: Solid Oak", 'Dimensions: 60" x 18" x 32"', "Drawers: 6 drawers", "Era: Early 1900s"],
    images: ["/antique-oak-dresser.png", "/antique-oak-dresser.png"],
  },
  {
    id: 9,
    slug: "vintage-band-tshirt-grateful-dead",
    title: "Vintage Grateful Dead T-Shirt",
    category: "Clothing",
    condition: "C" as const,
    priceList: 85,
    status: "available" as const,
    thumbnail: "/vintage-grateful-dead-tshirt.png",
    description: "Authentic vintage Grateful Dead concert t-shirt. Shows wear consistent with age and use.",
    specs: ["Size: Large", "Material: 100% Cotton", "Era: 1980s", "Print: Screen printed"],
    images: ["/vintage-grateful-dead-tshirt.png", "/vintage-grateful-dead-tshirt.png"],
  },
  {
    id: 10,
    slug: "crystal-wine-glasses-set",
    title: "Crystal Wine Glass Set",
    category: "Home & Garden",
    condition: "A" as const,
    priceList: 165,
    status: "available" as const,
    thumbnail: "/crystal-wine-glasses-set.png",
    description: "Elegant set of 6 crystal wine glasses. Perfect for entertaining or special occasions.",
    specs: ["Quantity: 6 glasses", "Material: Lead Crystal", "Capacity: 8 oz each", "Condition: No chips or cracks"],
    images: ["/crystal-wine-glasses-set.png", "/crystal-wine-glasses-set.png"],
  },
  {
    id: 11,
    slug: "vintage-typewriter-royal",
    title: "Royal Quiet De Luxe Typewriter",
    category: "Electronics",
    condition: "B" as const,
    priceList: 225,
    status: "hold" as const,
    thumbnail: "/placeholder-srkpx.png",
    description: "Classic Royal Quiet De Luxe portable typewriter. Fully functional with original case.",
    specs: ["Model: Quiet De Luxe", "Year: 1950s", "Condition: Working order", "Includes: Original carrying case"],
    images: ["/placeholder-srkpx.png", "/placeholder-srkpx.png"],
  },
  {
    id: 12,
    slug: "persian-area-rug",
    title: "Persian Area Rug",
    category: "Home & Garden",
    condition: "A" as const,
    priceList: 750,
    status: "available" as const,
    thumbnail: "/vintage-persian-rug.png",
    description: "Authentic hand-woven Persian area rug with intricate traditional patterns. Excellent condition.",
    specs: ["Size: 8' x 10'", "Material: 100% Wool", "Origin: Iran", "Pattern: Traditional Persian"],
    images: ["/vintage-persian-rug.png", "/vintage-persian-rug.png"],
  },
]

const conditionLabels = {
  A: "Excellent",
  B: "Good",
  C: "Fair",
}

const statusLabels = {
  available: "Available",
  sold: "Sold",
  hold: "On Hold",
}

const statusColors = {
  available: "bg-[#0B3D2E] text-white",
  sold: "bg-[#9CA3AF] text-white",
  hold: "bg-[#F0C419] text-[#0B3D2E]",
}

interface ItemPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: ItemPageProps): Promise<Metadata> {
  const item = catalogItems.find((item) => item.slug === params.slug)

  if (!item) {
    return {
      title: "Item Not Found",
      description: "The requested item could not be found.",
    }
  }

  return {
    title: `${item.title} - ${conditionLabels[item.condition]} Condition`,
    description: `${item.description} Available in ${conditionLabels[item.condition]} condition. ${item.priceList ? `Listed at $${item.priceList}` : "See on eBay for pricing"}.`,
    keywords: [
      ...siteConfig.seo.keywords,
      item.category.toLowerCase(),
      item.title.toLowerCase(),
      conditionLabels[item.condition].toLowerCase(),
    ],
    openGraph: {
      title: `${item.title} - ${siteConfig.name}`,
      description: item.description,
      url: `${siteConfig.url}/item/${item.slug}`,
      type: "website",
      images: [
        {
          url: item.thumbnail,
          width: 800,
          height: 800,
          alt: item.title,
        },
      ],
    },
    alternates: {
      canonical: `/item/${item.slug}`,
    },
  }
}

export default function ItemPage({ params }: ItemPageProps) {
  const item = catalogItems.find((item) => item.slug === params.slug)

  if (!item) {
    notFound()
  }

  return (
    <>
      <ProductJsonLd product={item} />

      <div className="min-h-screen">
        <SiteHeader />

        <main>
          {/* Breadcrumb */}
          <section className="px-6 py-6 bg-white border-b border-[#9CA3AF]/20">
            <div className="max-w-6xl mx-auto">
              <nav className="flex items-center gap-2 text-sm font-body">
                <Link
                  href="/"
                  className="text-[#9CA3AF] hover:text-[#0B3D2E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0B3D2E] focus:ring-offset-2 rounded px-1 py-1"
                >
                  <Home className="w-4 h-4" />
                </Link>
                <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
                <Link
                  href="/catalog"
                  className="text-[#9CA3AF] hover:text-[#0B3D2E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0B3D2E] focus:ring-offset-2 rounded px-1 py-1"
                >
                  Catalog
                </Link>
                <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
                <span className="text-[#0B3D2E] font-medium">{item.title}</span>
              </nav>
            </div>
          </section>

          {/* Item Details */}
          <section className="px-6 py-12">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Image Gallery */}
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden group">
                    <img
                      src={item.thumbnail || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Thumbnail Gallery */}
                  {item.images && item.images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {item.images.slice(0, 4).map((image, index) => (
                        <button
                          key={index}
                          className="aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 border-transparent hover:border-[#0B3D2E] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0B3D2E] focus:ring-offset-2 hover:scale-105"
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`${item.title} view ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Item Info */}
                <div className="space-y-6">
                  {/* Title and Category */}
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge
                        variant="outline"
                        className="bg-white text-[#0B3D2E] border-[#0B3D2E]/20 font-body font-medium"
                      >
                        {item.category}
                      </Badge>
                      <StatusBadge status={item.status} />
                    </div>
                    <h1 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3D2E] mb-2">{item.title}</h1>
                    <div className="flex items-center gap-2">
                      <span className="font-body text-[#9CA3AF]">Condition:</span>
                      <Badge
                        variant="outline"
                        className="bg-white text-[#0B3D2E] border-[#0B3D2E]/20 font-mono font-medium"
                      >
                        {conditionLabels[item.condition]}
                      </Badge>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h2 className="font-heading font-semibold text-xl text-[#0B3D2E] mb-3">Description</h2>
                    <p className="font-body text-[#111827] leading-relaxed">{item.description}</p>
                  </div>

                  {/* Specifications */}
                  {item.specs && (
                    <div>
                      <h2 className="font-heading font-semibold text-xl text-[#0B3D2E] mb-3">Specifications</h2>
                      <ul className="space-y-2">
                        {item.specs.map((spec, index) => (
                          <li key={index} className="font-body text-[#111827] flex items-start gap-2">
                            <span className="w-2 h-2 bg-[#F0C419] rounded-full mt-2 flex-shrink-0"></span>
                            {spec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Pricing and CTA */}
                  <div className="border-t border-[#9CA3AF]/20 pt-6">
                    {item.ebayUrl ? (
                      <div className="space-y-4">
                        {item.priceList && <PriceChip price={item.priceList} className="text-2xl font-bold" />}
                        <Button
                          asChild
                          className="bg-[#F0C419] hover:bg-[#F0C419]/90 text-[#0B3D2E] font-body font-semibold rounded-2xl px-8 py-4 shadow-md hover:shadow-lg transition-all duration-200 w-full sm:w-auto hover:scale-105"
                        >
                          <a
                            href={item.ebayUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            Buy on eBay
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {item.priceList && <PriceChip price={item.priceList} className="text-2xl font-bold" />}
                        <p className="font-body text-[#9CA3AF]">Coming soon to eBay</p>
                      </div>
                    )}

                    {/* Ask a Question */}
                    <div className="mt-6">
                      <Button
                        asChild
                        variant="outline"
                        className="border-[#0B3D2E] text-[#0B3D2E] hover:bg-[#0B3D2E] hover:text-white font-body font-medium rounded-2xl px-6 py-3 transition-all duration-200 bg-transparent hover:scale-105"
                      >
                        <a
                          href={`mailto:${siteConfig.contact.email}?subject=Question about ${item.title}`}
                          className="flex items-center gap-2"
                        >
                          <Mail className="w-4 h-4" />
                          Ask a Question
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-[#0B3D2E] text-white px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {/* Business Info */}
              <div>
                <div className="font-heading font-bold text-2xl mb-4">{siteConfig.name}</div>
                <p className="font-body text-white/80 mb-4 leading-relaxed">{siteConfig.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#F0C419]" />
                    <span className="text-white/80">{siteConfig.location.cityState}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#F0C419]" />
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#F0C419] focus:ring-offset-2 focus:ring-offset-[#0B3D2E] rounded"
                    >
                      {siteConfig.contact.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
                <nav className="space-y-2">
                  {siteConfig.nav.main.slice(1).map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block font-body text-white/80 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#F0C419] focus:ring-offset-2 focus:ring-offset-[#0B3D2E] rounded px-1 py-1"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* eBay Store */}
              <div>
                <h3 className="font-heading font-semibold text-lg mb-4">Shop Our Store</h3>
                <Button
                  asChild
                  className="bg-[#F0C419] hover:bg-[#F0C419]/90 text-[#0B3D2E] font-body font-semibold rounded-2xl px-6 py-4 shadow-md hover:shadow-lg transition-all duration-200 w-full sm:w-auto"
                >
                  <a
                    href={siteConfig.ebayStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    Shop our eBay Store
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-white/20 pt-8 text-center">
              <p className="font-body text-white/60 text-sm">© 2024 {siteConfig.name}. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
