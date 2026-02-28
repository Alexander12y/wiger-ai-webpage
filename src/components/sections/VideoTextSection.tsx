'use client'

import { useEffect, useRef } from 'react'

const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Asistencia en tiempo real',
    desc: 'Guía inteligente para operarios directamente en piso de planta.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Optimización automática',
    desc: 'Procesos de manufactura mejorados con inteligencia artificial.',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    title: 'Integración completa',
    desc: 'Administración y producción conectadas en un solo flujo.',
  },
]

export function VideoTextSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.1 }
    )
    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 overflow-hidden"
      style={{ background: 'var(--color-surface-page)' }}
    >
      {/* Decorative corner accent */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] opacity-50"
        style={{
          background: 'radial-gradient(circle at top right, rgba(232,101,10,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left — Video */}
          <div className="animate-on-scroll order-2 lg:order-1">
            <div
              className="relative rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #0E1C2F 0%, #162438 60%, #1a2d42 100%)',
                boxShadow: 'var(--shadow-hero-video)',
              }}
            >
              {/* Amber top bar */}
              <div className="absolute top-0 left-0 right-0 h-1 z-10" style={{ background: '#E8650A' }} />

              <div className="aspect-video flex items-center justify-center min-h-[320px] lg:min-h-[420px]">
                <div className="text-center p-12">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 cursor-pointer transition-all duration-300 hover:scale-110"
                    style={{
                      border: '2px solid rgba(232,101,10,0.5)',
                      background: 'rgba(232,101,10,0.1)',
                    }}
                  >
                    <svg className="w-8 h-8 ml-1" fill="#E8650A" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2" style={{ color: '#F1EEE9' }}>Video Demo</h3>
                  <p className="text-sm" style={{ color: '#5A6E84' }}>Próximamente: Casos reales de implementación</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Text */}
          <div className="space-y-8 animate-on-scroll order-1 lg:order-2">
            {/* Section label */}
            <span
              className="inline-block text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: '#E8650A' }}
            >
              Impacto real
            </span>

            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Desde administrativos hasta{' '}
              <span style={{ color: '#E8650A' }}>piso de planta,</span>{' '}
              Wiger transforma tu operación
            </h2>

            <p
              className="text-base md:text-lg leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Nuestra plataforma no solo transforma los procesos administrativos,
              sino que también revoluciona el trabajo en planta. Desde la optimización
              de líneas de producción hasta la asistencia en tiempo real para operarios.
            </p>

            {/* Feature list */}
            <div className="space-y-5 pt-2">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 group-hover:bg-[rgba(232,101,10,0.12)]"
                    style={{
                      background: 'var(--color-surface-section)',
                      color: '#E8650A',
                    }}
                  >
                    {f.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-0.5" style={{ color: 'var(--color-text-primary)' }}>{f.title}</p>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button className="btn-accent group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm">
                Ver casos de éxito
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
