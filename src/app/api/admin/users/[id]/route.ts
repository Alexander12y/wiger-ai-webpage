import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getAdminFromRequest } from '@/lib/adminAuth'

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromRequest(request)
  if (!admin || admin.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { id } = await params

  if (id === admin.sub) {
    return NextResponse.json({ error: 'No puedes desactivar tu propia cuenta' }, { status: 400 })
  }

  const user = await prisma.adminUser.update({
    where: { id },
    data: { isActive: false },
    select: { id: true, username: true },
  })

  prisma.adminActivityLog
    .create({
      data: {
        adminId: admin.sub,
        action: 'DEACTIVATE_ADMIN',
        targetType: 'admin_user',
        targetId: id,
        metadata: { username: user.username },
      },
    })
    .catch(() => null)

  return NextResponse.json({ success: true })
}
