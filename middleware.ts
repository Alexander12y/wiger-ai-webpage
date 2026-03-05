import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminJwt } from '@/lib/adminAuth'

const PUBLIC_ADMIN_ROUTES = ['/api/admin/login']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // ─── 1. Generate a per-request cryptographic nonce ───────────────────────
  // This nonce is embedded in the CSP header and in Next.js's inline scripts,
  // so only scripts we explicitly authorize can execute.
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64')

  // ─── 2. Build a strict Content-Security-Policy ───────────────────────────
  // • script-src: nonce-only + strict-dynamic (no unsafe-inline, no unsafe-eval)
  //   'strict-dynamic' lets nonce-whitelisted scripts load further scripts.
  // • style-src:  unsafe-inline is kept because Tailwind and React inline styles
  //   require it; CSS-based XSS is significantly lower risk than JS XSS.
  // • object-src / base-uri / form-action: hardened to 'none'/'self'.
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

  // ─── 3. Admin-route authentication ───────────────────────────────────────
  const isAdminPage = pathname.startsWith('/admin')
  const isAdminApi  = pathname.startsWith('/api/admin')

  if (isAdminPage || isAdminApi) {
    const isPublic = PUBLIC_ADMIN_ROUTES.some(
      (p) => pathname === p || pathname.startsWith(p + '/')
    )

    if (!isPublic) {
      const token = req.cookies.get('wiger-admin-session')?.value

      if (!token) {
        return withCsp(redirectOrUnauthorized(req, pathname), csp)
      }

      // userId is always derived from the server-signed JWT — never from the client body
      const payload = await verifyAdminJwt(token)
      if (!payload) {
        return withCsp(redirectOrUnauthorized(req, pathname), csp)
      }

      // Forward verified identity to downstream route handlers via request headers
      requestHeaders.set('x-admin-id',   payload.sub)
      requestHeaders.set('x-admin-role', payload.role)
    }
  }

  // ─── 4. Apply CSP to every response ──────────────────────────────────────
  const response = NextResponse.next({ request: { headers: requestHeaders } })
  response.headers.set('Content-Security-Policy', csp)
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
  // Cover all routes except Next.js static assets and images (they don't need auth
  // or nonce injection, and excluding them avoids unnecessary middleware overhead).
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
