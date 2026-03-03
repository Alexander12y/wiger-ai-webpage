import { ContactPageForm } from '@/components/sections/ContactPageForm'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'Contacto | Wiger AI',
  description: 'Ponte en contacto con el equipo de Wiger AI.',
}

export default function ContactoPage() {
  return (
    <main
      className="min-h-screen relative"
      style={{ backgroundColor: '#0E1C2F' }}
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      {/* Accent glow top-left */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 0% 0%, rgba(232,101,10,0.07) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-20">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm mb-12 transition-colors duration-200 hover:text-white/70"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — copy */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-8" style={{ backgroundColor: '#E8650A' }} />
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ color: '#E8650A', fontFamily: 'var(--font-geist-mono)' }}
              >
                Habla con ventas
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[0.95] tracking-tight text-white">
              Empieza tu{' '}
              <span style={{ color: '#E8650A' }}>
                transformación
              </span>{' '}
              hoy.
            </h1>

            <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.8)' }}>
              Completa el formulario y un especialista de Wiger AI se pondrá en contacto contigo en menos de 24 horas.
            </p>

            {/* Benefits list */}
            <ul className="space-y-4">
              {[
                'Sistema personalizada para tu industria',
                'Diagnóstico gratuito de tu operación',
                'Plan de implementación en 4 semanas',
                'Soporte dedicado 24/7',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold"
                    style={{ backgroundColor: 'rgba(232,101,10,0.15)', color: '#E8650A', border: '1px solid rgba(232,101,10,0.3)' }}
                  >
                    ✓
                  </span>
                  <span className="text-sm" style={{ color: 'rgba(255,255,255,0.85)' }}>{item}</span>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="h-px" style={{ background: 'linear-gradient(90deg, rgba(232,101,10,0.3), transparent)' }} />

            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {['M', 'D', 'P', 'L'].map((initial) => (
                  <div
                    key={initial}
                    className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                    style={{ borderColor: '#0E1C2F', backgroundColor: 'rgba(232,101,10,0.15)', color: '#E8650A' }}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.9)' }}>Empresas líderes</span>
                {' '}ya transforman su operación
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div
            className="rounded-2xl p-8 sm:p-10"
            style={{
              backgroundColor: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {/* Accent top bar */}
            <div className="h-[2px] -mx-8 sm:-mx-10 -mt-8 sm:-mt-10 mb-8 rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #E8650A, transparent)' }} />
            <ContactPageForm />
          </div>
        </div>
      </div>
    </main>
  )
}
