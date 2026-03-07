'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider'
import { Footer } from '@/components/Footer'
import { IndustryPageData } from '@/types/industry'

/* ── Helpers ─────────────────────────────────── */

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!els.length) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span
        className="inline-block w-8 h-0.5 rounded-full"
        style={{ background: 'var(--color-accent)' }}
      />
      <span
        className="text-xs font-mono font-semibold uppercase tracking-widest"
        style={{ color: 'var(--color-accent)' }}
      >
        {children}
      </span>
    </div>
  )
}

/* ── Section 1: Hero ─────────────────────────── */

function HeroSection({ data }: { data: IndustryPageData }) {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center grid-pattern-dark overflow-hidden"
      style={{ background: '#1C1208' }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(232,101,10,0.12) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-40 pb-24">
        {/* Eyebrow */}
        <div className="reveal flex items-center gap-3 mb-6">
          <span
            className="inline-block w-8 h-0.5 rounded-full"
            style={{ background: 'var(--color-accent)' }}
          />
          <span
            className="text-xs font-mono font-semibold uppercase tracking-widest"
            style={{ color: 'var(--color-accent)' }}
          >
            {data.name}
          </span>
        </div>

        {/* Headline */}
        <h1
          className="reveal reveal-delay-1 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 max-w-4xl"
          style={{ color: 'var(--color-text-on-dark)' }}
        >
          {data.hero.headline}
        </h1>

        {/* Subheadline */}
        <p
          className="reveal reveal-delay-2 text-xl sm:text-2xl leading-relaxed mb-10 max-w-2xl"
          style={{ color: 'var(--color-text-on-dark-secondary)' }}
        >
          {data.hero.subheadline}
        </p>

        {/* CTAs */}
        <div className="reveal reveal-delay-3 flex flex-wrap gap-4 mb-20">
          <Link
            href="/contacto"
            className="btn-accent inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base"
          >
            {data.hero.ctaLabel}
          </Link>
          <a
            href="#soluciones"
            className="btn-outline-light inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base"
            style={{
              border: '1.5px solid rgba(255,255,255,0.20)',
              color: 'var(--color-text-on-dark)',
            }}
          >
            Ver soluciones
          </a>
        </div>

        {/* Metric strip */}
        <div
          className="reveal reveal-delay-4 grid grid-cols-2 sm:grid-cols-4 gap-px"
          style={{
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          {data.metrics.map((m, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-8 px-4 text-center"
              style={{ background: 'rgba(255,255,255,0.03)' }}
            >
              <span
                className="font-display text-4xl font-bold mb-1"
                style={{ color: 'var(--color-accent)' }}
              >
                {m.value}
              </span>
              <span
                className="text-xs font-mono uppercase tracking-wider"
                style={{ color: 'var(--color-text-on-dark-muted)' }}
              >
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Section 2: Retos ────────────────────────── */

function ChallengesSection({ data }: { data: IndustryPageData }) {
  return (
    <section
      id="retos"
      className="py-24 sm:py-32"
      style={{ background: 'var(--color-surface-page)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-16">
          <Eyebrow>Retos de la industria</Eyebrow>
          <h2
            className="font-display text-4xl sm:text-5xl font-bold leading-tight max-w-2xl"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Lorem ipsum dolor sit amet consectetur
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.challenges.map((c, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${Math.min(i + 1, 6)} p-8 rounded-2xl`}
              style={{
                background: 'var(--color-surface-card)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <div
                className="text-3xl mb-5 w-12 h-12 flex items-center justify-center rounded-xl"
                style={{ background: 'var(--color-accent-light)' }}
              >
                {c.icon}
              </div>
              <h3
                className="font-display text-lg font-bold mb-3"
                style={{ color: 'var(--color-text-primary)' }}
              >
                {c.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {c.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Section 3: Segmentos ────────────────────── */

function SegmentsSection({ data }: { data: IndustryPageData }) {
  return (
    <section
      id="segmentos"
      className="py-24 sm:py-32"
      style={{ background: 'var(--color-surface-section)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-16">
          <Eyebrow>Segmentos de la industria</Eyebrow>
          <h2
            className="font-display text-4xl sm:text-5xl font-bold leading-tight max-w-2xl"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Lorem ipsum dolor sit amet consectetur
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.segments.map((s, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${Math.min(i + 1, 6)} p-6 rounded-xl`}
              style={{
                background: 'var(--color-surface-card)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="mt-1 w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: 'var(--color-accent)', marginTop: '7px' }}
                />
                <div>
                  <h3
                    className="font-semibold text-base mb-1.5"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {s.name}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--color-text-secondary)' }}
                  >
                    {s.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Section 4: Soluciones ───────────────────── */

function SolutionsSection({ data }: { data: IndustryPageData }) {
  return (
    <section
      id="soluciones"
      className="py-24 sm:py-32 grid-pattern-dark relative overflow-hidden"
      style={{ background: '#1C1208' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 80% 50%, rgba(232,101,10,0.08) 0%, transparent 70%)',
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span
              className="inline-block w-8 h-0.5 rounded-full"
              style={{ background: 'var(--color-accent)' }}
            />
            <span
              className="text-xs font-mono font-semibold uppercase tracking-widest"
              style={{ color: 'var(--color-accent)' }}
            >
              Soluciones a medida
            </span>
          </div>
          <h2
            className="font-display text-4xl sm:text-5xl font-bold leading-tight max-w-2xl"
            style={{ color: 'var(--color-text-on-dark)' }}
          >
            Lorem ipsum dolor sit amet consectetur
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {data.solutions.map((sol, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${Math.min(i + 1, 6)} p-8 rounded-2xl`}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: 'var(--color-border-on-dark)',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'rgba(255,255,255,0.08)',
              }}
            >
              <h3
                className="font-display text-xl font-bold mb-3"
                style={{ color: 'var(--color-text-on-dark)' }}
              >
                {sol.title}
              </h3>
              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: 'var(--color-text-on-dark-secondary)' }}
              >
                {sol.description}
              </p>
              <ul className="space-y-2.5">
                {sol.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: 'var(--color-accent)' }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: 'var(--color-text-on-dark-muted)' }}
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Section 5: Métricas ─────────────────────── */

function MetricsSection({ data }: { data: IndustryPageData }) {
  return (
    <section
      id="metricas"
      className="py-24 sm:py-32"
      style={{ background: 'var(--color-surface-section)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-16 text-center">
          <Eyebrow>Métricas de éxito</Eyebrow>
          <h2
            className="font-display text-4xl sm:text-5xl font-bold leading-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Lorem ipsum dolor sit amet
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {data.metrics.map((m, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${Math.min(i + 1, 6)} text-center`}
            >
              <div
                className="font-display text-5xl sm:text-6xl font-bold mb-2"
                style={{ color: 'var(--color-accent)' }}
              >
                {m.value}
              </div>
              <div
                className="text-sm font-medium uppercase tracking-wide"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Section 6: Casos de éxito ───────────────── */

function CaseStudiesSection({ data }: { data: IndustryPageData }) {
  return (
    <section
      id="casos"
      className="py-24 sm:py-32"
      style={{ background: 'var(--color-surface-page)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-16">
          <Eyebrow>Casos de éxito</Eyebrow>
          <h2
            className="font-display text-4xl sm:text-5xl font-bold leading-tight max-w-2xl"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Lorem ipsum dolor sit amet consectetur
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.caseStudies.map((cs, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${Math.min(i + 1, 6)} flex flex-col p-8 rounded-2xl`}
              style={{
                background: 'var(--color-surface-card)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              <p
                className="text-sm leading-relaxed flex-1 mb-6 italic"
                style={{ color: 'var(--color-text-secondary)' }}
              >
                &ldquo;{cs.quote}&rdquo;
              </p>
              <div
                className="pt-5"
                style={{ borderTop: '1px solid var(--color-border)' }}
              >
                <p
                  className="font-semibold text-sm"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {cs.company}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {cs.result}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Section 7: FAQ ──────────────────────────── */

function FaqSection({ data }: { data: IndustryPageData }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section
      id="faq"
      className="py-24 sm:py-32"
      style={{ background: 'var(--color-surface-section)' }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-16 text-center">
          <Eyebrow>Preguntas frecuentes</Eyebrow>
          <h2
            className="font-display text-4xl sm:text-5xl font-bold leading-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Lorem ipsum dolor sit amet
          </h2>
        </div>
        <div className="space-y-3">
          {data.faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className="reveal rounded-xl overflow-hidden"
                style={{
                  background: 'var(--color-surface-card)',
                  border: '1px solid var(--color-border)',
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-semibold text-base pr-4"
                    style={{ color: 'var(--color-text-primary)' }}
                  >
                    {faq.question}
                  </span>
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300"
                    style={{
                      background: isOpen ? 'var(--color-accent)' : 'var(--color-accent-light)',
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke={isOpen ? '#fff' : 'var(--color-accent)'}
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <line x1="6" y1="0" x2="6" y2="12" />
                      <line x1="0" y1="6" x2="12" y2="6" />
                    </svg>
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5">
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ── CTA Banner ──────────────────────────────── */

function CtaBanner({ data }: { data: IndustryPageData }) {
  return (
    <section
      className="py-24 relative overflow-hidden"
      style={{ background: '#1C1208' }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(232,101,10,0.14) 0%, transparent 70%)',
        }}
      />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="reveal">
          <div className="flex justify-center mb-4">
            <Eyebrow>Empieza hoy</Eyebrow>
          </div>
          <h2
            className="font-display text-4xl sm:text-5xl font-bold mb-6"
            style={{ color: 'var(--color-text-on-dark)' }}
          >
            Lorem ipsum dolor sit amet consectetur
          </h2>
          <p
            className="text-lg mb-10"
            style={{ color: 'var(--color-text-on-dark-secondary)' }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </p>
          <Link
            href="/contacto"
            className="btn-accent inline-flex items-center gap-2 px-10 py-4 rounded-full font-semibold text-base"
          >
            {data.hero.ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ── Root Template ───────────────────────────── */

export default function IndustryPageTemplate({ data }: { data: IndustryPageData }) {
  useReveal()

  return (
    <SmoothScrollProvider>
      <HeroSection data={data} />
      <ChallengesSection data={data} />
      <SegmentsSection data={data} />
      <SolutionsSection data={data} />
      <MetricsSection data={data} />
      <CaseStudiesSection data={data} />
      <FaqSection data={data} />
      <CtaBanner data={data} />
      <Footer />
    </SmoothScrollProvider>
  )
}
