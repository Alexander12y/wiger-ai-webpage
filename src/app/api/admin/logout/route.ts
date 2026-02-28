import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromRequest, buildClearCookie } from '@/lib/adminAuth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const admin = await getAdminFromRequest(request)

  if (admin) {
    prisma.adminActivityLog
      .create({
        data: {
          adminId: admin.sub,
          action: 'LOGOUT',
          ipAddress: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
          userAgent: request.headers.get('user-agent'),
        },
      })
      .catch(() => null)
  }

  const response = NextResponse.json({ success: true })
  response.headers.set('Set-Cookie', buildClearCookie())
  return response
}
