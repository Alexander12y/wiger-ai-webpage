'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { useTransition } from 'react'

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  function switchLocale(newLocale: 'es' | 'en') {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale })
    })
  }

  return (
    <div
      className="inline-flex items-center rounded-full text-xs font-semibold overflow-hidden"
      style={{
        border: '1px solid rgba(0,0,0,0.12)',
        opacity: isPending ? 0.6 : 1,
        transition: 'opacity 200ms',
      }}
    >
      <button
        onClick={() => switchLocale('es')}
        disabled={isPending}
        className="px-2.5 py-1 transition-colors duration-200"
        style={{
          backgroundColor: locale === 'es' ? '#E8650A' : 'transparent',
          color: locale === 'es' ? '#fff' : 'var(--color-text-secondary, #5A4E46)',
        }}
        aria-label="Español"
      >
        ES
      </button>
      <button
        onClick={() => switchLocale('en')}
        disabled={isPending}
        className="px-2.5 py-1 transition-colors duration-200"
        style={{
          backgroundColor: locale === 'en' ? '#E8650A' : 'transparent',
          color: locale === 'en' ? '#fff' : 'var(--color-text-secondary, #5A4E46)',
        }}
        aria-label="English"
      >
        EN
      </button>
    </div>
  )
}
