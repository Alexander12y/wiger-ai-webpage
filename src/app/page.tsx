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
            className="absolute inset-0 w-full h-full object-cover z-[1]"
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
          </video>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-[#0E1C2F]/55 z-[2]" />

          {/* Hero Content */}
          <div className="relative max-w-6xl mx-auto text-center px-6 z-10">
            <h1 className="text-white text-4xl md:text-6xl lg:text-6xl font-bold mb-6 leading-tight">
              El sistema <span className="text-[var(--color-accent)]">AI</span> para manufactureros y distribuidores.
            </h1>

            <p className="text-white/85 text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed mb-8">
              Una plataforma <span className="text-[var(--color-accent)]">AI</span> unificada que mantiene tus activos más importantes administrados,
              todas las decisiones correctas y experiencias inmersivas para ti y para tus clientes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-accent px-8 py-4 rounded-lg font-semibold text-lg">
                Comenzar ahora
              </button>
              <button className="btn-outline-light px-8 py-4 rounded-lg font-semibold text-lg">
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
