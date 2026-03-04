'use client'

export function ClientLogosSection() {
  const clientLogos = [
    { id: 1, name: 'Sercodam', logo: '/LOGO SERCODAM.png' },
    { id: 2, name: 'Cliente 2' },
    { id: 3, name: 'Cliente 3' },
    { id: 4, name: 'Cliente 4' },
    { id: 5, name: 'Cliente 5' },
    { id: 6, name: 'Cliente 6' },
  ]

  return (
    <section
      className="py-16 px-8 border-b"
      style={{ backgroundColor: 'var(--color-surface-section)', borderColor: 'var(--color-border)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <p
            className="uppercase tracking-widest text-sm font-semibold"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Respaldado por manufactureros y distribuidores líderes en la industria
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-12 items-center">
          {clientLogos.map((logo) => (
            <div
              key={logo.id}
              className="rounded-md h-16 flex items-center justify-center px-4"
              style={{
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-surface-card)',
              }}
            >
              {logo.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logo.logo}
                  alt={logo.name}
                  className="max-h-10 max-w-full object-contain"
                />
              ) : (
                <span
                  className="font-semibold text-sm"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
