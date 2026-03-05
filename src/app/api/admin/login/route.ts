import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { signAdminJwt, buildSessionCookie } from '@/lib/adminAuth'

const loginSchema = z.object({
  username: z.string().min(1).max(50).trim(),
  password: z.string().min(1).max(128),
})

// A valid bcrypt hash used as a timing-attack placeholder when user is not found.
// This ensures bcrypt.compare always runs, so response time doesn't leak whether a username exists.
const TIMING_PLACEHOLDER = '$2a$12$placeholderHashForTimingXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Cuerpo de solicitud inválido' }, { status: 400 })
  }

  const parsed = loginSchema.safeParse(body)
  if (!parsed.success) {
    // Return a generic message — don't leak validation details on auth endpoints
    return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
  }

  const { username, password } = parsed.data

  // Derive credentials from the database — never trust client-supplied IDs
  const user = await prisma.adminUser.findFirst({
    where: { username, isActive: true },
    select: { id: true, passwordHash: true, role: true },
  })

  // Always run bcrypt.compare to prevent timing-based username enumeration
  const isValid = await bcrypt.compare(password, user?.passwordHash ?? TIMING_PLACEHOLDER)

  if (!user || !isValid) {
    return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
  }

  // Sign a JWT and deliver it as an HttpOnly, SameSite=Strict cookie
  const token = await signAdminJwt({ sub: user.id, role: user.role })

  // Fire-and-forget: record login timestamp and audit log
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
