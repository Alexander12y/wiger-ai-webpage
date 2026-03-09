'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'

function AnimatedNumber({ target, suffix, isVisible }: { target: string; suffix: string; isVisible: boolean }) {
  const [display, setDisplay] = useState('0')
  const num = parseInt(target)

  useEffect(() => {
    if (!isVisible) return

    const duration = 1500
    const steps = 40
    const stepDuration = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current++
      const progress = current / steps
      const eased = 1 - Math.pow(1 - progress, 3)
      const val = Math.round(num * eased)
      setDisplay(val.toString())

      if (current >= steps) {
        clearInterval(timer)
        setDisplay(target)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isVisible, num, target])

  return (
    <span>
      {display}
      <span style={{ color: 'var(--color-accent)' }}>{suffix}</span>
    </span>
  )
}

export function MetricsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const t = useTranslations('metrics')

  const metrics = [
    { value: '40', suffix: '%*', label: t('efficiency.label'), description: t('efficiency.description') },
    { value: '3', suffix: 'x*', label: t('roi.label'), description: t('roi.description') },
    { value: '99.9', suffix: '%', label: t('sla.label'), description: t('sla.description') },
    { value: '4', suffix: ' sem', label: t('implementation.label'), description: t('implementation.description') },
  ]

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        entry.target.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))
      }
    })
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, { threshold: 0.2 })
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [handleIntersect])

  return (
    <section
      ref={sectionRef}
      id="marketing"
      className="relative py-24 lg:py-32 px-6 sm:px-8 lg:px-12 overflow-hidden"
      style={{
        backgroundColor: 'var(--color-surface-subtle)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="reveal mb-16 lg:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-8" style={{ backgroundColor: 'var(--color-accent)' }} />
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
              >
                {t('eyebrow')}
              </span>
            </div>
            <h2
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {t('heading')}{' '}
              <span style={{ color: 'var(--color-accent)' }}>
                {t('headingAccent')}
              </span>
            </h2>
          </div>
          <p
            className="text-base max-w-sm leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{ backgroundColor: 'var(--color-border)' }}
        >
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`reveal reveal-delay-${index + 1} p-8 lg:p-10 transition-colors duration-300`}
              style={{ backgroundColor: 'var(--color-surface-card)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-surface-elevated)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-surface-card)'
              }}
            >
              <p
                className="font-display text-5xl lg:text-6xl font-extrabold mb-3 tabular-nums"
                style={{ color: 'var(--color-text-primary)' }}
              >
                <AnimatedNumber
                  target={metric.value}
                  suffix={metric.suffix}
                  isVisible={isVisible}
                />
              </p>
              <p
                className="text-sm font-semibold uppercase tracking-wider mb-3"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {metric.label}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
