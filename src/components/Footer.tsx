'use client'

import Image from 'next/image'
import { Mail } from 'lucide-react'

export function Footer() {
  const footerLinks = {
    company: {
      title: 'Company',
      links: [
        { label: 'Sobre Nosotros', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press & Media', href: '/press' },
        { label: 'Partners', href: '/partners' },
        { label: 'Contact', href: '/contact' },
      ]
    },
    products: {
      title: 'Products',
      links: [
        { label: 'AI Automation', href: '/products/ai-automation' },
        { label: 'Analytics & BI', href: '/products/analytics' },
        { label: 'PaaS Platform', href: '/products/paas' },
        { label: 'Integrations', href: '/products/integrations' },
        { label: 'Pricing', href: '/pricing' },
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        { label: 'Blog', href: '/blog' },
        { label: 'Documentation', href: '/docs' },
        { label: 'Case Studies', href: '/case-studies' },
        { label: 'Webinars', href: '/webinars' },
        { label: 'Support', href: '/support' },
      ]
    },
    legal: {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Settings', href: '/cookies' },
        { label: 'Security', href: '/security' },
        { label: 'Compliance', href: '/compliance' },
      ]
    },
    community: {
      title: 'Community',
      links: [
        { label: 'Events', href: '/events' },
        { label: 'Developer Portal', href: '/developers' },
        { label: 'Forum', href: '/forum' },
        { label: 'Newsletter', href: '/newsletter' },
        { label: 'Partnerships', href: '/partnerships' },
      ]
    }
  }

  const socialLinks = [
    { 
      name: 'X (Twitter)', 
      href: 'https://x.com/wiger_ai',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/company/wiger-ai',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    { 
      name: 'YouTube', 
      href: 'https://youtube.com/@wiger_ai',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    { 
      name: 'Instagram', 
      href: 'https://instagram.com/wigerai',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
        </svg>
      )
    },
  ]

  return (
    <footer className="bg-gradient-to-b from-slate-50 to-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Top Section - CTA */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent">
            ¿Listo para hablar?<br />
            Contáctanos.
          </h2>
          <button className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <Mail className="w-5 h-5" />
            Contáctanos
          </button>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-12 mb-12">
          {/* Logo Section */}
          <div className="md:col-span-1">
            <div className="flex items-start">
              <div className="relative w-32 h-12 opacity-70 hover:opacity-100 transition-opacity duration-300">
                <Image
                  src="/wiger_light_logo[1].png"
                  alt="Wiger AI"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">{footerLinks.company.title}</h3>
            <ul className="space-y-3">
              {footerLinks.company.links.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">{footerLinks.products.title}</h3>
            <ul className="space-y-3">
              {footerLinks.products.links.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">{footerLinks.resources.title}</h3>
            <ul className="space-y-3">
              {footerLinks.resources.links.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">{footerLinks.legal.title}</h3>
            <ul className="space-y-3">
              {footerLinks.legal.links.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">{footerLinks.community.title}</h3>
            <ul className="space-y-3">
              {footerLinks.community.links.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href}
                    className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section - Social Links & Copyright */}
        <div className="pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-blue-600 transition-colors duration-200"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-sm text-slate-500">
              © {new Date().getFullYear()} Wiger AI. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
