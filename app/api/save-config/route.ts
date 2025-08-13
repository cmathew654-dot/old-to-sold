import { type NextRequest, NextResponse } from "next/server"
import { writeFileSync, readFileSync, existsSync } from "fs"
import { join } from "path"

export async function POST(request: NextRequest) {
  try {
    const { key, value } = await request.json()

    // Validate the key is allowed
    const allowedKeys = ["STORAGE_PROVIDER"]

    if (!allowedKeys.includes(key)) {
      return new NextResponse("Invalid configuration key", { status: 400 })
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

    // Update or add the configuration variable
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
    console.error("Failed to save configuration:", error)
    return new NextResponse("Failed to save configuration", { status: 500 })
  }
}
