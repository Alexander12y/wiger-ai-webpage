'use client'

import Navbar from "@/components/Navbar";
import { ExpandableServicesSection } from "@/components/sections/ExpandableServicesSection";
import { ClientLogosSection } from "@/components/sections/ClientLogosSection";
import { VideoTextSection } from "@/components/sections/VideoTextSection";
import { Footer } from "@/components/Footer";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <Navbar />
      <main className="w-full">
        {/* ═══════════════════════════════════════════════════════
            HERO — Split editorial layout
        ═══════════════════════════════════════════════════════ */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          {/* Warm background with subtle geometric accent */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(160deg, #0E1C2F 0%, #162B45 40%, #1A3350 100%)' }} />

          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: '80px 80px',
            }}
          />

          {/* Amber glow — top left */}
          <div
            className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,101,10,0.12) 0%, transparent 70%)' }}
          />

          <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-32 md:py-0 w-full z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen pt-24 pb-16 lg:pt-0 lg:pb-0">
              {/* Left — Copy */}
              <div className="space-y-8">
                <div className="space-y-6">
                  {/* Eyebrow */}
                  <div className="animate-hero-text">
                    <span
                      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase"
                      style={{
                        background: 'rgba(232,101,10,0.12)',
                        color: '#E8650A',
                        border: '1px solid rgba(232,101,10,0.25)',
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8650A] animate-pulse" />
                      Plataforma AI para la industria
                    </span>
                  </div>

                  {/* Headline */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight animate-hero-text-delay" style={{ color: '#F1EEE9' }}>
                    El sistema{' '}
                    <span className="relative inline-block">
                      <span style={{ color: '#E8650A' }}>AI</span>
                    </span>{' '}
                    para manufactureros y distribuidores
                  </h1>

                  {/* Sub */}
                  <p className="text-lg lg:text-xl leading-relaxed max-w-xl animate-hero-text-delay" style={{ color: '#8899AD' }}>
                    Una plataforma unificada que mantiene tus activos administrados,
                    tus decisiones correctas y experiencias inmersivas para ti y tus clientes.
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 animate-hero-cta">
                  <button className="btn-accent px-8 py-4 rounded-xl font-semibold text-base">
                    Comenzar ahora
                  </button>
                  <button className="btn-outline-light px-8 py-4 rounded-xl font-semibold text-base">
                    Ver demo
                  </button>
                </div>

                {/* Trust signal */}
                <div className="flex items-center gap-4 pt-4 animate-hero-cta">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div
                        key={i}
                        className="w-9 h-9 rounded-full border-2 border-[#0E1C2F] flex items-center justify-center text-xs font-bold"
                        style={{ background: i % 2 === 0 ? '#E8650A' : '#1E3252', color: '#F1EEE9' }}
                      >
                        {['M', 'J', 'A', 'R'][i-1]}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#F1EEE9' }}>+50 empresas</p>
                    <p className="text-xs" style={{ color: '#5A6E84' }}>confían en Wiger AI</p>
                  </div>
                </div>
              </div>

              {/* Right — Video showcase */}
              <div className="relative animate-hero-video">
                {/* Floating stats badge — top right */}
                <div
                  className="absolute -top-4 -right-2 md:right-4 z-20 px-4 py-3 rounded-2xl animate-float"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  <p className="text-xs font-medium" style={{ color: '#8899AD' }}>Eficiencia</p>
                  <p className="text-2xl font-bold" style={{ color: '#E8650A' }}>+40%</p>
                </div>

                {/* Floating badge — bottom left */}
                <div
                  className="absolute -bottom-4 -left-2 md:left-4 z-20 px-4 py-3 rounded-2xl animate-float-delayed"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.15)',
                  }}
                >
                  <p className="text-xs font-medium" style={{ color: '#8899AD' }}>Tiempo de respuesta</p>
                  <p className="text-2xl font-bold" style={{ color: '#F1EEE9' }}>-60%</p>
                </div>

                {/* Video container */}
                <div
                  className="relative rounded-3xl overflow-hidden"
                  style={{ boxShadow: 'var(--shadow-hero-video)' }}
                >
                  {/* Amber top accent */}
                  <div className="absolute top-0 left-0 right-0 h-1 z-10" style={{ background: 'linear-gradient(90deg, #E8650A, transparent)' }} />

                  <div className="aspect-[4/3] md:aspect-video">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    >
                      <source src="/videos/hero-background.mp4" type="video/mp4" />
                    </video>
                    {/* Subtle overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0E1C2F]/30 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
            <span className="text-xs tracking-widest uppercase" style={{ color: '#5A6E84' }}>Descubre más</span>
            <div className="w-5 h-8 rounded-full border border-[#5A6E84]/40 flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-[#E8650A] animate-bounce" />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            CLIENT LOGOS
        ═══════════════════════════════════════════════════════ */}
        <ClientLogosSection />

        {/* ═══════════════════════════════════════════════════════
            EXPANDABLE SERVICES — KEPT AS-IS (the 4 rectangles)
        ═══════════════════════════════════════════════════════ */}
        <ExpandableServicesSection />

        {/* ═══════════════════════════════════════════════════════
            VIDEO + TEXT SECTION
        ═══════════════════════════════════════════════════════ */}
        <VideoTextSection />
      </main>

      <Footer />
    </SmoothScrollProvider>
  );
}
