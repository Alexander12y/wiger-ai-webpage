import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getAdminFromRequest } from '@/lib/adminAuth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromRequest(request)
  if (!admin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id } = await params
  const submission = await prisma.contactSubmission.findUnique({ where: { id } })
  if (!submission) {
    return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  }

  prisma.adminActivityLog
    .create({
      data: {
        adminId: admin.sub,
        action: 'VIEW_CONTACT',
        targetType: 'contact_submission',
        targetId: id,
      },
    })
    .catch(() => null)

  return NextResponse.json({ submission })
}

const patchSchema = z.object({
  status: z.enum(['PENDING', 'REVIEWED', 'RESPONDED', 'ARCHIVED']).optional(),
  notes:  z.string().max(5000).optional(),
})

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromRequest(request)
  if (!admin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id } = await params

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Cuerpo inválido' }, { status: 400 })
  }

  const parsed = patchSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Datos inválidos' }, { status: 422 })
  }

  const { status, notes } = parsed.data

  const submission = await prisma.contactSubmission.update({
    where: { id },
    data: {
      ...(status && { status }),
      ...(notes !== undefined && { notes }),
      ...(status === 'RESPONDED' && { respondedAt: new Date() }),
    },
  })

  prisma.adminActivityLog
    .create({
      data: {
        adminId: admin.sub,
        action: 'UPDATE_CONTACT_STATUS',
        targetType: 'contact_submission',
        targetId: id,
        metadata: { status, hasNotes: notes !== undefined },
      },
    })
    .catch(() => null)

  return NextResponse.json({ submission })
}
