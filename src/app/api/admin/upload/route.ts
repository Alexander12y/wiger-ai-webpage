import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { z } from 'zod'
import { getAdminFromRequest } from '@/lib/adminAuth'
import { prisma } from '@/lib/prisma'

// Max file size: 500 MB
const MAX_SIZE_BYTES = 500 * 1024 * 1024

// Allowed file extensions for uploads
const ALLOWED_EXTENSIONS = new Set([
  '.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.ico',
  '.mp4', '.webm', '.ogg',
  '.pdf', '.txt',
])

// Zod schema for the targetPath field
const targetPathSchema = z
  .string()
  .min(1)
  .max(200)
  // Only allow safe path characters: alphanumeric, hyphens, underscores, dots, forward slashes
  .regex(/^[\w\-./]+$/, 'Ruta inválida')
  // Block any directory traversal attempts
  .refine((p) => !p.includes('..'), 'No se permiten rutas con ".."')
  .refine((p) => !path.isAbsolute(p), 'No se permiten rutas absolutas')

export async function POST(request: NextRequest) {
  // Auth: verify admin session cookie
  const admin = await getAdminFromRequest(request)
  if (!admin) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  let formData: FormData
  try {
    formData = await request.formData()
  } catch {
    return NextResponse.json({ error: 'Formato de solicitud inválido' }, { status: 400 })
  }

  const file = formData.get('file') as File | null
  const rawTargetPath = formData.get('targetPath')

  if (!file || !rawTargetPath) {
    return NextResponse.json({ error: 'Archivo y ruta destino son requeridos' }, { status: 400 })
  }

  // Validate targetPath with Zod before any filesystem operations
  const parsedPath = targetPathSchema.safeParse(rawTargetPath)
  if (!parsedPath.success) {
    return NextResponse.json({ error: 'Ruta de destino inválida' }, { status: 400 })
  }
  const targetPath = parsedPath.data

  // Validate file extension against allowlist
  const ext = path.extname(file.name).toLowerCase()
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return NextResponse.json(
      { error: `Tipo de archivo no permitido: ${ext}` },
      { status: 415 }
    )
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json(
      { error: 'El archivo excede el tamaño máximo permitido (500 MB)' },
      { status: 413 }
    )
  }

  // Sanitize the target path — prevent directory traversal (defense-in-depth)
  const normalized = path.normalize(targetPath).replace(/\\/g, '/')
  if (normalized.startsWith('..') || path.isAbsolute(normalized)) {
    return NextResponse.json({ error: 'Ruta de destino inválida' }, { status: 400 })
  }

  const publicDir = path.join(process.cwd(), 'public')
  const fullPath = path.join(publicDir, normalized)

  // Final safety check: ensure the resolved path is inside /public
  if (!fullPath.startsWith(publicDir + path.sep) && fullPath !== publicDir) {
    return NextResponse.json({ error: 'Ruta fuera del directorio permitido' }, { status: 400 })
  }

  try {
    await mkdir(path.dirname(fullPath), { recursive: true })

    const bytes = await file.arrayBuffer()
    await writeFile(fullPath, Buffer.from(bytes))

    // Log the upload action
    prisma.adminActivityLog
      .create({
        data: {
          adminId: admin.sub,
          action: 'UPLOAD_MEDIA',
          targetType: 'media_file',
          targetId: normalized,
          metadata: { filename: file.name, size: file.size, path: normalized },
          ipAddress: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null,
          userAgent: request.headers.get('user-agent'),
        },
      })
      .catch(() => null)

    return NextResponse.json({
      success: true,
      path: `/${normalized}`,
      filename: file.name,
      size: file.size,
    })
  } catch (err) {
    console.error('[admin/upload] Error writing file:', err)
    return NextResponse.json(
      { error: 'Error al guardar el archivo en el servidor' },
      { status: 500 }
    )
  }
}

// Allow large uploads
export const config = {
  api: { bodyParser: false },
}
