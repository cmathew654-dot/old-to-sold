"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink, Camera, DollarSign, Package, CheckCircle, Calendar, ArrowRight } from "lucide-react"
import { PremiumHeader } from "@/components/premium-header"
import { PremiumFooter } from "@/components/premium-footer"
import { siteConfig } from "@/config/site"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <PremiumHeader />

      <main id="main-content">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0B3D2E] via-[#0B3D2E]/95 to-[#0B3D2E]/90" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
            <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight">
              We turn old stuff into <span className="text-[#F0C419] relative">sold stuff</span>
            </h1>

            <p className="font-body text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Professional consignment service that gets you top dollar using real eBay SOLD data.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button
                asChild
                size="lg"
                className="bg-[#F0C419] hover:bg-[#F0C419]/90 text-[#0B3D2E] font-body font-bold text-lg rounded-2xl px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <a href="/catalog" className="flex items-center gap-2">
                  Browse Catalog
                  <ArrowRight className="w-5 h-5" />
                </a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-[#0B3D2E] font-body font-semibold text-lg rounded-2xl px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-200 bg-transparent"
              >
                <a href="/sell">Get a Free Estimate</a>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-[#F0C419] text-[#F0C419] hover:bg-[#F0C419] hover:text-[#0B3D2E] font-body font-semibold text-lg rounded-2xl px-10 py-6 shadow-lg hover:shadow-xl transition-all duration-200 bg-transparent"
              >
                <a
                  href={siteConfig.ebayStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Shop eBay Store
                  <ExternalLink className="w-5 h-5" />
                </a>
              </Button>
            </div>

            {/* Trust Row */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-white/80 font-body">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#F0C419]" />
                <span className="font-medium">SOLD comps pricing</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#F0C419]" />
                <span className="font-medium">Fast payouts</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#F0C419]" />
                <span className="font-medium">Local pickup</span>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-6 py-24 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-heading font-bold text-4xl md:text-5xl text-[#0B3D2E] text-center mb-20">
              How It Works
            </h2>

            <div className="grid md:grid-cols-3 gap-12">
              {/* Step 1 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#F0C419] to-[#F0C419]/80 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Camera className="w-10 h-10 text-[#0B3D2E]" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-[#0B3D2E] mb-6">1. Send Photos</h3>
                <p className="font-body text-[#9CA3AF] text-lg leading-relaxed">
                  Take a few photos of your items and send them our way. We'll handle the rest.
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#F0C419] to-[#F0C419]/80 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <DollarSign className="w-10 h-10 text-[#0B3D2E]" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-[#0B3D2E] mb-6">2. We Price Using SOLD Comps</h3>
                <p className="font-body text-[#9CA3AF] text-lg leading-relaxed">
                  Our experts research recent SOLD listings to price your items competitively for maximum profit.
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-[#F0C419] to-[#F0C419]/80 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                  <Package className="w-10 h-10 text-[#0B3D2E]" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-[#0B3D2E] mb-6">3. We List & You Get Paid</h3>
                <p className="font-body text-[#9CA3AF] text-lg leading-relaxed">
                  We handle the listing, photos, shipping, and customer service. You just collect your payout.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Schedule CTA */}
        <section className="px-6 py-24 bg-gradient-to-r from-[#0B3D2E] to-[#0B3D2E]/90">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="mb-8">
              <Calendar className="w-16 h-16 text-[#F0C419] mx-auto mb-6" />
            </div>

            <h2 className="font-heading font-bold text-4xl md:text-5xl mb-8">Ready to Get Started?</h2>

            <p className="font-body text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Schedule a convenient pickup or drop-off time that works for you. We'll handle everything else.
            </p>

            <Button
              asChild
              size="lg"
              className="bg-[#F0C419] hover:bg-[#F0C419]/90 text-[#0B3D2E] font-body font-bold text-lg rounded-2xl px-12 py-6 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <a href="/schedule" className="flex items-center gap-3">
                <Calendar className="w-6 h-6" />
                Schedule Pickup/Drop-off
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </section>
      </main>

      <PremiumFooter />
    </div>
  )
}
