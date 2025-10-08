'use client'

import { ExpandableServicesSection } from "@/components/sections/ExpandableServicesSection";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="w-full">
        {/* Hero Section with Video Background */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Video Background */}
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ zIndex: 1 }}
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
          </video>

          {/* Hero Content */}
          <div className="relative max-w-6xl mx-auto text-center px-6" style={{ zIndex: 10 }}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight" style={{ color: '#FFFFFF' }}>
              El sistema <span style={{ color: '#00E5FF' }}>AI</span> para manufactureros y distribuidores.
            </h1>
            
            <p className="text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed mb-8" style={{ color: '#EDEDED' }}>
              Una plataforma <span style={{ color: '#00E5FF' }}>AI</span> unificada que mantiene tus activos más importantes administrados, 
              todas las decisiones correctas y experiencias inmersivas para ti y para tus clientes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                className="px-8 py-4 rounded-lg font-semibold text-lg transition-colors text-white hover:opacity-90"
                style={{ 
                  backgroundColor: '#2979FF'
                }}
              >
                Comenzar ahora
              </button>
              <button 
                className="px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:bg-opacity-20"
                style={{ 
                  backgroundColor: 'transparent',
                  border: '2px solid #4DA6FF',
                  color: '#FFFFFF'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#4DA6FF20'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }}
              >
                Ver demo
              </button>
            </div>
          </div>
        </section>

        <ExpandableServicesSection />
        
        <section className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 py-20 px-6 flex items-center">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-5xl font-bold mb-8">¿Por qué Wiger AI?</h2>
            <p className="text-xl leading-relaxed mb-8">
              Somos pioneros en el desarrollo de soluciones de inteligencia artificial 
              que transforman la manera en que las empresas operan y crecen.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Innovación</h3>
                <p className="text-gray-300">Tecnología de vanguardia</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Eficiencia</h3>
                <p className="text-gray-300">Resultados rápidos y efectivos</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4"></div>
                <h3 className="text-xl font-semibold mb-2">Precisión</h3>
                <p className="text-gray-300">Soluciones personalizadas</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="min-h-screen bg-black text-white py-20 px-6 flex items-center">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold mb-8">Comencemos a trabajar juntos</h2>
            <p className="text-xl mb-12 text-gray-300">
              ¿Listo para transformar tu negocio con IA?
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-colors duration-300">
              Contactar Ahora
            </button>
          </div>
        </section>
      </main>
    </SmoothScrollProvider>
  );
}
