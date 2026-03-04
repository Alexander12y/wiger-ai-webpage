'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { navItems } from '@/config/navigation'

/**
 * Hidden SVG that defines the liquid-glass displacement filter.
 * feTurbulence creates organic distortion; feDisplacementMap warps
 * whatever is behind the element, producing the "liquid glass" look.
 * feGaussianBlur adds the frosted-glass softness on top.
 */
function GlassSvgFilter() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <defs>
        <filter id="navbar-glass" x="-10%" y="-10%" width="120%" height="120%">
          {/* organic noise for the "liquid" distortion */}
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.018"
            numOctaves={3}
            seed={5}
            result="noise"
          />
          {/* warp the backdrop through the noise */}
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={8}
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          {/* frosted blur */}
          <feGaussianBlur in="displaced" stdDeviation="3" result="blurred" />
          {/* composite with original to keep crisp content on top */}
          <feComposite in="blurred" in2="SourceGraphic" operator="atop" />
        </filter>
      </defs>
    </svg>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <GlassSvgFilter />

      {/* Outer wrapper: fixed, full-width, just for positioning */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        {/* Centering container — same max-w as page content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          {/* The actual glass bar — always cream/scrolled appearance */}
          <nav className="glass-navbar glass-navbar--scrolled pointer-events-auto">
            <div className="px-5 sm:px-8">
              <div className="flex items-center h-24 relative z-10">

                {/* Left zone — flex-1 mirrors right zone for true center alignment */}
                <div className="flex-1 flex items-center">
                  <div className="flex-shrink-0">
                    <Link href="/" className="block">
                      <div style={{ height: '44px', overflow: 'hidden' }}>
                        <Image
                          src="/wiger-logo-light.png"
                          alt="Wiger AI Logo"
                          width={500}
                          height={500}
                          style={{ height: '92px', width: 'auto', marginTop: '-24px' }}
                          priority
                        />
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Navigation Links — desktop center */}
                <div className="hidden md:flex items-center gap-2">
                  {navItems.map((item) => {
                    const isPage = item.href.startsWith('/')
                    const linkClass =
                      'glass-navbar-link glass-nav-pill text-base font-medium transition-colors duration-200 border border-white/10 hover:border-white/25'

                    return isPage ? (
                      <Link key={item.name} href={item.href} className={linkClass}>
                        {item.name}
                      </Link>
                    ) : (
                      <a key={item.name} href={item.href} className={linkClass}>
                        {item.name}
                      </a>
                    )
                  })}
                </div>

                {/* Right zone — flex-1 justify-end for balanced layout */}
                <div className="flex-1 flex items-center justify-end">
                  <div className="hidden md:flex flex-shrink-0">
                    <Link href="/contacto" className="btn-accent inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm">
                      <Mail className="w-4 h-4" />
                      <span>Contacta a ventas</span>
                    </Link>
                  </div>

                  <div className="md:hidden">
                    <button
                      onClick={() => setMobileOpen(!mobileOpen)}
                      aria-expanded={mobileOpen}
                      aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
                      className="p-2 rounded-lg transition-colors text-[#1A1410] hover:bg-black/05"
                    >
                      {mobileOpen ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Mobile Menu Panel — inside the glass bar */}
            {mobileOpen && (
              <div className="md:hidden border-t border-black/10 px-5 sm:px-8 py-4 space-y-1 relative z-10">
                {navItems.map((item) => {
                  const isPage = item.href.startsWith('/')
                  const mobileClass = 'block text-base font-medium text-[#1A1410]/90 hover:text-[#1A1410] hover:bg-black/05 rounded-lg px-3 py-2 transition-colors'

                  return isPage ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={mobileClass}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={mobileClass}
                    >
                      {item.name}
                    </a>
                  )
                })}
                <div className="pt-3">
                  <Link href="/contacto" onClick={() => setMobileOpen(false)} className="btn-accent w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm">
                    <Mail className="w-4 h-4" />
                    <span>Contacta a ventas</span>
                  </Link>
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  )
}
