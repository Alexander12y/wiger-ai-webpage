'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
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
      { threshold: 0.15 }
    )

    const elements = sectionRef.current?.querySelectorAll('.reveal')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-28 lg:py-36 px-6 sm:px-8 lg:px-12 overflow-hidden noise-overlay"
      style={{ backgroundColor: 'var(--color-surface-page)' }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 grid-pattern opacity-15" />

      {/* Accent glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(232, 101, 10, 0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10 text-center">
        {/* Eyebrow */}
        <div className="reveal flex items-center justify-center gap-3 mb-8">
          <div className="h-[2px] w-8" style={{ backgroundColor: 'var(--color-accent)' }} />
          <span
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
          >
            Comienza hoy
          </span>
          <div className="h-[2px] w-8" style={{ backgroundColor: 'var(--color-accent)' }} />
        </div>

        {/* Heading */}
        <h2
          className="reveal reveal-delay-1 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight max-w-4xl mx-auto"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Tu competencia{' '}
          <br className="hidden sm:block" />
          ya está{' '}
          <span style={{ color: 'var(--color-accent)' }}>
            evolucionando.
          </span>
        </h2>

        <p
          className="reveal reveal-delay-2 mt-6 text-base sm:text-lg max-w-lg mx-auto leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          Agenda una demo personalizada y descubre cómo Wiger
          transforma operaciones industriales en semanas, no meses.
        </p>

        {/* CTAs */}
        <div className="reveal reveal-delay-3 flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <button className="btn-accent group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl font-semibold text-lg">
            Agendar demo gratuita
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <button className="btn-outline-light inline-flex items-center justify-center gap-3 px-10 py-5 rounded-xl font-semibold text-lg">
            Hablar con ventas
          </button>
        </div>

        {/* Trust note */}
        <p
          className="reveal reveal-delay-4 mt-8 text-xs"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Sin compromiso. Implementación en 4 semanas. Soporte 24/7.
        </p>
      </div>
    </section>
  )
}
