import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getHashedIp, rateLimit, makeRateLimitKey } from '@/lib/rateLimit'

const VALID_EVENT_TYPES = [
  'CTA_CLICK', 'VIDEO_PLAY', 'VIDEO_PAUSE', 'FORM_START',
  'FORM_SUBMIT', 'SECTION_VIEW', 'NAV_CLICK', 'OUTBOUND_LINK',
] as const

const schema = z.object({
  sessionId: z.string().max(50),
  eventType: z.enum(VALID_EVENT_TYPES),
  path:      z.string().max(500),
  label:     z.string().max(200).optional(),
  metadata:  z.record(z.string(), z.unknown()).optional(),
})

export async function POST(request: NextRequest) {
  const hashedIp = getHashedIp(request)
  const rl = rateLimit(makeRateLimitKey(hashedIp, 'analytics-event'), {
    limit: 60,
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

  const { sessionId, eventType, path, label, metadata } = parsed.data

  // Fire-and-forget
  prisma.analyticsEvent
    .create({
      data: {
        sessionId,
        eventType,
        path,
        label,
        metadata: metadata as never,
      },
    })
    .catch(() => null)

  return NextResponse.json({ ok: true })
}
