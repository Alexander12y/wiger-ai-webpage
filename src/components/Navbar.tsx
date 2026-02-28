'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navItems } from '@/config/navigation'

/**
 * Hidden SVG defining the liquid-glass displacement filter.
 * feTurbulence → organic noise texture
 * feDisplacementMap → warps the element edges through the noise
 * feGaussianBlur → frosted softness
 * feComposite → keeps crisp content on top of the distortion
 */
function GlassSvgFilter() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <defs>
        <filter id="navbar-glass" x="-10%" y="-10%" width="120%" height="120%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015 0.02"
            numOctaves={3}
            seed={7}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={6}
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="2.5" result="blurred" />
          <feComposite in="blurred" in2="SourceGraphic" operator="atop" />
        </filter>
      </defs>
    </svg>
  )
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  useEffect(() => {
    if (isAdmin) return
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isAdmin])

  if (isAdmin) return null

  return (
    <>
      <GlassSvgFilter />

      {/* Outer fixed positioning wrapper */}
      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        {/* Centering container with padding */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          {/* The liquid glass bar */}
          <nav
            className={`glass-navbar pointer-events-auto ${
              isScrolled ? 'glass-navbar--scrolled' : 'glass-navbar--hero'
            }`}
          >
            <div className="px-5 sm:px-7">
              <div className="flex items-center justify-between h-16 md:h-[72px] relative z-10">
                {/* Logo */}
                <Link href="/" className="flex-shrink-0">
                  <Image
                    src="/wiger-logo.png"
                    alt="Wiger AI"
                    width={300}
                    height={80}
                    className="h-9 md:h-11 w-auto object-contain"
                    priority
                  />
                </Link>

                {/* Nav links — desktop */}
                <div className="hidden md:flex items-center gap-1">
                  {navItems.map((item) => {
                    const isPage = item.href.startsWith('/')
                    return isPage ? (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="glass-nav-link"
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <a
                        key={item.name}
                        href={item.href}
                        className="glass-nav-link"
                      >
                        {item.name}
                      </a>
                    )
                  })}
                </div>

                {/* CTA — desktop */}
                <div className="hidden md:block flex-shrink-0">
                  <button className="btn-accent px-5 py-2.5 rounded-full text-sm font-bold tracking-tight">
                    Contacta a ventas
                  </button>
                </div>

                {/* Mobile hamburger */}
                <button
                  className="md:hidden p-2 rounded-lg transition-colors"
                  onClick={() => setMobileOpen(!mobileOpen)}
                  aria-expanded={mobileOpen}
                  aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
                >
                  {mobileOpen ? (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke={isScrolled ? '#1A1A1A' : '#FFFFFF'}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke={isScrolled ? '#1A1A1A' : '#FFFFFF'}
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile menu panel — inside the glass bar */}
            {mobileOpen && (
              <div className="md:hidden glass-mobile-menu px-5 sm:px-7 py-4 space-y-1 relative z-10">
                {navItems.map((item) => {
                  const isPage = item.href.startsWith('/')
                  const mobileCls =
                    'block text-base font-bold rounded-xl px-4 py-3 transition-colors'

                  const mobileStyle = {
                    color: '#1A1A1A',
                    fontFamily: 'var(--font-display)',
                  }

                  return isPage ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`${mobileCls} hover:bg-black/5`}
                      style={mobileStyle}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`${mobileCls} hover:bg-black/5`}
                      style={mobileStyle}
                    >
                      {item.name}
                    </a>
                  )
                })}
                <div className="pt-3 px-1">
                  <button className="btn-accent w-full py-3 rounded-full font-bold text-sm">
                    Contacta a ventas
                  </button>
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  )
}
