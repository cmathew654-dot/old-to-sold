"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react"
import { siteConfig } from "@/config/site"
import { themeConfig } from "@/config/theme"

export function PremiumFooter() {
  const handleLinkClick = () => {
    // Small delay to ensure navigation happens first
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 50)
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.25, ease: themeConfig.ui.motion.ease },
    },
  }

  return (
    <footer className="bg-[#0B3D2E] text-white">
      <motion.div
        className="max-w-7xl mx-auto px-6 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="font-heading font-bold text-2xl mb-4">{siteConfig.name}</h3>
            <p className="text-lg text-white/80 mb-6 max-w-md">{siteConfig.tagline}</p>
            <p className="text-white/70 mb-6 max-w-md">
              Premium consignment resale service turning your treasures into cash. We handle everything from evaluation
              to sale.
            </p>

            {/* Bold eBay Store Link */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <a
                href={siteConfig.ebayStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#F0C419] text-[#0B3D2E] font-body font-bold px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 hover:bg-[#F0C419]/90"
              >
                Shop our eBay Store
                <ExternalLink className="w-4 h-4" />
              </a>
            </motion.div>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <h4 className="font-heading font-semibold text-lg mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="w-4 h-4 text-[#F0C419]" />
                <span className="text-sm">{siteConfig.location.cityState}</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Mail className="w-4 h-4 text-[#F0C419]" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-sm hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Phone className="w-4 h-4 text-[#F0C419]" />
                <a href={`tel:${siteConfig.contact.phone}`} className="text-sm hover:text-white transition-colors">
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <div className="space-y-3">
              {siteConfig.nav.main.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="block text-sm text-white/80 hover:text-white transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="mt-6 space-y-3">
              {siteConfig.nav.footer.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="block text-sm text-white/60 hover:text-white/80 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-sm text-white/60">Serving {siteConfig.location.cityState}</span>
            <div className="flex items-center gap-4">
              {Object.entries(siteConfig.social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-[#F0C419] transition-colors capitalize"
                >
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
