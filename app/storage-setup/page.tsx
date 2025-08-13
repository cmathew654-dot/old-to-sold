import type { Metadata } from "next"
import { PremiumHeader } from "@/components/premium-header"
import { PremiumFooter } from "@/components/premium-footer"
import { StorageSetup } from "@/components/storage-setup"

export const metadata: Metadata = {
  title: "Storage Setup - Old to Sold",
  description: "Configure image storage for your Old to Sold catalog.",
}

export default function StorageSetupPage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <PremiumHeader />
      <main className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">Storage Configuration</h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Choose how you want to store and serve your catalog item images.
            </p>
          </div>
          <StorageSetup />
        </div>
      </main>
      <PremiumFooter />
    </div>
  )
}
