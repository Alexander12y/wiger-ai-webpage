'use client'

import { ExpandableServicesSection } from "@/components/sections/ExpandableServicesSection";
import { ClientLogosSection } from "@/components/sections/ClientLogosSection";
import { VideoTextSection } from "@/components/sections/VideoTextSection";
import { Footer } from "@/components/Footer";
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

        <ClientLogosSection />

        <ExpandableServicesSection />

        <VideoTextSection />
      </main>
      
      <Footer />
    </SmoothScrollProvider>
  );
}
