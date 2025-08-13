"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { themeConfig } from "@/config/theme"

interface CarouselItem {
  id: number
  slug: string
  title: string
  category: string
  condition: "A" | "B" | "C"
  priceList: number | null
  status: "available" | "sold" | "on-hold"
  thumbnail: string
  ebayUrl?: string
}

interface PremiumCarouselProps {
  items: CarouselItem[]
}

export function PremiumCarousel({ items }: PremiumCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [items.length, isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
  }

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "A":
        return "bg-[#0B3D2E] text-white"
      case "B":
        return "bg-[#F0C419] text-[#0B3D2E]"
      case "C":
        return "bg-[#9CA3AF] text-white"
      default:
        return "bg-[#9CA3AF] text-white"
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: themeConfig.ui.motion.ease },
    },
  }

  return (
    <section className="px-6 py-24 bg-white">
      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2
          variants={itemVariants}
          className="font-heading font-bold text-4xl md:text-5xl text-[#0B3D2E] text-center mb-20"
        >
          Featured on eBay
        </motion.h2>

        <div className="relative">
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="grid md:grid-cols-3 gap-8"
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5, ease: themeConfig.ui.motion.ease }}
              >
                {items.slice(currentIndex, currentIndex + 3).map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  >
                    <Card className="rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-0 bg-white">
                      <div className="aspect-square bg-gray-100 relative overflow-hidden">
                        <img
                          src={item.thumbnail || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          loading="lazy"
                        />
                        <Badge
                          className={`absolute top-6 right-6 font-mono font-medium text-sm px-3 py-1 rounded-full ${getConditionColor(
                            item.condition,
                          )}`}
                        >
                          Condition {item.condition}
                        </Badge>
                      </div>
                      <CardContent className="p-8">
                        <h3 className="font-heading font-bold text-xl text-[#0B3D2E] mb-3">{item.title}</h3>
                        <p className="font-body text-[#9CA3AF] mb-6">{item.category}</p>
                        <div className="flex items-center justify-between">
                          {item.priceList ? (
                            <div className="font-mono font-bold text-2xl text-[#0B3D2E]">${item.priceList}</div>
                          ) : (
                            <div className="font-body text-[#9CA3AF]">On eBay</div>
                          )}
                          {item.ebayUrl && (
                            <Button
                              asChild
                              size="sm"
                              className="bg-[#F0C419] hover:bg-[#F0C419]/90 text-[#0B3D2E] font-body font-semibold rounded-xl px-4 py-2"
                            >
                              <a
                                href={item.ebayUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                              >
                                View
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-[#0B3D2E] hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-[#0B3D2E] hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-3">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex ? "bg-[#0B3D2E] scale-125" : "bg-[#9CA3AF] hover:bg-[#0B3D2E]/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
