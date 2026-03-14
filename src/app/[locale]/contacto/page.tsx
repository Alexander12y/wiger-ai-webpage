import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ContactPageForm } from '@/components/sections/ContactPageForm'
import { Link } from '@/i18n/navigation'
import { ArrowLeft } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contactPage' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function ContactoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'contactPage' })
  const tc = await getTranslations({ locale, namespace: 'common' })

  return (
    <main
      className="min-h-screen relative"
      style={{ backgroundColor: 'var(--color-surface-page)' }}
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />

      {/* Accent glow top-left */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] pointer-events-none"
        style={{ background: 'radial-gradient(circle at 0% 0%, rgba(232,101,10,0.07) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-20">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm mb-12 transition-colors duration-200 hover:text-[#E8650A]"
          style={{ color: 'var(--color-text-muted)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          {tc('backToHome')}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — copy */}
          <div className="space-y-8">
            {/* Eyebrow */}
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-8" style={{ backgroundColor: '#E8650A' }} />
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase"
                style={{ color: '#E8650A', fontFamily: 'var(--font-mono)' }}
              >
                {t('eyebrow')}
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-[-0.01em]" style={{ color: 'var(--color-text-primary)' }}>
              {t('headingStart')}{' '}
              <span style={{ color: '#E8650A' }}>
                {t('headingAccent')}
              </span>{' '}
              {t('headingEnd')}
            </h1>

            <p className="text-base sm:text-lg leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
              {t('subtitle')}
            </p>

            {/* Benefits list */}
            <ul className="space-y-4">
              {[
                t('benefit1'),
                t('benefit2'),
                t('benefit3'),
                t('benefit4'),
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold"
                    style={{ backgroundColor: 'rgba(232,101,10,0.15)', color: '#E8650A', border: '1px solid rgba(232,101,10,0.3)' }}
                  >
                    ✓
                  </span>
                  <span className="text-sm" style={{ color: 'var(--color-text-primary)' }}>{item}</span>
                </li>
              ))}
            </ul>

            {/* Divider */}
            <div className="h-px" style={{ background: 'linear-gradient(90deg, rgba(232,101,10,0.3), transparent)' }} />

            {/* Social proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {['M', 'D', 'P', 'L'].map((initial) => (
                  <div
                    key={initial}
                    className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold"
                    style={{ borderColor: 'var(--color-surface-page)', backgroundColor: 'rgba(232,101,10,0.15)', color: '#E8650A' }}
                  >
                    {initial}
                  </div>
                ))}
              </div>
              <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                <span className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>{t('trustBold')}</span>
                {' '}{t('trustText')}
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div
            className="rounded-2xl p-8 sm:p-10"
            style={{
              backgroundColor: 'var(--color-surface-card)',
              border: '1px solid var(--color-border)',
            }}
          >
            {/* Accent top bar */}
            <div className="h-[2px] -mx-8 sm:-mx-10 -mt-8 sm:-mt-10 mb-8 rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #E8650A, transparent)' }} />
            <ContactPageForm />
          </div>
        </div>
      </div>
    </main>
  )
}
