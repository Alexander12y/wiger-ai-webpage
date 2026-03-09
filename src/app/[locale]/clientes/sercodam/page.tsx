import { getTranslations, setRequestLocale } from 'next-intl/server'
import type { Metadata } from 'next'
import { Link } from '@/i18n/navigation'
import { Footer } from '@/components/Footer'

const EMBED_URL = 'https://app.howdygo.com/embed/83d0b963-8904-47a4-9b41-e771bbca91d4'

function IconClock() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2.5" />
    </svg>
  )
}

function IconBox() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="m3.3 7 8.7 5 8.7-5" />
      <path d="M12 22V12" />
    </svg>
  )
}

function IconZap() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'sercodam' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function SercodamCaseStudy({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'sercodam' })
  const tc = await getTranslations({ locale, namespace: 'common' })

  const metrics = [
    { stat: t('metricTimeValue'), label: t('metricTime'), Icon: IconClock },
    { stat: t('metricInventoryValue'), label: t('metricInventory'), Icon: IconBox },
    { stat: t('metricImplementationValue'), label: t('metricImplementation'), Icon: IconZap },
  ]

  return (
    <>
      <main style={{ background: 'var(--color-surface-page)', minHeight: '100vh' }}>
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section
          className="pt-40 pb-20 px-6 lg:px-8"
          style={{
            background: 'linear-gradient(180deg, #FAF8F5 0%, #F3F0EA 100%)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div className="max-w-4xl mx-auto">
            <Link
              href="/clientes"
              className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-opacity duration-200 hover:opacity-60"
              style={{ color: 'var(--color-text-muted)' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
              </svg>
              {t('backLink')}
            </Link>

            <div className="mb-8">
              <span
                className="inline-block text-xs font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full"
                style={{
                  background: 'rgba(232,101,10,0.10)',
                  color: '#E8650A',
                  border: '1px solid rgba(232,101,10,0.25)',
                }}
              >
                {t('badge')}
              </span>
            </div>

            <div
              className="inline-flex items-center justify-center rounded-2xl px-7 py-4 mb-6"
              style={{
                background: 'var(--color-surface-card)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/LOGO SERCODAM.png"
                alt="Sercodam Redes y Piolas"
                style={{ height: '48px', maxWidth: '200px', objectFit: 'contain' }}
              />
            </div>

            <h1
              className="text-4xl md:text-5xl font-bold leading-tight mb-5"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {t('clientName')}
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed max-w-2xl"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {t('subtitle')}
            </p>
          </div>
        </section>

        {/* ── MÉTRICAS ─────────────────────────────────────────────────── */}
        <section
          className="py-16 px-6 lg:px-8"
          style={{ borderBottom: '1px solid var(--color-border)' }}
        >
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5">
            {metrics.map(({ stat, label, Icon }) => (
              <div
                key={label}
                className="flex flex-col"
                style={{
                  background: 'var(--color-surface-card)',
                  border: '1px solid var(--color-border)',
                  borderTop: '2.5px solid var(--color-accent)',
                  borderRadius: '14px',
                  padding: '28px 26px 26px',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <span style={{ color: 'var(--color-accent)', marginBottom: '14px', display: 'block' }}>
                  <Icon />
                </span>
                <p style={{ fontSize: '2.25rem', fontWeight: '700', color: 'var(--color-text-primary)', lineHeight: '1.05', letterSpacing: '-0.02em', marginBottom: '8px', fontFamily: 'var(--font-sans)' }}>
                  {stat}
                </p>
                <p style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── EL RETO ──────────────────────────────────────────────────── */}
        <section
          className="py-16 px-6 lg:px-8"
          style={{ background: 'var(--color-surface-section)', borderBottom: '1px solid var(--color-border)' }}
        >
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
                {t('challengeEyebrow')}
              </p>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                {t('challengeTitle')}
              </h2>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-4">
              <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {t('challengeText1')}
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {t('challengeText2')}
              </p>
            </div>
          </div>
        </section>

        {/* ── LA SOLUCIÓN ──────────────────────────────────────────────── */}
        <section className="py-16 px-6 lg:px-8" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div>
              <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
                {t('solutionEyebrow')}
              </p>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                {t('solutionTitle')}
              </h2>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-4">
              <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {t('solutionText1')}
              </p>
              <p className="text-base leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {t('solutionText2')}
              </p>
            </div>
          </div>
        </section>

        {/* ── DEMO EMBED ───────────────────────────────────────────────── */}
        <section
          className="py-16 px-6 lg:px-8"
          style={{ background: 'var(--color-surface-section)', borderBottom: '1px solid var(--color-border)' }}
        >
          <div className="max-w-4xl mx-auto">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'var(--color-accent)' }}>
              {t('demoEyebrow')}
            </p>
            <h2 className="text-2xl font-bold mb-10" style={{ color: 'var(--color-text-primary)' }}>
              {t('demoTitle')}
            </h2>
            <div
              className="relative w-full rounded-2xl overflow-hidden"
              style={{ paddingBottom: 'calc(45.703125% + 40px)', background: 'var(--color-surface-subtle)', border: '1px solid var(--color-border)' }}
            >
              <iframe
                src={EMBED_URL}
                allow="fullscreen"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              />
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ────────────────────────────────────────────────── */}
        <section className="py-24 px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: 'var(--color-accent)' }}>
              {t('ctaEyebrow')}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5" style={{ color: 'var(--color-text-primary)' }}>
              {t('ctaTitle')}
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--color-text-secondary)' }}>
              {t('ctaText')}
            </p>
            <Link
              href="/contacto"
              className="btn-accent inline-block px-8 py-4 rounded-xl font-semibold text-base"
            >
              {tc('scheduleDemo')}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
