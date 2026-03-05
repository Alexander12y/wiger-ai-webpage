'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { Network, Factory, Truck, ShoppingCart, HardHat, ArrowUpRight, X } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useMotion'

const capabilities = [
  {
    icon: Network,
    label: 'Redes físicas',
    title: '',
    description: '',
    bgImage: '', // <- URL de imagen de fondo (ej: '/images/redes.jpg')
    size: 'large' as const,
    accent: true,
  },
  {
    icon: Factory,
    label: 'Manufactura',
    title: '',
    description: '',
    bgImage: '', // <- URL de imagen de fondo
    size: 'small' as const,
  },
  {
    icon: Truck,
    label: 'Distribución',
    title: '',
    description: '',
    bgImage: '', // <- URL de imagen de fondo
    size: 'small' as const,
  },
  {
    icon: ShoppingCart,
    label: 'Retail',
    title: '',
    description: '',
    bgImage: '', // <- URL de imagen de fondo
    size: 'small' as const,
  },
  {
    icon: HardHat,
    label: 'Construcción',
    title: '',
    description: '',
    bgImage: '', // <- URL de imagen de fondo
    size: 'small' as const,
  },
]

export function CapabilitiesGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const prefersReducedMotion = useReducedMotion()

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

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpandedIndex(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleCardClick = useCallback((index: number) => {
    setExpandedIndex(prev => prev === index ? null : index)
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
              Industrias
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
        <LayoutGroup>
          <div className="capabilities-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 grid-flow-dense">
            {capabilities.map((cap, index) => {
              const Icon = cap.icon
              const isLarge = expandedIndex === null ? index === 0 : expandedIndex === index
              const isExpanded = expandedIndex === index

              return (
                <motion.div
                  key={cap.label}
                  layout
                  onClick={() => handleCardClick(index)}
                  className={`group relative rounded-2xl overflow-hidden cursor-pointer select-none ${
                    isLarge ? 'md:col-span-2 lg:col-span-2 lg:row-span-2' : ''
                  }`}
                  style={{
                    backgroundColor: cap.accent ? 'var(--color-surface-elevated)' : 'var(--color-surface-card)',
                    border: `1px solid ${cap.accent ? 'var(--color-border-accent)' : 'var(--color-border)'}`,
                  }}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    opacity: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 },
                    y:       { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 },
                    layout:  prefersReducedMotion ? { duration: 0 } : { type: 'spring', damping: 25, stiffness: 150 },
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(232, 101, 10, 0.4)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-glow)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = cap.accent ? 'rgba(232, 101, 10, 0.3)' : 'rgba(0, 0, 0, 0.08)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {/* Background image — alta transparencia sobre negro */}
                  {cap.bgImage && (
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `url(${cap.bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.15,
                      }}
                    />
                  )}

                  {/* Grid pattern on large card */}
                  {isLarge && <div className="absolute inset-0 grid-pattern opacity-30" />}

                  {/* Expanded overlay */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        key="expanded"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, delay: 0.15 }}
                        className="absolute inset-0 z-20 pointer-events-none"
                      >
                        {/* X close button */}
                        <button
                          onClick={(e) => { e.stopPropagation(); setExpandedIndex(null) }}
                          className="toggle-btn absolute top-4 right-4 pointer-events-auto w-9 h-9
                            rounded-full flex items-center justify-center"
                          style={{ backgroundColor: 'rgba(0,0,0,0.04)', border: '1px solid var(--color-border)' }}
                          aria-label="Cerrar"
                        >
                          <X className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                        </button>

                        {/* Amber accent line at bottom */}
                        <div className="absolute bottom-0 left-0 right-0 h-[3px]"
                          style={{ background: 'var(--color-accent)' }} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    layout="position"
                    className="relative z-10 flex flex-col p-6 lg:p-8 justify-between h-full min-h-[200px] lg:min-h-0"
                  >
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

                    {/* Arrow — only when NOT expanded */}
                    <AnimatePresence>
                      {!isExpanded && (
                        <motion.div
                          key="arrow"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="mt-6 self-end"
                        >
                          <div
                            className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300
                              group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            style={{
                              backgroundColor: 'rgba(0,0,0,0.04)',
                              border: '1px solid var(--color-border)',
                            }}
                          >
                            <ArrowUpRight className="w-4 h-4" style={{ color: 'var(--color-text-muted)' }} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>
        </LayoutGroup>
      </div>
    </section>
  )
}
