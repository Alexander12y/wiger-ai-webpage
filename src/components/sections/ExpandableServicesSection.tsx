'use client'

import { useState } from 'react'
import { Plus, Minus, ArrowRight } from 'lucide-react'

interface Service {
  id: string
  title: string
  description: string
  detailedDescription: string
  backgroundImage: string
  ctaText: string
  link: string
}

const services: Service[] = [
  {
    id: 'ai-automation',
    title: 'AI Automation',
    description: 'Automatiza procesos complejos con IA avanzada',
    detailedDescription: 'Transformamos tus operaciones con sistemas de automatización inteligente que aprenden y se adaptan. Reduce costos operativos hasta en un 60% mientras mejoras la precisión y velocidad de tus procesos empresariales.',
    backgroundImage: '/AI_automation_image.png',
    ctaText: 'Explorar Automatización',
    link: '/services/ai-automation'
  },
  {
    id: 'analytics-bi',
    title: 'Analytics & Business Intelligence',
    description: 'Insights accionables para decisiones inteligentes',
    detailedDescription: 'Convierte tus datos en ventaja competitiva con dashboards inteligentes y análisis predictivo. Identifica oportunidades ocultas y optimiza tu rendimiento empresarial con inteligencia artificial.',
    backgroundImage: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    ctaText: 'Ver Analytics',
    link: '/services/analytics-bi'
  },
  {
    id: 'paas',
    title: 'PaaS',
    description: 'Plataforma como servicio escalable y segura',
    detailedDescription: 'Acelera tu desarrollo con nuestra plataforma cloud-native. Infraestructura lista para producción con IA integrada, escalabilidad automática y seguridad empresarial de nivel mundial.',
    backgroundImage: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    ctaText: 'Conocer Plataforma',
    link: '/services/paas'
  },
  {
    id: 'tech-consulting',
    title: 'Tech Consulting',
    description: 'Estrategia y consultoría en transformación digital',
    detailedDescription: 'Acelera tu transformación digital con nuestros expertos. Estrategias personalizadas, roadmaps tecnológicos y acompañamiento completo para maximizar el ROI de tu inversión en tecnología.',
    backgroundImage: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    ctaText: 'Solicitar Consultoría',
    link: '/services/tech-consulting'
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
    <section className="py-24 px-8 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-8xl mx-auto">
        {/* Sub-Hero */}
        <div className="text-center mb-16">
          <div className="relative">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-blue-600 to-slate-800 mb-4 relative">
              While the world is forever moving forward,
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-pulse opacity-0 hover:opacity-100 transition-opacity duration-1000"></div>
            </h2>
            <div className="relative">
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-light text-slate-600 italic relative">
                can you afford to stand still?
                {/* Glowing underline effect */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 group-hover:w-full"></div>
              </h3>
              {/* Futuristic accent line */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60 animate-pulse"></div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="relative mt-8">
            <div className="absolute left-1/4 top-0 w-2 h-2 bg-blue-500 rounded-full opacity-60 animate-pulse" style={{ animationDelay: '0s' }}></div>
            <div className="absolute right-1/4 top-4 w-1 h-1 bg-slate-400 rounded-full opacity-40 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute left-1/3 -top-2 w-1 h-1 bg-blue-300 rounded-full opacity-50 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute right-1/3 top-2 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="flex flex-col md:flex-row gap-6 md:h-[75vh] w-full">
          {services.map((service, index) => {
            const isExpanded = expandedService === service.id
            const expandedIndex = services.findIndex(s => s.id === expandedService)
            
            // (Removed debug logging)
            
            // Calculate width based on expansion state
            let widthClass = ''
            if (expandedService === '') {
              // No card expanded - all equal width
              widthClass = 'flex-1'
            } else if (isExpanded) {
              // This card is expanded - takes more space
              widthClass = 'md:flex-[1.6] flex-1'
            } else {
              // Other cards are compressed but still substantial
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
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    background: service.backgroundImage.startsWith('linear-gradient') 
                      ? service.backgroundImage 
                      : `url(${service.backgroundImage})`,
                    backgroundSize: service.backgroundImage.startsWith('linear-gradient') 
                      ? 'auto' 
                      : 'cover'
                  }}
                >
                  {/* Overlay */}
                  <div className={`absolute inset-0 transition-all duration-500 ${
                    isExpanded 
                      ? 'bg-black/50' 
                      : 'bg-black/30 group-hover:bg-black/40'
                  }`}></div>
                </div>

                {/* Content */}
                <div className="relative h-full p-5 md:p-7 lg:p-9 flex flex-col justify-between text-white">
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div className={`transition-all duration-700 ${isExpanded ? 'w-full pr-4' : 'w-full pr-8'}`}>
                      {/* Título siempre visible */}
                      <h3 className={`font-normal transition-all duration-700 mb-3 leading-tight text-shadow-lg ${
                        isExpanded 
                          ? 'text-2xl md:text-3xl lg:text-4xl' 
                          : expandedService === '' 
                            ? 'text-xl md:text-2xl lg:text-3xl' 
                            : 'text-xl md:text-xl lg:text-2xl'
                      }`}>
                        {service.title}
                      </h3>
                      
                      {/* Subtítulo eliminado en vista comprimida: ahora solo aparece dentro del bloque expandido */}
                    </div>

                    {/* Toggle Button - Only show on expanded or when no card is expanded */}
                    {(isExpanded || expandedService === '') && (
                      <button
                        onClick={(e) => handleToggleClick(service.id, e)}
                        className={`relative btn-glow futuristic-press ${isExpanded ? 'is-active' : ''} flex-shrink-0 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300 group/toggle focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
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
                        className="relative btn-glow futuristic-press flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/40 transition-all duration-300 group/toggle focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                        aria-label="Expandir servicio"
                        aria-expanded="false"
                        aria-controls={`service-panel-${service.id}`}
                      >
                        <Plus className="w-3 h-3 md:w-4 md:h-4 transition-transform group-active/toggle:scale-90" />
                      </button>
                    )}
                  </div>

                  {/* Contenido Expandido - Aparece como bloque completo */}
                  {isExpanded && showExpandedContent === service.id && (
                    <div
                      id={`service-panel-${service.id}`}
                      role="region"
                      aria-labelledby={`service-toggle-${service.id}`}
                      className="animate-fade-in-up"
                    >
                      {/* Subtítulo ahora visible solo en modo expandido completo con leve delay */}
                      <div className="mb-4 subtitle-fade">
                        <p className="text-white/80 leading-snug text-base md:text-lg">
                          {service.description}
                        </p>
                      </div>
                      {/* Descripción detallada */}
                      <div className="mb-8">
                        <p className="text-white/90 leading-relaxed text-base md:text-lg lg:text-xl">
                          {service.detailedDescription}
                        </p>
                      </div>
                      {/* Botón CTA */}
                      <div>
                        <button 
                          className="inline-flex items-center gap-3 bg-white/95 hover:bg-white text-slate-900 px-8 md:px-10 py-4 md:py-5 rounded-xl font-semibold transition-all duration-200 group/btn hover:shadow-xl transform hover:scale-105 text-base md:text-lg"
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

                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                  isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                }`} style={{
                  background: 'linear-gradient(45deg, transparent, rgba(59, 130, 246, 0.3), transparent)',
                  padding: '2px',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude'
                }}></div>
              </div>
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-slate-600 mb-6 text-lg">
            ¿Necesitas una solución personalizada?
          </p>
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Contactar Especialista
          </button>
        </div>
      </div>
    </section>
  )
}