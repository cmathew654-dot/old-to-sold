import type React from "react"
import type { Metadata } from "next"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = {
  title: "Schedule Pickup or Drop-off",
  description: `Schedule convenient pickup or drop-off service for your consignment items in ${siteConfig.location.cityState}. Professional, flexible, and easy.`,
  openGraph: {
    title: `Schedule Service - ${siteConfig.name}`,
    description: `Book your pickup or drop-off appointment in ${siteConfig.location.cityState}`,
    url: `${siteConfig.url}/schedule`,
    type: "website",
  },
  alternates: {
    canonical: "/schedule",
  },
}

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
