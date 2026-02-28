import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { getAdminFromRequest } from '@/lib/adminAuth'

export async function GET(request: NextRequest) {
  const admin = await getAdminFromRequest(request)
  if (!admin || admin.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const users = await prisma.adminUser.findMany({
    orderBy: { createdAt: 'asc' },
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      isActive: true,
      lastLoginAt: true,
      createdAt: true,
    },
  })

  return NextResponse.json({ users })
}

const createSchema = z.object({
  username: z.string().min(2).max(50).trim(),
  email:    z.string().email().max(254),
  password: z.string().min(8).max(128),
  role:     z.enum(['SUPER_ADMIN', 'ADMIN', 'EDITOR']).default('ADMIN'),
})

export async function POST(request: NextRequest) {
  const admin = await getAdminFromRequest(request)
  if (!admin || admin.role !== 'SUPER_ADMIN') {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Cuerpo inválido' }, { status: 400 })
  }

  const parsed = createSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Datos inválidos', details: parsed.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  const { username, email, password, role } = parsed.data
  const passwordHash = await bcrypt.hash(password, 12)

  const user = await prisma.adminUser.create({
    data: { username, email, passwordHash, role },
    select: { id: true, username: true, email: true, role: true, createdAt: true },
  })

  prisma.adminActivityLog
    .create({
      data: {
        adminId: admin.sub,
        action: 'CREATE_ADMIN',
        targetType: 'admin_user',
        targetId: user.id,
        metadata: { username, role },
      },
    })
    .catch(() => null)

  return NextResponse.json({ user }, { status: 201 })
}
