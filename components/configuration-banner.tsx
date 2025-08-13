"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, Settings } from "lucide-react"

interface ConfigurationBannerProps {
  type: "supabase" | "resend"
  onConfigure?: () => void
}

export function ConfigurationBanner({ type, onConfigure }: ConfigurationBannerProps) {
  const messages = {
    supabase: {
      title: "Database Not Configured",
      description: "Using local catalog data. Configure Supabase to enable live database features.",
      action: "Configure Database",
    },
    resend: {
      title: "Email Not Configured",
      description: "Contact form submissions won't send notifications. Configure Resend to enable email features.",
      action: "Configure Email",
    },
  }

  const message = messages[type]

  return (
    <Alert className="mb-6 border-amber-200 bg-amber-50">
      <AlertCircle className="h-4 w-4 text-amber-600" />
      <AlertDescription className="flex items-center justify-between">
        <div>
          <strong className="text-amber-800">{message.title}:</strong>{" "}
          <span className="text-amber-700">{message.description}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onConfigure}
          className="ml-4 border-amber-300 text-amber-800 hover:bg-amber-100 bg-transparent"
        >
          <Settings className="h-4 w-4 mr-1" />
          {message.action}
        </Button>
      </AlertDescription>
    </Alert>
  )
}
