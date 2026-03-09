'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider'
import { Footer } from '@/components/Footer'

interface Client {
  id: number
  name: string
  logo?: string
  solutionTag: string
  description: string
  videoPath: string | null
  embedUrl?: string
  caseStudyHref?: '/clientes/sercodam'
}

const clients: Client[] = [
  {
    id: 1,
    name: 'Sercodam Redes y Piolas',
    logo: '/LOGO SERCODAM.png',
    solutionTag: 'ERP Personalizado',
    description:
      'Empresa manufacturera y distribuidora de redes deportivas, de construcción e industriales. Operaban con inventario disperso en hojas de Google Sheets y perdían horas semanales en tareas manuales repetitivas. Wiger les implementó un ERP completamente personalizado — hoy ahorran 1 día completo por semana.',
    videoPath: null,
    embedUrl: 'https://app.howdygo.com/embed/83d0b963-8904-47a4-9b41-e771bbca91d4',
    caseStudyHref: '/clientes/sercodam',
  },
  {
    id: 2,
    name: '[Nombre del Cliente 2]',
    solutionTag: '[Tipo de Solución]',
    description:
      '[Descripción de quiénes son y cuál era su desafío. Segunda línea con el contexto de cómo Wiger AI entró a apoyarlos. Tercera línea con el resultado concreto que lograron juntos.]',
    videoPath: null,
  },
  {
    id: 3,
    name: '[Nombre del Cliente 3]',
    solutionTag: '[Tipo de Solución]',
    description:
      '[Descripción de quiénes son y cuál era su desafío. Segunda línea con el contexto de cómo Wiger AI entró a apoyarlos. Tercera línea con el resultado concreto que lograron juntos.]',
    videoPath: null,
  },
  {
    id: 4,
    name: '[Nombre del Cliente 4]',
    solutionTag: '[Tipo de Solución]',
    description:
      '[Descripción de quiénes son y cuál era su desafío. Segunda línea con el contexto de cómo Wiger AI entró a apoyarlos. Tercera línea con el resultado concreto que lograron juntos.]',
    videoPath: null,
  },
  {
    id: 5,
    name: '[Nombre del Cliente 5]',
    solutionTag: '[Tipo de Solución]',
    description:
      '[Descripción de quiénes son y cuál era su desafío. Segunda línea con el contexto de cómo Wiger AI entró a apoyarlos. Tercera línea con el resultado concreto que lograron juntos.]',
    videoPath: null,
  },
]

function VideoPlaceholder({ videoPath, clientName, embedUrl }: { videoPath: string | null; clientName: string; embedUrl?: string }) {
  const t = useTranslations('clientsPage')
  const videoRef = useRef<HTMLVideoElement>(null)

  if (embedUrl) {
    return (
      <div className="relative w-full rounded-2xl overflow-hidden" style={{ paddingBottom: 'calc(45.703125% + 40px)', background: 'var(--color-surface-section)' }}>
        <iframe
          src={embedUrl}
          allow="fullscreen"
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    )
  }

  if (videoPath) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden" style={{ background: 'var(--color-surface-section)' }}>
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          controls
          playsInline
          preload="metadata"
        >
          <source src={videoPath} type="video/mp4" />
        </video>
      </div>
    )
  }

  return (
    <div
      className="relative w-full aspect-video rounded-2xl overflow-hidden flex flex-col items-center justify-center gap-4"
      style={{
        background: 'var(--color-surface-section)',
        border: '1px solid var(--color-border)',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
        style={{ background: 'linear-gradient(90deg, #E8650A, #C8520A)' }}
      />
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110"
        style={{ border: '2px solid rgba(232,101,10,0.5)', background: 'rgba(232,101,10,0.12)' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-7 h-7 translate-x-0.5"
          style={{ color: '#E8650A' }}
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      <div className="text-center px-6">
        <p className="text-sm font-semibold" style={{ color: 'var(--color-text-muted)' }}>
          {t('videoLabel')}
        </p>
        <p className="text-xs mt-1" style={{ color: 'var(--color-text-faint)' }}>
          {clientName}
        </p>
      </div>
      <div
        className="absolute bottom-4 right-4 w-12 h-12 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #E8650A, transparent)' }}
      />
    </div>
  )
}

function ClientCard({ client, index }: { client: Client; index: number }) {
  const t = useTranslations('clientsPage')
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-center py-16 lg:py-20"
      style={{ borderBottom: '1px solid var(--color-border)' }}
    >
      <div className="lg:col-span-2 flex flex-col gap-5">
        <span
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: '#E8650A' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        {client.logo && (
          <div
            className="inline-flex items-center justify-center rounded-xl px-5 py-3 self-start"
            style={{
              background: 'var(--color-surface-card)',
              border: '1px solid var(--color-border)',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={client.logo}
              alt={`Logo ${client.name}`}
              className="h-9 max-w-[140px] object-contain"
            />
          </div>
        )}
        <h2
          className="text-2xl lg:text-3xl font-bold leading-tight"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {client.name}
        </h2>
        <div className="flex">
          <span
            className="inline-block text-xs font-semibold tracking-wide uppercase px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(232,101,10,0.15)',
              color: '#E8650A',
              border: '1px solid rgba(232,101,10,0.3)',
            }}
          >
            {client.solutionTag}
          </span>
        </div>
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {client.description}
        </p>
        {client.caseStudyHref ? (
          <Link
            href={client.caseStudyHref}
            className="self-start flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:gap-3 group"
            style={{ color: '#E8650A' }}
          >
            <span>{t('viewFullCase')}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        ) : (
          <button
            className="self-start flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:gap-3 group"
            style={{ color: '#E8650A' }}
          >
            <span>{t('viewFullCasePlaceholder')}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="lg:col-span-3">
        <VideoPlaceholder videoPath={client.videoPath} clientName={client.name} embedUrl={client.embedUrl} />
      </div>
    </div>
  )
}

export default function ClientesPage() {
  const t = useTranslations('clientsPage')

  return (
    <SmoothScrollProvider>
      <main style={{ background: 'var(--color-surface-page)', minHeight: '100vh' }}>
        {/* Header */}
        <section
          className="pt-40 pb-16 px-6 lg:px-8"
          style={{
            background: 'linear-gradient(180deg, #FAF8F5 0%, #F3F0EA 100%)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div className="max-w-5xl mx-auto text-center">
            <p
              className="text-xs font-bold tracking-widest uppercase mb-6"
              style={{ color: '#E8650A' }}
            >
              {t('eyebrow')}
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ color: 'var(--color-text-primary)' }}
            >
              {t('heading')}{' '}
              <span style={{ color: '#E8650A' }}>{t('headingAccent')}</span>
            </h1>
            <p
              className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
              style={{ color: 'var(--color-text-secondary)' }}
            >
              {t('subtitle')}
            </p>
          </div>
        </section>

        {/* Client entries */}
        <section className="max-w-6xl mx-auto px-6 lg:px-8">
          {clients.map((client, index) => (
            <ClientCard key={client.id} client={client} index={index} />
          ))}
        </section>

        {/* Bottom CTA */}
        <section
          className="py-20 px-6 lg:px-8 text-center"
          style={{ borderTop: '1px solid var(--color-border)' }}
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--color-text-primary)' }}>
              {t('ctaHeading')}
            </h2>
            <p className="text-base mb-8" style={{ color: 'var(--color-text-secondary)' }}>
              {t('ctaText')}
            </p>
            <button
              className="btn-accent px-8 py-4 rounded-xl font-semibold text-base"
            >
              {t('ctaButton')}
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </SmoothScrollProvider>
  )
}
