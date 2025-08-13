import { Button } from "@/components/ui/button"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
}

export function EmptyState({ icon: Icon, title, description, actionLabel, actionHref }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-[#F0C419]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Icon className="w-12 h-12 text-[#F0C419]" />
      </div>
      <h3 className="font-heading font-semibold text-2xl text-[#0B3D2E] mb-4">{title}</h3>
      <p className="font-body text-[#9CA3AF] mb-8 max-w-md mx-auto">{description}</p>
      {actionLabel && actionHref && (
        <Button
          asChild
          className="bg-[#0B3D2E] hover:bg-[#0B3D2E]/90 text-white font-body font-semibold rounded-2xl px-8 py-4 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  )
}
