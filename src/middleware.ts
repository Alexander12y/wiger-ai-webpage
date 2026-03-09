import { NextRequest, NextResponse } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'
import { verifyAdminJwt } from '@/lib/adminAuth'

const PUBLIC_ADMIN_ROUTES = ['/api/admin/login']

const intlMiddleware = createMiddleware(routing)

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  // ─── 1. Generate a per-request cryptographic nonce ───────────────────────
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  // ─── 2. Build a strict Content-Security-Policy ───────────────────────────
  const isDev = process.env.NODE_ENV === 'development'
  const csp = [
    "default-src 'self'",
    isDev
      ? `script-src 'self' 'unsafe-eval' 'nonce-${nonce}' https://js.howdygo.com`
      : `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://js.howdygo.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://*.howdygo.com",
    "media-src 'self' blob:",
    isDev
      ? "connect-src 'self' https://*.howdygo.com wss://*.howdygo.com ws://localhost:* ws://127.0.0.1:*"
      : "connect-src 'self' https://*.howdygo.com wss://*.howdygo.com",
    "font-src 'self'",
    "frame-src https://app.howdygo.com",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://wiger.ai",
  ].join('; ')

  // ─── 3. Admin & API routes — skip i18n, apply auth ──────────────────────
  const isAdminPage = pathname.startsWith('/admin')
  const isAdminApi  = pathname.startsWith('/api/admin')
  const isApi       = pathname.startsWith('/api/')

  if (isAdminPage || isAdminApi || isApi) {
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('x-nonce', nonce)

    if (isAdminPage || isAdminApi) {
      const isPublic = PUBLIC_ADMIN_ROUTES.some(
        (p) => pathname === p || pathname.startsWith(p + '/')
      )

      if (!isPublic) {
        const token = req.cookies.get('wiger-admin-session')?.value

        if (!token) {
          return withCsp(redirectOrUnauthorized(req, pathname), csp)
        }

        const payload = await verifyAdminJwt(token)
        if (!payload) {
          return withCsp(redirectOrUnauthorized(req, pathname), csp)
        }

        requestHeaders.set('x-admin-id',   payload.sub)
        requestHeaders.set('x-admin-role', payload.role)
      }
    }

    const response = NextResponse.next({ request: { headers: requestHeaders } })
    response.headers.set('Content-Security-Policy', csp)
    return response
  }

  // ─── 4. Public pages — run i18n middleware, then append CSP + nonce ──────
  const response = intlMiddleware(req)
  response.headers.set('Content-Security-Policy', csp)
  response.headers.set('x-nonce', nonce)
  return response
}

function withCsp(response: NextResponse, csp: string): NextResponse {
  response.headers.set('Content-Security-Policy', csp)
  return response
}

function redirectOrUnauthorized(req: NextRequest, pathname: string): NextResponse {
  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  const loginUrl = new URL('/admin', req.url)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: [
    '/',
    '/(es|en)/:path*',
    '/((?!_next|_vercel|.*\\..*).+)',
  ],
}
