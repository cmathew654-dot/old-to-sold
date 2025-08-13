import { type NextRequest, NextResponse } from "next/server"
import { sendEmail, generateConsignmentEmail, isResendConfigured } from "@/lib/email"
import { supabaseServer, isSupabaseServerConfigured } from "@/lib/supabase-server"
import { checkRateLimit } from "@/lib/rate-limit"

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = request.ip || request.headers.get("x-forwarded-for") || "unknown"
    const rateLimit = checkRateLimit(clientIP)

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: "Too many requests. Please try again later.",
          resetTime: rateLimit.resetTime,
        },
        {
          status: 429,
          headers: {
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": rateLimit.resetTime.toString(),
          },
        },
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const { name, email, phone, itemTitle, condition, method, ...additionalData } = body

    // Validation
    if (!name || !email || !itemTitle || !condition || !method) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, itemTitle, condition, method" },
        { status: 400 },
      )
    }

    if (!["A", "B", "C"].includes(condition)) {
      return NextResponse.json({ error: "Invalid condition. Must be A, B, or C" }, { status: 400 })
    }

    if (!["pickup", "dropoff"].includes(method)) {
      return NextResponse.json({ error: "Invalid method. Must be pickup or dropoff" }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 })
    }

    const submissionData = {
      name,
      email,
      phone,
      itemTitle,
      condition,
      method,
      payload: body,
    }

    const results = {
      emailSent: false,
      databaseSaved: false,
      errors: [] as string[],
    }

    // Send email if Resend is configured
    if (isResendConfigured()) {
      try {
        const ownerEmail = process.env.RESEND_FROM?.match(/<(.+)>/)?.[1] || "cyril@old2sold.com"
        const emailContent = generateConsignmentEmail(submissionData)

        await sendEmail({
          to: ownerEmail,
          subject: emailContent.subject,
          text: emailContent.text,
          html: emailContent.html,
        })

        results.emailSent = true
      } catch (error) {
        console.error("Failed to send email:", error)
        results.errors.push("Failed to send email notification")
      }
    }

    // Save to database if Supabase is configured
    if (isSupabaseServerConfigured() && supabaseServer) {
      try {
        const { error } = await supabaseServer.from("consignments").insert({
          name,
          email,
          phone,
          payload: body,
        })

        if (error) {
          console.error("Supabase error:", error)
          results.errors.push("Failed to save to database")
        } else {
          results.databaseSaved = true
        }
      } catch (error) {
        console.error("Database save failed:", error)
        results.errors.push("Failed to save to database")
      }
    }

    // Check if any service is configured
    if (!isResendConfigured() && !isSupabaseServerConfigured()) {
      return NextResponse.json(
        {
          error: "Services not configured",
          message:
            "Neither email nor database services are configured. Please set up Resend and/or Supabase to receive submissions.",
          configureUrl: "/setup",
        },
        { status: 503 },
      )
    }

    // Return success response
    const response = {
      success: true,
      message: "Thank you! We typically reply within 2–3 business days (often sooner).",
      details: {
        emailSent: results.emailSent,
        databaseSaved: results.databaseSaved,
        hasErrors: results.errors.length > 0,
      },
    }

    if (results.errors.length > 0) {
      response.details.hasErrors = true
      // Don't expose internal errors to client, but log them
      console.error("Consignment submission errors:", results.errors)
    }

    return NextResponse.json(response, {
      headers: {
        "X-RateLimit-Remaining": rateLimit.remaining.toString(),
        "X-RateLimit-Reset": rateLimit.resetTime.toString(),
      },
    })
  } catch (error) {
    console.error("Consignment API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 })
}
