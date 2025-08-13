import { type NextRequest, NextResponse } from "next/server"
import { writeFileSync, readFileSync, existsSync } from "fs"
import { join } from "path"

export async function POST(request: NextRequest) {
  try {
    const { key, value } = await request.json()

    // Validate the key is allowed
    const allowedKeys = [
      "SUPABASE_URL",
      "SUPABASE_ANON_KEY",
      "SUPABASE_SERVICE_ROLE_KEY",
      "RESEND_API_KEY",
      "RESEND_FROM",
    ]

    if (!allowedKeys.includes(key)) {
      return new NextResponse("Invalid environment key", { status: 400 })
    }

    // Validate the value based on key
    if (key === "SUPABASE_URL") {
      if (!value.startsWith("https://") || !value.endsWith(".supabase.co")) {
        return new NextResponse("Invalid Supabase URL format", { status: 400 })
      }
    }

    if (!value || value.trim() === "") {
      return new NextResponse("Value cannot be empty", { status: 400 })
    }

    // Read existing .env.local or create new
    const envPath = join(process.cwd(), ".env.local")
    let envContent = ""

    if (existsSync(envPath)) {
      envContent = readFileSync(envPath, "utf8")
    }

    // Update or add the environment variable
    const lines = envContent.split("\n")
    const keyIndex = lines.findIndex((line) => line.startsWith(`${key}=`))

    if (keyIndex >= 0) {
      lines[keyIndex] = `${key}=${value}`
    } else {
      lines.push(`${key}=${value}`)
    }

    // Write back to file
    writeFileSync(envPath, lines.filter((line) => line.trim()).join("\n") + "\n")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to save environment variable:", error)
    return new NextResponse("Failed to save environment variable", { status: 500 })
  }
}
