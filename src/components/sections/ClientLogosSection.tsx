'use client'

export function ClientLogosSection() {
  const clientLogos = [
    { id: 1, name: 'Cliente 1', imagen:  "C:\\erick\\wiger-ai-webpage\\public\\LOGO SERCODAM.png"},
    { id: 2, name: 'Cliente 2', imagen:  "C:\\erick\\wiger-ai-webpage\\public\\LOGO SERCODAM.png" },
    { id: 3, name: 'Cliente 3', imagen:  "C:\\erick\\wiger-ai-webpage\\public\\LOGO SERCODAM.png" },
    { id: 4, name: 'Cliente 4', imagen:  "C:\\erick\\wiger-ai-webpage\\public\\LOGO SERCODAM.png" },
    { id: 5, name: 'Cliente 5', imagen:  "C:\\erick\\wiger-ai-webpage\\public\\LOGO SERCODAM.png" },
    { id: 6, name: 'Cliente 6', imagen:  "C:\\erick\\wiger-ai-webpage\\public\\LOGO SERCODAM.png" },
  ]

  return (
    <section
      className="py-16 px-8 border-b"
      style={{ backgroundColor: '#0E1C2F', borderColor: 'rgba(255,255,255,0.06)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <p
            className="uppercase tracking-widest text-sm font-semibold"
            style={{ color: '#5A6E84' }}
          >
            Respaldado por manufactureros y distribuidores líderes en la industria
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-12 items-center">
          {clientLogos.map((logo) => (
            <div
              key={logo.id}
              className="rounded-md h-16 flex items-center justify-center"
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                backgroundColor: 'rgba(255,255,255,0.03)',
              }}
            >
              <span
                className="font-semibold text-sm"
                style={{ color: '#5A6E84' }}
              >
                {logo.imagen}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
