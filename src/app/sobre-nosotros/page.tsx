import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Sobre Nosotros — Wiger AI',
  description:
    'Conoce al equipo detrás de Wiger AI: nuestra misión, visión y los valores que guían cada proyecto que construimos.',
}

const values = [
  {
    title: 'Obsesión por el cliente',
    description:
      'Cada línea de código existe para resolver un problema real de manufactura o distribución. No construimos funcionalidades, construimos resultados.',
  },
  {
    title: 'Velocidad con criterio',
    description:
      'Implementamos en semanas, no en meses. Pero nunca a costa de la estabilidad o la seguridad del sistema que nuestros clientes operan cada día.',
  },
  {
    title: 'Transparencia total',
    description:
      'Sin letra pequeña, sin sorpresas. Nuestros clientes saben exactamente qué construimos, por qué, y qué resultados esperar.',
  },
  {
    title: 'Mejora continua',
    description:
      'El software que entregamos el día uno es el punto de partida, no el destino. Iteramos con cada cliente hasta que el sistema es exactamente lo que necesita.',
  },
]

export default function SobreNosotrosPage() {
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
              Sobre nosotros
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ color: 'var(--color-text-primary)' }}
            >
              Construimos el software que{' '}
              <span style={{ color: '#E8650A' }}>tu operación merece</span>
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              Somos un equipo de ingenieros y estrategas de negocio enfocados en un solo problema:
              hacer que las empresas manufactureras y distribuidoras de México operen con la
              eficiencia de las grandes corporaciones.
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
                Misión
              </p>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                Digitalizar la industria real de México
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                Desarrollamos sistemas ERP, CRM y de automatización completamente personalizados
                para empresas que producen, distribuyen y mueven cosas en el mundo físico.
                Queremos que cada PyME industrial tenga acceso a la tecnología que antes solo
                tenían las multinacionales.
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
                Visión
              </p>
              <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                La plataforma de operaciones de la industria latinoamericana
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                En cinco años, queremos ser el sistema operativo de referencia para las empresas
                manufactureras y distribuidoras de América Latina — el lugar donde cada orden,
                inventario, cliente y proceso vive y se gestiona de forma inteligente.
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
              {/* Camera icon */}
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
                Foto del equipo — próximamente
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
                Valores
              </p>
              <h2 className="text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                Cómo trabajamos
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
              ¿Trabajamos juntos?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5" style={{ color: 'var(--color-text-primary)' }}>
              Cuéntanos tu operación
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--color-text-secondary)' }}>
              En menos de una semana te mostramos exactamente cómo Wiger AI puede transformar
              tu empresa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="btn-accent inline-block px-8 py-4 rounded-xl font-semibold text-base"
              >
                Agendar una demo
              </Link>
              <Link
                href="/clientes"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-colors duration-200"
                style={{
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-secondary)',
                }}
              >
                Ver casos de éxito
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
