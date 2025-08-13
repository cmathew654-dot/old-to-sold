import type { Metadata } from "next"
import { PremiumHeader } from "@/components/premium-header"
import { PremiumFooter } from "@/components/premium-footer"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "FAQ - Frequently Asked Questions",
  description: "Get answers to common questions about our consignment resale service, pricing, and process.",
  keywords: [...siteConfig.seo.keywords, "FAQ", "questions", "consignment process"],
  openGraph: {
    title: "FAQ - Frequently Asked Questions",
    description: "Get answers to common questions about our consignment resale service.",
    url: `${siteConfig.url}/faq`,
    type: "website",
  },
  alternates: {
    canonical: "/faq",
  },
}

export default function FAQPage() {
  const faqs = [
    {
      question: "How does the consignment process work?",
      answer:
        "Simply fill out our sell form, schedule a pickup or drop-off, and we'll evaluate your items. We handle photography, listing, and sales on eBay. You get paid when items sell!",
    },
    {
      question: "What percentage do you take?",
      answer:
        "Our commission varies based on item value and category. Typically 30-50%, with higher-value items getting better rates. We'll discuss specifics during evaluation.",
    },
    {
      question: "How long does it take to sell items?",
      answer:
        "Most items sell within 30-90 days. High-demand vintage and designer pieces often sell faster. We'll keep you updated throughout the process.",
    },
    {
      question: "What types of items do you accept?",
      answer:
        "We specialize in vintage clothing, designer items, antiques, collectibles, and unique pieces. We're selective to ensure quality and marketability.",
    },
    {
      question: "How do I get paid?",
      answer:
        "We send payments via PayPal, Venmo, or check within 7 days of sale completion. You'll receive detailed sales reports with each payment.",
    },
    {
      question: "Can I set minimum prices?",
      answer:
        "Yes! During evaluation, we'll discuss pricing strategy and you can set minimum acceptable prices for your items.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <PremiumHeader />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="font-heading font-bold text-4xl md:text-5xl text-[#0B3D2E] mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-[#111827]/70 max-w-2xl mx-auto">
              Get answers to common questions about our consignment process, pricing, and services.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200/50">
                <h3 className="font-heading font-semibold text-xl text-[#0B3D2E] mb-3">{faq.question}</h3>
                <p className="text-[#111827]/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[#111827]/70 mb-4">Still have questions?</p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="inline-flex items-center gap-2 bg-[#0B3D2E] text-white font-body font-semibold px-6 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 hover:bg-[#0B3D2E]/90"
            >
              Contact Us
            </a>
          </div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  )
}
