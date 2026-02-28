'use client'

import { useEffect, useRef } from 'react'

export function ClientLogosSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.2 }
    )
    const el = sectionRef.current?.querySelector('.animate-on-scroll')
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const clientLogos = [
    { id: 1, name: 'Cliente 1' },
    { id: 2, name: 'Cliente 2' },
    { id: 3, name: 'Cliente 3' },
    { id: 4, name: 'Cliente 4' },
    { id: 5, name: 'Cliente 5' },
    { id: 6, name: 'Cliente 6' },
  ]

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-20 px-6 relative overflow-hidden"
      style={{ background: 'var(--color-surface-page)' }}
    >
      <div className="max-w-7xl mx-auto animate-on-scroll">
        {/* Label */}
        <div className="text-center mb-10">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Respaldado por líderes en la industria
          </p>
        </div>

        {/* Logos — horizontal marquee on mobile, grid on desktop */}
        <div className="hidden md:grid grid-cols-6 gap-8 items-center">
          {clientLogos.map((logo) => (
            <div
              key={logo.id}
              className="h-16 rounded-xl flex items-center justify-center transition-all duration-300 hover:shadow-sm"
              style={{
                border: '1px solid var(--color-border)',
                background: 'var(--color-surface-card)',
              }}
            >
              <span
                className="font-semibold text-sm"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {logo.name}
              </span>
            </div>
          ))}
        </div>

        {/* Mobile marquee */}
        <div className="md:hidden overflow-hidden">
          <div className="marquee-track">
            {[...clientLogos, ...clientLogos].map((logo, i) => (
              <div
                key={`${logo.id}-${i}`}
                className="flex-shrink-0 h-14 px-8 mx-3 rounded-xl flex items-center justify-center"
                style={{
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-surface-card)',
                }}
              >
                <span
                  className="font-semibold text-sm whitespace-nowrap"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
