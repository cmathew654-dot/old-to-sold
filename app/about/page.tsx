import { PremiumHeader } from "@/components/premium-header"
import { PremiumFooter } from "@/components/premium-footer"
import { siteConfig } from "@/config/site"
import { Award, Users, TrendingUp, Shield } from "lucide-react"

export const metadata = {
  title: `About Us - ${siteConfig.name}`,
  description:
    "Learn about Old to Sold's professional consignment services and our commitment to getting you top dollar for your items.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <PremiumHeader />

      <main className="pt-24 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="font-heading font-bold text-4xl md:text-6xl text-[#0B3D2E] mb-6">About Old to Sold</h1>
            <p className="font-body text-xl text-[#9CA3AF] max-w-3xl mx-auto leading-relaxed">
              We're passionate about helping people turn their unused items into cash through professional consignment
              services backed by real market data.
            </p>
          </div>

          {/* Story Section */}
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12 mb-16">
            <h2 className="font-heading font-bold text-3xl text-[#0B3D2E] mb-6">Our Story</h2>
            <p className="font-body text-lg text-[#111827] mb-6 leading-relaxed">
              Founded with the belief that everyone deserves to get top dollar for their valuable items, Old to Sold
              combines years of eBay selling expertise with data-driven pricing strategies to maximize your returns.
            </p>
            <p className="font-body text-lg text-[#111827] leading-relaxed">
              We take the hassle out of online selling by handling everything from professional photography and listing
              optimization to customer service and shipping, so you can focus on what matters most to you.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F0C419] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-[#0B3D2E]" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#0B3D2E] mb-2">Data-Driven Pricing</h3>
              <p className="font-body text-[#9CA3AF]">We use real SOLD comps to price your items for maximum profit</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#F0C419] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[#0B3D2E]" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#0B3D2E] mb-2">Expert Service</h3>
              <p className="font-body text-[#9CA3AF]">Years of eBay selling experience and proven track record</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#F0C419] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[#0B3D2E]" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#0B3D2E] mb-2">Personal Touch</h3>
              <p className="font-body text-[#9CA3AF]">Local pickup and personalized service for every client</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#F0C419] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#0B3D2E]" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#0B3D2E] mb-2">Trusted & Secure</h3>
              <p className="font-body text-[#9CA3AF]">Fully insured and secure handling of your valuable items</p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-[#0B3D2E] to-[#0B3D2E]/90 rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="font-heading font-bold text-3xl mb-6">Ready to Get Started?</h2>
            <p className="font-body text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Let us help you turn your unused items into cash with our professional consignment service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/sell"
                className="bg-[#F0C419] hover:bg-[#F0C419]/90 text-[#0B3D2E] font-body font-bold text-lg rounded-2xl px-8 py-4 transition-all duration-200 inline-block"
              >
                Get Free Estimate
              </a>
              <a
                href="/schedule"
                className="border-2 border-white text-white hover:bg-white hover:text-[#0B3D2E] font-body font-semibold text-lg rounded-2xl px-8 py-4 transition-all duration-200 inline-block"
              >
                Schedule Pickup
              </a>
            </div>
          </div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  )
}
