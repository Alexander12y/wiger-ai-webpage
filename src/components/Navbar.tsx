'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, ChevronDown } from 'lucide-react'
import { navItems } from '@/config/navigation'

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
            baseFrequency="0.012 0.018"
            numOctaves={3}
            seed={5}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={8}
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="3" result="blurred" />
          <feComposite in="blurred" in2="SourceGraphic" operator="atop" />
        </filter>
      </defs>
    </svg>
  )
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function scheduleClose() {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 150)
  }

  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current)
  }

  const linkClass =
    'glass-navbar-link glass-nav-pill text-base font-medium transition-colors duration-200 border border-white/10 hover:border-white/25'

  const mobileClass =
    'block text-base font-medium text-[#1A1410]/90 hover:text-[#1A1410] hover:bg-black/05 rounded-lg px-3 py-2 transition-colors'

  return (
    <>
      <GlassSvgFilter />

      <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <nav className="glass-navbar glass-navbar--scrolled pointer-events-auto">
            <div className="px-5 sm:px-8">
              <div className="flex items-center h-24 relative z-10">

                {/* Logo */}
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

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-2">
                  {navItems.map((item) => {
                    if (item.children && item.children.length > 0) {
                      const isOpen = openDropdown === item.name
                      return (
                        <div
                          key={item.name}
                          className="relative"
                          onMouseEnter={() => { cancelClose(); setOpenDropdown(item.name) }}
                          onMouseLeave={scheduleClose}
                        >
                          <button
                            className={`${linkClass} inline-flex items-center gap-1`}
                            aria-expanded={isOpen}
                            aria-haspopup="true"
                          >
                            {item.name}
                            <ChevronDown
                              className="w-3.5 h-3.5 transition-transform duration-200"
                              style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                            />
                          </button>

                          {isOpen && (
                            <div
                              className="absolute top-full left-1/2 -translate-x-1/2 rounded-xl py-1 min-w-[220px]"
                              onMouseEnter={cancelClose}
                              onMouseLeave={scheduleClose}
                              style={{
                                marginTop: '0',
                                paddingTop: '12px',
                                background: 'transparent',
                              }}
                            >
                              {/* Actual panel */}
                              <div
                                className="rounded-xl py-1"
                                style={{
                                  background: 'var(--color-surface-page)',
                                  border: '1px solid rgba(0,0,0,0.08)',
                                  boxShadow: 'var(--shadow-elevated)',
                                }}
                              >
                                {item.children.map((child) => (
                                  <Link
                                    key={child.name}
                                    href={child.href}
                                    className="block px-4 py-2.5 transition-colors duration-150"
                                    style={{ color: 'var(--color-text-primary)' }}
                                    onMouseEnter={(e) => {
                                      const el = e.currentTarget
                                      el.style.background = 'var(--color-accent-light)'
                                      el.style.color = 'var(--color-accent)'
                                    }}
                                    onMouseLeave={(e) => {
                                      const el = e.currentTarget
                                      el.style.background = ''
                                      el.style.color = 'var(--color-text-primary)'
                                    }}
                                  >
                                    <span className="block text-sm font-medium">{child.name}</span>
                                    {child.description && (
                                      <span
                                        className="block text-xs mt-0.5"
                                        style={{ color: 'var(--color-text-muted)' }}
                                      >
                                        {child.description}
                                      </span>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    }

                    const isPage = item.href.startsWith('/')
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

                {/* Right zone */}
                <div className="flex-1 flex items-center justify-end">
                  <div className="hidden md:flex flex-shrink-0">
                    <Link
                      href="/contacto"
                      className="btn-accent inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm"
                    >
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

            {/* Mobile menu */}
            {mobileOpen && (
              <div className="md:hidden border-t border-black/10 px-5 sm:px-8 py-4 space-y-1 relative z-10">
                {navItems.map((item) => {
                  if (item.children && item.children.length > 0) {
                    const isExpanded = mobileExpanded === item.name
                    return (
                      <div key={item.name}>
                        <button
                          onClick={() => setMobileExpanded(isExpanded ? null : item.name)}
                          className={`${mobileClass} w-full flex items-center justify-between`}
                        >
                          <span>{item.name}</span>
                          <ChevronDown
                            className="w-4 h-4 transition-transform duration-200"
                            style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                          />
                        </button>
                        {isExpanded && (
                          <div className="pl-6 space-y-1 mt-1">
                            {item.children.map((child) => (
                              <Link
                                key={child.name}
                                href={child.href}
                                onClick={() => { setMobileOpen(false); setMobileExpanded(null) }}
                                className={mobileClass}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  }

                  const isPage = item.href.startsWith('/')
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
                  <Link
                    href="/contacto"
                    onClick={() => setMobileOpen(false)}
                    className="btn-accent w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-sm"
                  >
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
