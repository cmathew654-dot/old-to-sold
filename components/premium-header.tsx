"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ExternalLink, Menu, X, Calendar } from "lucide-react"
import { siteConfig } from "@/config/site"
import { themeConfig } from "@/config/theme"

export function PremiumHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()

  // Handle scroll to change header appearance
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [isMobileMenuOpen])

  // Focus trap for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen && mobileMenuRef.current) {
      const focusableElements = mobileMenuRef.current.querySelectorAll(
        'a[href], button, [tabindex]:not([tabindex="-1"])',
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === "Tab") {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault()
              lastElement.focus()
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault()
              firstElement.focus()
            }
          }
        }
      }

      document.addEventListener("keydown", handleTabKey)
      firstElement?.focus()

      return () => document.removeEventListener("keydown", handleTabKey)
    }
  }, [isMobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-lg" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: themeConfig.ui.motion.ease }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.18 }}>
            <Link
              href="/"
              className={`font-heading font-bold text-2xl transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-xl px-3 py-2 ${
                isScrolled ? "text-[#0B3D2E] focus:ring-[#0B3D2E]" : "text-white focus:ring-white"
              }`}
            >
              {siteConfig.name}
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {siteConfig.nav.main.slice(1, -2).map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.25 }}
              >
                <Link
                  href={item.href}
                  className={`font-body font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-xl px-3 py-2 ${
                    isScrolled
                      ? "text-[#111827] hover:text-[#0B3D2E] focus:ring-[#0B3D2E]"
                      : "text-white/90 hover:text-white focus:ring-white"
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}

            {/* Schedule Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.25 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                className="bg-[#0B3D2E] hover:bg-[#0B3D2E]/90 text-white font-body font-semibold rounded-2xl px-6 py-3 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Link href="/schedule" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Schedule Pickup
                </Link>
              </Button>
            </motion.div>

            {/* eBay Store Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.25 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                asChild
                className="bg-[#F0C419] hover:bg-[#F0C419]/90 text-[#0B3D2E] font-body font-bold rounded-2xl px-6 py-3 shadow-md hover:shadow-lg transition-all duration-200"
              >
                <a
                  href={siteConfig.ebayStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Shop eBay Store
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </motion.div>
          </nav>

          {/* Mobile menu button */}
          <motion.button
            ref={menuButtonRef}
            onClick={toggleMobileMenu}
            className={`lg:hidden p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-xl ${
              isScrolled
                ? "text-[#111827] hover:text-[#0B3D2E] focus:ring-[#0B3D2E]"
                : "text-white hover:text-white/80 focus:ring-white"
            }`}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
        )}
      </AnimatePresence>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            id="mobile-menu"
            className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl z-50 lg:hidden"
            aria-hidden={!isMobileMenuOpen}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: themeConfig.ui.motion.ease }}
          >
            <div className="flex flex-col h-full">
              {/* Mobile menu header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <span className="font-heading font-bold text-xl text-[#0B3D2E]">{siteConfig.name}</span>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 text-[#111827] hover:text-[#0B3D2E] focus:outline-none focus:ring-2 focus:ring-[#0B3D2E] focus:ring-offset-2 rounded-xl transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile menu navigation */}
              <nav className="flex-1 px-6 py-8">
                <div className="space-y-6">
                  {siteConfig.nav.main.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.25 }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMobileMenu}
                        className="block font-body font-medium text-lg text-[#111827] hover:text-[#0B3D2E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0B3D2E] focus:ring-offset-2 rounded-xl px-3 py-3"
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </nav>

              {/* Mobile menu footer */}
              <div className="p-6 border-t border-gray-200 space-y-4">
                <Button
                  asChild
                  className="w-full bg-[#0B3D2E] hover:bg-[#0B3D2E]/90 text-white font-body font-semibold rounded-2xl px-6 py-4 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Link href="/schedule" onClick={closeMobileMenu} className="flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Schedule Pickup
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full bg-[#F0C419] hover:bg-[#F0C419]/90 text-[#0B3D2E] font-body font-bold rounded-2xl px-6 py-4 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <a
                    href={siteConfig.ebayStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMobileMenu}
                    className="flex items-center justify-center gap-2"
                  >
                    Shop eBay Store
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
