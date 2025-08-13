import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey)
}

export type CatalogItem = {
  id: string
  slug: string
  title: string
  brand?: string
  category?: string
  condition: "A" | "B" | "C"
  price_list?: number
  status: "available" | "sold" | "hold" | "draft"
  thumbnail_url?: string
  ebay_url?: string
  featured: boolean
  created_at: string
}
