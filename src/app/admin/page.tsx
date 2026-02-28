'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { mediaSections, MediaSection, MediaFile } from '@/config/adminMedia'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
type View = 'login' | 'dashboard' | 'section'

interface UploadState {
  status: 'idle' | 'uploading' | 'success' | 'error'
  message?: string
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

// ---------------------------------------------------------------------------
// Login View
// ---------------------------------------------------------------------------
function LoginView({ onLogin }: { onLogin: (token: string) => void }) {
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
        body: JSON.stringify({ username, password }),
      })
      const data = await res.json()

      if (data.success) {
        sessionStorage.setItem('wiger-admin-token', data.token)
        onLogin(data.token)
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
      style={{ background: '#FAFAF7' }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex justify-center mb-10">
          <Image
            src="/wiger-logo.png"
            alt="Wiger AI"
            width={180}
            height={52}
            className="h-10 w-auto object-contain"
            priority
          />
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: '#FFFFFF',
            border: '1px solid #E8E8E2',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
          }}
        >
          <h1 className="text-xl font-bold mb-1" style={{ color: '#1A1A1A', fontFamily: 'var(--font-display)' }}>
            Panel de Administración
          </h1>
          <p className="text-sm mb-8" style={{ color: '#9A9A94' }}>
            Ingresa tus credenciales para continuar
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label
                className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                style={{ color: '#5C5C5C' }}
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
                  background: '#FAFAF7',
                  border: '1.5px solid #E8E8E2',
                  color: '#1A1A1A',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#E8650A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#E8E8E2')}
                placeholder="admin"
              />
            </div>

            <div>
              <label
                className="block text-xs font-semibold mb-1.5 uppercase tracking-wide"
                style={{ color: '#5C5C5C' }}
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
                  background: '#FAFAF7',
                  border: '1.5px solid #E8E8E2',
                  color: '#1A1A1A',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#E8650A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#E8E8E2')}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 flex-shrink-0">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 disabled:opacity-60 cursor-pointer"
              style={{ background: '#E8650A', color: '#FFFFFF' }}
              onMouseEnter={(e) => !loading && (e.currentTarget.style.background = '#C8520A')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#E8650A')}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Verificando...
                </span>
              ) : (
                'Iniciar sesión'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: '#9A9A94' }}>
          Wiger AI — Panel interno
        </p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Sidebar Navigation
// ---------------------------------------------------------------------------
function Sidebar({
  sections,
  activeSection,
  onSelectSection,
  onLogout,
}: {
  sections: MediaSection[]
  activeSection: string | null
  onSelectSection: (section: MediaSection) => void
  onLogout: () => void
}) {
  return (
    <aside
      className="w-64 flex-shrink-0 h-screen sticky top-0 flex flex-col"
      style={{ background: '#FFFFFF', borderRight: '1px solid #E8E8E2' }}
    >
      {/* Logo header */}
      <div className="px-5 py-5 flex items-center gap-3" style={{ borderBottom: '1px solid #E8E8E2' }}>
        <Link href="/">
          <Image src="/wiger-logo.png" alt="Wiger AI" width={120} height={34} className="h-7 w-auto object-contain" />
        </Link>
        <div className="w-px h-5" style={{ background: '#E8E8E2' }} />
        <span className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: '#9A9A94' }}>Admin</span>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {/* Dashboard link */}
        <button
          onClick={() => onSelectSection(null as unknown as MediaSection)}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            activeSection === null
              ? 'bg-[rgba(232,101,10,0.08)] text-[#E8650A]'
              : 'text-[#5C5C5C] hover:bg-[#F4F3EF] hover:text-[#1A1A1A]'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
          </svg>
          Panel general
        </button>

        {/* Section label */}
        <p className="text-[10px] font-bold uppercase tracking-widest px-3 pt-4 pb-2" style={{ color: '#9A9A94' }}>
          Secciones de medios
        </p>

        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSelectSection(section)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              activeSection === section.id
                ? 'bg-[rgba(232,101,10,0.08)] text-[#E8650A]'
                : 'text-[#5C5C5C] hover:bg-[#F4F3EF] hover:text-[#1A1A1A]'
            }`}
          >
            <span className="text-base">{section.icon}</span>
            <span className="truncate">{section.name}</span>
            <span
              className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded-md"
              style={{
                background: activeSection === section.id ? 'rgba(232,101,10,0.12)' : '#F4F3EF',
                color: activeSection === section.id ? '#E8650A' : '#9A9A94',
              }}
            >
              {section.files.length}
            </span>
          </button>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 space-y-2" style={{ borderTop: '1px solid #E8E8E2' }}>
        <Link
          href="/"
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#5C5C5C] hover:bg-[#F4F3EF] hover:text-[#1A1A1A] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
          Ver sitio
        </Link>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#DC2626] hover:bg-red-50 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
          </svg>
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}

// ---------------------------------------------------------------------------
// Media Card
// ---------------------------------------------------------------------------
function MediaCard({ file, token }: { file: MediaFile; token: string }) {
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
          headers: { Authorization: `Bearer ${token}` },
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
    [file.path, token]
  )

  const isImage = file.type === 'image'

  return (
    <div
      className="rounded-2xl overflow-hidden transition-shadow duration-200 hover:shadow-lg"
      style={{ background: '#FFFFFF', border: '1px solid #E8E8E2' }}
    >
      {/* Preview area */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{ background: '#F4F3EF', minHeight: '180px', maxHeight: '240px', overflow: 'hidden' }}
      >
        {isImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl ?? `/${file.path}`}
            alt={file.label}
            className="max-h-full max-w-full object-contain"
            style={{ maxHeight: '240px' }}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              const sibling = e.currentTarget.nextElementSibling
              if (sibling) (sibling as HTMLElement).hidden = false
            }}
          />
        ) : (
          <video
            src={previewUrl ?? `/${file.path}`}
            className="max-h-full max-w-full object-contain"
            style={{ maxHeight: '240px' }}
            controls={false}
            muted
            playsInline
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              const sibling = e.currentTarget.nextElementSibling
              if (sibling) (sibling as HTMLElement).hidden = false
            }}
          />
        )}

        {/* Fallback */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2"
          style={{ color: '#9A9A94' }}
        >
          {isImage ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 opacity-30">
              <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.83 1.661a.75.75 0 01-1.342.67l-2.453-4.906a1.5 1.5 0 00-1.89-.75l-4.505 1.702A2.25 2.25 0 013 16.06z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 opacity-30">
              <path d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h8.25a3 3 0 003-3v-9a3 3 0 00-3-3H4.5zM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06z" />
            </svg>
          )}
          <span className="text-xs">Sin archivo</span>
        </div>
      </div>

      {/* Info + actions */}
      <div className="p-5">
        <p className="font-semibold text-sm mb-1" style={{ color: '#1A1A1A' }}>
          {file.label}
        </p>

        {file.description && (
          <p className="text-xs mb-3 leading-relaxed" style={{ color: '#9A9A94' }}>
            {file.description}
          </p>
        )}

        <p className="text-xs mb-4 font-mono" style={{ color: '#BDBDB7' }}>
          /{file.path}
        </p>

        {/* Status feedback */}
        {uploadState.status === 'uploading' && (
          <div
            className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg mb-3"
            style={{ background: 'rgba(232,101,10,0.06)', color: '#E8650A' }}
          >
            <svg className="w-3.5 h-3.5 animate-spin flex-shrink-0" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Subiendo archivo...
          </div>
        )}

        {uploadState.status === 'success' && (
          <div
            className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg mb-3"
            style={{ background: '#F0FDF4', color: '#16A34A', border: '1px solid #BBF7D0' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            {uploadState.message}
          </div>
        )}

        {uploadState.status === 'error' && (
          <div
            className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg mb-3"
            style={{ background: '#FEF2F2', color: '#DC2626', border: '1px solid #FECACA' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            {uploadState.message}
          </div>
        )}

        {/* Upload button */}
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
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 cursor-pointer"
          style={{
            background: 'rgba(232,101,10,0.08)',
            color: '#E8650A',
            border: '1px solid rgba(232,101,10,0.2)',
          }}
          onMouseEnter={(e) => {
            if (uploadState.status !== 'uploading') {
              e.currentTarget.style.background = 'rgba(232,101,10,0.15)'
              e.currentTarget.style.borderColor = '#E8650A'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(232,101,10,0.08)'
            e.currentTarget.style.borderColor = 'rgba(232,101,10,0.2)'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
            <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
          </svg>
          {uploadState.status === 'uploading' ? 'Subiendo...' : 'Subir archivo'}
        </button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Dashboard Content
// ---------------------------------------------------------------------------
function DashboardContent({
  onSelectSection,
}: {
  onSelectSection: (section: MediaSection) => void
}) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: '#1A1A1A', fontFamily: 'var(--font-display)' }}>
          Gestión de medios
        </h1>
        <p className="text-sm" style={{ color: '#9A9A94' }}>
          Selecciona una sección para ver y actualizar sus archivos multimedia.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mediaSections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSelectSection(section)}
            className="group text-left rounded-2xl p-6 transition-all duration-200 hover:shadow-md"
            style={{
              background: '#FFFFFF',
              border: '1px solid #E8E8E2',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#E8650A'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#E8E8E2'
            }}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl flex-shrink-0">{section.icon}</span>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-base mb-1 group-hover:text-[#E8650A] transition-colors" style={{ color: '#1A1A1A' }}>
                  {section.name}
                </h2>
                <p className="text-xs leading-relaxed mb-4" style={{ color: '#9A9A94' }}>
                  {section.description}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(232,101,10,0.08)', color: '#E8650A' }}
                  >
                    {section.files.length} {section.files.length === 1 ? 'archivo' : 'archivos'}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-1"
                    style={{ color: '#E8650A' }}
                  >
                    <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Info note */}
      <div
        className="mt-8 flex items-start gap-3 px-5 py-4 rounded-xl text-sm"
        style={{ background: 'rgba(232,101,10,0.04)', border: '1px solid rgba(232,101,10,0.12)' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#E8650A' }}>
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
        </svg>
        <p style={{ color: '#5C5C5C' }}>
          Los archivos subidos reemplazan los existentes en el servidor. Para producción en Vercel, conecta un proveedor de almacenamiento en la nube.
        </p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Section Content
// ---------------------------------------------------------------------------
function SectionContent({
  section,
  token,
}: {
  section: MediaSection
  token: string
}) {
  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{section.icon}</span>
          <h1 className="text-2xl font-bold" style={{ color: '#1A1A1A', fontFamily: 'var(--font-display)' }}>
            {section.name}
          </h1>
        </div>
        <p className="text-sm" style={{ color: '#9A9A94' }}>
          {section.description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {section.files.map((file) => (
          <MediaCard key={file.id} file={file} token={token} />
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Mobile Sidebar Toggle
// ---------------------------------------------------------------------------
function MobileSidebar({
  sections,
  activeSection,
  onSelectSection,
  onLogout,
  isOpen,
  onClose,
}: {
  sections: MediaSection[]
  activeSection: string | null
  onSelectSection: (section: MediaSection) => void
  onLogout: () => void
  isOpen: boolean
  onClose: () => void
}) {
  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={onClose} />

      {/* Sidebar drawer */}
      <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
        <Sidebar
          sections={sections}
          activeSection={activeSection}
          onSelectSection={(section) => {
            onSelectSection(section)
            onClose()
          }}
          onLogout={onLogout}
        />
      </div>
    </>
  )
}

// ---------------------------------------------------------------------------
// Root Admin Page
// ---------------------------------------------------------------------------
export default function AdminPage() {
  const [view, setView] = useState<View>('login')
  const [token, setToken] = useState<string | null>(null)
  const [currentSection, setCurrentSection] = useState<MediaSection | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const stored = sessionStorage.getItem('wiger-admin-token')
    if (stored) {
      setToken(stored)
      setView('dashboard')
    }
  }, [])

  const handleLogin = (tok: string) => {
    setToken(tok)
    setView('dashboard')
  }

  const handleLogout = () => {
    sessionStorage.removeItem('wiger-admin-token')
    setToken(null)
    setCurrentSection(null)
    setView('login')
  }

  const handleSelectSection = (section: MediaSection | null) => {
    if (section === null) {
      setCurrentSection(null)
      setView('dashboard')
    } else {
      setCurrentSection(section)
      setView('section')
    }
  }

  if (view === 'login') {
    return <LoginView onLogin={handleLogin} />
  }

  return (
    <div className="flex min-h-screen" style={{ background: '#FAFAF7' }}>
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          sections={mediaSections}
          activeSection={currentSection?.id ?? null}
          onSelectSection={handleSelectSection}
          onLogout={handleLogout}
        />
      </div>

      {/* Mobile sidebar */}
      <MobileSidebar
        sections={mediaSections}
        activeSection={currentSection?.id ?? null}
        onSelectSection={handleSelectSection}
        onLogout={handleLogout}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Mobile top bar */}
        <div className="lg:hidden sticky top-0 z-30 px-4 py-3 flex items-center gap-3" style={{ background: '#FFFFFF', borderBottom: '1px solid #E8E8E2' }}>
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-lg hover:bg-[#F4F3EF] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#1A1A1A" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <Image src="/wiger-logo.png" alt="Wiger AI" width={100} height={28} className="h-6 w-auto object-contain" />
          <span className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: '#9A9A94' }}>Admin</span>
        </div>

        {/* Content area */}
        <main className="p-6 lg:p-10 max-w-6xl">
          {view === 'section' && currentSection && token ? (
            <SectionContent section={currentSection} token={token} />
          ) : (
            <DashboardContent onSelectSection={handleSelectSection} />
          )}
        </main>
      </div>
    </div>
  )
}
