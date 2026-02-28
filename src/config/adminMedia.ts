export interface MediaFile {
  id: string
  label: string
  path: string // path relative to /public (no leading slash)
  type: 'image' | 'video'
  accept: string
  description?: string
}

export interface MediaSection {
  id: string
  name: string
  description: string
  icon: string
  files: MediaFile[]
}

export const mediaSections: MediaSection[] = [
  {
    id: 'hero',
    name: 'Hero Principal',
    description: 'Video de fondo de la sección principal de la página de inicio',
    icon: '🎬',
    files: [
      {
        id: 'hero-video',
        label: 'Video de fondo del Hero',
        path: 'videos/hero-background.mp4',
        type: 'video',
        accept: 'video/mp4,video/webm',
        description: 'Se reproduce en bucle detrás del título principal',
      },
    ],
  },
  {
    id: 'marca',
    name: 'Identidad de Marca',
    description: 'Logos y activos de marca de Wiger AI',
    icon: '🏷️',
    files: [
      {
        id: 'logo-dark',
        label: 'Logo — versión oscura',
        path: 'wiger-logo.png',
        type: 'image',
        accept: 'image/png,image/svg+xml,image/webp',
        description: 'Usado en el Navbar cuando el usuario está en la parte superior (sin scroll)',
      },
      {
        id: 'logo-light',
        label: 'Logo — versión clara',
        path: 'wiger-logo-light.png',
        type: 'image',
        accept: 'image/png,image/svg+xml,image/webp',
        description: 'Usado en el Navbar al hacer scroll y en el Footer',
      },
    ],
  },
  {
    id: 'clientes-logos',
    name: 'Logos de Clientes',
    description: 'Logos de empresas clientes que aparecen en la sección "respaldado por"',
    icon: '🏢',
    files: [
      { id: 'client-logo-1', label: 'Logo Cliente 1', path: 'clients/logo-1.png', type: 'image', accept: 'image/*' },
      { id: 'client-logo-2', label: 'Logo Cliente 2', path: 'clients/logo-2.png', type: 'image', accept: 'image/*' },
      { id: 'client-logo-3', label: 'Logo Cliente 3', path: 'clients/logo-3.png', type: 'image', accept: 'image/*' },
      { id: 'client-logo-4', label: 'Logo Cliente 4', path: 'clients/logo-4.png', type: 'image', accept: 'image/*' },
      { id: 'client-logo-5', label: 'Logo Cliente 5', path: 'clients/logo-5.png', type: 'image', accept: 'image/*' },
      { id: 'client-logo-6', label: 'Logo Cliente 6', path: 'clients/logo-6.png', type: 'image', accept: 'image/*' },
    ],
  },
  {
    id: 'video-demo',
    name: 'Video Demo',
    description: 'Video de demostración del producto que aparece en la sección de texto+video',
    icon: '🎥',
    files: [
      {
        id: 'demo-video',
        label: 'Video de demostración',
        path: 'videos/demo.mp4',
        type: 'video',
        accept: 'video/mp4,video/webm',
        description: 'Aparece en la sección "Desde administrativos hasta piso de planta"',
      },
    ],
  },
  {
    id: 'casos-exito',
    name: 'Casos de Éxito',
    description: 'Videos de casos de éxito de clientes — aparecen en la página /clientes',
    icon: '📹',
    files: [
      {
        id: 'caso-1',
        label: 'Video — Caso Cliente 1',
        path: 'videos/casos/cliente-1.mp4',
        type: 'video',
        accept: 'video/mp4,video/webm',
      },
      {
        id: 'caso-2',
        label: 'Video — Caso Cliente 2',
        path: 'videos/casos/cliente-2.mp4',
        type: 'video',
        accept: 'video/mp4,video/webm',
      },
      {
        id: 'caso-3',
        label: 'Video — Caso Cliente 3',
        path: 'videos/casos/cliente-3.mp4',
        type: 'video',
        accept: 'video/mp4,video/webm',
      },
      {
        id: 'caso-4',
        label: 'Video — Caso Cliente 4',
        path: 'videos/casos/cliente-4.mp4',
        type: 'video',
        accept: 'video/mp4,video/webm',
      },
      {
        id: 'caso-5',
        label: 'Video — Caso Cliente 5',
        path: 'videos/casos/cliente-5.mp4',
        type: 'video',
        accept: 'video/mp4,video/webm',
      },
    ],
  },
]
