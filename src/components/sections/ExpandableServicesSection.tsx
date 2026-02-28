'use client'

import { useState } from 'react'
import { Plus, Minus, ArrowRight } from 'lucide-react'

interface Service {
  id: string
  title: string
  description: string
  detailedDescription: string
  backgroundImage: string
  cardColor: string
  ctaText: string
  link: string
}

const services: Service[] = [
  {
    id: 'erp',
    title: 'ERP para Manufactura',
    description: 'Control total de tu operación productiva',
    detailedDescription: 'Gestiona inventarios, órdenes de producción, cadena de suministro y costos en tiempo real. Un sistema diseñado para la realidad de la manufactura mexicana: integrado, ágil y adaptable a tu proceso.',
    backgroundImage: '/AI_automation_image.png',
    cardColor: '#1A2E45',
    ctaText: 'Explorar ERP',
    link: '/productos/erp'
  },
  {
    id: 'crm',
    title: 'CRM Industrial',
    description: 'Relaciones comerciales que impulsan ventas',
    detailedDescription: 'Administra clientes, distribuidores y prospectos con visibilidad completa del pipeline. Cotizaciones, seguimiento de pedidos y análisis de cartera, todo conectado a tu ERP para decisiones más rápidas.',
    backgroundImage: '',
    cardColor: '#0E1C2F',
    ctaText: 'Explorar CRM',
    link: '/productos/crm'
  },
  {
    id: 'integraciones',
    title: 'Integraciones',
    description: 'Conecta tus sistemas existentes sin fricción',
    detailedDescription: 'Wiger se integra con tu maquinaria, sistemas SCADA, plataformas de ecommerce y herramientas contables. API abierta y conectores nativos para que ningún dato quede aislado.',
    backgroundImage: '',
    cardColor: '#162438',
    ctaText: 'Ver Integraciones',
    link: '/productos/integraciones'
  },
  {
    id: 'implementacion',
    title: 'Implementación',
    description: 'Acompañamiento experto desde el día uno',
    detailedDescription: 'Nuestro equipo de implementación entiende la industria manufacturera y de distribución. Configuración a tu medida, capacitación en planta y soporte continuo para que la adopción sea real y sostenida.',
    backgroundImage: '',
    cardColor: '#1E3252',
    ctaText: 'Conocer el Proceso',
    link: '/implementacion'
  }
]

export function ExpandableServicesSection() {
  const [expandedService, setExpandedService] = useState<string>('')
  const [showExpandedContent, setShowExpandedContent] = useState<string>('')

  const handleServiceClick = (serviceId: string) => {
    if (expandedService === serviceId) {
      // Collapsing
      setShowExpandedContent('')
      setTimeout(() => {
        setExpandedService('')
      }, 100)
    } else {
      // Expanding
      setExpandedService(serviceId)
      setShowExpandedContent('')
      // Show content after expansion animation completes
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
    <section className="py-24 px-8" style={{ backgroundColor: '#0A1628' }}>
      <div className="max-w-7xl mx-auto">
        {/* Sub-Hero */}
        <div className="text-center mb-16">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4" style={{ color: '#F1EEE9' }}>
              Mientras el mundo avanza sin parar,
            </h2>
            <div className="relative">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-light italic" style={{ color: '#8899AD' }}>
                ¿puedes permitirte quedarte atrás?
              </h3>
              <div className="mt-6 w-12 h-[2px] bg-[var(--color-accent)] mx-auto" />
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="flex flex-col md:flex-row gap-6 md:h-[75vh] w-full">
          {services.map((service) => {
            const isExpanded = expandedService === service.id

            // Calculate width based on expansion state
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
                {/* Background */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    background: service.backgroundImage
                      ? `url(${service.backgroundImage})`
                      : service.cardColor,
                    backgroundSize: service.backgroundImage ? 'cover' : 'auto',
                    backgroundPosition: service.backgroundImage ? 'center' : 'initial',
                  }}
                >
                  {/* Overlay */}
                  <div className={`absolute inset-0 transition-all duration-500 ${
                    isExpanded
                      ? 'bg-[#0E1C2F]/60'
                      : 'bg-[#0E1C2F]/30 group-hover:bg-[#0E1C2F]/40'
                  }`}></div>
                </div>

                {/* Content */}
                <div className="relative h-full p-5 md:p-7 lg:p-9 flex flex-col justify-between text-white">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div className={`transition-all duration-700 ${isExpanded ? 'w-full pr-4' : 'w-full pr-8'}`}>
                      <h3 className={`font-normal transition-all duration-700 mb-3 leading-tight text-shadow-lg ${
                        isExpanded
                          ? 'text-2xl md:text-3xl lg:text-4xl'
                          : expandedService === ''
                            ? 'text-xl md:text-2xl lg:text-3xl'
                            : 'text-xl md:text-xl lg:text-2xl'
                      }`}>
                        {service.title}
                      </h3>
                    </div>

                    {/* Toggle Button — shown when expanded or no card is expanded */}
                    {(isExpanded || expandedService === '') && (
                      <button
                        onClick={(e) => handleToggleClick(service.id, e)}
                        className={`toggle-btn ${isExpanded ? 'is-active' : ''} flex-shrink-0 flex items-center justify-center focus:outline-none group/toggle ${
                          isExpanded ? 'w-10 h-10 md:w-12 md:h-12' : 'w-8 h-8 md:w-10 md:h-10'
                        }`}
                        aria-label={isExpanded ? 'Contraer servicio' : 'Expandir servicio'}
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

                    {/* Compressed state indicator */}
                    {!isExpanded && expandedService !== '' && (
                      <button
                        onClick={(e) => handleToggleClick(service.id, e)}
                        className="toggle-btn flex-shrink-0 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center focus:outline-none group/toggle"
                        aria-label="Expandir servicio"
                        aria-expanded="false"
                        aria-controls={`service-panel-${service.id}`}
                      >
                        <Plus className="w-3 h-3 md:w-4 md:h-4 transition-transform group-active/toggle:scale-90" />
                      </button>
                    )}
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && showExpandedContent === service.id && (
                    <div
                      id={`service-panel-${service.id}`}
                      role="region"
                      aria-labelledby={`service-toggle-${service.id}`}
                      className="animate-fade-in-up"
                    >
                      <div className="mb-4">
                        <p className="text-white/80 leading-snug text-base md:text-lg">
                          {service.description}
                        </p>
                      </div>
                      <div className="mb-8">
                        <p className="text-white/90 leading-relaxed text-base md:text-lg lg:text-xl">
                          {service.detailedDescription}
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
                          {service.ctaText}
                          <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Amber bottom accent when expanded */}
                {isExpanded && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--color-accent)]" />}
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 pt-16 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <p className="mb-6 text-lg" style={{ color: '#8899AD' }}>
            ¿Necesitas una solución personalizada?
          </p>
          <button className="btn-accent px-8 py-4 rounded-xl font-semibold text-lg">
            Contactar Especialista
          </button>
        </div>
      </div>
    </section>
  )
}
