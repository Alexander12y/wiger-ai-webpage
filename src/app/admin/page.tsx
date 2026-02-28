'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { mediaSections, MediaSection, MediaFile } from '@/config/adminMedia'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type View = 'loading' | 'login' | 'dashboard' | 'section'

interface AdminUser {
  id: string
  username: string
  email: string
  role: string
  lastLoginAt: string | null
}

interface UploadState {
  status: 'idle' | 'uploading' | 'success' | 'error'
  message?: string
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// ---------------------------------------------------------------------------
// Login View
// ---------------------------------------------------------------------------
function LoginView({ onLogin }: { onLogin: (user: AdminUser) => void }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()

      if (res.ok && data.success) {
        // Cookie is set by the server — fetch the current user from /me
        const meRes = await fetch('/api/admin/me', { credentials: 'same-origin' })
        const meData = await meRes.json()
        if (meRes.ok && meData.user) {
          onLogin(meData.user)
        } else {
          setError('Error al verificar la sesión.')
        }
      } else {
        setError(data.error ?? 'Credenciales incorrectas')
      }
    } catch {
      setError('Error de conexión. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'linear-gradient(135deg, #060E1A 0%, #0E1C2F 60%, #0A1628 100%)' }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image
            src="/wiger-logo.png"
            alt="Wiger AI"
            width={180}
            height={52}
            className="h-12 w-auto object-contain"
            priority
          />
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: '#0A1628',
            border: '1px solid #1E3252',
            boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          }}
        >
          <h1 className="text-xl font-bold mb-1" style={{ color: '#F1EEE9' }}>
            Panel de Administración
          </h1>
          <p className="text-sm mb-8" style={{ color: '#94A3B8' }}>
            Ingresa tus credenciales para continuar
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                style={{ color: '#94A3B8' }}
              >
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                style={{
                  background: '#162438',
                  border: '1px solid #1E3252',
                  color: '#F1EEE9',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#E8650A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#1E3252')}
                placeholder="admin"
              />
            </div>

            <div>
              <label
                className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                style={{ color: '#94A3B8' }}
              >
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200"
                style={{
                  background: '#162438',
                  border: '1px solid #1E3252',
                  color: '#F1EEE9',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#E8650A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#1E3252')}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                style={{
                  background: 'rgba(220,38,38,0.1)',
                  border: '1px solid rgba(220,38,38,0.3)',
                  color: '#FCA5A5',
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4 flex-shrink-0"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-60"
              style={{ background: '#E8650A', color: '#FFFFFF' }}
              onMouseEnter={(e) => !loading && (e.currentTarget.style.background = '#C8520A')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#E8650A')}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Verificando...
                </span>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: '#4A6080' }}>
          Wiger AI — Panel interno
        </p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Dashboard View
// ---------------------------------------------------------------------------
function DashboardView({
  user,
  onSelectSection,
  onLogout,
}: {
  user: AdminUser
  onSelectSection: (section: MediaSection) => void
  onLogout: () => void
}) {
  return (
    <div className="min-h-screen" style={{ background: '#0E1C2F' }}>
      {/* Top bar */}
      <header
        className="sticky top-0 z-10 px-6 lg:px-10 py-4 flex items-center justify-between"
        style={{ background: '#0A1628', borderBottom: '1px solid #1E3252' }}
      >
        <div className="flex items-center gap-4">
          <Image
            src="/wiger-logo.png"
            alt="Wiger AI"
            width={120}
            height={34}
            className="h-8 w-auto object-contain"
          />
          <div className="w-px h-6" style={{ background: '#1E3252' }} />
          <span className="text-sm font-semibold" style={{ color: '#94A3B8' }}>
            Panel de Administración
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs hidden sm:block" style={{ color: '#4A6080' }}>
            {user.username}
          </span>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-200"
            style={{ color: '#94A3B8', border: '1px solid #1E3252' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#E8650A'
              e.currentTarget.style.color = '#E8650A'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1E3252'
              e.currentTarget.style.color = '#94A3B8'
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
            >
              <path
                fillRule="evenodd"
                d="M3 4.25A2.25 2.25 0 015.25 2h5.5A2.25 2.25 0 0113 4.25v2a.75.75 0 01-1.5 0v-2a.75.75 0 00-.75-.75h-5.5a.75.75 0 00-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 00.75-.75v-2a.75.75 0 011.5 0v2A2.25 2.25 0 0110.75 18h-5.5A2.25 2.25 0 013 15.75V4.25z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M19 10a.75.75 0 00-.75-.75H8.704l1.048-1.07a.75.75 0 10-1.004-1.115l-2.5 2.5a.75.75 0 000 1.115l2.5 2.5a.75.75 0 101.004-1.115l-1.048-1.07h9.546A.75.75 0 0019 10z"
                clipRule="evenodd"
              />
            </svg>
            Cerrar sesión
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 lg:px-10 py-12">
        <div className="mb-10">
          <h1 className="text-2xl font-bold mb-2" style={{ color: '#F1EEE9' }}>
            Gestión de medios
          </h1>
          <p className="text-sm" style={{ color: '#94A3B8' }}>
            Selecciona una sección para ver y actualizar sus archivos multimedia.
          </p>
        </div>

        {/* Section cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {mediaSections.map((section) => (
            <button
              key={section.id}
              onClick={() => onSelectSection(section)}
              className="group text-left rounded-2xl p-6 transition-all duration-200"
              style={{
                background: '#0A1628',
                border: '1px solid #1E3252',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#E8650A'
                e.currentTarget.style.background = '#0D1E36'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#1E3252'
                e.currentTarget.style.background = '#0A1628'
              }}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0 mt-0.5">{section.icon}</span>

                <div className="flex-1 min-w-0">
                  <h2
                    className="font-bold text-base mb-1 group-hover:text-[#E8650A] transition-colors duration-200"
                    style={{ color: '#F1EEE9' }}
                  >
                    {section.name}
                  </h2>
                  <p className="text-xs leading-relaxed mb-4" style={{ color: '#64748B' }}>
                    {section.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        background: 'rgba(232,101,10,0.12)',
                        color: '#E8650A',
                        border: '1px solid rgba(232,101,10,0.25)',
                      }}
                    >
                      {section.files.length} {section.files.length === 1 ? 'archivo' : 'archivos'}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1 -translate-x-0.5"
                      style={{ color: '#E8650A' }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Info note */}
        <div
          className="mt-10 flex items-start gap-3 px-5 py-4 rounded-xl text-sm"
          style={{ background: 'rgba(232,101,10,0.06)', border: '1px solid rgba(232,101,10,0.2)' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 flex-shrink-0 mt-0.5"
            style={{ color: '#E8650A' }}
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
              clipRule="evenodd"
            />
          </svg>
          <p style={{ color: '#94A3B8' }}>
            Los archivos subidos reemplazan los existentes en el servidor de forma inmediata. Para
            producción en Vercel, conecta un proveedor de almacenamiento en la nube (S3, Cloudinary,
            etc.).
          </p>
        </div>
      </main>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Media Card — single file within a section
// ---------------------------------------------------------------------------
function MediaCard({ file }: { file: MediaFile }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploadState, setUploadState] = useState<UploadState>({ status: 'idle' })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.files?.[0]
      if (!selected) return

      const objectUrl = URL.createObjectURL(selected)
      setPreviewUrl(objectUrl)
      setUploadState({ status: 'uploading' })

      const formData = new FormData()
      formData.append('file', selected)
      formData.append('targetPath', file.path)

      try {
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          credentials: 'same-origin',
          body: formData,
        })
        const data = await res.json()

        if (res.ok && data.success) {
          setUploadState({
            status: 'success',
            message: `Subido correctamente (${formatBytes(selected.size)})`,
          })
        } else {
          setUploadState({ status: 'error', message: data.error ?? 'Error al subir el archivo' })
        }
      } catch {
        setUploadState({ status: 'error', message: 'Error de red. Intenta de nuevo.' })
      }

      if (inputRef.current) inputRef.current.value = ''
    },
    [file.path]
  )

  const isImage = file.type === 'image'

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: '#0A1628', border: '1px solid #1E3252' }}
    >
      {/* Preview area */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{ background: '#060E1A', minHeight: '200px', maxHeight: '280px', overflow: 'hidden' }}
      >
        {isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl ?? `/${file.path}`}
            alt={file.label}
            className="max-h-full max-w-full object-contain"
            style={{ maxHeight: '280px' }}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextElementSibling?.removeAttribute('hidden')
            }}
          />
        ) : (
          <video
            src={previewUrl ?? `/${file.path}`}
            className="max-h-full max-w-full object-contain"
            style={{ maxHeight: '280px' }}
            controls={false}
            muted
            playsInline
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextElementSibling?.removeAttribute('hidden')
            }}
          />
        )}

        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2"
          style={{ color: '#4A6080' }}
        >
          {isImage ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10 h-10 opacity-40"
            >
              <path
                fillRule="evenodd"
                d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.83 1.661a.75.75 0 01-1.342.67l-2.453-4.906a1.5 1.5 0 00-1.89-.75l-4.505 1.702A2.25 2.25 0 013 16.06z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-10 h-10 opacity-40"
            >
              <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
            </svg>
          )}
          <span className="text-xs">Sin archivo</span>
        </div>
      </div>

      {/* Info + actions */}
      <div className="p-5">
        <p className="font-semibold text-sm mb-1" style={{ color: '#F1EEE9' }}>
          {file.label}
        </p>

        {file.description && (
          <p className="text-xs mb-3 leading-relaxed" style={{ color: '#64748B' }}>
            {file.description}
          </p>
        )}

        <p className="text-xs mb-4 font-mono" style={{ color: '#4A6080' }}>
          /{file.path}
        </p>

        {uploadState.status === 'uploading' && (
          <div
            className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg mb-3"
            style={{ background: 'rgba(232,101,10,0.1)', color: '#E8650A' }}
          >
            <svg
              className="w-3.5 h-3.5 animate-spin flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Subiendo archivo…
          </div>
        )}

        {uploadState.status === 'success' && (
          <div
            className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg mb-3"
            style={{
              background: 'rgba(34,197,94,0.1)',
              color: '#86EFAC',
              border: '1px solid rgba(34,197,94,0.2)',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3.5 h-3.5 flex-shrink-0"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
            {uploadState.message}
          </div>
        )}

        {uploadState.status === 'error' && (
          <div
            className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg mb-3"
            style={{
              background: 'rgba(220,38,38,0.1)',
              color: '#FCA5A5',
              border: '1px solid rgba(220,38,38,0.2)',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-3.5 h-3.5 flex-shrink-0"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                clipRule="evenodd"
              />
            </svg>
            {uploadState.message}
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept={file.accept}
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          onClick={() => inputRef.current?.click()}
          disabled={uploadState.status === 'uploading'}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50"
          style={{
            background: 'rgba(232,101,10,0.15)',
            color: '#E8650A',
            border: '1px solid rgba(232,101,10,0.3)',
          }}
          onMouseEnter={(e) => {
            if (uploadState.status !== 'uploading') {
              e.currentTarget.style.background = 'rgba(232,101,10,0.25)'
              e.currentTarget.style.borderColor = '#E8650A'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(232,101,10,0.15)'
            e.currentTarget.style.borderColor = 'rgba(232,101,10,0.3)'
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M10 3a.75.75 0 01.75.75V9h5.25a.75.75 0 010 1.5H10.75v5.25a.75.75 0 01-1.5 0V10.5H4a.75.75 0 010-1.5h5.25V3.75A.75.75 0 0110 3z"
              clipRule="evenodd"
            />
          </svg>
          {uploadState.status === 'uploading' ? 'Subiendo…' : 'Subir nuevo archivo'}
        </button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Section View
// ---------------------------------------------------------------------------
function SectionView({
  section,
  onBack,
}: {
  section: MediaSection
  onBack: () => void
}) {
  return (
    <div className="min-h-screen" style={{ background: '#0E1C2F' }}>
      <header
        className="sticky top-0 z-10 px-6 lg:px-10 py-4 flex items-center gap-4"
        style={{ background: '#0A1628', borderBottom: '1px solid #1E3252' }}
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200"
          style={{ color: '#94A3B8', border: '1px solid #1E3252' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = '#E8650A'
            e.currentTarget.style.color = '#E8650A'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = '#1E3252'
            e.currentTarget.style.color = '#94A3B8'
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
              clipRule="evenodd"
            />
          </svg>
          Volver
        </button>

        <div className="w-px h-5" style={{ background: '#1E3252' }} />

        <div className="flex items-center gap-2">
          <span className="text-xl">{section.icon}</span>
          <span className="text-sm font-bold" style={{ color: '#F1EEE9' }}>
            {section.name}
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 lg:px-10 py-12">
        <div className="mb-8">
          <p className="text-sm" style={{ color: '#94A3B8' }}>
            {section.description}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {section.files.map((file) => (
            <MediaCard key={file.id} file={file} />
          ))}
        </div>
      </main>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Root Admin Page
// ---------------------------------------------------------------------------
export default function AdminPage() {
  const [view, setView] = useState<View>('loading')
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null)
  const [currentSection, setCurrentSection] = useState<MediaSection | null>(null)

  // On mount, check if there's a valid session cookie via /api/admin/me
  useEffect(() => {
    fetch('/api/admin/me', { credentials: 'same-origin' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setCurrentUser(data.user)
          setView('dashboard')
        } else {
          setView('login')
        }
      })
      .catch(() => setView('login'))
  }, [])

  const handleLogin = (user: AdminUser) => {
    setCurrentUser(user)
    setView('dashboard')
  }

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'same-origin' })
    setCurrentUser(null)
    setCurrentSection(null)
    setView('login')
  }

  const handleSelectSection = (section: MediaSection) => {
    setCurrentSection(section)
    setView('section')
  }

  const handleBack = () => {
    setCurrentSection(null)
    setView('dashboard')
  }

  if (view === 'loading') {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: '#0E1C2F' }}
      >
        <svg
          className="w-8 h-8 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          style={{ color: '#E8650A' }}
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    )
  }

  if (view === 'login') {
    return <LoginView onLogin={handleLogin} />
  }

  if (view === 'section' && currentSection) {
    return <SectionView section={currentSection} onBack={handleBack} />
  }

  return (
    <DashboardView
      user={currentUser!}
      onSelectSection={handleSelectSection}
      onLogout={handleLogout}
    />
  )
}
