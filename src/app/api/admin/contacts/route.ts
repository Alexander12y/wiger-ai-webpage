import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getAdminFromRequest } from '@/lib/adminAuth'

const querySchema = z.object({
  status: z.enum(['PENDING', 'REVIEWED', 'RESPONDED', 'ARCHIVED']).optional(),
  page:   z.coerce.number().int().min(1).default(1),
  limit:  z.coerce.number().int().min(1).max(100).default(20),
})

export async function GET(request: NextRequest) {
  const admin = await getAdminFromRequest(request)
  if (!admin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { searchParams } = request.nextUrl
  const parsed = querySchema.safeParse(Object.fromEntries(searchParams))
  if (!parsed.success) {
    return NextResponse.json({ error: 'Parámetros inválidos' }, { status: 400 })
  }

  const { status, page, limit } = parsed.data
  const skip = (page - 1) * limit

  const [submissions, total] = await Promise.all([
    prisma.contactSubmission.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      select: {
        id: true,
        name: true,
        email: true,
        company: true,
        phone: true,
        status: true,
        source: true,
        createdAt: true,
        respondedAt: true,
      },
    }),
    prisma.contactSubmission.count({ where: status ? { status } : undefined }),
  ])

  // Log view action
  prisma.adminActivityLog
    .create({ data: { adminId: admin.sub, action: 'VIEW_ANALYTICS' } })
    .catch(() => null)

  return NextResponse.json({
    submissions,
    pagination: { total, page, limit, pages: Math.ceil(total / limit) },
  })
}
