import type { Metadata } from "next"
import { PremiumHeader } from "@/components/premium-header"
import { PremiumFooter } from "@/components/premium-footer"
import { DatabaseSetup } from "@/components/database-setup"

export const metadata: Metadata = {
  title: "Database Setup - Old to Sold",
  description: "Set up your Supabase database schema for Old to Sold.",
}

export default function DatabaseSetupPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <PremiumHeader />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">Database Setup</h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Configure your Supabase database with the required tables and security policies.
            </p>
          </div>
          <DatabaseSetup />
        </div>
      </main>
      <PremiumFooter />
    </div>
  )
}
