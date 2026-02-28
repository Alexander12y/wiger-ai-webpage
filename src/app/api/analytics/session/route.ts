import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getHashedIp, rateLimit, makeRateLimitKey } from '@/lib/rateLimit'

const createSchema = z.object({
  action:      z.literal('create'),
  userAgent:   z.string().max(500).optional(),
  device:      z.enum(['desktop', 'mobile', 'tablet']).optional(),
  os:          z.string().max(50).optional(),
  browser:     z.string().max(50).optional(),
})

const updateSchema = z.object({
  action:      z.literal('update'),
  sessionId:   z.string().max(50),
  pageCount:   z.number().int().min(0).max(1000).optional(),
  durationSec: z.number().int().min(0).max(86400).optional(),
  ended:       z.boolean().optional(),
})

const schema = z.discriminatedUnion('action', [createSchema, updateSchema])

export async function POST(request: NextRequest) {
  const hashedIp = getHashedIp(request)
  const rl = rateLimit(makeRateLimitKey(hashedIp, 'analytics-session'), {
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

  if (parsed.data.action === 'create') {
    const { userAgent, device, os, browser } = parsed.data
    const session = await prisma.visitorSession.create({
      data: { ipHash: hashedIp, userAgent, device, os, browser },
      select: { id: true },
    })
    return NextResponse.json({ sessionId: session.id })
  }

  // update
  const { sessionId, pageCount, durationSec, ended } = parsed.data
  prisma.visitorSession
    .update({
      where: { id: sessionId },
      data: {
        ...(pageCount !== undefined && { pageCount }),
        ...(durationSec !== undefined && { durationSec }),
        lastSeenAt: new Date(),
        ...(ended && { endedAt: new Date() }),
      },
    })
    .catch(() => null)

  return NextResponse.json({ ok: true })
}
