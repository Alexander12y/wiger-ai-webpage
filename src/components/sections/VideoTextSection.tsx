'use client'

import { useEffect, useRef } from 'react'

export function VideoTextSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
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
      className="min-h-screen bg-[#0E1C2F] py-20 px-6 flex items-center relative overflow-hidden"
    >
      {/* Amber left-edge accent */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-accent)] opacity-80" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Text — left side */}
          <div className="lg:col-span-2 space-y-8 animate-on-scroll">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Desde administrativos hasta{' '}
                <span className="text-[var(--color-accent)]">
                  piso de planta
                </span>{' '}
                Wiger transforma tu operación
              </h2>

              <p className="text-base md:text-lg text-[var(--color-text-on-dark-muted)] leading-relaxed">
                Nuestra plataforma no solo transforma los procesos administrativos,
                sino que también revoluciona el trabajo en planta. Desde la optimización de líneas de producción
                hasta la asistencia en tiempo real para operarios, Wiger se convierte en el aliado perfecto
                para cada nivel de tu organización.
              </p>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <span className="mt-1.5 w-4 h-[2px] bg-[var(--color-accent)] flex-shrink-0" />
                  <span className="text-[var(--color-text-on-dark-muted)] text-sm md:text-base">Asistencia inteligente para operarios en tiempo real</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="mt-1.5 w-4 h-[2px] bg-[var(--color-accent)] flex-shrink-0" />
                  <span className="text-[var(--color-text-on-dark-muted)] text-sm md:text-base">Optimización automática de procesos de manufactura</span>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="mt-1.5 w-4 h-[2px] bg-[var(--color-accent)] flex-shrink-0" />
                  <span className="text-[var(--color-text-on-dark-muted)] text-sm md:text-base">Integración perfecta entre administración y producción</span>
                </div>
              </div>
            </div>

            <button className="btn-accent group inline-flex items-center px-6 py-3 rounded-xl font-semibold">
              Ver casos de éxito
              <svg
                className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Video placeholder — right side */}
          <div className="lg:col-span-3 animate-on-scroll">
            <div className="relative bg-[#162438] rounded-3xl overflow-hidden shadow-2xl">
              {/* Amber top edge */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--color-accent)]" />

              <div className="aspect-video flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
                <div className="text-center p-12">
                  {/* Play button */}
                  <div className="w-20 h-20 rounded-full border-2 border-[var(--color-accent)] flex items-center justify-center mx-auto mb-6 hover:bg-[var(--color-accent)] transition-colors duration-200 cursor-pointer group/play">
                    <svg
                      className="w-8 h-8 text-[var(--color-accent)] group-hover/play:text-white transition-colors duration-200 ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[var(--color-text-on-dark)]">Video Demo</h3>
                  <p className="text-[var(--color-text-on-dark-muted)] text-sm">Próximamente: Casos reales de implementación</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
