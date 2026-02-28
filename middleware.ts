import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminJwt } from '@/lib/adminAuth'

const PUBLIC_ADMIN_ROUTES = ['/api/admin/login']

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only guard /admin and /api/admin paths
  const isAdminPage = pathname.startsWith('/admin')
  const isAdminApi = pathname.startsWith('/api/admin')

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next()
  }

  // Allow public admin routes through (login endpoint)
  if (PUBLIC_ADMIN_ROUTES.some((p) => pathname === p || pathname.startsWith(p + '/'))) {
    return NextResponse.next()
  }

  const token = req.cookies.get('wiger-admin-session')?.value

  if (!token) {
    return redirectOrUnauthorized(req, pathname)
  }

  const payload = await verifyAdminJwt(token)
  if (!payload) {
    return redirectOrUnauthorized(req, pathname)
  }

  // Attach admin info to request headers for downstream handlers
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-admin-id', payload.sub)
  requestHeaders.set('x-admin-role', payload.role)

  return NextResponse.next({ request: { headers: requestHeaders } })
}

function redirectOrUnauthorized(req: NextRequest, pathname: string) {
  if (pathname.startsWith('/api/')) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  // Redirect browser requests to login page
  const loginUrl = new URL('/admin', req.url)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
