"use client"

import { useState, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ExternalLink, Package, Search } from "lucide-react"
import { PremiumHeader } from "@/components/premium-header"
import { PremiumFooter } from "@/components/premium-footer"
import { InteractiveCard } from "@/components/interactive-card"
import { StatusBadge } from "@/components/status-badge"
import { PriceChip } from "@/components/price-chip"
import { EmptyState } from "@/components/empty-state"
import { SkeletonLoader } from "@/components/skeleton-loader"
import { ConfigurationBanner } from "@/components/configuration-banner"
import { supabase, isSupabaseConfigured, type CatalogItem } from "@/lib/supabase"

const conditionLabels = {
  A: "Excellent",
  B: "Good",
  C: "Fair",
}

const statusLabels = {
  available: "Available",
  sold: "Sold",
  hold: "On Hold",
  draft: "Draft",
}

export default function CatalogClientPage() {
  const [items, setItems] = useState<CatalogItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingLocalData, setUsingLocalData] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [conditionFilter, setConditionFilter] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true)
      setError(null)
      setUsingLocalData(false)

      try {
        if (isSupabaseConfigured() && supabase) {
          // Try to fetch from Supabase
          const { data, error } = await supabase
            .from("items")
            .select("*")
            .in("status", ["available", "sold", "hold"])
            .order("created_at", { ascending: false })
            .limit(48)

          if (error) {
            const isTableNotFound =
              error.message.includes("table") &&
              (error.message.includes("does not exist") ||
                error.message.includes("not found") ||
                error.message.includes("schema cache"))

            if (isTableNotFound) {
              console.log("Supabase table not found, falling back to local data")
              throw new Error("TABLE_NOT_FOUND")
            } else {
              console.error("Supabase error:", error)
              throw new Error("Failed to fetch from database")
            }
          }

          setItems(data || [])
        } else {
          // Use local JSON when Supabase not configured
          throw new Error("SUPABASE_NOT_CONFIGURED")
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error"

        if (
          errorMessage === "TABLE_NOT_FOUND" ||
          errorMessage === "SUPABASE_NOT_CONFIGURED" ||
          !isSupabaseConfigured()
        ) {
          // Silently fall back to local JSON for configuration issues
          try {
            const response = await fetch("/data/items.json")
            if (!response.ok) {
              throw new Error("Failed to fetch local data")
            }
            const data = await response.json()
            setItems(data)
            setUsingLocalData(true)
          } catch (fallbackErr) {
            console.error("Local data fallback failed:", fallbackErr)
            setError("Unable to load catalog data. Please try again later.")
          }
        } else {
          // Show error for other issues
          console.error("Error fetching items:", err)
          setError("Failed to load catalog. Please try again.")

          // Still try local fallback
          try {
            const response = await fetch("/data/items.json")
            if (response.ok) {
              const data = await response.json()
              setItems(data)
              setUsingLocalData(true)
              setError(null) // Clear error if fallback works
            }
          } catch (fallbackErr) {
            console.error("Fallback also failed:", fallbackErr)
          }
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchItems()
  }, [])

  // Get unique categories from current items
  const categories = Array.from(new Set(items.map((item) => item.category).filter(Boolean)))

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    const filtered = items.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
      const matchesCondition = conditionFilter === "all" || item.condition === conditionFilter

      return matchesSearch && matchesCategory && matchesCondition
    })

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          const priceA = a.price_list || 0
          const priceB = b.price_list || 0
          return priceA - priceB
        case "price-desc":
          const priceA2 = a.price_list || 0
          const priceB2 = b.price_list || 0
          return priceB2 - priceA2
        case "newest":
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      }
    })

    return filtered
  }, [items, searchTerm, categoryFilter, conditionFilter, sortBy])

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <PremiumHeader />

      <main className="pt-24">
        {/* Page Header */}
        <section className="px-6 py-12 bg-white">
          <div className="max-w-6xl mx-auto">
            {!isSupabaseConfigured() && (
              <ConfigurationBanner type="supabase" onConfigure={() => (window.location.href = "/setup")} />
            )}

            <h1 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3D2E] mb-4">Browse Our Catalog</h1>
            <p className="font-body text-lg text-[#9CA3AF] mb-8">
              Discover unique items from our consignment collection
            </p>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9CA3AF] w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-2xl border-[#9CA3AF]/30 focus:border-[#0B3D2E] focus:ring-[#0B3D2E]"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full sm:w-48 rounded-2xl border-[#9CA3AF]/30 focus:border-[#0B3D2E] focus:ring-[#0B3D2E]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={conditionFilter} onValueChange={setConditionFilter}>
                  <SelectTrigger className="w-full sm:w-48 rounded-2xl border-[#9CA3AF]/30 focus:border-[#0B3D2E] focus:ring-[#0B3D2E]">
                    <SelectValue placeholder="Condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Conditions</SelectItem>
                    <SelectItem value="A">Excellent (A)</SelectItem>
                    <SelectItem value="B">Good (B)</SelectItem>
                    <SelectItem value="C">Fair (C)</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48 rounded-2xl border-[#9CA3AF]/30 focus:border-[#0B3D2E] focus:ring-[#0B3D2E]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results count */}
            <p className="font-body text-[#9CA3AF] mb-8">
              Showing {filteredAndSortedItems.length} of {items.length} items
              {usingLocalData && <span className="text-amber-600 ml-2">(using sample data)</span>}
            </p>
          </div>
        </section>

        {/* Catalog Grid */}
        <section className="px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            {error && (
              <div className="text-center py-12">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>Try Again</Button>
              </div>
            )}

            {isLoading ? (
              <SkeletonLoader count={8} />
            ) : filteredAndSortedItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredAndSortedItems.map((item) => (
                  <InteractiveCard key={item.id} href={`/item/${item.slug}`}>
                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                      <img
                        src={item.thumbnail_url || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <StatusBadge status={item.status} />
                        <Badge
                          variant="outline"
                          className="bg-white/90 text-[#0B3D2E] border-[#0B3D2E]/20 font-mono font-medium text-xs"
                        >
                          {conditionLabels[item.condition]}
                        </Badge>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-heading font-semibold text-lg text-[#0B3D2E] mb-2 line-clamp-2 group-hover:text-[#0B3D2E]/80 transition-colors">
                        {item.title}
                      </h3>
                      <p className="font-body text-[#9CA3AF] text-sm mb-3">{item.category}</p>
                      <div className="flex items-center justify-between">
                        {item.price_list ? (
                          <PriceChip price={item.price_list} />
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs border-[#F0C419] text-[#0B3D2E] hover:bg-[#F0C419] hover:text-[#0B3D2E] rounded-xl bg-transparent transition-all duration-200 hover:scale-105"
                            onClick={(e) => {
                              e.preventDefault()
                              if (item.ebay_url) {
                                window.open(item.ebay_url, "_blank")
                              }
                            }}
                          >
                            See on eBay
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </InteractiveCard>
                ))}
              </div>
            ) : (
              <EmptyState
                icon={Package}
                title="No items found"
                description="We couldn't find any items matching your search criteria. Try adjusting your filters or search terms."
                actionLabel="Back to Home"
                actionHref="/"
              />
            )}
          </div>
        </section>
      </main>

      <PremiumFooter />
    </div>
  )
}
