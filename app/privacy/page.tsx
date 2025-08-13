import { PremiumHeader } from "@/components/premium-header"
import { PremiumFooter } from "@/components/premium-footer"
import { siteConfig } from "@/config/site"

export const metadata = {
  title: `Privacy Policy - ${siteConfig.name}`,
  description: "Privacy policy for Old to Sold consignment services.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <PremiumHeader />

      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
            <h1 className="font-heading font-bold text-4xl text-[#0B3D2E] mb-8">Privacy Policy</h1>

            <div className="prose prose-lg max-w-none">
              <p className="text-[#9CA3AF] mb-6">Last updated: {new Date().toLocaleDateString()}</p>

              <h2 className="font-heading font-bold text-2xl text-[#0B3D2E] mt-8 mb-4">Information We Collect</h2>
              <p className="text-[#111827] mb-4">
                We collect information you provide directly to us, such as when you create an account, submit items for
                consignment, or contact us for support.
              </p>

              <h2 className="font-heading font-bold text-2xl text-[#0B3D2E] mt-8 mb-4">How We Use Your Information</h2>
              <p className="text-[#111827] mb-4">
                We use the information we collect to provide, maintain, and improve our consignment services, process
                transactions, and communicate with you about your items and our services.
              </p>

              <h2 className="font-heading font-bold text-2xl text-[#0B3D2E] mt-8 mb-4">Information Sharing</h2>
              <p className="text-[#111827] mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your
                consent, except as described in this policy.
              </p>

              <h2 className="font-heading font-bold text-2xl text-[#0B3D2E] mt-8 mb-4">Contact Us</h2>
              <p className="text-[#111827] mb-4">
                If you have any questions about this Privacy Policy, please contact us at{" "}
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
