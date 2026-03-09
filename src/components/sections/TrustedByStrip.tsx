'use client'

import { useTranslations } from 'next-intl'

type Client = { name: string; logo?: string }

export function TrustedByStrip() {
  const t = useTranslations('trustedBy')

  const clients: Client[] = [
    { name: 'Sercodam', logo: '/LOGO SERCODAM.png' },
    { name: 'Cliente 2' },
    { name: 'Cliente 3' },
    { name: 'Cliente 4' },
    { name: 'Cliente 5' },
    { name: 'Cliente 6' },
  ]

  const marqueeClients = [...clients, ...clients]

  return (
    <section
      className="relative overflow-hidden py-8"
      style={{
        backgroundColor: 'var(--color-surface-page)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 mb-6">
        <div className="flex items-center gap-3">
          <span
            className="text-[11px] font-semibold tracking-[0.15em] uppercase"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {t('heading')}
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
        </div>
      </div>

      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10"
          style={{ background: 'linear-gradient(90deg, var(--color-surface-page), transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10"
          style={{ background: 'linear-gradient(270deg, var(--color-surface-page), transparent)' }}
        />

        <div className="animate-marquee flex items-center gap-16 whitespace-nowrap px-8">
          {marqueeClients.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex-shrink-0 px-6 py-3 rounded-lg flex items-center justify-center"
              style={{
                border: '1px solid var(--color-border)',
                backgroundColor: 'rgba(255,255,255,0.02)',
                minWidth: '120px',
                height: '52px',
              }}
            >
              {client.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={client.logo}
                  alt={client.name}
                  style={{ maxHeight: '28px', maxWidth: '100px', objectFit: 'contain' }}
                />
              ) : (
                <span
                  className="text-sm font-semibold tracking-wide"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {client.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
