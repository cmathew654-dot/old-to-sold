import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-[#F0C419]/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Package className="w-12 h-12 text-[#F0C419]" />
        </div>
        <h1 className="font-heading font-bold text-3xl text-[#0B3D2E] mb-4">Item Not Found</h1>
        <p className="font-body text-[#9CA3AF] mb-8 leading-relaxed">
          Sorry, we couldn't find the item you're looking for. It may have been sold or the link might be incorrect.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            className="bg-[#0B3D2E] hover:bg-[#0B3D2E]/90 text-white font-body font-semibold rounded-2xl px-6 py-3 shadow-md hover:shadow-lg transition-all duration-200"
          >
            <Link href="/catalog" className="flex items-center gap-2">
              Browse Catalog
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-[#0B3D2E] text-[#0B3D2E] hover:bg-[#0B3D2E] hover:text-white font-body font-medium rounded-2xl px-6 py-3 transition-all duration-200 bg-transparent"
          >
            <Link href="/" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
