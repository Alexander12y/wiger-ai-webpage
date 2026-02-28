import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

const COOKIE_NAME = 'wiger-admin-session'
const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET ?? 'dev-secret-change-in-production-minimum-32-chars'
)

export interface AdminJwtPayload {
  sub: string   // adminUser.id
  role: string  // AdminRole
}

export async function signAdminJwt(payload: AdminJwtPayload): Promise<string> {
  return new SignJWT({ role: payload.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(JWT_SECRET)
}

export async function verifyAdminJwt(token: string): Promise<AdminJwtPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    if (!payload.sub || !payload['role']) return null
    return { sub: payload.sub, role: payload['role'] as string }
  } catch {
    return null
  }
}

/** Read and verify the admin session cookie from a server-component context. */
export async function getAdminFromCookies(): Promise<AdminJwtPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyAdminJwt(token)
}

/** Read and verify the admin session cookie from a route handler / middleware context. */
export async function getAdminFromRequest(req: NextRequest): Promise<AdminJwtPayload | null> {
  const token = req.cookies.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyAdminJwt(token)
}

export function buildSessionCookie(token: string): string {
  const maxAge = 8 * 60 * 60 // 8 hours in seconds
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  return `${COOKIE_NAME}=${token}; HttpOnly${secure}; SameSite=Strict; Path=/; Max-Age=${maxAge}`
}

export function buildClearCookie(): string {
  return `${COOKIE_NAME}=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0`
}
