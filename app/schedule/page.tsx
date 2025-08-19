"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, MapPin, Package, ExternalLink, ArrowLeft } from "lucide-react"
import { PremiumHeader } from "@/components/premium-header"
import { PremiumFooter } from "@/components/premium-footer"
import { siteConfig } from "@/config/site"
import { themeConfig } from "@/config/theme"
import Link from "next/link"

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

export default function SchedulePage() {
  const [selectedService, setSelectedService] = useState<"pickup" | "dropoff">("pickup")
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false)
  const [calendlyError, setCalendlyError] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Load Calendly widget script
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    script.onload = () => setIsCalendlyLoaded(true)
    script.onerror = () => setCalendlyError(true)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  // Initialize Calendly widget when loaded
  useEffect(() => {
    if (isCalendlyLoaded && (window as any).Calendly) {
      const prefillData = {
        name: "",
        email: "",
        customAnswers: {
          a1: `Service: ${selectedService === "pickup" ? "Pickup" : "Drop-off"}`,
        },
      }
      ;(window as any).Calendly.initInlineWidget({
        url: siteConfig.calendlyUrl,
        parentElement: document.getElementById("calendly-inline-widget"),
        prefill: prefillData,
        utm: {
          utmSource: "oldtosold-website",
          utmMedium: "website",
          utmCampaign: selectedService,
        },
      })
    }
  }, [isCalendlyLoaded, selectedService])

  const serviceInfo = {
    pickup: {
      title: "Schedule a Pickup",
      description: "We'll come to you to collect your items for consignment.",
      icon: <Package className="w-6 h-6" />,
      benefits: [
        "Convenient home pickup",
        "Professional item assessment",
        "Secure transportation",
        "No need to leave your home",
      ],
    },
    dropoff: {
      title: "Schedule a Drop-off",
      description: "Bring your items to our location at your convenience.",
      icon: <MapPin className="w-6 h-6" />,
      benefits: [
        "Flexible drop-off times",
        "Immediate item evaluation",
        "Meet our team in person",
        "Quick and easy process",
      ],
    },
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <PremiumHeader />

      <main className="pt-24">
        {/* Back Navigation */}
        <section className="px-6 py-4">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-body text-[#0B3D2E] hover:text-[#0B3D2E]/80 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </div>
        </section>

        {/* Hero Section */}
        <section className="px-6 py-16">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <Calendar className="w-16 h-16 text-[#F0C419] mx-auto mb-6" />
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-heading font-bold text-4xl md:text-6xl text-[#0B3D2E] mb-6"
            >
              Schedule Your Service
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="font-body text-xl text-[#9CA3AF] mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Choose between convenient pickup or drop-off service. We'll work around your schedule to make consignment
              easy.
            </motion.p>

            {/* Service Toggle */}
            <motion.div variants={itemVariants} className="mb-16">
              <div className="inline-flex bg-white rounded-2xl p-2 shadow-lg border border-gray-200">
                <button
                  onClick={() => setSelectedService("pickup")}
                  className={`flex items-center gap-3 px-6 md:px-8 py-4 rounded-xl font-body font-semibold transition-all duration-200 text-sm md:text-base ${
                    selectedService === "pickup"
                      ? "bg-[#0B3D2E] text-white shadow-md"
                      : "text-[#0B3D2E] hover:bg-gray-50"
                  }`}
                >
                  <Package className="w-4 h-4 md:w-5 md:h-5" />
                  Pickup Service
                </button>
                <button
                  onClick={() => setSelectedService("dropoff")}
                  className={`flex items-center gap-3 px-6 md:px-8 py-4 rounded-xl font-body font-semibold transition-all duration-200 text-sm md:text-base ${
                    selectedService === "dropoff"
                      ? "bg-[#0B3D2E] text-white shadow-md"
                      : "text-[#0B3D2E] hover:bg-gray-50"
                  }`}
                >
                  <MapPin className="w-4 h-4 md:w-5 md:h-5" />
                  Drop-off Service
                </button>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Service Information */}
        <section className="px-6 pb-16">
          <div className="max-w-6xl mx-auto">
            <motion.div
              key={selectedService}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="rounded-3xl shadow-lg border-0 bg-white mb-12">
                <CardContent className="p-6 md:p-8 lg:p-12">
                  <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-[#F0C419] rounded-2xl flex items-center justify-center">
                          {serviceInfo[selectedService].icon}
                        </div>
                        <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#0B3D2E]">
                          {serviceInfo[selectedService].title}
                        </h2>
                      </div>
                      <p className="font-body text-base md:text-lg text-[#9CA3AF] mb-8 leading-relaxed">
                        {serviceInfo[selectedService].description}
                      </p>
                      <div className="space-y-4">
                        {serviceInfo[selectedService].benefits.map((benefit, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-[#F0C419] rounded-full flex-shrink-0" />
                            <span className="font-body text-[#111827] text-sm md:text-base">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-[#F8FAFC] rounded-2xl p-6 md:p-8">
                      <h3 className="font-heading font-semibold text-lg md:text-xl text-[#0B3D2E] mb-6">
                        What to Expect
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Clock className="w-5 h-5 text-[#F0C419] mt-1 flex-shrink-0" />
                          <div>
                            <div className="font-body font-medium text-[#111827] text-sm md:text-base">
                              15-30 minutes
                            </div>
                            <div className="font-body text-xs md:text-sm text-[#9CA3AF]">Average appointment time</div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-[#F0C419] mt-1 flex-shrink-0" />
                          <div>
                            <div className="font-body font-medium text-[#111827] text-sm md:text-base">
                              Flexible scheduling
                            </div>
                            <div className="font-body text-xs md:text-sm text-[#9CA3AF]">
                              Available {selectedService === "pickup" ? "Monday-Saturday" : "7 days a week"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-[#F0C419] mt-1 flex-shrink-0" />
                          <div>
                            <div className="font-body font-medium text-[#111827] text-sm md:text-base">
                              {selectedService === "pickup" ? "Your location" : "Our location"}
                            </div>
                            <div className="font-body text-xs md:text-sm text-[#9CA3AF]">
                              {selectedService === "pickup"
                                ? `Serving ${siteConfig.location.cityState} area`
                                : `Visit us in ${siteConfig.location.cityState}`}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Calendly Embed Section */}
        <section className="px-6 pb-24">
          <div className="max-w-5xl mx-auto">
            <Card className="rounded-3xl shadow-lg border-0 bg-white overflow-hidden">
              <CardContent className="p-0">
                {!calendlyError && !isCalendlyLoaded && (
                  <div className="p-8 md:p-12 text-center">
                    <div className="animate-spin w-8 h-8 border-4 border-[#F0C419] border-t-transparent rounded-full mx-auto mb-4" />
                    <p className="font-body text-[#9CA3AF]">Loading calendar...</p>
                  </div>
                )}

                {calendlyError && (
                  <div className="p-8 md:p-12 text-center">
                    <Calendar className="w-16 h-16 text-[#9CA3AF] mx-auto mb-6" />
                    <h3 className="font-heading font-semibold text-xl text-[#0B3D2E] mb-4">
                      Schedule Your Appointment
                    </h3>
                    <p className="font-body text-[#9CA3AF] mb-8 max-w-md mx-auto">
                      Click the button below to open our scheduling calendar in a new window.
                    </p>
                    <Button
                      asChild
                      size="lg"
                      className="bg-[#F0C419] hover:bg-[#F0C419]/90 text-[#0B3D2E] font-body font-bold rounded-2xl px-8 py-4"
                    >
                      <a
                        href={siteConfig.calendlyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        Open Calendly
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </Button>
                  </div>
                )}

                <div
                  id="calendly-inline-widget"
                  className={`w-full ${!isCalendlyLoaded || calendlyError ? "hidden" : ""}`}
                  style={{
                    minHeight: isMobile ? "500px" : "700px",
                    height: isMobile ? "80vh" : "700px",
                    maxHeight: "none",
                    overflow: "hidden",
                  }}
                />
              </CardContent>
            </Card>

            <div className="mt-8 md:mt-12 text-center">
              <p className="font-body text-[#9CA3AF] mb-4 text-sm md:text-base">
                Need help or have questions? Contact us directly:
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center">
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="font-body text-[#0B3D2E] hover:text-[#0B3D2E]/80 transition-colors text-sm md:text-base"
                >
                  {siteConfig.contact.email}
                </a>
                <span className="hidden sm:inline text-[#9CA3AF]">•</span>
                <a
                  href={`tel:${siteConfig.contact.phone}`}
                  className="font-body text-[#0B3D2E] hover:text-[#0B3D2E]/80 transition-colors text-sm md:text-base"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PremiumFooter />
    </div>
  )
}
