"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, ExternalLink, AlertCircle, ImageIcon, HardDrive } from "lucide-react"

export function StorageSetup() {
  const [choice, setChoice] = useState<"supabase" | "local" | null>(null)
  const [bucketConfirmed, setBucketConfirmed] = useState(false)

  const handleChoice = async (storageChoice: "supabase" | "local") => {
    setChoice(storageChoice)

    // Save choice to configuration
    try {
      await fetch("/api/save-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: "STORAGE_PROVIDER",
          value: storageChoice,
        }),
      })
    } catch (error) {
      console.error("Failed to save storage choice:", error)
    }
  }

  if (choice === "local") {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-blue-600" />
              Local Storage Selected
            </CardTitle>
            <CardDescription>You've chosen to keep using local image storage for now.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Current setup:</strong> Images are stored in the <code>/public</code> folder and served
                directly. This works great for development and small catalogs.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <h4 className="font-medium">What this means:</h4>
              <ul className="text-sm text-neutral-600 space-y-1 list-disc list-inside">
                <li>Images are stored locally in your project</li>
                <li>Fast loading and no external dependencies</li>
                <li>Manual image management through file system</li>
                <li>Perfect for getting started quickly</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Future upgrade path:</h4>
              <ul className="text-sm text-neutral-600 space-y-1 list-disc list-inside">
                <li>You can switch to Supabase Storage later</li>
                <li>We'll add image upload functionality to the admin panel</li>
                <li>Automatic image optimization and CDN delivery</li>
                <li>No code changes needed when you're ready</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button asChild>
                <a href="/setup">Continue Setup</a>
              </Button>
              <Button variant="outline" onClick={() => setChoice(null)} className="bg-transparent">
                Change Choice
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (choice === "supabase") {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-green-600" />
              Supabase Storage Setup
            </CardTitle>
            <CardDescription>Configure Supabase Storage for hosting your item images.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                <strong>Benefits:</strong> Automatic image optimization, CDN delivery, upload functionality in admin
                panel, and scalable storage for growing inventory.
              </AlertDescription>
            </Alert>

            <div className="space-y-3">
              <h4 className="font-medium">Setup Instructions:</h4>
              <ol className="list-decimal list-inside space-y-2 text-sm text-neutral-600">
                <li>
                  Open your{" "}
                  <a
                    href="https://supabase.com/dashboard"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Supabase Dashboard
                  </a>
                </li>
                <li>Navigate to your Old to Sold project</li>
                <li>Go to "Storage" in the left sidebar</li>
                <li>Click "Create a new bucket"</li>
                <li>
                  Name the bucket: <code className="bg-neutral-100 px-1 rounded">items</code>
                </li>
                <li>
                  <strong>Important:</strong> Set "Public bucket" to <strong>ON</strong>
                </li>
                <li>Click "Create bucket"</li>
              </ol>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-medium text-amber-800">Public Access Required</p>
                  <p className="text-sm text-amber-700">
                    The bucket must be public so catalog images can be displayed to visitors. This is safe for product
                    images that should be publicly viewable.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button
                onClick={() => setBucketConfirmed(true)}
                disabled={bucketConfirmed}
                className={bucketConfirmed ? "bg-green-600 hover:bg-green-700" : ""}
              >
                {bucketConfirmed ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Bucket Created
                  </>
                ) : (
                  "I've Created the Bucket"
                )}
              </Button>
              <Button variant="outline" asChild className="bg-transparent">
                <a
                  href="https://supabase.com/dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open Supabase
                </a>
              </Button>
            </div>

            {bucketConfirmed && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Storage Ready!</strong> Your admin panel will now include image upload functionality, and all
                  item images will be served from Supabase's CDN for optimal performance.
                </AlertDescription>
              </Alert>
            )}

            {bucketConfirmed && (
              <div className="flex gap-3 pt-2">
                <Button asChild>
                  <a href="/setup">Continue Setup</a>
                </Button>
                <Button variant="outline" onClick={() => setChoice(null)} className="bg-transparent">
                  Change Choice
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Choose Your Image Storage</CardTitle>
          <CardDescription>
            Decide how you want to store and serve your catalog item images. You can change this later.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleChoice("local")}>
              <CardContent className="p-6 text-center space-y-3">
                <HardDrive className="h-12 w-12 text-blue-600 mx-auto" />
                <h3 className="font-semibold">Local Storage</h3>
                <p className="text-sm text-neutral-600">Keep using local images in your project folder</p>
                <div className="space-y-1 text-xs text-neutral-500">
                  <div>✓ Simple and fast</div>
                  <div>✓ No external setup</div>
                  <div>✓ Perfect for getting started</div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Choose Local
                </Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleChoice("supabase")}>
              <CardContent className="p-6 text-center space-y-3">
                <ImageIcon className="h-12 w-12 text-green-600 mx-auto" />
                <h3 className="font-semibold">Supabase Storage</h3>
                <p className="text-sm text-neutral-600">Professional cloud storage with CDN delivery</p>
                <div className="space-y-1 text-xs text-neutral-500">
                  <div>✓ Image upload in admin</div>
                  <div>✓ Automatic optimization</div>
                  <div>✓ CDN performance</div>
                </div>
                <Button className="w-full">Choose Supabase</Button>
              </CardContent>
            </Card>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              <strong>Don't worry:</strong> You can switch between storage options later. Local storage is perfect for
              getting started, while Supabase Storage offers more advanced features for growing businesses.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
