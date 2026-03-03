'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight, Play } from 'lucide-react'
import Link from 'next/link'
import Script from 'next/script'

export function HeroSection() {
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

    const elements = sectionRef.current?.querySelectorAll('.reveal')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 z-[1]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlay — heavier on left for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, rgba(6,14,26,0.92) 0%, rgba(6,14,26,0.80) 45%, rgba(6,14,26,0.55) 100%)',
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 z-[2] grid-pattern opacity-40" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[70vh]">
          {/* Left — Typography */}
          <div className="lg:col-span-6 space-y-8">
            {/* Eyebrow */}
            <div className="reveal reveal-delay-1 flex items-center gap-3">
              <div className="h-[2px] w-8" style={{ backgroundColor: 'var(--color-accent)' }} />
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase font-mono"
                style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
              >
                Digital Platform
              </span>
            </div>

            {/* Main heading */}
            <h1 className="reveal reveal-delay-2 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight">
              <span style={{ color: 'var(--color-text-primary)' }}>
                Empresas
              </span>
              <br />
              <span style={{ color: 'var(--color-text-primary)' }}>
                autónomas en la{' '}
              </span>
              <br />
              <span
                className="relative inline-block"
                style={{ color: 'var(--color-accent)' }}
              >
                revolución de la AI.
                <span
                  className="absolute -bottom-2 left-0 w-full h-[3px] origin-left"
                  style={{
                    background: 'linear-gradient(90deg, var(--color-accent), transparent)',
                    animation: 'lineGrow 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards',
                    transform: 'scaleX(0)',
                  }}
                />
              </span>
            </h1>

            {/* Subtext */}
            <p
              className="reveal reveal-delay-3 text-base sm:text-lg lg:text-xl max-w-xl leading-relaxed"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              
              En un mundo siempre moviéndose para adelante, 
              con una revolución que cambiará la manera en que conocemos el mundo, 
              no podíamos permitirnos quedarnos quietos…
            </p>

            {/* CTA Group */}
            <div className="reveal reveal-delay-4 flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/contacto" className="btn-accent group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-base">
                Contáctanos
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                className="btn-outline-light inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-base"
                onClick={() => document.getElementById('hero-demo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="w-4 h-4" />
                Ver en acción
              </button>
            </div>

            {/* Trust metric */}
            <div className="reveal reveal-delay-5 flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                    style={{
                      borderColor: 'var(--color-surface-page)',
                      backgroundColor: 'var(--color-surface-elevated)',
                      color: 'var(--color-accent)',
                    }}
                  >
                    {['M', 'D', 'P', 'L'][i - 1]}
                  </div>
                ))}
              </div>
              <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                <span className="font-semibold" style={{ color: 'var(--color-text-secondary)' }}>
                  Empresas líderes
                </span>{' '}
                ya transforman su operación
              </p>
            </div>
          </div>

          {/* Right — Video card / visual element */}
          <div className="lg:col-span-6 reveal reveal-delay-3">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                backgroundColor: 'var(--color-surface-card)',
                boxShadow: 'var(--shadow-elevated)',
              }}
            >
              {/* Accent top bar */}
              <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, var(--color-accent), transparent)' }} />

              {/* Howdygo demo embed */}
              <Script src="https://js.howdygo.com/v1.2.1/index.js" strategy="afterInteractive" />
              <div
                id="hero-demo"
                style={{
                  position: 'relative',
                  width: '100%',
                  height: 0,
                  paddingBottom: 'calc(45.703125% + 40px)',
                }}
              >
                <iframe
                  id="howdygo-frame"
                  src="https://app.howdygo.com/embed/83d0b963-8904-47a4-9b41-e771bbca91d4"
                  frameBorder={0}
                  scrolling="no"
                  allow="clipboard-write; autoplay"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                />
              </div>

              {/* Bottom stats bar */}
              <div
                className="grid grid-cols-3 divide-x"
                style={{ borderTop: '1px solid var(--color-border)', divideColor: 'var(--color-border)' } as React.CSSProperties}
              >
                {[
                  { label: 'Eficiencia', value: '+40%' },
                  { label: 'Integración', value: '< 4 sem' },
                  { label: 'Soporte', value: '24/7' },
                ].map((stat) => (
                  <div key={stat.label} className="px-4 py-3 text-center" style={{ borderColor: 'var(--color-border)' }}>
                    <p className="text-sm font-bold font-display" style={{ color: 'var(--color-accent)' }}>
                      {stat.value}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 reveal reveal-delay-6">
        <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--color-text-muted)' }}>
          Scroll
        </span>
        <div className="w-px h-8" style={{ background: 'linear-gradient(180deg, var(--color-text-muted), transparent)' }} />
      </div>
    </section>
  )
}
