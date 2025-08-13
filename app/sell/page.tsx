"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { PremiumHeader } from "@/components/premium-header"
import { PremiumFooter } from "@/components/premium-footer"
import { LoadingSpinner } from "@/components/loading-spinner"
import { ConfigurationError } from "@/components/configuration-error"
import {
  CheckCircle,
  Upload,
  X,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Clock,
  Shield,
  AlertTriangle,
} from "lucide-react"

interface FormData {
  // Step 1: Contact
  name: string
  email: string
  phone: string

  // Step 2: Item
  title: string
  category: string
  brand: string
  model: string
  condition: string
  notes: string

  // Step 3: Photos
  photos: File[]

  // Step 4: Logistics
  method: string
  city: string
  zip: string

  // Step 5: Agreement
  agreement: boolean
}

const initialFormData: FormData = {
  name: "",
  email: "",
  phone: "",
  title: "",
  category: "",
  brand: "",
  model: "",
  condition: "",
  notes: "",
  photos: [],
  method: "",
  city: "",
  zip: "",
  agreement: false,
}

const categories = [
  "Clothing & Accessories",
  "Electronics",
  "Home & Garden",
  "Collectibles",
  "Jewelry & Watches",
  "Art & Antiques",
  "Books & Media",
  "Sports & Outdoors",
  "Other",
]

const conditions = [
  { value: "A", label: "A - Excellent (like new)" },
  { value: "B", label: "B - Good (minor wear)" },
  { value: "C", label: "C - Fair (noticeable wear)" },
]

export default function SellPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [configError, setConfigError] = useState<{
    message: string
    configureUrl?: string
  } | null>(null)

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1:
        if (!formData.name.trim()) newErrors.name = "Name is required"
        if (!formData.email.trim()) newErrors.email = "Email is required"
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format"
        if (!formData.phone.trim()) newErrors.phone = "Phone is required"
        break

      case 2:
        if (!formData.title.trim()) newErrors.title = "Item title is required"
        if (!formData.category) newErrors.category = "Category is required"
        if (!formData.condition) newErrors.condition = "Condition is required"
        break

      case 3:
        if (formData.photos.length === 0) newErrors.photos = "At least one photo is required"
        break

      case 4:
        if (!formData.method) newErrors.method = "Delivery method is required"
        if (!formData.city.trim()) newErrors.city = "City is required"
        if (!formData.zip.trim()) newErrors.zip = "ZIP code is required"
        break

      case 5:
        if (!formData.agreement) newErrors.agreement = "You must agree to the consignment terms"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5))
    }
  }

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newPhotos = [...formData.photos, ...files].slice(0, 5) // Max 5 photos
    updateFormData("photos", newPhotos)
  }

  const removePhoto = (index: number) => {
    const newPhotos = formData.photos.filter((_, i) => i !== index)
    updateFormData("photos", newPhotos)
  }

  const handleSubmit = async () => {
    if (!validateStep(5)) return

    setIsSubmitting(true)
    setSubmitError(null)
    setConfigError(null)

    try {
      const payload = {
        // Required fields for API
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        itemTitle: formData.title, // API expects itemTitle
        condition: formData.condition,
        method: formData.method,

        // Additional form data
        category: formData.category,
        brand: formData.brand,
        model: formData.model,
        notes: formData.notes,
        city: formData.city,
        zip: formData.zip,
        agreement: formData.agreement,
        photoCount: formData.photos.length,
        submittedAt: new Date().toISOString(),
      }

      const response = await fetch("/api/consign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (!response.ok) {
        if (response.status === 503 && result.configureUrl) {
          // Configuration error
          setConfigError({
            message: result.message || "Services not configured",
            configureUrl: result.configureUrl,
          })
        } else if (response.status === 429) {
          // Rate limit error
          setSubmitError("Too many requests. Please try again later.")
        } else {
          // Other errors
          setSubmitError(result.error || "Failed to submit your request. Please try again.")
        }
        return
      }

      // Success
      console.log("Form submission result:", result)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Submission error:", error)
      setSubmitError("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleConfigure = () => {
    if (configError?.configureUrl) {
      window.location.href = configError.configureUrl
    } else {
      window.location.href = "/setup"
    }
  }

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return (
          formData.name.trim() !== "" &&
          formData.email.trim() !== "" &&
          formData.phone.trim() !== "" &&
          /\S+@\S+\.\S+/.test(formData.email)
        )
      case 2:
        return formData.title.trim() !== "" && formData.category !== "" && formData.condition !== ""
      case 3:
        return formData.photos.length > 0
      case 4:
        return formData.method !== "" && formData.city.trim() !== "" && formData.zip.trim() !== ""
      case 5:
        return formData.agreement
      default:
        return false
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-neutral-50">
        <PremiumHeader />

        {/* Success State */}
        <main className="px-6 py-16 pt-24">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-[#0B3D2E] rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-10 h-10 text-[#F0C419]" />
            </div>
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3D2E] mb-6">Thank You!</h1>
            <p className="font-body text-lg text-[#9CA3AF] mb-8">
              Thanks! We typically reply within 2–3 business days (often sooner).
            </p>
            <div className="space-y-4">
              <Button
                asChild
                className="bg-[#0B3D2E] hover:bg-[#0B3D2E]/90 text-white font-body font-semibold rounded-2xl px-8 py-4"
              >
                <a href="/catalog">Browse Our Catalog</a>
              </Button>
              <div>
                <Button
                  asChild
                  variant="outline"
                  className="border-2 border-[#F0C419] text-[#0B3D2E] hover:bg-[#F0C419] hover:text-[#0B3D2E] font-body font-semibold rounded-2xl px-8 py-4 bg-transparent"
                >
                  <a href="/sell">Submit Another Item</a>
                </Button>
              </div>
            </div>
          </div>
        </main>

        <PremiumFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <PremiumHeader />

      <main className="px-6 py-16 pt-24">
        <div className="max-w-7xl mx-auto">
          {configError && (
            <div className="mb-8">
              <ConfigurationError message={configError.message} onConfigure={handleConfigure} />
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Form */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h1 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3D2E] mb-4">Sell Your Items</h1>
                <p className="font-body text-lg text-[#9CA3AF]">
                  Get a free estimate for your items. We'll handle everything from pricing to selling.
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                          step < currentStep
                            ? "bg-[#0B3D2E] text-white scale-110"
                            : step === currentStep
                              ? "bg-[#F0C419] text-[#0B3D2E] scale-110"
                              : "bg-[#9CA3AF]/20 text-[#9CA3AF]"
                        }`}
                      >
                        {step < currentStep ? <CheckCircle className="w-4 h-4" /> : step}
                      </div>
                      {step < 5 && (
                        <div
                          className={`w-12 h-0.5 mx-2 transition-all duration-300 ${
                            step < currentStep ? "bg-[#0B3D2E]" : "bg-[#9CA3AF]/20"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="text-sm font-body text-[#9CA3AF]">
                  Step {currentStep} of 5:{" "}
                  {currentStep === 1
                    ? "Contact Information"
                    : currentStep === 2
                      ? "Item Details"
                      : currentStep === 3
                        ? "Photos"
                        : currentStep === 4
                          ? "Logistics"
                          : "Agreement"}
                </div>
              </div>

              {submitError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
                  <div className="flex items-center gap-2 text-red-800">
                    <AlertTriangle className="h-4 w-4" />
                    <span className="font-medium">Submission Failed</span>
                  </div>
                  <p className="text-red-700 mt-1">{submitError}</p>
                </div>
              )}

              {/* Form Steps */}
              <Card className="rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardContent className="p-8">
                  {/* Step 1: Contact */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h2 className="font-heading font-semibold text-xl text-[#0B3D2E]">Contact Information</h2>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="font-body font-medium text-[#111827]">
                            Full Name *
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => updateFormData("name", e.target.value)}
                            className={`mt-1 rounded-2xl border-2 focus:ring-[#0B3D2E] focus:border-[#0B3D2E] ${errors.name ? "border-red-500" : "border-[#9CA3AF]/20"}`}
                            placeholder="Enter your full name"
                          />
                          {errors.name && (
                            <p className="mt-1 text-sm text-red-500" role="alert">
                              {errors.name}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="email" className="font-body font-medium text-[#111827]">
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => updateFormData("email", e.target.value)}
                            className={`mt-1 rounded-2xl border-2 focus:ring-[#0B3D2E] focus:border-[#0B3D2E] ${errors.email ? "border-red-500" : "border-[#9CA3AF]/20"}`}
                            placeholder="Enter your email address"
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-500" role="alert">
                              {errors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="phone" className="font-body font-medium text-[#111827]">
                            Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => updateFormData("phone", e.target.value)}
                            className={`mt-1 rounded-2xl border-2 focus:ring-[#0B3D2E] focus:border-[#0B3D2E] ${errors.phone ? "border-red-500" : "border-[#9CA3AF]/20"}`}
                            placeholder="Enter your phone number"
                          />
                          {errors.phone && (
                            <p className="mt-1 text-sm text-red-500" role="alert">
                              {errors.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Item Details */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <h2 className="font-heading font-semibold text-xl text-[#0B3D2E]">Item Details</h2>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title" className="font-body font-medium text-[#111827]">
                            Item Title *
                          </Label>
                          <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => updateFormData("title", e.target.value)}
                            className={`mt-1 rounded-2xl border-2 focus:ring-[#0B3D2E] focus:border-[#0B3D2E] ${errors.title ? "border-red-500" : "border-[#9CA3AF]/20"}`}
                            placeholder="e.g., Vintage Leather Jacket"
                          />
                          {errors.title && (
                            <p className="mt-1 text-sm text-red-500" role="alert">
                              {errors.title}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="category" className="font-body font-medium text-[#111827]">
                            Category *
                          </Label>
                          <Select
                            value={formData.category}
                            onValueChange={(value) => updateFormData("category", value)}
                          >
                            <SelectTrigger
                              className={`mt-1 rounded-2xl border-2 focus:ring-[#0B3D2E] focus:border-[#0B3D2E] ${errors.category ? "border-red-500" : "border-[#9CA3AF]/20"}`}
                            >
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.category && (
                            <p className="mt-1 text-sm text-red-500" role="alert">
                              {errors.category}
                            </p>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="brand" className="font-body font-medium text-[#111827]">
                              Brand
                            </Label>
                            <Input
                              id="brand"
                              value={formData.brand}
                              onChange={(e) => updateFormData("brand", e.target.value)}
                              className="mt-1 rounded-2xl border-2 border-[#9CA3AF]/20 focus:ring-[#0B3D2E] focus:border-[#0B3D2E]"
                              placeholder="e.g., Nike, Apple, etc."
                            />
                          </div>

                          <div>
                            <Label htmlFor="model" className="font-body font-medium text-[#111827]">
                              Model
                            </Label>
                            <Input
                              id="model"
                              value={formData.model}
                              onChange={(e) => updateFormData("model", e.target.value)}
                              className="mt-1 rounded-2xl border-2 border-[#9CA3AF]/20 focus:ring-[#0B3D2E] focus:border-[#0B3D2E]"
                              placeholder="e.g., iPhone 13, Air Max, etc."
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="condition" className="font-body font-medium text-[#111827]">
                            Condition *
                          </Label>
                          <Select
                            value={formData.condition}
                            onValueChange={(value) => updateFormData("condition", value)}
                          >
                            <SelectTrigger
                              className={`mt-1 rounded-2xl border-2 focus:ring-[#0B3D2E] focus:border-[#0B3D2E] ${errors.condition ? "border-red-500" : "border-[#9CA3AF]/20"}`}
                            >
                              <SelectValue placeholder="Select condition" />
                            </SelectTrigger>
                            <SelectContent>
                              {conditions.map((condition) => (
                                <SelectItem key={condition.value} value={condition.value}>
                                  {condition.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors.condition && (
                            <p className="mt-1 text-sm text-red-500" role="alert">
                              {errors.condition}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label htmlFor="notes" className="font-body font-medium text-[#111827]">
                            Additional Notes
                          </Label>
                          <Textarea
                            id="notes"
                            value={formData.notes}
                            onChange={(e) => updateFormData("notes", e.target.value)}
                            className="mt-1 rounded-2xl border-2 border-[#9CA3AF]/20 focus:ring-[#0B3D2E] focus:border-[#0B3D2E]"
                            placeholder="Any additional details about the item..."
                            rows={3}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Photos */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h2 className="font-heading font-semibold text-xl text-[#0B3D2E]">Photos</h2>
                      <p className="font-body text-[#9CA3AF]">
                        Upload 1-5 photos of your item. Good photos help us price your item accurately.
                      </p>

                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="photos" className="font-body font-medium text-[#111827]">
                            Item Photos * (1-5 photos)
                          </Label>
                          <div
                            className={`mt-1 border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${
                              errors.photos
                                ? "border-red-500 bg-red-50"
                                : "border-[#9CA3AF]/20 hover:border-[#0B3D2E]/40"
                            }`}
                          >
                            <Upload className="w-8 h-8 text-[#9CA3AF] mx-auto mb-4" />
                            <div className="space-y-2">
                              <p className="font-body text-[#111827]">Click to upload photos</p>
                              <p className="font-body text-sm text-[#9CA3AF]">PNG, JPG up to 10MB each</p>
                            </div>
                            <input
                              id="photos"
                              type="file"
                              multiple
                              accept="image/*"
                              onChange={handlePhotoUpload}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                              disabled={formData.photos.length >= 5}
                            />
                          </div>
                          {errors.photos && (
                            <p className="mt-1 text-sm text-red-500" role="alert">
                              {errors.photos}
                            </p>
                          )}
                        </div>

                        {/* Photo Previews */}
                        {formData.photos.length > 0 && (
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {formData.photos.map((photo, index) => (
                              <div key={index} className="relative group">
                                <img
                                  src={URL.createObjectURL(photo) || "/placeholder.svg"}
                                  alt={`Preview ${index + 1}`}
                                  className="w-full h-32 object-cover rounded-2xl"
                                />
                                <button
                                  type="button"
                                  onClick={() => removePhoto(index)}
                                  className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                                  aria-label={`Remove photo ${index + 1}`}
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 4: Logistics */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <h2 className="font-heading font-semibold text-xl text-[#0B3D2E]">Logistics</h2>

                      <div className="space-y-4">
                        <div>
                          <Label className="font-body font-medium text-[#111827]">Delivery Method *</Label>
                          <div className="mt-2 space-y-3">
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                id="pickup"
                                name="method"
                                value="pickup"
                                checked={formData.method === "pickup"}
                                onChange={(e) => updateFormData("method", e.target.value)}
                                className="w-4 h-4 text-[#0B3D2E] focus:ring-[#0B3D2E] focus:ring-offset-0"
                              />
                              <Label htmlFor="pickup" className="font-body text-[#111827] cursor-pointer">
                                We'll pick up from your location
                              </Label>
                            </div>
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                id="dropoff"
                                name="method"
                                value="dropoff"
                                checked={formData.method === "dropoff"}
                                onChange={(e) => updateFormData("method", e.target.value)}
                                className="w-4 h-4 text-[#0B3D2E] focus:ring-[#0B3D2E] focus:ring-offset-0"
                              />
                              <Label htmlFor="dropoff" className="font-body text-[#111827] cursor-pointer">
                                I'll drop off at your location
                              </Label>
                            </div>
                          </div>
                          {errors.method && (
                            <p className="mt-1 text-sm text-red-500" role="alert">
                              {errors.method}
                            </p>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="city" className="font-body font-medium text-[#111827]">
                              City *
                            </Label>
                            <Input
                              id="city"
                              value={formData.city}
                              onChange={(e) => updateFormData("city", e.target.value)}
                              className={`mt-1 rounded-2xl border-2 focus:ring-[#0B3D2E] focus:border-[#0B3D2E] ${errors.city ? "border-red-500" : "border-[#9CA3AF]/20"}`}
                              placeholder="Enter your city"
                            />
                            {errors.city && (
                              <p className="mt-1 text-sm text-red-500" role="alert">
                                {errors.city}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label htmlFor="zip" className="font-body font-medium text-[#111827]">
                              ZIP Code *
                            </Label>
                            <Input
                              id="zip"
                              value={formData.zip}
                              onChange={(e) => updateFormData("zip", e.target.value)}
                              className={`mt-1 rounded-2xl border-2 focus:ring-[#0B3D2E] focus:border-[#0B3D2E] ${errors.zip ? "border-red-500" : "border-[#9CA3AF]/20"}`}
                              placeholder="Enter ZIP code"
                            />
                            {errors.zip && (
                              <p className="mt-1 text-sm text-red-500" role="alert">
                                {errors.zip}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Agreement */}
                  {currentStep === 5 && (
                    <div className="space-y-6">
                      <h2 className="font-heading font-semibold text-xl text-[#0B3D2E]">Consignment Agreement</h2>

                      <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#9CA3AF]/20">
                        <h3 className="font-heading font-semibold text-lg text-[#0B3D2E] mb-4">Terms & Conditions</h3>
                        <div className="space-y-3 font-body text-sm text-[#111827]">
                          <p>• We will research recent SOLD listings to price your items competitively</p>
                          <p>• Our commission is 30% of the final sale price</p>
                          <p>• Items that don't sell within 90 days can be returned or donated</p>
                          <p>• Payment is processed within 7 days of item sale</p>
                          <p>• We handle all listing, photography, shipping, and customer service</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <Checkbox
                          id="agreement"
                          checked={formData.agreement}
                          onCheckedChange={(checked) => updateFormData("agreement", checked)}
                          className="mt-1 data-[state=checked]:bg-[#0B3D2E] data-[state=checked]:border-[#0B3D2E]"
                        />
                        <Label htmlFor="agreement" className="font-body text-[#111827] cursor-pointer leading-relaxed">
                          I agree to the consignment terms and conditions outlined above *
                        </Label>
                      </div>
                      {errors.agreement && (
                        <p className="mt-1 text-sm text-red-500" role="alert">
                          {errors.agreement}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-8 border-t border-[#9CA3AF]/20">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="border-2 border-[#9CA3AF]/20 text-[#111827] hover:bg-[#9CA3AF]/10 font-body font-semibold rounded-2xl px-6 py-3 disabled:opacity-50 bg-transparent transition-all duration-200 hover:scale-105"
                    >
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>

                    {currentStep < 5 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        disabled={!isStepValid(currentStep)}
                        className="bg-[#0B3D2E] hover:bg-[#0B3D2E]/90 text-white font-body font-semibold rounded-2xl px-6 py-3 disabled:opacity-50 transition-all duration-200 hover:scale-105"
                      >
                        Next
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!isStepValid(5) || isSubmitting}
                        className="bg-[#F0C419] hover:bg-[#F0C419]/90 text-[#0B3D2E] font-body font-semibold rounded-2xl px-8 py-3 disabled:opacity-50 transition-all duration-200 hover:scale-105 flex items-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <LoadingSpinner size="sm" />
                            Submitting...
                          </>
                        ) : (
                          "Submit Request"
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="rounded-2xl shadow-md sticky top-24 hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-4">
                  <CardTitle className="font-heading font-semibold text-xl text-[#0B3D2E]">How Pricing Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-3 group">
                    <div className="w-8 h-8 bg-[#F0C419] rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
                      <TrendingUp className="w-4 h-4 text-[#0B3D2E]" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-[#0B3D2E] mb-2">SOLD Comps Research</h3>
                      <p className="font-body text-sm text-[#9CA3AF]">
                        We analyze recent SOLD listings of similar items to price yours competitively for maximum
                        profit.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group">
                    <div className="w-8 h-8 bg-[#F0C419] rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
                      <Shield className="w-4 h-4 text-[#0B3D2E]" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-[#0B3D2E] mb-2">Transparent Fees</h3>
                      <p className="font-body text-sm text-[#9CA3AF]">
                        Simple 30% commission on final sale price. No hidden fees, no upfront costs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 group">
                    <div className="w-8 h-8 bg-[#F0C419] rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110">
                      <Clock className="w-4 h-4 text-[#0B3D2E]" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-[#0B3D2E] mb-2">Typical Timeline</h3>
                      <p className="font-body text-sm text-[#9CA3AF]">
                        24hr estimate • 3-5 days to list • 30-90 days to sell • 7 days to payout
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#F0C419]/10 rounded-2xl p-4 border border-[#F0C419]/20 hover:bg-[#F0C419]/20 transition-colors duration-200">
                    <p className="font-body text-sm text-[#0B3D2E] font-medium">
                      💡 <strong>Pro Tip:</strong> Items in excellent condition (A grade) typically sell for 20-30% more
                      than fair condition items.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <PremiumFooter />
    </div>
  )
}
