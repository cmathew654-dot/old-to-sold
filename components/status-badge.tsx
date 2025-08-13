import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: "available" | "sold" | "hold"
}

const statusConfig = {
  available: {
    label: "Available",
    className: "bg-[#0B3D2E] text-white hover:bg-[#0B3D2E]/90",
  },
  sold: {
    label: "Sold",
    className: "bg-[#9CA3AF] text-white hover:bg-[#9CA3AF]/90",
  },
  hold: {
    label: "On Hold",
    className: "bg-[#F0C419] text-[#0B3D2E] hover:bg-[#F0C419]/90",
  },
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status]

  return (
    <Badge className={`font-mono font-medium text-xs transition-colors duration-200 ${config.className}`}>
      {config.label}
    </Badge>
  )
}
