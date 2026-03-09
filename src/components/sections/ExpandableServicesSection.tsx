'use client'

import { useState, useRef, useEffect } from 'react'
import { Plus, Minus, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

interface Service {
  id: string
  translationKey: string
  backgroundImage: string
  cardColor: string
  link: string
}

const services: Service[] = [
  {
    id: 'erp',
    translationKey: 'erp',
    backgroundImage: '/optimized/manufactura.webp',
    cardColor: 'var(--color-surface-dark-card)',
    link: '/productos/erp'
  },
  {
    id: 'crm',
    translationKey: 'crm',
    backgroundImage: '/optimized/shaking_hands.webp',
    cardColor: 'var(--color-surface-dark)',
    link: '/productos/crm'
  },
  {
    id: 'TMS',
    translationKey: 'tms',
    backgroundImage: '/optimized/transportation.webp',
    cardColor: '#1A1209',
    link: '/productos/integraciones'
  },
  {
    id: 'FSM',
    translationKey: 'fsm',
    backgroundImage: '/optimized/field_service.webp',
    cardColor: '#1E3252',
    link: '/implementacion'
  }
]

export function ExpandableServicesSection() {
  const [expandedService, setExpandedService] = useState<string>('')
  const [showExpandedContent, setShowExpandedContent] = useState<string>('')
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('services')
  const tc = useTranslations('common')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    )
    const elements = sectionRef.current?.querySelectorAll('.reveal')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleServiceClick = (serviceId: string) => {
    if (expandedService === serviceId) {
      setShowExpandedContent('')
      setTimeout(() => {
        setExpandedService('')
      }, 100)
    } else {
      setExpandedService(serviceId)
      setShowExpandedContent('')
      setTimeout(() => {
        setShowExpandedContent(serviceId)
      }, 700)
    }
  }

  const handleToggleClick = (serviceId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    handleServiceClick(serviceId)
  }

  return (
    <section ref={sectionRef} id="productos" className="py-24 px-8" style={{ backgroundColor: 'var(--color-surface-dark)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Sub-Hero */}
        <div className="text-center mb-16">
          <div className="relative">
            <h2 className="reveal text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4" style={{ color: '#F1EEE9' }}>
              {t('heading')}
            </h2>
            <div className="relative">
              <h3 className="reveal reveal-delay-1 text-3xl md:text-4xl lg:text-5xl font-light italic" style={{ color: 'rgba(240,237,232,0.55)' }}>
                {t('subheading')}
              </h3>
              <div className="reveal reveal-delay-2 mt-6 w-12 h-[2px] bg-[var(--color-accent)] mx-auto" />
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="reveal reveal-delay-3 flex flex-col md:flex-row gap-6 md:h-[75vh] w-full">
          {services.map((service) => {
            const isExpanded = expandedService === service.id
            const title = t(`${service.translationKey}.title`)
            const description = t(`${service.translationKey}.description`)
            const detailedDescription = t(`${service.translationKey}.detailedDescription`)
            const ctaText = t(`${service.translationKey}.cta`)

            let widthClass = ''
            if (expandedService === '') {
              widthClass = 'flex-1'
            } else if (isExpanded) {
              widthClass = 'md:flex-[1.6] flex-1'
            } else {
              widthClass = 'md:flex-[0.9] flex-1'
            }

            return (
              <div
                key={service.id}
                className={`relative overflow-hidden rounded-2xl transition-all duration-700 ease-in-out cursor-pointer group ${widthClass} ${
                  isExpanded ? 'h-[65vh] md:h-full' : 'h-36 md:h-full'
                }`}
                onClick={() => handleServiceClick(service.id)}
              >
                <div
                  className="absolute inset-0"
                  style={{ backgroundColor: service.cardColor }}
                >
                  {service.backgroundImage && (
                    <Image
                      src={service.backgroundImage}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      quality={85}
                    />
                  )}
                </div>

                <div className={`absolute inset-0 transition-all duration-500 ${
                  isExpanded
                    ? 'bg-[#1C1208]/60'
                    : 'bg-[#1C1208]/30 group-hover:bg-[#1C1208]/40'
                }`} />

                <div className="relative h-full p-5 md:p-7 lg:p-9 flex flex-col justify-between text-white">
                  <div className="flex justify-between items-start">
                    <div className={`transition-all duration-700 ${isExpanded ? 'w-full pr-4' : 'w-full pr-8'}`}>
                      <h3 className={`font-normal transition-all duration-700 mb-3 leading-tight text-shadow-lg ${
                        isExpanded
                          ? 'text-2xl md:text-3xl lg:text-4xl'
                          : expandedService === ''
                            ? 'text-xl md:text-2xl lg:text-3xl'
                            : 'text-xl md:text-xl lg:text-2xl'
                      }`}>
                        {title}
                      </h3>
                    </div>

                    {(isExpanded || expandedService === '') && (
                      <button
                        onClick={(e) => handleToggleClick(service.id, e)}
                        className={`toggle-btn ${isExpanded ? 'is-active' : ''} flex-shrink-0 flex items-center justify-center focus:outline-none group/toggle ${
                          isExpanded ? 'w-10 h-10 md:w-12 md:h-12' : 'w-8 h-8 md:w-10 md:h-10'
                        }`}
                        aria-label={isExpanded ? tc('collapseService') : tc('expandService')}
                        aria-expanded={isExpanded}
                        aria-controls={`service-panel-${service.id}`}
                      >
                        {isExpanded ? (
                          <Minus className={`${isExpanded ? 'w-5 h-5 md:w-6 md:h-6' : 'w-4 h-4 md:w-5 md:h-5'} transition-transform group-active/toggle:scale-90`} />
                        ) : (
                          <Plus className={`${isExpanded ? 'w-5 h-5 md:w-6 md:h-6' : 'w-4 h-4 md:w-5 md:h-5'} transition-transform group-active/toggle:scale-90`} />
                        )}
                      </button>
                    )}

                    {!isExpanded && expandedService !== '' && (
                      <button
                        onClick={(e) => handleToggleClick(service.id, e)}
                        className="toggle-btn flex-shrink-0 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center focus:outline-none group/toggle"
                        aria-label={tc('expandService')}
                        aria-expanded="false"
                        aria-controls={`service-panel-${service.id}`}
                      >
                        <Plus className="w-3 h-3 md:w-4 md:h-4 transition-transform group-active/toggle:scale-90" />
                      </button>
                    )}
                  </div>

                  {isExpanded && showExpandedContent === service.id && (
                    <div
                      id={`service-panel-${service.id}`}
                      role="region"
                      aria-labelledby={`service-toggle-${service.id}`}
                      className="animate-fade-in-up"
                    >
                      <div className="mb-4">
                        <p className="text-white/80 leading-snug text-base md:text-lg">
                          {description}
                        </p>
                      </div>
                      <div className="mb-8">
                        <p className="text-white/90 leading-relaxed text-base md:text-lg lg:text-xl">
                          {detailedDescription}
                        </p>
                      </div>
                      <div>
                        <button
                          className="btn-accent inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 rounded-xl font-semibold text-base md:text-lg group/btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            console.log(`Navigate to ${service.link}`)
                          }}
                        >
                          {ctaText}
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {isExpanded && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--color-accent)]" />}
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="reveal reveal-delay-4 text-center mt-16 pt-16 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <p className="mb-6 text-lg" style={{ color: 'var(--color-text-on-dark-muted)' }}>
            {t('customSolution')}
          </p>
          <button className="btn-accent px-8 py-4 rounded-xl font-semibold text-lg">
            {t('contactSpecialist')}
          </button>
        </div>
      </div>
    </section>
  )
}
