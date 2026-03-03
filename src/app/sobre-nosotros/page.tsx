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

const milestones = [
  { year: '2022', event: 'Fundación de Wiger AI en Monterrey, México.' },
  { year: '2023', event: 'Primer ERP personalizado implementado en producción.' },
  { year: '2024', event: 'Expansión a 5 industrias: manufactura, distribución, construcción, retail y logística.' },
  { year: '2025', event: 'Más de 10 empresas transformadas. Equipo de 12 personas.' },
]

export default function SobreNosotrosPage() {
  return (
    <>
      <main style={{ background: '#0E1C2F', minHeight: '100vh' }}>

        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section
          className="pt-40 pb-24 px-6 lg:px-8"
          style={{
            background: 'linear-gradient(180deg, #060E1A 0%, #0E1C2F 100%)',
            borderBottom: '1px solid #1E3252',
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
              style={{ color: '#F1EEE9' }}
            >
              Construimos el software que{' '}
              <span style={{ color: '#E8650A' }}>tu operación merece</span>
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
              style={{ color: '#94A3B8' }}
            >
              Somos un equipo de ingenieros y estrategas de negocio enfocados en un solo problema:
              hacer que las empresas manufactureras y distribuidoras de México operen con la
              eficiencia de las grandes corporaciones.
            </p>
          </div>
        </section>

        {/* ── MISIÓN Y VISIÓN ──────────────────────────────────────────── */}
        <section className="py-20 px-6 lg:px-8" style={{ borderBottom: '1px solid #1E3252' }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              className="rounded-2xl p-10"
              style={{
                background: 'linear-gradient(135deg, #0A1628 0%, #162438 100%)',
                border: '1px solid #1E3252',
              }}
            >
              <p
                className="text-xs font-bold tracking-widest uppercase mb-4"
                style={{ color: '#E8650A' }}
              >
                Misión
              </p>
              <h2 className="text-xl font-bold mb-4" style={{ color: '#F1EEE9' }}>
                Digitalizar la industria real de México
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
                Desarrollamos sistemas ERP, CRM y de automatización completamente personalizados
                para empresas que producen, distribuyen y mueven cosas en el mundo físico.
                Queremos que cada PyME industrial tenga acceso a la tecnología que antes solo
                tenían las multinacionales.
              </p>
            </div>

            <div
              className="rounded-2xl p-10"
              style={{
                background: 'linear-gradient(135deg, #0A1628 0%, #162438 100%)',
                border: '1px solid #1E3252',
              }}
            >
              <p
                className="text-xs font-bold tracking-widest uppercase mb-4"
                style={{ color: '#E8650A' }}
              >
                Visión
              </p>
              <h2 className="text-xl font-bold mb-4" style={{ color: '#F1EEE9' }}>
                La plataforma de operaciones de la industria latinoamericana
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
                En cinco años, queremos ser el sistema operativo de referencia para las empresas
                manufactureras y distribuidoras de América Latina — el lugar donde cada orden,
                inventario, cliente y proceso vive y se gestiona de forma inteligente.
              </p>
            </div>
          </div>
        </section>

        {/* ── VALORES ──────────────────────────────────────────────────── */}
        <section className="py-20 px-6 lg:px-8" style={{ borderBottom: '1px solid #1E3252' }}>
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p
                className="text-xs font-bold tracking-widest uppercase mb-3"
                style={{ color: '#E8650A' }}
              >
                Valores
              </p>
              <h2 className="text-3xl font-bold" style={{ color: '#F1EEE9' }}>
                Cómo trabajamos
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((v, i) => (
                <div
                  key={v.title}
                  className="rounded-2xl p-8"
                  style={{
                    background: 'linear-gradient(135deg, #0A1628 0%, #162438 100%)',
                    border: '1px solid #1E3252',
                  }}
                >
                  <span
                    className="text-xs font-bold tracking-widest uppercase"
                    style={{ color: '#E8650A' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-bold mt-3 mb-3" style={{ color: '#F1EEE9' }}>
                    {v.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#94A3B8' }}>
                    {v.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HISTORIA ─────────────────────────────────────────────────── */}
        <section className="py-20 px-6 lg:px-8" style={{ borderBottom: '1px solid #1E3252' }}>
          <div className="max-w-3xl mx-auto">
            <div className="mb-14">
              <p
                className="text-xs font-bold tracking-widest uppercase mb-3"
                style={{ color: '#E8650A' }}
              >
                Historia
              </p>
              <h2 className="text-3xl font-bold" style={{ color: '#F1EEE9' }}>
                Del problema real a la solución real
              </h2>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-[11px] top-2 bottom-2 w-px"
                style={{ background: '#1E3252' }}
              />

              <div className="space-y-10">
                {milestones.map((m) => (
                  <div key={m.year} className="flex gap-6 relative">
                    {/* Dot */}
                    <div
                      className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                      style={{ background: '#0A1628', border: '2px solid #E8650A' }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ background: '#E8650A' }} />
                    </div>
                    <div>
                      <span
                        className="text-xs font-bold tracking-widest uppercase"
                        style={{ color: '#E8650A' }}
                      >
                        {m.year}
                      </span>
                      <p className="text-base mt-1" style={{ color: '#94A3B8' }}>
                        {m.event}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-5" style={{ color: '#F1EEE9' }}>
              Cuéntanos tu operación
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: '#94A3B8' }}>
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
                  border: '1px solid #1E3252',
                  color: '#94A3B8',
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
