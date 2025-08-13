"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import Link from "next/link"

interface CarouselItem {
  id: number
  slug: string
  title: string
  category: string
  condition: "A" | "B" | "C"
  priceList: number | null
  status: "available" | "sold" | "hold"
  thumbnail: string
  ebayUrl?: string
}

interface FeaturedCarouselProps {
  items: CarouselItem[]
  title?: string
}

const conditionLabels = {
  A: "Excellent",
  B: "Good",
  C: "Fair",
}

export function FeaturedCarousel({ items, title = "Featured on eBay" }: FeaturedCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  // Filter items that have eBay URLs
  const featuredItems = items.filter((item) => item.ebayUrl)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || featuredItems.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredItems.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, featuredItems.length])

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return

    const distance = touchStartX.current - touchEndX.current
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    } else if (isRightSwipe) {
      prevSlide()
    }
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredItems.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredItems.length) % featuredItems.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  if (featuredItems.length === 0) {
    return null
  }

  return (
    <section className="px-6 py-16 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3D2E] text-center mb-16">{title}</h2>

        <div className="relative">
          {/* Main carousel */}
          <div
            ref={carouselRef}
            className="overflow-hidden rounded-2xl"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {featuredItems.map((item) => (
                <div key={item.id} className="w-full flex-shrink-0">
                  <Card className="rounded-2xl shadow-lg overflow-hidden mx-2">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Image */}
                      <div className="aspect-square md:aspect-auto relative bg-gray-100">
                        <img
                          src={item.thumbnail || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="absolute top-4 right-4 flex flex-col gap-2">
                          <Badge className="bg-[#F0C419] text-[#0B3D2E] font-mono font-medium">ON EBAY</Badge>
                          <Badge
                            variant="outline"
                            className="bg-white/90 text-[#0B3D2E] border-[#0B3D2E]/20 font-mono font-medium text-xs"
                          >
                            {conditionLabels[item.condition]}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <CardContent className="p-8 flex flex-col justify-center">
                        <div className="mb-4">
                          <Badge variant="outline" className="text-[#9CA3AF] border-[#9CA3AF]/30 mb-3">
                            {item.category}
                          </Badge>
                          <h3 className="font-heading font-bold text-2xl md:text-3xl text-[#0B3D2E] mb-4 leading-tight">
                            {item.title}
                          </h3>
                          <p className="font-body text-[#9CA3AF] mb-6">
                            This item is currently listed on our eBay store. Click below to view the full listing and
                            place your bid.
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button
                            asChild
                            className="bg-[#F0C419] hover:bg-[#F0C419]/90 text-[#0B3D2E] font-body font-semibold rounded-2xl px-6 py-4 shadow-md hover:shadow-lg transition-all duration-200"
                          >
                            <a
                              href={item.ebayUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2"
                            >
                              View on eBay
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </Button>
                          <Button
                            asChild
                            variant="outline"
                            className="border-2 border-[#0B3D2E] text-[#0B3D2E] hover:bg-[#0B3D2E] hover:text-white font-body font-semibold rounded-2xl px-6 py-4 shadow-md hover:shadow-lg transition-all duration-200 bg-transparent"
                          >
                            <Link href={`/item/${item.slug}`}>View Details</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          {featuredItems.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full w-12 h-12 text-[#0B3D2E] hover:text-[#0B3D2E] z-10"
                onClick={prevSlide}
                aria-label="Previous item"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full w-12 h-12 text-[#0B3D2E] hover:text-[#0B3D2E] z-10"
                onClick={nextSlide}
                aria-label="Next item"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}

          {/* Dots indicator */}
          {featuredItems.length > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {featuredItems.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex ? "bg-[#0B3D2E] scale-110" : "bg-[#9CA3AF] hover:bg-[#0B3D2E]/50"
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
