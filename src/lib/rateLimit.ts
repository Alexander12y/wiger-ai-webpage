import { createHash } from 'crypto'
import { NextRequest } from 'next/server'

interface WindowEntry {
  count: number
  windowStart: number
}

// In-memory store — resets on serverless cold start.
// For persistence across instances, swap with Upstash Redis.
const store = new Map<string, WindowEntry>()

interface RateLimitOptions {
  /** Max requests allowed within the window. */
  limit: number
  /** Window size in seconds. */
  windowSeconds: number
}

/**
 * Sliding-window rate limiter keyed by hashed IP + route key.
 * Returns { ok: true } if under limit, { ok: false, retryAfter } if exceeded.
 */
export function rateLimit(
  key: string,
  { limit, windowSeconds }: RateLimitOptions
): { ok: true } | { ok: false; retryAfter: number } {
  const now = Date.now()
  const windowMs = windowSeconds * 1000
  const entry = store.get(key)

  if (!entry || now - entry.windowStart >= windowMs) {
    // Start a new window
    store.set(key, { count: 1, windowStart: now })
    return { ok: true }
  }

  entry.count += 1
  if (entry.count > limit) {
    const retryAfter = Math.ceil((entry.windowStart + windowMs - now) / 1000)
    return { ok: false, retryAfter }
  }

  return { ok: true }
}

/** Extract and hash the client IP from a Next.js request. */
export function getHashedIp(req: NextRequest): string {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  const salt = process.env.ANALYTICS_IP_SALT ?? 'default-salt'
  return createHash('sha256').update(ip + salt).digest('hex')
}

/** Rate-limit key that combines a hashed IP and a route identifier. */
export function makeRateLimitKey(hashedIp: string, route: string): string {
  return `${route}:${hashedIp}`
}
