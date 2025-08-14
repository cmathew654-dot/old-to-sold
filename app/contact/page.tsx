import type { Metadata } from "next"
import { PremiumHeader } from "@/components/premium-header"
import { PremiumFooter } from "@/components/premium-footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, Calendar } from "lucide-react"
import { siteConfig } from "@/config/site"
import Link from "next/link"

export const metadata: Metadata = {
  title: `Contact Us - ${siteConfig.name}`,
  description: "Get in touch with Old to Sold for consignment services, questions, or to schedule a pickup.",
  keywords: [...siteConfig.seo.keywords, "contact", "customer service", "consignment help"],
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <PremiumHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-[#0B3D2E] mb-6">Get in Touch</h1>
          <p className="font-body text-xl text-[#111827]/80 max-w-2xl mx-auto">
            Have questions about consignment? Ready to sell your items? We're here to help you turn your treasures into
            cash.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Email */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#0B3D2E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-[#0B3D2E]" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-[#0B3D2E] mb-2">Email Us</h3>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="font-body text-[#111827]/80 hover:text-[#0B3D2E] transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </CardContent>
            </Card>

            {/* Phone */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#0B3D2E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-6 h-6 text-[#0B3D2E]" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-[#0B3D2E] mb-2">Call Us</h3>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="font-body text-[#111827]/80 hover:text-[#0B3D2E] transition-colors"
                >
                  {siteConfig.contact.phone}
                </a>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#0B3D2E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-[#0B3D2E]" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-[#0B3D2E] mb-2">Location</h3>
                <p className="font-body text-[#111827]/80">{siteConfig.location.cityState}</p>
              </CardContent>
            </Card>

            {/* Hours */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-[#0B3D2E]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-[#0B3D2E]" />
                </div>
                <h3 className="font-heading font-semibold text-lg text-[#0B3D2E] mb-2">Hours</h3>
                <p className="font-body text-[#111827]/80 text-sm">
                  Mon-Fri: 9AM-6PM
                  <br />
                  Sat: 10AM-4PM
                  <br />
                  Sun: By Appointment
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="font-heading font-bold text-2xl text-[#0B3D2E] mb-6">Send us a Message</h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block font-body font-medium text-[#111827] mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B3D2E] focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block font-body font-medium text-[#111827] mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B3D2E] focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-body font-medium text-[#111827] mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B3D2E] focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block font-body font-medium text-[#111827] mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B3D2E] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-body font-medium text-[#111827] mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B3D2E] focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select a topic</option>
                      <option value="consignment">Consignment Services</option>
                      <option value="pickup">Schedule Pickup</option>
                      <option value="pricing">Pricing Questions</option>
                      <option value="general">General Inquiry</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-body font-medium text-[#111827] mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0B3D2E] focus:border-transparent transition-all resize-vertical"
                      placeholder="Tell us about your items or ask any questions..."
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#0B3D2E] hover:bg-[#0B3D2E]/90 text-white font-body font-semibold rounded-xl px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-8">
              {/* Schedule Pickup */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-[#0B3D2E] to-[#0B3D2E]/90 text-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-xl">Ready to Consign?</h3>
                  </div>
                  <p className="font-body text-white/90 mb-6">
                    Schedule a convenient pickup time and let us handle the rest. We'll evaluate your items and get them
                    listed for sale.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-[#F0C419] hover:bg-[#F0C419]/90 text-[#0B3D2E] font-body font-bold rounded-xl px-6 py-3"
                  >
                    <Link href="/schedule">Schedule Pickup</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* FAQ */}
              <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="font-heading font-bold text-xl text-[#0B3D2E] mb-4">Frequently Asked Questions</h3>
                  <p className="font-body text-[#111827]/80 mb-6">
                    Find answers to common questions about our consignment process, pricing, and services.
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-[#0B3D2E] text-[#0B3D2E] hover:bg-[#0B3D2E] hover:text-white font-body font-semibold rounded-xl px-6 py-3 bg-transparent"
                  >
                    <Link href="/faq">View FAQ</Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Sell Items */}
              <Card className="border-0 shadow-xl bg-gradient-to-br from-[#F0C419] to-[#F0C419]/90">
                <CardContent className="p-8">
                  <h3 className="font-heading font-bold text-xl text-[#0B3D2E] mb-4">Start Selling Today</h3>
                  <p className="font-body text-[#0B3D2E]/80 mb-6">
                    Fill out our consignment form to get started. Tell us about your items and we'll take care of the
                    rest.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-[#0B3D2E] hover:bg-[#0B3D2E]/90 text-white font-body font-bold rounded-xl px-6 py-3"
                  >
                    <Link href="/sell">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <PremiumFooter />
    </div>
  )
}
