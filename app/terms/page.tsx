import { PremiumHeader } from "@/components/premium-header"
import { PremiumFooter } from "@/components/premium-footer"
import { siteConfig } from "@/config/site"

export const metadata = {
  title: `Terms of Service - ${siteConfig.name}`,
  description: "Terms of service for Old to Sold consignment services.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <PremiumHeader />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            <h1 className="font-heading font-bold text-4xl text-[#0B3D2E] mb-8">Terms of Service</h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-[#9CA3AF] mb-6">Last updated: {new Date().toLocaleDateString()}</p>

              <h2 className="font-heading font-bold text-2xl text-[#0B3D2E] mt-8 mb-4">Consignment Agreement</h2>
              <p className="text-[#111827] mb-4">
                By using our consignment services, you agree to allow Old to Sold to list and sell your items on eBay
                and other platforms on your behalf.
              </p>

              <h2 className="font-heading font-bold text-2xl text-[#0B3D2E] mt-8 mb-4">Commission Structure</h2>
              <p className="text-[#111827] mb-4">
                Our commission rates vary based on the final sale price and item category. All fees will be clearly
                communicated before listing your items.
              </p>

              <h2 className="font-heading font-bold text-2xl text-[#0B3D2E] mt-8 mb-4">
                Item Condition and Authenticity
              </h2>
              <p className="text-[#111827] mb-4">
                You warrant that all items submitted for consignment are authentic, legally owned by you, and accurately
                described in terms of condition and provenance.
              </p>

              <h2 className="font-heading font-bold text-2xl text-[#0B3D2E] mt-8 mb-4">Payment Terms</h2>
              <p className="text-[#111827] mb-4">
                Payments are processed within 7-14 business days after the buyer's payment clears and the return period
                expires.
              </p>

              <h2 className="font-heading font-bold text-2xl text-[#0B3D2E] mt-8 mb-4">Contact Us</h2>
              <p className="text-[#111827] mb-4">
                If you have any questions about these Terms, please contact us at{" "}
                <a href={`mailto:${siteConfig.contact.email}`} className="text-[#0B3D2E] hover:underline">
                  {siteConfig.contact.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  )
}
