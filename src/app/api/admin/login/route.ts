import { NextRequest, NextResponse } from 'next/server'

// Credentials — override via env vars in production
const ADMIN_USER = process.env.ADMIN_USER ?? 'admin'
const ADMIN_PASS = process.env.ADMIN_PASS ?? 'Wiger2025!'

// Session token returned on successful login
const SESSION_TOKEN = process.env.ADMIN_TOKEN ?? 'wiger-admin-session-2025'

export async function POST(request: NextRequest) {
  let body: { username?: string; password?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Cuerpo de solicitud inválido' }, { status: 400 })
  }

  const { username, password } = body

  if (!username || !password) {
    return NextResponse.json({ error: 'Usuario y contraseña requeridos' }, { status: 400 })
  }

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    return NextResponse.json({ success: true, token: SESSION_TOKEN })
  }

  // Identical error message for both wrong user and wrong password (security best practice)
  return NextResponse.json(
    { success: false, error: 'Credenciales incorrectas' },
    { status: 401 }
  )
}
