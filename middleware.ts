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
  const csp = [
    "default-src 'self'",
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://js.howdygo.com`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://*.howdygo.com",
    "media-src 'self' blob:",
    "connect-src 'self' https://*.howdygo.com wss://*.howdygo.com",
    "font-src 'self'",
    "frame-src https://app.howdygo.com",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://wiger.ai",
  ].join('; ')

  // Expose nonce to the Next.js App Router (layouts read it via headers())
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-nonce', nonce)

  // ─── 3. Admin & API routes — skip i18n, apply auth ──────────────────────
  const isAdminPage = pathname.startsWith('/admin')
  const isAdminApi  = pathname.startsWith('/api/admin')
  const isApi       = pathname.startsWith('/api/')

  if (isAdminPage || isAdminApi || isApi) {
    // Admin auth for protected routes
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

  // ─── 4. Public pages — run i18n middleware, then append CSP ──────────────
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
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|mp4|ico|webm)).*)'],
}
