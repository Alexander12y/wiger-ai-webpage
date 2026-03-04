import type { Metadata } from 'next'
import Link from 'next/link'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Sercodam | Caso de éxito — Wiger AI',
  description:
    'Cómo Wiger AI implementó un ERP personalizado para Sercodam Redes y Piolas, ahorrándoles 1 día completo por semana.',
}

const EMBED_URL = 'https://app.howdygo.com/embed/83d0b963-8904-47a4-9b41-e771bbca91d4'

export default function SerdacomCaseStudy() {
  return (
    <>
      <main style={{ background: '#0E1C2F', minHeight: '100vh' }}>
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section
          className="pt-40 pb-20 px-6 lg:px-8"
          style={{
            background: 'linear-gradient(180deg, #060E1A 0%, #0E1C2F 100%)',
            borderBottom: '1px solid #1E3252',
          }}
        >
          <div className="max-w-4xl mx-auto">
            {/* Back link */}
            <Link
              href="/clientes"
              className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors duration-200 hover:opacity-80"
              style={{ color: '#94A3B8' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                  clipRule="evenodd"
                />
              </svg>
              Casos de éxito
            </Link>

            {/* Logo placeholder */}
            <div
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl mb-8 text-sm font-semibold"
              style={{
                background: 'rgba(30, 50, 82, 0.6)',
                border: '1px solid #1E3252',
                color: '#4A6080',
              }}
            >
              Logo Sercodam
            </div>

            {/* Badge */}
            <div className="mb-5">
              <span
                className="inline-block text-xs font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full"
                style={{
                  background: 'rgba(232,101,10,0.15)',
                  color: '#E8650A',
                  border: '1px solid rgba(232,101,10,0.3)',
                }}
              >
                ERP Personalizado
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl md:text-5xl font-bold leading-tight mb-5"
              style={{ color: '#F1EEE9' }}
            >
              Sercodam Redes y Piolas
            </h1>

            {/* Subtitle */}
            <p
              className="text-lg md:text-xl leading-relaxed max-w-2xl"
              style={{ color: '#94A3B8' }}
            >
              Fabricante y distribuidor de redes deportivas, de construcción e industriales con
              operaciones en toda la República Mexicana.
            </p>
          </div>
        </section>

        {/* ── MÉTRICAS ─────────────────────────────────────────────────── */}
        <section className="py-16 px-6 lg:px-8" style={{ borderBottom: '1px solid #1E3252' }}>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { stat: '1 día / semana', label: 'Tiempo ahorrado' },
              { stat: '100%', label: 'Inventario digitalizado' },
              { stat: '< 4 sem', label: 'Tiempo de implementación' },
            ].map(({ stat, label }) => (
              <div
                key={label}
                className="rounded-2xl p-8 text-center"
                style={{
                  background: 'linear-gradient(135deg, #0A1628 0%, #162438 100%)',
                  border: '1px solid #1E3252',
                }}
              >
                <p
                  className="text-4xl font-bold mb-2"
                  style={{ color: '#E8650A' }}
                >
                  {stat}
                </p>
                <p className="text-sm font-medium" style={{ color: '#94A3B8' }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── EL RETO ──────────────────────────────────────────────────── */}
        <section className="py-16 px-6 lg:px-8" style={{ borderBottom: '1px solid #1E3252' }}>
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div>
              <p
                className="text-xs font-bold tracking-widest uppercase mb-3"
                style={{ color: '#E8650A' }}
              >
                El reto
              </p>
              <h2 className="text-2xl font-bold" style={{ color: '#F1EEE9' }}>
                Inventario en hojas de cálculo
              </h2>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-4">
              <p className="text-base leading-relaxed" style={{ color: '#94A3B8' }}>
                Sercodam gestionaba su inventario de cientos de referencias de redes — deportivas,
                de construcción e industriales — en múltiples hojas de Google Sheets compartidas
                entre distintos empleados. Cada actualización era manual, propensa a errores y
                dependía de que la persona correcta tuviera acceso al archivo correcto en el
                momento correcto.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#94A3B8' }}>
                El equipo perdía horas semanales consolidando datos, reconciliando diferencias entre
                hojas y generando reportes a mano. El crecimiento del negocio amenazaba con hacer
                ese sistema insostenible.
              </p>
            </div>
          </div>
        </section>

        {/* ── LA SOLUCIÓN ──────────────────────────────────────────────── */}
        <section className="py-16 px-6 lg:px-8" style={{ borderBottom: '1px solid #1E3252' }}>
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div>
              <p
                className="text-xs font-bold tracking-widest uppercase mb-3"
                style={{ color: '#E8650A' }}
              >
                La solución
              </p>
              <h2 className="text-2xl font-bold" style={{ color: '#F1EEE9' }}>
                ERP 100% a la medida
              </h2>
            </div>
            <div className="lg:col-span-2 flex flex-col gap-4">
              <p className="text-base leading-relaxed" style={{ color: '#94A3B8' }}>
                Wiger diseñó e implementó un ERP completamente personalizado para Sercodam,
                adaptado a su catálogo de productos, flujos de pedidos y estructura de almacén.
                El sistema centraliza el inventario en tiempo real, automatiza la generación de
                reportes y elimina la necesidad de actualizaciones manuales en hojas de cálculo.
              </p>
              <p className="text-base leading-relaxed" style={{ color: '#94A3B8' }}>
                La implementación se completó en menos de cuatro semanas, con capacitación incluida
                para todo el equipo. Hoy, Sercodam opera con visibilidad total de su inventario y
                ha recuperado el equivalente a un día completo de trabajo por semana.
              </p>
            </div>
          </div>
        </section>

        {/* ── DEMO EMBED ───────────────────────────────────────────────── */}
        <section className="py-16 px-6 lg:px-8" style={{ borderBottom: '1px solid #1E3252' }}>
          <div className="max-w-4xl mx-auto">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: '#E8650A' }}
            >
              Demo interactivo
            </p>
            <h2
              className="text-2xl font-bold mb-10"
              style={{ color: '#F1EEE9' }}
            >
              Mira el sistema en acción
            </h2>

            <div
              className="relative w-full rounded-2xl overflow-hidden"
              style={{ paddingBottom: 'calc(45.703125% + 40px)', background: '#0A1628' }}
            >
              <iframe
                src={EMBED_URL}
                allow="fullscreen"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
              />
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ────────────────────────────────────────────────── */}
        <section className="py-24 px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-4"
              style={{ color: '#E8650A' }}
            >
              ¿Siguiente paso?
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-5" style={{ color: '#F1EEE9' }}>
              Tu operación también puede transformarse
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: '#94A3B8' }}>
              Platícanos cómo trabajas hoy y en menos de una semana te mostramos
              exactamente cómo Wiger AI puede ayudarte.
            </p>
            <Link
              href="/contacto"
              className="btn-accent inline-block px-8 py-4 rounded-xl font-semibold text-base"
            >
              Agendar una demo
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
