import type { Metadata } from "next"
import { PremiumHeader } from "@/components/premium-header"
import { PremiumFooter } from "@/components/premium-footer"
import { EnvironmentSetup } from "@/components/environment-setup"

export const metadata: Metadata = {
  title: "Setup - Old to Sold",
  description: "Configure your Old to Sold website with Supabase and Resend integrations.",
}

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <PremiumHeader />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">Setup Your Integrations</h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Configure Supabase and Resend to enable database storage and email notifications for your consignment
              business.
            </p>
          </div>
          <EnvironmentSetup />
        </div>
      </main>
      <PremiumFooter />
    </div>
  )
}
