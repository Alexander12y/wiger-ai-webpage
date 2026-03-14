import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Footer } from '@/components/Footer'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function SobreNosotrosPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'about' })
  const tc = await getTranslations({ locale, namespace: 'common' })

  const values = [
    { title: t('value1Title'), description: t('value1Description') },
    { title: t('value2Title'), description: t('value2Description') },
    { title: t('value3Title'), description: t('value3Description') },
    { title: t('value4Title'), description: t('value4Description') },
  ]

  return (
    <>
      <main style={{ background: 'var(--color-surface-page)', minHeight: '100vh' }}>

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section
          className="pt-40 pb-24 px-6 lg:px-8"
          style={{
            background: 'linear-gradient(180deg, #FAF8F5 0%, #F3F0EA 100%)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-6"
              style={{ color: '#E8650A' }}
            >
              {t('eyebrow')}
            </p>
            <h1
              className="font-display text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] mb-6"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {t('heading')}{' '}
              <span style={{ color: '#E8650A' }}>{t('headingAccent')}</span>
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {t('subtitle')}
            </p>
          </div>
        </section>

        {/* ── MISIÓN Y VISIÓN ──────────────────────────────────────────── */}
        <section className="py-20 px-6 lg:px-8" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="rounded-2xl p-10"
              style={{
                background: 'var(--color-surface-card)',
                border: '1px solid var(--color-border)',
              }}
            >
              <p
                className="text-xs font-bold tracking-widest uppercase mb-4"
                style={{ color: '#E8650A' }}
              >
                {t('missionEyebrow')}
              </p>
              <h2 className="font-display text-xl font-normal mb-4" style={{ color: 'var(--color-text-primary)' }}>
                {t('missionTitle')}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {t('missionText')}
              </p>
            </div>

            <div
              className="rounded-2xl p-10"
              style={{
                background: 'var(--color-surface-card)',
                border: '1px solid var(--color-border)',
              }}
            >
              <p
                className="text-xs font-bold tracking-widest uppercase mb-4"
                style={{ color: '#E8650A' }}
              >
                {t('visionEyebrow')}
              </p>
              <h2 className="font-display text-xl font-normal mb-4" style={{ color: 'var(--color-text-primary)' }}>
                {t('visionTitle')}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                {t('visionText')}
              </p>
            </div>
          </div>
        </section>

        {/* ── IMAGEN ───────────────────────────────────────────────────── */}
        <section className="py-16 px-6 lg:px-8" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="max-w-5xl mx-auto">
            <div
              className="w-full rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-4"
              style={{
                minHeight: '380px',
                background: 'var(--color-surface-section)',
                border: '1px dashed rgba(232,101,10,0.30)',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="56"
                height="56"
                viewBox="0 0 24 24"
                fill="none"
                stroke="rgba(232,101,10,0.40)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3" />
              </svg>
              <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>
                {t('teamPhotoPlaceholder')}
              </p>
            </div>
          </div>
        </section>

        {/* ── VALORES ──────────────────────────────────────────────────── */}
        <section className="py-20 px-6 lg:px-8" style={{ borderBottom: '1px solid var(--color-border)' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p
                className="text-xs font-bold tracking-widest uppercase mb-3"
                style={{ color: '#E8650A' }}
              >
                {t('valuesEyebrow')}
              </p>
              <h2 className="font-display text-3xl font-normal" style={{ color: 'var(--color-text-primary)' }}>
                {t('valuesHeading')}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((v, i) => (
                <div
                  key={v.title}
                  className="rounded-2xl p-8"
                  style={{
                    background: 'var(--color-surface-card)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: '#E8650A' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-bold mt-3 mb-3" style={{ color: 'var(--color-text-primary)' }}>
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────────────── */}
        <section className="py-24 px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-4"
              style={{ color: '#E8650A' }}
            >
              {t('ctaEyebrow')}
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-normal mb-5" style={{ color: 'var(--color-text-primary)' }}>
              {t('ctaHeading')}
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--color-text-secondary)' }}>
              {t('ctaText')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="btn-accent inline-block px-8 py-4 rounded-xl font-semibold text-base"
              >
                {tc('scheduleDemo')}
              </Link>
              <Link
                href="/clientes"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-colors duration-200"
                style={{
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                {tc('viewCaseStudies')}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
