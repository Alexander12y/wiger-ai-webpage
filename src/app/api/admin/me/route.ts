import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromRequest } from '@/lib/adminAuth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const payload = await getAdminFromRequest(request)
  if (!payload) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const user = await prisma.adminUser.findUnique({
    where: { id: payload.sub, isActive: true },
    select: { id: true, username: true, email: true, role: true, lastLoginAt: true },
  })

  if (!user) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  return NextResponse.json({ user })
}
