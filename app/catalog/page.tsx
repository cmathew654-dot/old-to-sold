import type { Metadata } from "next"
import { siteConfig } from "@/config/site"
import CatalogClientPage from "./CatalogClientPage"

export const metadata: Metadata = {
  title: "Catalog - Browse Our Consignment Collection",
  description: `Browse our curated collection of vintage, designer, and unique consignment items in ${siteConfig.location.cityState}. Find quality pre-owned treasures at great prices.`,
  keywords: [...siteConfig.seo.keywords, "browse catalog", "consignment items", "vintage collection"],
  openGraph: {
    title: "Catalog - Browse Our Consignment Collection",
    description: "Discover unique vintage, designer, and collectible items from our consignment collection.",
    url: `${siteConfig.url}/catalog`,
    type: "website",
  },
  alternates: {
    canonical: "/catalog",
  },
}

export default function CatalogPage() {
  return <CatalogClientPage />
}
