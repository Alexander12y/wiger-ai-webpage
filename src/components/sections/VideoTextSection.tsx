'use client'

import { useEffect, useRef } from 'react'

export function VideoTextSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black py-20 px-6 flex items-center relative overflow-hidden"
    >
      {/* Elementos futurísticos de fondo */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-300 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-20 right-10 w-2 h-2 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      {/* Grid pattern futurístico */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `
          linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Contenido de texto - Lado izquierdo */}
          <div className="lg:col-span-2 space-y-8 animate-on-scroll">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Desde administrativos hasta{' '}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  obreros
                </span>{' '}
                la AI revoluciona
              </h2>
              
              <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                Nuestra plataforma de inteligencia artificial no solo transforma los procesos administrativos, 
                sino que también revoluciona el trabajo en planta. Desde la optimización de líneas de producción 
                hasta la asistencia en tiempo real para operarios, la AI se convierte en el aliado perfecto 
                para cada nivel de tu organización.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300 text-sm md:text-base">Asistencia inteligente para operarios en tiempo real</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <span className="text-gray-300 text-sm md:text-base">Optimización automática de procesos de manufactura</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <span className="text-gray-300 text-sm md:text-base">Integración perfecta entre administración y producción</span>
                </div>
              </div>
            </div>
            
            <button 
              className="group inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25 border border-cyan-500/20"
            >
              Ver casos de éxito
              <svg 
                className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Espacio para video - Lado derecho (PRIORIDAD) */}
          <div className="lg:col-span-3 animate-on-scroll">
            <div className="relative">
              {/* Video container más grande */}
              <div className="relative bg-gradient-to-br from-slate-800 via-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500 border border-gray-700/50">
                <div className="aspect-video flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
                  {/* Placeholder content */}
                  <div className="text-center text-white p-12">
                    <div className="w-24 h-24 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6 hover:from-cyan-400/30 hover:to-blue-400/30 transition-all duration-300 border border-cyan-400/30">
                      <svg className="w-12 h-12 text-cyan-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-gray-100">Video Demo</h3>
                    <p className="text-cyan-300 text-lg mb-2">Próximamente: Casos reales de implementación</p>
                    <p className="text-gray-400 text-sm">Revolucionando la industria manufacturera</p>
                  </div>
                </div>
                
                {/* Decorative elements más prominentes con colores futurísticos */}
                <div className="absolute top-6 right-6 w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
                <div className="absolute top-6 right-14 w-4 h-4 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-6 right-22 w-4 h-4 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                
                {/* Overlay gradient para más profundidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                
                {/* Líneas futurísticas */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>
              </div>
              
              {/* Floating elements más grandes para mayor impacto visual con colores futurísticos */}
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-cyan-500 bg-opacity-10 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-blue-500 bg-opacity-10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 -right-4 w-20 h-20 bg-purple-500 bg-opacity-10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}