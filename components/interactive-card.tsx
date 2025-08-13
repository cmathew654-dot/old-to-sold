"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"

interface InteractiveCardProps {
  href: string
  children: ReactNode
  className?: string
}

export function InteractiveCard({ href, children, className = "" }: InteractiveCardProps) {
  return (
    <Link href={href} className="group block">
      <Card
        className={`rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden h-full group-hover:scale-[1.02] ${className}`}
      >
        {children}
      </Card>
    </Link>
  )
}
