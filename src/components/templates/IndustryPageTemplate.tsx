'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
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
  const t = useTranslations('industry')
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Left — Text */}
          <div>
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
              className="reveal reveal-delay-1 font-display text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] mb-6"
              style={{ color: 'var(--color-text-on-dark)' }}
            >
              {data.hero.headline}{' '}
              {data.hero.headlineAccent && (
                <span
                  className="relative inline-block"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {data.hero.headlineAccent}
                  <span
                    className="absolute -bottom-2 left-0 w-full h-[3px] origin-left"
                    style={{
                      background: 'linear-gradient(90deg, var(--color-accent), transparent)',
                      animation: 'lineGrow 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards',
                      transform: 'scaleX(0)',
                    }}
                  />
                </span>
              )}
            </h1>

            {/* Subheadline */}
            <p
              className="reveal reveal-delay-2 text-xl sm:text-2xl leading-relaxed mb-10"
              style={{ color: 'var(--color-text-on-dark-secondary)' }}
            >
              {data.hero.subheadline}
            </p>

            {/* CTAs */}
            <div className="reveal reveal-delay-3 flex flex-wrap gap-4">
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
                {t('viewSolutions')}
              </a>
            </div>
          </div>

          {/* Right — Hero image */}
          <div className="reveal reveal-delay-2 flex items-center justify-center">
            {data.heroImage ? (
              <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden">
                <Image
                  src={data.heroImage}
                  alt={data.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            ) : (
              <div
                className="w-full aspect-[4/3] rounded-2xl flex flex-col items-center justify-center"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '2px dashed rgba(255,255,255,0.15)',
                }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
                <span
                  className="mt-3 text-xs font-mono uppercase tracking-wider"
                  style={{ color: 'rgba(255,255,255,0.25)' }}
                >
                  Hero image
                </span>
              </div>
            )}
          </div>
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
                className="font-sans text-4xl font-bold mb-1"
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
  const t = useTranslations('industry')
  return (
    <section
      id="retos"
      className="py-24 sm:py-32"
      style={{ background: 'var(--color-surface-page)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-16">
          <Eyebrow>{t('challengesEyebrow')}</Eyebrow>
          <h2
            className="font-display text-4xl sm:text-5xl font-normal leading-tight max-w-2xl"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {data.challengesHeading}
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
                className="font-display text-lg font-normal mb-3"
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
  const t = useTranslations('industry')
  return (
    <section
      id="segmentos"
      className="py-24 sm:py-32"
      style={{ background: 'var(--color-surface-section)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-16">
          <Eyebrow>{t('segmentsEyebrow')}</Eyebrow>
          <h2
            className="font-display text-4xl sm:text-5xl font-normal leading-tight max-w-2xl"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {data.segmentsHeading}
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
  const t = useTranslations('industry')
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
              {t('solutionsEyebrow')}
            </span>
          </div>
          <h2
            className="font-display text-4xl sm:text-5xl font-normal leading-tight max-w-2xl"
            style={{ color: 'var(--color-text-on-dark)' }}
          >
            {data.solutionsHeading}
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
                className="font-display text-xl font-normal mb-3"
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

function IndustryMetricsSection({ data }: { data: IndustryPageData }) {
  const t = useTranslations('industry')
  return (
    <section
      id="metricas"
      className="py-24 sm:py-32"
      style={{ background: 'var(--color-surface-section)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-16 text-center">
          <Eyebrow>{t('metricsEyebrow')}</Eyebrow>
          <h2
            className="font-display text-4xl sm:text-5xl font-normal leading-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {data.metricsHeading}
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {data.metrics.map((m, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${Math.min(i + 1, 6)} text-center`}
            >
              <div
                className="font-sans text-5xl sm:text-6xl font-bold mb-2"
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
  const t = useTranslations('industry')
  return (
    <section
      id="casos"
      className="py-24 sm:py-32"
      style={{ background: 'var(--color-surface-page)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-16">
          <Eyebrow>{t('caseStudiesEyebrow')}</Eyebrow>
          <h2
            className="font-display text-4xl sm:text-5xl font-normal leading-tight max-w-2xl"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {data.caseStudiesHeading}
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
  const t = useTranslations('industry')
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section
      id="faq"
      className="py-24 sm:py-32"
      style={{ background: 'var(--color-surface-section)' }}
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="reveal mb-16 text-center">
          <Eyebrow>{t('faqEyebrow')}</Eyebrow>
          <h2
            className="font-display text-4xl sm:text-5xl font-normal leading-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {data.faqHeading}
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
  const t = useTranslations('industry')
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
            <Eyebrow>{t('ctaEyebrow')}</Eyebrow>
          </div>
          <h2
            className="font-display text-4xl sm:text-5xl font-normal mb-6"
            style={{ color: 'var(--color-text-on-dark)' }}
          >
            {data.ctaHeading}
          </h2>
          <p
            className="text-lg mb-10"
            style={{ color: 'var(--color-text-on-dark-secondary)' }}
          >
            {data.ctaText}
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
      <IndustryMetricsSection data={data} />
      <CaseStudiesSection data={data} />
      <FaqSection data={data} />
      <CtaBanner data={data} />
      <Footer />
    </SmoothScrollProvider>
  )
}
