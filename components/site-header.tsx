"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ExternalLink, Menu, X } from "lucide-react"
import { siteConfig } from "@/config/site"

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#9CA3AF]/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-heading font-bold text-2xl text-[#0B3D2E] focus:outline-none focus:ring-2 focus:ring-[#0B3D2E] focus:ring-offset-2 rounded-lg px-2 py-1"
          >
            {siteConfig.name}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {siteConfig.nav.main.slice(1).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-body font-medium text-[#111827] hover:text-[#0B3D2E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0B3D2E] focus:ring-offset-2 rounded-lg px-2 py-1"
              >
                {item.name}
              </Link>
            ))}
            <Button
              asChild
              className="bg-[#F0C419] hover:bg-[#F0C419]/90 text-[#0B3D2E] font-body font-semibold rounded-2xl px-6 py-4 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <a
                href={siteConfig.ebayStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                Shop our eBay Store
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            ref={menuButtonRef}
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-[#111827] hover:text-[#0B3D2E] focus:outline-none focus:ring-2 focus:ring-[#0B3D2E] focus:ring-offset-2 rounded-lg transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={closeMobileMenu} aria-hidden="true" />
      )}

      {/* Mobile Navigation Menu */}
      <div
        ref={mobileMenuRef}
        id="mobile-menu"
        className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="flex flex-col h-full">
          {/* Mobile menu header */}
          <div className="flex items-center justify-between p-6 border-b border-[#9CA3AF]/20">
            <span className="font-heading font-bold text-xl text-[#0B3D2E]">{siteConfig.name}</span>
            <button
              onClick={closeMobileMenu}
              className="p-2 text-[#111827] hover:text-[#0B3D2E] focus:outline-none focus:ring-2 focus:ring-[#0B3D2E] focus:ring-offset-2 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile menu navigation */}
          <nav className="flex-1 px-6 py-8">
            <div className="space-y-6">
              {siteConfig.nav.main.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="block font-body font-medium text-lg text-[#111827] hover:text-[#0B3D2E] transition-colors focus:outline-none focus:ring-2 focus:ring-[#0B3D2E] focus:ring-offset-2 rounded-lg px-3 py-2"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Mobile menu footer */}
          <div className="p-6 border-t border-[#9CA3AF]/20">
            <Button
              asChild
              className="w-full bg-[#F0C419] hover:bg-[#F0C419]/90 text-[#0B3D2E] font-body font-semibold rounded-2xl px-6 py-4 shadow-md hover:shadow-lg transition-all duration-200"
            >
              <a
                href={siteConfig.ebayStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="flex items-center justify-center gap-2"
              >
                Shop our eBay Store
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
