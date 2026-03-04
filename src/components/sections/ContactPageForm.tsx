'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'

interface FormData {
  name: string
  email: string
  company: string
  role: string
  phone: string
  companySize: string
  industry: string
  howHeard: string
  message: string
}

const companySizes = [
  { value: '', label: 'Seleccionar tamaño' },
  { value: '1-10', label: '1 – 10 empleados' },
  { value: '11-50', label: '11 – 50 empleados' },
  { value: '51-200', label: '51 – 200 empleados' },
  { value: '201-500', label: '201 – 500 empleados' },
  { value: '+500', label: 'Más de 500 empleados' },
]

const industries = [
  { value: '', label: 'Seleccionar industria' },
  { value: 'Manufactura', label: 'Manufactura' },
  { value: 'Distribución', label: 'Distribución' },
  { value: 'Retail', label: 'Retail' },
  { value: 'Logística', label: 'Logística' },
  { value: 'Tecnología', label: 'Tecnología' },
  { value: 'Otro', label: 'Otro' },
]

const howHeardOptions = [
  { value: '', label: 'Seleccionar opción' },
  { value: 'LinkedIn', label: 'LinkedIn' },
  { value: 'Google', label: 'Google' },
  { value: 'Referido', label: 'Referido / Recomendación' },
  { value: 'Evento', label: 'Evento o conferencia' },
  { value: 'Otro', label: 'Otro' },
]

const empty: FormData = {
  name: '',
  email: '',
  company: '',
  role: '',
  phone: '',
  companySize: '',
  industry: '',
  howHeard: '',
  message: '',
}

export function ContactPageForm() {
  const [form, setForm] = useState<FormData>(empty)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          role: form.role,
          phone: form.phone || undefined,
          companySize: form.companySize,
          industry: form.industry,
          howHeard: form.howHeard || undefined,
          message: form.message,
          source: 'contact-page',
        }),
      })

      if (res.ok) {
        setStatus('success')
        setForm(empty)
      } else {
        const data = await res.json()
        setStatus('error')
        setErrorMsg(data.error ?? 'Algo salió mal. Intenta de nuevo.')
      }
    } catch {
      setStatus('error')
      setErrorMsg('Error de conexión. Intenta de nuevo.')
    }
  }

  const inputClass = `
    w-full rounded-lg px-4 py-3 text-sm transition-all duration-200 outline-none
    bg-[#F3F0EA] border border-[rgba(0,0,0,0.08)] text-[#1A1410] placeholder-[#BEB0A8]
    focus:border-[#E8650A] focus:bg-[#FFF8F2] focus:ring-1 focus:ring-[#E8650A]/30
  `
  const labelClass = 'block text-xs font-semibold uppercase tracking-[0.1em] mb-1.5 text-[#5A4E46]'

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(232,101,10,0.12)' }}>
          <CheckCircle className="w-8 h-8" style={{ color: '#E8650A' }} />
        </div>
        <h3 className="text-2xl font-bold text-[#1A1410]">¡Mensaje enviado!</h3>
        <p className="text-[#8C7D74] max-w-sm">
          Nuestro equipo de ventas se pondrá en contacto contigo en menos de 24 horas.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm font-semibold underline underline-offset-2"
          style={{ color: '#E8650A' }}
        >
          Enviar otro mensaje
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Row 1: Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className={labelClass}>Nombre <span style={{ color: '#E8650A' }}>*</span></label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="María García"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>Correo empresarial <span style={{ color: '#E8650A' }}>*</span></label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="maria@empresa.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* Row 2: Company + Role */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="company" className={labelClass}>Empresa <span style={{ color: '#E8650A' }}>*</span></label>
          <input
            id="company"
            name="company"
            type="text"
            required
            value={form.company}
            onChange={handleChange}
            placeholder="Aceros del Norte S.A."
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="role" className={labelClass}>Cargo / Puesto <span style={{ color: '#E8650A' }}>*</span></label>
          <input
            id="role"
            name="role"
            type="text"
            required
            value={form.role}
            onChange={handleChange}
            placeholder="Director de Operaciones"
            className={inputClass}
          />
        </div>
      </div>

      {/* Row 3: Phone + Company size */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className={labelClass}>Teléfono</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+52 55 1234 5678"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="companySize" className={labelClass}>Tamaño de empresa <span style={{ color: '#E8650A' }}>*</span></label>
          <select
            id="companySize"
            name="companySize"
            required
            value={form.companySize}
            onChange={handleChange}
            className={inputClass}
            style={{ appearance: 'none', backgroundImage: 'none' }}
          >
            {companySizes.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ''} style={{ backgroundColor: '#FFFFFF' }}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 4: Industry + How heard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="industry" className={labelClass}>Industria <span style={{ color: '#E8650A' }}>*</span></label>
          <select
            id="industry"
            name="industry"
            required
            value={form.industry}
            onChange={handleChange}
            className={inputClass}
            style={{ appearance: 'none', backgroundImage: 'none' }}
          >
            {industries.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ''} style={{ backgroundColor: '#FFFFFF' }}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="howHeard" className={labelClass}>¿Cómo nos conociste?</label>
          <select
            id="howHeard"
            name="howHeard"
            value={form.howHeard}
            onChange={handleChange}
            className={inputClass}
            style={{ appearance: 'none', backgroundImage: 'none' }}
          >
            {howHeardOptions.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.value === ''} style={{ backgroundColor: '#FFFFFF' }}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={labelClass}>Mensaje <span style={{ color: '#E8650A' }}>*</span></label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={form.message}
          onChange={handleChange}
          placeholder="Cuéntanos sobre tu empresa y qué reto quieres resolver..."
          className={inputClass}
          style={{ resize: 'vertical' }}
        />
      </div>

      {/* Error */}
      {status === 'error' && (
        <div className="flex items-center gap-3 rounded-lg px-4 py-3" style={{ backgroundColor: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}>
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <p className="text-sm text-red-400">{errorMsg}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
        style={{ backgroundColor: '#E8650A', color: '#fff' }}
        onMouseEnter={(e) => { if (status !== 'loading') e.currentTarget.style.backgroundColor = '#D4590A' }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#E8650A' }}
      >
        {status === 'loading' ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Enviando...
          </>
        ) : (
          <>
            Enviar mensaje
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>

      <p className="text-center text-xs" style={{ color: 'rgba(0,0,0,0.45)' }}>
        Sin compromiso · Respondemos en menos de 24 h
      </p>
    </form>
  )
}
