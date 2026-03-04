import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { rateLimit, getHashedIp, makeRateLimitKey } from '@/lib/rateLimit'
import { sendLeadNotification } from '@/lib/gmail'

const contactSchema = z.object({
  name:        z.string().min(2).max(100).trim(),
  email:       z.string().email().max(254),
  company:     z.string().min(1).max(100).trim(),
  role:        z.string().min(1).max(100).trim().optional(),
  phone:       z.string().max(20).regex(/^[+\d\s\-()\s]*$/).optional().or(z.literal('')),
  companySize: z.enum(['1-10', '11-50', '51-200', '201-500', '+500']).optional(),
  industry:    z.enum(['Manufactura', 'Distribución', 'Retail', 'Logística', 'Tecnología', 'Otro']).optional(),
  howHeard:    z.enum(['LinkedIn', 'Google', 'Referido', 'Evento', 'Otro']).optional(),
  message:     z.string().min(10).max(2000).trim(),
  source:      z.enum(['hero', 'footer', 'services', 'contact-page']).optional(),
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

  const { name, email, company, role, phone, companySize, industry, howHeard, message, source } = parsed.data

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

  // Send Gmail notification (non-blocking — don't fail the request if email fails)
  if (process.env.GMAIL_FROM_EMAIL && process.env.CONTACT_EMAIL_TO) {
    sendLeadNotification({
      name,
      email,
      company: company ?? '',
      role: role ?? '',
      phone: phone || null,
      companySize: companySize ?? '',
      industry: industry ?? '',
      howHeard: howHeard ?? null,
      message,
      source: source ?? null,
    }).catch((err) => {
      console.error('[gmail] Failed to send lead notification:', err)
    })
  }

  return NextResponse.json({ success: true }, { status: 201 })
}
