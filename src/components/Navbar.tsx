'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Mail } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Productos', href: '#productos' },
    { name: 'Clientes', href: '#clientes' },
    { name: 'Sobre Nosotros', href: '#sobre-nosotros' },
    { name: 'Marketing', href: '#marketing' },
  ]

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
            <a href="/" className="block">
              <Image
                src={isScrolled ? '/wiger_light_logo[1].png' : '/wiger-logo.png'}
                alt="Wiger AI Logo"
                width={240}
                height={70}
                className="h-40 w-auto object-contain transition-opacity duration-300"
                priority
              />
            </a>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-base font-medium transition-all duration-200 hover:scale-105 ${
                  isScrolled
                    ? 'text-gray-700 hover:text-blue-600'
                    : 'text-white hover:text-cyan-400'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex-shrink-0">
            <button
              className={`group relative inline-flex items-center gap-3 px-6 py-3 rounded-xl font-semibold text-sm overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                isScrolled
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                  : 'bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white/20'
              }`}
            >
              {/* Animated background on hover */}
              <span
                className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out transform ${
                  isScrolled
                    ? 'bg-gradient-to-r from-blue-700 to-cyan-600'
                    : 'bg-white/20'
                } translate-y-full group-hover:translate-y-0`}
              ></span>

              {/* Content */}
              <span className="relative flex items-center gap-3">
                <Mail className="w-4 h-4" />
                <span>Contacta a ventas</span>
              </span>

              {/* Glow effect */}
              <span
                className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                  isScrolled
                    ? 'shadow-[0_0_20px_rgba(59,130,246,0.5)]'
                    : 'shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                }`}
              ></span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className={`p-2 rounded-lg transition-colors ${
                isScrolled
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Subtle bottom border when scrolled */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      )}
    </nav>
  )
}
