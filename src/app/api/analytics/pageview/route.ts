import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getHashedIp, rateLimit, makeRateLimitKey } from '@/lib/rateLimit'

const schema = z.object({
  path:        z.string().max(500),
  referrer:    z.string().max(500).optional(),
  utmSource:   z.string().max(100).optional(),
  utmMedium:   z.string().max(100).optional(),
  utmCampaign: z.string().max(100).optional(),
  sessionId:   z.string().max(50).optional(),
})

export async function POST(request: NextRequest) {
  const hashedIp = getHashedIp(request)
  const rl = rateLimit(makeRateLimitKey(hashedIp, 'analytics-pageview'), {
    limit: 120,
    windowSeconds: 60,
  })
  if (!rl.ok) {
    return NextResponse.json({}, { status: 429 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({}, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({}, { status: 422 })
  }

  // Fire-and-forget — respond immediately
  prisma.pageView.create({ data: parsed.data }).catch(() => null)

  return NextResponse.json({ ok: true })
}
