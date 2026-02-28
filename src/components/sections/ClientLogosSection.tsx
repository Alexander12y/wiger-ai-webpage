'use client'

export function ClientLogosSection() {
  const clientLogos = [
    { id: 1, name: 'Cliente 1' },
    { id: 2, name: 'Cliente 2' },
    { id: 3, name: 'Cliente 3' },
    { id: 4, name: 'Cliente 4' },
    { id: 5, name: 'Cliente 5' },
    { id: 6, name: 'Cliente 6' },
  ]

  return (
    <section className="py-16 px-8 bg-[var(--color-surface-page)] border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <p className="uppercase tracking-widest text-[var(--color-text-muted)] text-sm font-semibold">
            Respaldado por manufactureros y distribuidores líderes en la industria
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-12 items-center">
          {clientLogos.map((logo) => (
            <div
              key={logo.id}
              className="border border-[var(--color-border)] rounded-md h-16 flex items-center justify-center"
            >
              <span className="text-[var(--color-text-muted)] font-semibold text-sm">
                {logo.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
