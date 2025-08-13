import type { Metadata } from "next"
import { PremiumHeader } from "@/components/premium-header"
import { PremiumFooter } from "@/components/premium-footer"
import { AdminDashboard } from "@/components/admin-dashboard"
import { supabaseServer, isSupabaseServerConfigured } from "@/lib/supabase-server"
import { isResendConfigured } from "@/lib/email"

export const metadata: Metadata = {
  title: "Admin Dashboard - Old to Sold",
  description: "Manage your Old to Sold consignment business.",
}

async function getConsignments() {
  if (!isSupabaseServerConfigured() || !supabaseServer) {
    return { data: null, error: "Supabase not configured" }
  }

  try {
    const { data, error } = await supabaseServer
      .from("consignments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50)

    return { data, error }
  } catch (error) {
    console.error("Failed to fetch consignments:", error)
    return { data: null, error: "Failed to fetch consignments" }
  }
}

async function getConfigurationStatus() {
  return {
    supabase: {
      url: !!process.env.SUPABASE_URL,
      anonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      serviceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      configured: isSupabaseServerConfigured(),
    },
    resend: {
      apiKey: isResendConfigured(),
      fromAddress: !!process.env.RESEND_FROM,
      configured: isResendConfigured(),
    },
    storage: {
      provider: process.env.STORAGE_PROVIDER || "local",
    },
  }
}

export default async function AdminPage() {
  const [consignmentsResult, configStatus] = await Promise.all([getConsignments(), getConfigurationStatus()])

  return (
    <div className="min-h-screen bg-neutral-50">
      <PremiumHeader />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">Admin Dashboard</h1>
            <p className="text-xl text-neutral-600">Manage your consignment business and view submissions.</p>
          </div>

          <AdminDashboard
            consignments={consignmentsResult.data}
            consignmentsError={consignmentsResult.error}
            configStatus={configStatus}
          />
        </div>
      </main>
      <PremiumFooter />
    </div>
  )
}
