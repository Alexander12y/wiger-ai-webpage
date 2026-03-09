'use client'

import { useEffect, useRef } from 'react'
import { ArrowRight, Play } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Script from 'next/script'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('hero')
  const tc = useTranslations('common')

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
          poster="/videos/hero-poster.jpg"
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero-background.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, rgba(28,18,8,0.92) 0%, rgba(28,18,8,0.80) 45%, rgba(28,18,8,0.55) 100%)',
          }}
        />
      </div>

      <div className="absolute inset-0 z-[2] grid-pattern-dark opacity-40" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-h-[70vh]">
          {/* Left — Typography */}
          <div className="lg:col-span-6 space-y-8">
            <div className="reveal reveal-delay-1 flex items-center gap-3">
              <div className="h-[2px] w-8" style={{ backgroundColor: 'var(--color-accent)' }} />
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase font-mono"
                style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
              >
                {t('eyebrow')}
              </span>
            </div>

            <h1 className="reveal reveal-delay-2 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[0.95] tracking-tight">
              <span style={{ color: 'var(--color-text-on-dark)' }}>
                {t('headingLine1')}
              </span>
              <br />
              <span style={{ color: 'var(--color-text-on-dark)' }}>
                {t('headingLine2')}{' '}
              </span>
              <br />
              <span
                className="relative inline-block"
                style={{ color: 'var(--color-accent)' }}
              >
                {t('headingLine3')}
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

            <p
              className="reveal reveal-delay-3 text-base sm:text-lg lg:text-xl max-w-xl leading-relaxed"
              style={{ color: 'var(--color-text-on-dark-secondary)' }}
            >
              {t('subtext')}
            </p>

            <div className="reveal reveal-delay-4 flex flex-col sm:flex-row gap-4 pt-2">
              <Link href="/contacto" className="btn-accent group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-base">
                {t('ctaPrimary')}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
              <button
                className="btn-outline-light inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl font-semibold text-base"
                style={{ borderColor: 'rgba(240,237,232,0.30)', color: '#F0EDE8' }}
                onClick={() => document.getElementById('hero-demo')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Play className="w-4 h-4" />
                {t('ctaSecondary')}
              </button>
            </div>

            <div className="reveal reveal-delay-5 flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                    style={{
                      borderColor: 'var(--color-surface-dark)',
                      backgroundColor: 'var(--color-surface-dark-card)',
                      color: 'var(--color-accent)',
                    }}
                  >
                    {['M', 'D', 'P', 'L'][i - 1]}
                  </div>
                ))}
              </div>
              <p className="text-sm" style={{ color: 'var(--color-text-on-dark-muted)' }}>
                <span className="font-semibold" style={{ color: 'rgba(240,237,232,0.70)' }}>
                  {t('trustMetricBold')}
                </span>{' '}
                {t('trustMetricText')}
              </p>
            </div>
          </div>

          {/* Right — Video card */}
          <div className="lg:col-span-6 reveal reveal-delay-3">
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                backgroundColor: 'var(--color-surface-dark-card)',
                boxShadow: 'var(--shadow-elevated)',
              }}
            >
              <div className="h-[2px]" style={{ background: 'linear-gradient(90deg, var(--color-accent), transparent)' }} />

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

              <div
                className="grid grid-cols-3 divide-x"
                style={{ borderTop: '1px solid var(--color-border-on-dark)', divideColor: 'var(--color-border-on-dark)' } as React.CSSProperties}
              >
                {[
                  { label: t('statEfficiency'), value: t('statEfficiencyValue') },
                  { label: t('statIntegration'), value: t('statIntegrationValue') },
                  { label: t('statSupport'), value: t('statSupportValue') },
                ].map((stat) => (
                  <div key={stat.label} className="px-4 py-3 text-center" style={{ borderColor: 'var(--color-border-on-dark)' }}>
                    <p className="text-sm font-bold font-display" style={{ color: 'var(--color-accent)' }}>
                      {stat.value}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: 'var(--color-text-on-dark-muted)' }}>
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
        <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--color-text-on-dark-muted)' }}>
          {tc('scroll')}
        </span>
        <div className="w-px h-8" style={{ background: 'linear-gradient(180deg, rgba(240,237,232,0.45), transparent)' }} />
      </div>
    </section>
  )
}
