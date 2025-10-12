'use client'

export function ClientLogosSection() {
  // Placeholder logos data - replace with actual client logos later
  const clientLogos = [
    { id: 1, name: 'Cliente 1' },
    { id: 2, name: 'Cliente 2' },
    { id: 3, name: 'Cliente 3' },
    { id: 4, name: 'Cliente 4' },
  ]

  return (
    <section className="py-16 px-8 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <p className="text-lg md:text-xl font-medium text-slate-600">
            Respaldado por manufactureros y distribuidores líderes en la industria
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 items-center">
          {clientLogos.map((logo) => (
            <div
              key={logo.id}
              className="flex items-center justify-center p-6 rounded-lg transition-all duration-300 hover:bg-slate-50 group"
            >
              {/* Placeholder for logo - replace with actual <img> tags later */}
              <div className="w-full h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center group-hover:from-slate-200 group-hover:to-slate-300 transition-all duration-300">
                <span className="text-slate-400 font-semibold text-sm">
                  {logo.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
