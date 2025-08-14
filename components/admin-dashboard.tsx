"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings,
  Mail,
  Database,
  HardDrive,
  ImageIcon,
  Calendar,
  User,
  Phone,
  Package,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Consignment {
  id: string
  name: string
  email: string
  phone?: string
  payload: any
  created_at: string
}

interface ConfigStatus {
  supabase: {
    url: boolean
    anonKey: boolean
    serviceKey: boolean
    configured: boolean
  }
  resend: {
    apiKey: boolean
    fromAddress: boolean
    configured: boolean
  }
  storage: {
    provider: string
  }
}

interface AdminDashboardProps {
  consignments: Consignment[] | null
  consignmentsError: string | null
  configStatus: ConfigStatus
}

export function AdminDashboard({ consignments, consignmentsError, configStatus }: AdminDashboardProps) {
  const [selectedConsignment, setSelectedConsignment] = useState<Consignment | null>(null)

  const handleConfigure = () => {
    window.location.href = "/setup"
  }

  const getStatusIcon = (configured: boolean) => {
    return configured ? (
      <CheckCircle className="h-5 w-5 text-green-600" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    )
  }

  const getStatusColor = (configured: boolean) => {
    return configured ? "text-green-700" : "text-red-700"
  }

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true })
    } catch (error) {
      return "Unknown time"
    }
  }

  return (
    <div className="space-y-8">
      {/* Configuration Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuration Status
          </CardTitle>
          <CardDescription>Current status of your integrations and services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Supabase Status */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold">Supabase Database</h3>
                {getStatusIcon(configStatus.supabase.configured)}
              </div>
              <div className="space-y-1 text-sm">
                <div className={`flex items-center gap-2 ${getStatusColor(configStatus.supabase.url)}`}>
                  {configStatus.supabase.url ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  Project URL: {configStatus.supabase.url ? "Configured" : "Missing"}
                </div>
                <div className={`flex items-center gap-2 ${getStatusColor(configStatus.supabase.anonKey)}`}>
                  {configStatus.supabase.anonKey ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  Anonymous Key: {configStatus.supabase.anonKey ? "Configured" : "Missing"}
                </div>
                <div className={`flex items-center gap-2 ${getStatusColor(configStatus.supabase.serviceKey)}`}>
                  {configStatus.supabase.serviceKey ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  Service Key: {configStatus.supabase.serviceKey ? "Configured" : "Missing"}
                </div>
              </div>
            </div>

            {/* Resend Status */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold">Resend Email</h3>
                {getStatusIcon(configStatus.resend.configured)}
              </div>
              <div className="space-y-1 text-sm">
                <div className={`flex items-center gap-2 ${getStatusColor(configStatus.resend.apiKey)}`}>
                  {configStatus.resend.apiKey ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  API Key: {configStatus.resend.apiKey ? "Configured" : "Missing"}
                </div>
                <div className={`flex items-center gap-2 ${getStatusColor(configStatus.resend.fromAddress)}`}>
                  {configStatus.resend.fromAddress ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  From Address: {configStatus.resend.fromAddress ? "Configured" : "Missing"}
                </div>
              </div>
            </div>

            {/* Storage Status */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {configStatus.storage.provider === "supabase" ? (
                  <ImageIcon className="h-5 w-5 text-purple-600" />
                ) : (
                  <HardDrive className="h-5 w-5 text-gray-600" />
                )}
                <h3 className="font-semibold">Image Storage</h3>
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="h-4 w-4" />
                  Provider: {configStatus.storage.provider === "supabase" ? "Supabase Storage" : "Local Storage"}
                </div>
                <div className="text-neutral-600">
                  {configStatus.storage.provider === "supabase"
                    ? "Images hosted in Supabase with CDN"
                    : "Images stored locally in project"}
                </div>
              </div>
            </div>
          </div>

          {(!configStatus.supabase.configured || !configStatus.resend.configured) && (
            <div className="mt-6">
              <Alert className="border-amber-200 bg-amber-50">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="flex items-center justify-between">
                  <span className="text-amber-800">
                    Some services are not configured. Configure them to enable full functionality.
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleConfigure}
                    className="border-amber-300 text-amber-800 hover:bg-amber-100 bg-transparent"
                  >
                    <Settings className="h-4 w-4 mr-1" />
                    Configure Services
                  </Button>
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Consignments Section */}
      {configStatus.supabase.configured ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Recent Consignments
            </CardTitle>
            <CardDescription>Latest 50 consignment submissions from your customers</CardDescription>
          </CardHeader>
          <CardContent>
            {consignmentsError ? (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  Failed to load consignments: {String(consignmentsError)}
                </AlertDescription>
              </Alert>
            ) : !consignments || consignments.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">No consignments yet</h3>
                <p className="text-neutral-600">
                  Consignment submissions will appear here once customers start using your sell form.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {consignments.map((consignment) => (
                  <div
                    key={consignment.id}
                    className="border rounded-lg p-4 hover:bg-neutral-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedConsignment(consignment)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-neutral-900">
                            {String(consignment.payload?.itemTitle || "Untitled Item")}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {String(consignment.payload?.condition || "N/A")}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-neutral-600">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {String(consignment.name)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {String(consignment.email)}
                          </div>
                          {consignment.phone && (
                            <div className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              {String(consignment.phone)}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-right text-sm text-neutral-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(consignment.created_at)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              Database Setup Required
            </CardTitle>
            <CardDescription>Configure Supabase to view consignment submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert className="border-amber-200 bg-amber-50">
                <AlertCircle className="h-4 w-4 text-amber-600" />
                <AlertDescription className="text-amber-800">
                  Supabase database is not configured. Consignment submissions cannot be stored or viewed without
                  database access.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <h4 className="font-medium">Setup Checklist:</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span>Configure Supabase environment variables</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span>Run database schema in Supabase SQL editor</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span>Test consignment form submission</span>
                  </div>
                </div>
              </div>

              <Button onClick={handleConfigure} className="w-full sm:w-auto">
                <Settings className="h-4 w-4 mr-2" />
                Configure Supabase
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Consignment Detail Modal */}
      {selectedConsignment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Consignment Details</CardTitle>
              <CardDescription>Submitted {formatDate(selectedConsignment.created_at)}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Customer Information</h4>
                  <div className="space-y-1 text-sm">
                    <div>
                      <strong>Name:</strong> {String(selectedConsignment.name)}
                    </div>
                    <div>
                      <strong>Email:</strong> {String(selectedConsignment.email)}
                    </div>
                    {selectedConsignment.phone && (
                      <div>
                        <strong>Phone:</strong> {String(selectedConsignment.phone)}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Item Information</h4>
                  <div className="space-y-1 text-sm">
                    <div>
                      <strong>Title:</strong> {String(selectedConsignment.payload?.itemTitle || "N/A")}
                    </div>
                    <div>
                      <strong>Condition:</strong> {String(selectedConsignment.payload?.condition || "N/A")}
                    </div>
                    <div>
                      <strong>Method:</strong> {String(selectedConsignment.payload?.method || "N/A")}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Full Submission Data</h4>
                <pre className="bg-neutral-100 p-3 rounded text-xs overflow-x-auto">
                  {JSON.stringify(selectedConsignment.payload || {}, null, 2)}
                </pre>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedConsignment(null)} className="bg-transparent">
                  Close
                </Button>
                <Button asChild>
                  <a href={`mailto:${selectedConsignment.email}`}>
                    <Mail className="h-4 w-4 mr-2" />
                    Reply to Customer
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
