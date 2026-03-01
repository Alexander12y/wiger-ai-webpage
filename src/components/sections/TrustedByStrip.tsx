'use client'

export function TrustedByStrip() {
  const clients = [
    'Cliente 1',
    'Cliente 2',
    'Cliente 3',
    'Cliente 4',
    'Cliente 5',
    'Cliente 6',
  ]

  // Duplicate for seamless loop
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
            Respaldado por líderes industriales
          </span>
          <div className="flex-1 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
        </div>
      </div>

      {/* Marquee track */}
      <div className="relative">
        {/* Fade edges */}
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
              key={`${client}-${i}`}
              className="flex-shrink-0 px-6 py-3 rounded-lg"
              style={{
                border: '1px solid var(--color-border)',
                backgroundColor: 'rgba(255,255,255,0.02)',
              }}
            >
              <span
                className="text-sm font-semibold tracking-wide"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {client}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
