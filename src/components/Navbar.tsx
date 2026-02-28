'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail } from 'lucide-react'
import { navItems } from '@/config/navigation'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 transition-all duration-300">
            <Link href="/" className="block">
              <Image
                src={isScrolled ? '/wiger-logo-light.png' : '/wiger-logo.png'}
                alt="Wiger AI Logo"
                width={240}
                height={70}
                className="h-10 w-auto object-contain transition-opacity duration-300"
                priority
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-base font-medium transition-all duration-200 hover:scale-105 ${
                  isScrolled
                    ? 'text-[var(--color-text-primary)] hover:text-[var(--color-accent)]'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* CTA Button — desktop */}
          <div className="hidden md:flex flex-shrink-0">
            <button className="btn-accent inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm">
              <Mail className="w-4 h-4" />
              <span>Contacta a ventas</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              className={`p-2 rounded-lg transition-colors ${
                isScrolled
                  ? 'text-[var(--color-text-primary)] hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
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

      {/* Mobile Menu Panel */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-[var(--color-border)] px-6 py-4 space-y-1">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block text-base font-medium text-[var(--color-text-primary)] hover:text-[var(--color-accent)] py-2 transition-colors"
            >
              {item.name}
            </a>
          ))}
          <div className="pt-3">
            <button className="btn-accent w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm">
              <Mail className="w-4 h-4" />
              <span>Contacta a ventas</span>
            </button>
          </div>
        </div>
      )}

      {/* Subtle bottom border when scrolled */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-border)]" />
      )}
    </nav>
  )
}
