"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Settings } from "lucide-react"

interface ConfigurationErrorProps {
  message: string
  onConfigure: () => void
}

export function ConfigurationError({ message, onConfigure }: ConfigurationErrorProps) {
  return (
    <Alert className="border-red-200 bg-red-50">
      <AlertTriangle className="h-4 w-4 text-red-600" />
      <AlertDescription className="flex items-center justify-between">
        <div>
          <strong className="text-red-800">Configuration Required:</strong>{" "}
          <span className="text-red-700">{message}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onConfigure}
          className="ml-4 border-red-300 text-red-800 hover:bg-red-100 bg-transparent"
        >
          <Settings className="h-4 w-4 mr-1" />
          Configure Now
        </Button>
      </AlertDescription>
    </Alert>
  )
}
