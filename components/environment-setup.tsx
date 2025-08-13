"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle, Copy, Check } from "lucide-react"

interface EnvConfig {
  SUPABASE_URL: string
  SUPABASE_ANON_KEY: string
  SUPABASE_SERVICE_ROLE_KEY: string
  RESEND_API_KEY: string
  RESEND_FROM: string
}

const ENV_CONFIGS = [
  {
    key: "SUPABASE_URL" as keyof EnvConfig,
    label: "Supabase Project URL",
    description: "Your Supabase project URL",
    hint: 'Supabase Dashboard → Settings → API → "Project URL" (looks like https://xxxx.supabase.co)',
    placeholder: "https://your-project.supabase.co",
    validate: (value: string) => {
      if (!value) return "URL is required"
      if (!value.startsWith("https://")) return "URL must start with https://"
      if (!value.endsWith(".supabase.co")) return "URL must end with .supabase.co"
      return null
    },
  },
  {
    key: "SUPABASE_ANON_KEY" as keyof EnvConfig,
    label: "Supabase Anonymous Key",
    description: "Public key for client-side operations",
    hint: 'Same page → "Project API keys" → anon public',
    placeholder: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    validate: (value: string) => (value ? null : "Anonymous key is required"),
  },
  {
    key: "SUPABASE_SERVICE_ROLE_KEY" as keyof EnvConfig,
    label: "Supabase Service Role Key",
    description: "Secret key for server-side operations (NEVER expose to browser)",
    hint: "Same page → service_role (keep this secret!)",
    placeholder: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    validate: (value: string) => (value ? null : "Service role key is required"),
    isSecret: true,
  },
  {
    key: "RESEND_API_KEY" as keyof EnvConfig,
    label: "Resend API Key",
    description: "API key for sending emails",
    hint: "Resend Dashboard → API Keys (requires verified sender/domain)",
    placeholder: "re_xxxxxxxxxx",
    validate: (value: string) => (value ? null : "Resend API key is required"),
    isSecret: true,
  },
  {
    key: "RESEND_FROM" as keyof EnvConfig,
    label: "From Email Address",
    description: "Default sender for outgoing emails",
    hint: 'Use format: "Old to Sold <cyril@old2sold.com>"',
    placeholder: "Old to Sold <cyril@old2sold.com>",
    validate: (value: string) => {
      if (!value) return "From address is required"
      if (!value.includes("@")) return "Must be a valid email format"
      return null
    },
  },
]

export function EnvironmentSetup() {
  const [config, setConfig] = useState<EnvConfig>({
    SUPABASE_URL: "",
    SUPABASE_ANON_KEY: "",
    SUPABASE_SERVICE_ROLE_KEY: "",
    RESEND_API_KEY: "",
    RESEND_FROM: "Old to Sold <cyril@old2sold.com>",
  })

  const [currentStep, setCurrentStep] = useState(0)
  const [skippedKeys, setSkippedKeys] = useState<Set<string>>(new Set())
  const [savedKeys, setSavedKeys] = useState<Set<string>>(new Set())
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showEnvFile, setShowEnvFile] = useState(false)
  const [copied, setCopied] = useState(false)

  // Check existing environment variables on mount
  useEffect(() => {
    const checkExistingEnvs = async () => {
      try {
        const response = await fetch("/api/check-env")
        const data = await response.json()
        const existing = new Set<string>()

        ENV_CONFIGS.forEach(({ key }) => {
          if (data[key]) {
            existing.add(key)
            setConfig((prev) => ({ ...prev, [key]: "[CONFIGURED]" }))
          }
        })

        setSavedKeys(existing)
      } catch (error) {
        console.error("Failed to check existing environment variables:", error)
      }
    }

    checkExistingEnvs()
  }, [])

  const currentConfig = ENV_CONFIGS[currentStep]
  const isLastStep = currentStep === ENV_CONFIGS.length - 1
  const allCompleted = currentStep >= ENV_CONFIGS.length

  const validateCurrent = () => {
    const error = currentConfig.validate(config[currentConfig.key])
    setErrors((prev) => ({ ...prev, [currentConfig.key]: error || "" }))
    return !error
  }

  const handleSave = async () => {
    if (!validateCurrent()) return

    try {
      const response = await fetch("/api/save-env", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: currentConfig.key,
          value: config[currentConfig.key],
        }),
      })

      if (response.ok) {
        setSavedKeys((prev) => new Set([...prev, currentConfig.key]))
        setCurrentStep((prev) => prev + 1)
      } else {
        const error = await response.text()
        setErrors((prev) => ({ ...prev, [currentConfig.key]: error }))
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [currentConfig.key]: "Failed to save configuration",
      }))
    }
  }

  const handleSkip = () => {
    setSkippedKeys((prev) => new Set([...prev, currentConfig.key]))
    setCurrentStep((prev) => prev + 1)
  }

  const generateEnvFile = () => {
    const lines = ENV_CONFIGS.map(({ key }) => {
      if (savedKeys.has(key)) {
        return `${key}=${config[key] === "[CONFIGURED]" ? "[YOUR_VALUE]" : config[key]}`
      }
      return `# ${key}=[SKIPPED]`
    })

    return `# Old to Sold Environment Variables
# Add these to your Vercel project: Settings → Environment Variables

${lines.join("\n")}
`
  }

  const copyEnvFile = async () => {
    try {
      await navigator.clipboard.writeText(generateEnvFile())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  if (allCompleted) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Setup Complete!
            </CardTitle>
            <CardDescription>Your environment configuration is ready. Here's what to do next:</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Configuration Status:</h4>
              <div className="grid grid-cols-1 gap-2">
                {ENV_CONFIGS.map(({ key, label }) => (
                  <div key={key} className="flex items-center gap-2 text-sm">
                    {savedKeys.has(key) ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-amber-500" />
                    )}
                    <span className={savedKeys.has(key) ? "text-green-700" : "text-amber-700"}>
                      {label}: {savedKeys.has(key) ? "Configured" : "Skipped"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {savedKeys.size > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium">For Vercel Deployment:</h4>
                <div className="bg-neutral-100 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Environment Variables</span>
                    <Button variant="outline" size="sm" onClick={copyEnvFile} className="h-8 bg-transparent">
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                  <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">{generateEnvFile()}</pre>
                </div>
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Add these to your Vercel project: <strong>Settings → Environment Variables</strong>
                    <br />
                    Don't forget to redeploy after adding environment variables!
                  </AlertDescription>
                </Alert>
              </div>
            )}

            <div className="flex gap-3">
              <Button asChild>
                <a href="/admin">Go to Admin Panel</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/">Back to Home</a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress indicator */}
      <div className="flex items-center justify-between text-sm text-neutral-600">
        <span>
          Step {currentStep + 1} of {ENV_CONFIGS.length}
        </span>
        <span>{Math.round((currentStep / ENV_CONFIGS.length) * 100)}% complete</span>
      </div>

      <div className="w-full bg-neutral-200 rounded-full h-2">
        <div
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / ENV_CONFIGS.length) * 100}%` }}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{currentConfig.label}</CardTitle>
          <CardDescription>{currentConfig.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Where to find it:</strong> {currentConfig.hint}
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor={currentConfig.key}>{currentConfig.label}</Label>
            <Input
              id={currentConfig.key}
              type={currentConfig.isSecret ? "password" : "text"}
              placeholder={currentConfig.placeholder}
              value={config[currentConfig.key]}
              onChange={(e) =>
                setConfig((prev) => ({
                  ...prev,
                  [currentConfig.key]: e.target.value,
                }))
              }
              className={errors[currentConfig.key] ? "border-red-500" : ""}
              disabled={savedKeys.has(currentConfig.key)}
            />
            {errors[currentConfig.key] && <p className="text-sm text-red-600">{errors[currentConfig.key]}</p>}
            {savedKeys.has(currentConfig.key) && (
              <p className="text-sm text-green-600 flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Already configured
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} disabled={savedKeys.has(currentConfig.key)} className="flex-1">
              {savedKeys.has(currentConfig.key) ? "Configured" : "Add & Save"}
            </Button>
            <Button
              variant="outline"
              onClick={handleSkip}
              disabled={savedKeys.has(currentConfig.key)}
              className="flex-1 bg-transparent"
            >
              Skip for now
            </Button>
          </div>

          {currentConfig.key.includes("SUPABASE") && (
            <Alert>
              <AlertDescription>
                <strong>Consequences of skipping:</strong> Catalog will use local JSON data instead of live database.
                Admin panel will show setup instructions.
              </AlertDescription>
            </Alert>
          )}

          {currentConfig.key.includes("RESEND") && (
            <Alert>
              <AlertDescription>
                <strong>Consequences of skipping:</strong> Contact form submissions won't send email notifications.
                You'll need to check the admin panel manually.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
