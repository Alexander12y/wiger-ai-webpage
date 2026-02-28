'use client'

import { useState, useId } from 'react'

interface FormState {
  status: 'idle' | 'submitting' | 'success' | 'error'
  message?: string
}

export default function ContactSection() {
  const formId = useId()
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', message: '' })
  const [formState, setFormState] = useState<FormState>({ status: 'idle' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState({ status: 'submitting' })

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'footer' }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        setFormState({ status: 'success' })
        setForm({ name: '', email: '', company: '', phone: '', message: '' })
      } else if (res.status === 429) {
        setFormState({ status: 'error', message: data.error })
      } else if (res.status === 422) {
        setFormState({ status: 'error', message: 'Por favor revisa los datos ingresados.' })
      } else {
        setFormState({ status: 'error', message: 'Error al enviar el mensaje. Intenta de nuevo.' })
      }
    } catch {
      setFormState({ status: 'error', message: 'Error de conexión. Intenta de nuevo.' })
    }
  }

  const inputBase: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.12)',
    borderRadius: '0.75rem',
    padding: '0.75rem 1rem',
    color: '#F1EEE9',
    fontSize: '0.875rem',
    outline: 'none',
    transition: 'border-color 0.15s',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.375rem',
    color: '#94A3B8',
  }

  return (
    <section id="contacto" style={{ background: '#0E1C2F' }} className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4"
            style={{
              background: 'rgba(232,101,10,0.15)',
              color: '#E8650A',
              border: '1px solid rgba(232,101,10,0.3)',
            }}
          >
            Contacto
          </span>
          <h2 className="text-3xl font-bold mb-3" style={{ color: '#F1EEE9' }}>
            ¿Listo para comenzar?
          </h2>
          <p className="text-base" style={{ color: '#94A3B8' }}>
            Cuéntanos sobre tu empresa y te contactaremos a la brevedad.
          </p>
        </div>

        {formState.status === 'success' ? (
          <div
            className="text-center py-16 px-8 rounded-2xl"
            style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.25)' }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ background: 'rgba(34,197,94,0.15)' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7"
                style={{ color: '#86EFAC' }}
              >
                <path
                  fillRule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2" style={{ color: '#F1EEE9' }}>
              ¡Mensaje enviado!
            </h3>
            <p style={{ color: '#94A3B8' }}>
              Gracias por contactarnos. Te responderemos pronto.
            </p>
          </div>
        ) : (
          <form
            id={formId}
            onSubmit={handleSubmit}
            className="rounded-2xl p-8 flex flex-col gap-5"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {/* Row: name + email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor={`${formId}-name`} style={labelStyle}>
                  Nombre *
                </label>
                <input
                  id={`${formId}-name`}
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Juan García"
                  style={inputBase}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#E8650A')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                />
              </div>
              <div>
                <label htmlFor={`${formId}-email`} style={labelStyle}>
                  Correo *
                </label>
                <input
                  id={`${formId}-email`}
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="juan@empresa.com"
                  style={inputBase}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#E8650A')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                />
              </div>
            </div>

            {/* Row: company + phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor={`${formId}-company`} style={labelStyle}>
                  Empresa
                </label>
                <input
                  id={`${formId}-company`}
                  name="company"
                  type="text"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Industrias XYZ"
                  style={inputBase}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#E8650A')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                />
              </div>
              <div>
                <label htmlFor={`${formId}-phone`} style={labelStyle}>
                  Teléfono
                </label>
                <input
                  id={`${formId}-phone`}
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+52 55 1234 5678"
                  style={inputBase}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#E8650A')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor={`${formId}-message`} style={labelStyle}>
                Mensaje *
              </label>
              <textarea
                id={`${formId}-message`}
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Cuéntanos sobre tu empresa, el área en que necesitas ayuda y cualquier detalle relevante..."
                style={{ ...inputBase, resize: 'vertical', minHeight: '120px' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#E8650A')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)')}
              />
            </div>

            {/* Error message */}
            {formState.status === 'error' && (
              <div
                className="flex items-start gap-2 px-4 py-3 rounded-xl text-sm"
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
                  className="w-4 h-4 flex-shrink-0 mt-0.5"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
                {formState.message ?? 'Error al enviar el mensaje.'}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={formState.status === 'submitting'}
              className="w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200 disabled:opacity-60"
              style={{ background: '#E8650A', color: '#FFFFFF' }}
              onMouseEnter={(e) => {
                if (formState.status !== 'submitting')
                  e.currentTarget.style.background = '#C8520A'
              }}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#E8650A')}
            >
              {formState.status === 'submitting' ? (
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
                  Enviando…
                </span>
              ) : (
                'Enviar mensaje'
              )}
            </button>

            <p className="text-center text-xs" style={{ color: '#4A6080' }}>
              Al enviar aceptas que nos comuniquemos contigo sobre tu consulta.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
