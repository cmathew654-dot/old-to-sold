// Simple in-memory rate limiting
const requests = new Map<string, { count: number; resetTime: number }>()

const RATE_LIMIT = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // max 5 requests per window
}

export function checkRateLimit(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const windowStart = now - RATE_LIMIT.windowMs

  // Clean up old entries
  for (const [key, value] of requests.entries()) {
    if (value.resetTime < now) {
      requests.delete(key)
    }
  }

  const current = requests.get(identifier)

  if (!current || current.resetTime < now) {
    // New window
    const resetTime = now + RATE_LIMIT.windowMs
    requests.set(identifier, { count: 1, resetTime })
    return { allowed: true, remaining: RATE_LIMIT.maxRequests - 1, resetTime }
  }

  if (current.count >= RATE_LIMIT.maxRequests) {
    return { allowed: false, remaining: 0, resetTime: current.resetTime }
  }

  current.count++
  requests.set(identifier, current)
  return { allowed: true, remaining: RATE_LIMIT.maxRequests - current.count, resetTime: current.resetTime }
}
