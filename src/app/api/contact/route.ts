import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { rateLimit, getHashedIp, makeRateLimitKey } from '@/lib/rateLimit'

const contactSchema = z.object({
  name:    z.string().min(2).max(100).trim(),
  email:   z.string().email().max(254),
  company: z.string().max(100).trim().optional(),
  phone:   z.string().max(20).regex(/^[+\d\s\-()\s]*$/).optional().or(z.literal('')),
  message: z.string().min(10).max(2000).trim(),
  source:  z.enum(['hero', 'footer', 'services']).optional(),
})

export async function POST(request: NextRequest) {
  // Rate limit: 3 submissions per IP per hour
  const hashedIp = getHashedIp(request)
  const rl = rateLimit(makeRateLimitKey(hashedIp, 'contact'), {
    limit: 3,
    windowSeconds: 60 * 60,
  })
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Has enviado demasiados mensajes. Intenta de nuevo en una hora.' },
      {
        status: 429,
        headers: { 'Retry-After': String(rl.retryAfter) },
      }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Cuerpo de solicitud inválido' }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Datos inválidos', details: parsed.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  const { name, email, company, phone, message, source } = parsed.data

  await prisma.contactSubmission.create({
    data: {
      name,
      email,
      company: company ?? null,
      phone: phone || null,
      message,
      source: source ?? null,
      ipHash: hashedIp,
    },
  })

  return NextResponse.json({ success: true }, { status: 201 })
}
