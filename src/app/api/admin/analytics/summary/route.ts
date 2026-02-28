import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminFromRequest } from '@/lib/adminAuth'

export async function GET(request: NextRequest) {
  const admin = await getAdminFromRequest(request)
  if (!admin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // last 30 days

  const [pageViews, sessions, contacts, contactsByStatus, recentContacts] = await Promise.all([
    prisma.pageView.count({ where: { createdAt: { gte: since } } }),
    prisma.visitorSession.count({ where: { startedAt: { gte: since } } }),
    prisma.contactSubmission.count({ where: { createdAt: { gte: since } } }),
    prisma.contactSubmission.groupBy({
      by: ['status'],
      _count: { id: true },
    }),
    prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        status: true,
        createdAt: true,
      },
    }),
  ])

  prisma.adminActivityLog
    .create({ data: { adminId: admin.sub, action: 'VIEW_ANALYTICS' } })
    .catch(() => null)

  return NextResponse.json({
    last30Days: { pageViews, sessions, contacts },
    contactsByStatus: Object.fromEntries(
      contactsByStatus.map((row) => [row.status, row._count.id])
    ),
    recentContacts,
  })
}
