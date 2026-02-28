import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { signAdminJwt, buildSessionCookie } from '@/lib/adminAuth'
import { rateLimit, getHashedIp, makeRateLimitKey } from '@/lib/rateLimit'

const loginSchema = z.object({
  username: z.string().min(1).max(50).trim(),
  password: z.string().min(1).max(128),
})

export async function POST(request: NextRequest) {
  // Rate limit: 10 attempts per IP per 15 minutes
  const hashedIp = getHashedIp(request)
  const rl = rateLimit(makeRateLimitKey(hashedIp, 'admin-login'), {
    limit: 10,
    windowSeconds: 15 * 60,
  })
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'Demasiados intentos. Intenta de nuevo más tarde.' },
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

  const parsed = loginSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 400 })
  }

  const { username, password } = parsed.data

  const user = await prisma.adminUser.findUnique({ where: { username } })

  // Perform compare even when user is not found to prevent timing attacks
  const dummyHash = '$2b$12$invalidhashfortimingattackprevention1234567890123456'
  const passwordMatch = await bcrypt.compare(
    password,
    user?.passwordHash ?? dummyHash
  )

  if (!user || !user.isActive || !passwordMatch) {
    return NextResponse.json(
      { success: false, error: 'Credenciales incorrectas' },
      { status: 401 }
    )
  }

  const token = await signAdminJwt({ sub: user.id, role: user.role })

  // Update last login timestamp and log action (fire-and-forget)
  prisma.adminUser
    .update({ where: { id: user.id }, data: { lastLoginAt: new Date() } })
    .catch(() => null)

  prisma.adminActivityLog
    .create({
      data: {
        adminId: user.id,
        action: 'LOGIN',
        ipAddress: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
        userAgent: request.headers.get('user-agent'),
      },
    })
    .catch(() => null)

  const response = NextResponse.json({ success: true })
  response.headers.set('Set-Cookie', buildSessionCookie(token))
  return response
}
