'use client'

import { useEffect, useRef } from 'react'
import { Brain, Zap, BarChart3, Shield, Layers, ArrowUpRight } from 'lucide-react'

const capabilities = [
  {
    icon: Brain,
    label: 'AI Predictiva',
    title: 'Anticipa problemas antes de que ocurran',
    description: 'Algoritmos que analizan patrones de producción, anticipan fallos en maquinaria y optimizan inventario automáticamente.',
    size: 'large' as const,
    accent: true,
  },
  {
    icon: Zap,
    label: 'Automatización',
    title: 'Procesos sin intervención manual',
    description: 'Desde órdenes de compra hasta reportes de calidad, automatiza las tareas repetitivas.',
    size: 'small' as const,
  },
  {
    icon: BarChart3,
    label: 'Analytics',
    title: 'Visibilidad total en tiempo real',
    description: 'Dashboards inteligentes que muestran KPIs de producción, ventas y logística al instante.',
    size: 'small' as const,
  },
  {
    icon: Shield,
    label: 'Seguridad',
    title: 'Datos protegidos con estándar bancario',
    description: 'Encriptación de extremo a extremo, backups automáticos y cumplimiento con normativas industriales.',
    size: 'small' as const,
  },
  {
    icon: Layers,
    label: 'Integración',
    title: 'Se conecta con todo tu ecosistema',
    description: 'API abierta, conectores nativos para SAP, sistemas SCADA, ecommerce y herramientas contables.',
    size: 'small' as const,
  },
]

export function CapabilitiesGrid() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll('.reveal')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="sobre-nosotros"
      className="relative py-24 lg:py-32 px-6 sm:px-8 lg:px-12 overflow-hidden noise-overlay"
      style={{ backgroundColor: 'var(--color-surface-page)' }}
    >
      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Section header */}
        <div className="max-w-2xl mb-16 lg:mb-20">
          <div className="reveal flex items-center gap-3 mb-6">
            <div className="h-[2px] w-8" style={{ backgroundColor: 'var(--color-accent)' }} />
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}
            >
              Capacidades
            </span>
          </div>
          <h2 className="reveal reveal-delay-1 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Tus procesos actuales optimizados{' '}
            <span style={{ color: 'var(--color-accent)' }}>
              sin tener que adaptarte
            </span>
          </h2>
          <p className="reveal reveal-delay-2 mt-5 text-base lg:text-lg leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            Cada módulo fue diseñado con la realidad de manufactureros
            y distribuidores mexicanos en mente. Sin plantillas genéricas.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {capabilities.map((cap, index) => {
            const Icon = cap.icon
            const isLarge = cap.size === 'large'

            return (
              <div
                key={cap.label}
                className={`reveal reveal-delay-${Math.min(index + 1, 5)} group relative rounded-2xl p-6 lg:p-8 overflow-hidden transition-all duration-300 cursor-default ${
                  isLarge ? 'md:col-span-2 lg:col-span-2 lg:row-span-2' : ''
                }`}
                style={{
                  backgroundColor: cap.accent ? 'var(--color-surface-elevated)' : 'var(--color-surface-card)',
                  border: `1px solid ${cap.accent ? 'var(--color-border-accent)' : 'var(--color-border)'}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(232, 101, 10, 0.4)'
                  e.currentTarget.style.boxShadow = 'var(--shadow-glow)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = cap.accent ? 'rgba(232, 101, 10, 0.3)' : 'rgba(255, 255, 255, 0.06)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Grid pattern on large card */}
                {isLarge && <div className="absolute inset-0 grid-pattern opacity-30" />}

                <div className={`relative z-10 flex flex-col ${isLarge ? 'h-full min-h-[280px] lg:min-h-[360px]' : 'h-full min-h-[200px]'} justify-between`}>
                  <div>
                    {/* Icon + Label */}
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: 'var(--color-accent-light)' }}
                      >
                        <Icon className="w-5 h-5" style={{ color: 'var(--color-accent)' }} />
                      </div>
                      <span
                        className="text-xs font-semibold tracking-[0.12em] uppercase"
                        style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}
                      >
                        {cap.label}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-display font-bold leading-snug mb-3 ${
                        isLarge ? 'text-2xl lg:text-3xl' : 'text-lg lg:text-xl'
                      }`}
                      style={{ color: 'var(--color-text-primary)' }}
                    >
                      {cap.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`leading-relaxed ${isLarge ? 'text-base lg:text-lg max-w-lg' : 'text-sm'}`}
                      style={{ color: 'var(--color-text-secondary)' }}
                    >
                      {cap.description}
                    </p>
                  </div>

                  {/* Arrow link */}
                  <div className="mt-6 self-end">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.05)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <ArrowUpRight className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
