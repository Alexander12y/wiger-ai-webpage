'use client'

import { useRef } from 'react'
import { SmoothScrollProvider } from '@/components/SmoothScrollProvider'
import { Footer } from '@/components/Footer'

interface Client {
  id: number
  name: string
  solutionTag: string
  description: string
  videoPath: string | null
}

const clients: Client[] = [
  {
    id: 1,
    name: '[Nombre del Cliente 1]',
    solutionTag: '[Tipo de Solución]',
    description:
      '[Descripción de quiénes son y cuál era su desafío. Segunda línea con el contexto de cómo Wiger AI entró a apoyarlos. Tercera línea con el resultado concreto que lograron juntos.]',
    videoPath: null,
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

function VideoPlaceholder({ videoPath, clientName }: { videoPath: string | null; clientName: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  if (videoPath) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden" style={{ background: '#0A1628' }}>
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
        background: 'linear-gradient(135deg, #0A1628 0%, #162438 60%, #1a2d42 100%)',
        border: '1px solid #1E3252',
      }}
    >
      {/* Top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
        style={{ background: 'linear-gradient(90deg, #E8650A, #C8520A)' }}
      />

      {/* Play button */}
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

      {/* Label */}
      <div className="text-center px-6">
        <p className="text-sm font-semibold" style={{ color: '#94A3B8' }}>
          Video del caso
        </p>
        <p className="text-xs mt-1" style={{ color: '#4A6080' }}>
          {clientName}
        </p>
      </div>

      {/* Corner decoration */}
      <div
        className="absolute bottom-4 right-4 w-12 h-12 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #E8650A, transparent)' }}
      />
    </div>
  )
}

function ClientCard({ client, index }: { client: Client; index: number }) {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16 items-center py-16 lg:py-20"
      style={{ borderBottom: '1px solid #1E3252' }}
    >
      {/* Left: Text info (2/5) */}
      <div className="lg:col-span-2 flex flex-col gap-5">
        {/* Index number */}
        <span
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: '#E8650A' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        {/* Client name */}
        <h2
          className="text-2xl lg:text-3xl font-bold leading-tight"
          style={{ color: '#F1EEE9' }}
        >
          {client.name}
        </h2>

        {/* Solution tag */}
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

        {/* Description */}
        <p
          className="text-sm leading-relaxed line-clamp-3"
          style={{ color: '#94A3B8' }}
        >
          {client.description}
        </p>

        {/* CTA link */}
        <button
          className="self-start flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:gap-3 group"
          style={{ color: '#E8650A' }}
        >
          <span>[Ver caso completo]</span>
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
      </div>

      {/* Right: Video (3/5) */}
      <div className="lg:col-span-3">
        <VideoPlaceholder videoPath={client.videoPath} clientName={client.name} />
      </div>
    </div>
  )
}

export default function ClientesPage() {
  return (
    <SmoothScrollProvider>
      <main style={{ background: '#0E1C2F', minHeight: '100vh' }}>
        {/* Header */}
        <section
          className="pt-40 pb-16 px-6 lg:px-8"
          style={{
            background: 'linear-gradient(180deg, #060E1A 0%, #0E1C2F 100%)',
            borderBottom: '1px solid #1E3252',
          }}
        >
          <div className="max-w-5xl mx-auto text-center">
            {/* Eyebrow */}
            <p
              className="text-xs font-bold tracking-widest uppercase mb-6"
              style={{ color: '#E8650A' }}
            >
              Casos de éxito
            </p>

            {/* Main title */}
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              style={{ color: '#F1EEE9' }}
            >
              Historias inspiradoras de{' '}
              <span style={{ color: '#E8650A' }}>clientes inspiradores</span>
            </h1>

            {/* Subtitle placeholder */}
            <p
              className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
              style={{ color: '#94A3B8' }}
            >
              [Subtítulo: una línea que describe la propuesta de valor de los casos de éxito
              y lo que el visitante va a descubrir en esta página.]
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
          style={{ borderTop: '1px solid #1E3252' }}
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#F1EEE9' }}>
              [¿Listo para ser la próxima historia?]
            </h2>
            <p className="text-base mb-8" style={{ color: '#94A3B8' }}>
              [Texto de llamada a la acción para que el visitante contacte a ventas o
              solicite una demo.]
            </p>
            <button
              className="btn-accent px-8 py-4 rounded-xl font-semibold text-base"
            >
              [Agendar una demo]
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </SmoothScrollProvider>
  )
}
