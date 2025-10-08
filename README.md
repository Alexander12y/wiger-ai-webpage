# Wiger AI - Landing Page

Una landing page premium para Wiger AI con elementos 3D y experiencias de scrollytelling inmersivas.

## 🚀 Stack Tecnológico

- **Framework**: Next.js 15 con TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **3D Graphics**: react-three-fiber + @react-three/drei
- **Animaciones**: GSAP + ScrollTrigger + Lenis (smooth scroll)
- **Microinteracciones**: Framer Motion
- **Deployment**: Optimizado para Vercel

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
├── components/
│   ├── 3d/                # Componentes Three.js
│   │   ├── Scene3D.tsx    # Escena principal del héroe
│   │   └── WigerCube.tsx  # Cubo 3D animado
│   ├── sections/          # Secciones de la landing
│   │   └── ServicesSection.tsx
│   ├── ui/                # Componentes UI base (shadcn/ui)
│   └── SmoothScrollProvider.tsx # Proveedor de scroll suave
├── hooks/                 # Custom hooks
│   └── useGSAP.ts        # Hook para animaciones GSAP
├── lib/                  # Utilidades
│   └── utils.ts          # Funciones de utilidad
├── animations/           # Configuraciones de animación
│   └── scrollAnimations.ts
public/
└── models/               # Assets 3D (GLB/GLTF)
```

## 🛠️ Desarrollo

### Instalación
```bash
npm install
```

### Desarrollo Local
```bash
npm run dev
```

### Build de Producción
```bash
npm run build
```

### Linting
```bash
npm run lint
```

## ✨ Características

### 🎯 Héroe 3D
- Cubo Wiger AI animado con Three.js
- Rotación automática y hover effects
- Gradientes y sombras dinámicas
- Texto overlay responsivo

### 📜 Scrollytelling
- Smooth scroll con Lenis
- Animaciones GSAP activadas por scroll
- Efectos de parallax
- Transiciones fluidas entre secciones

### 🎨 Secciones
1. **Hero**: Escena 3D con call-to-action
2. **Servicios**: Grid animado de servicios
3. **About**: Información de la empresa
4. **Contact**: Formulario de contacto

### 📱 Responsive Design
- Mobile-first approach
- Breakpoints optimizados
- Touch gestures para móviles

## 🚀 Próximos Pasos

### Assets 3D
- [ ] Añadir modelo GLB optimizado del producto Wiger
- [ ] Implementar compresión Draco
- [ ] Optimizar texturas y materiales

### Animaciones Avanzadas
- [ ] Más efectos de parallax
- [ ] Morphing entre formas 3D
- [ ] Particles systems

### Performance
- [ ] Lazy loading de componentes 3D
- [ ] Image optimization
- [ ] Bundle analysis y optimización

### Contenido
- [ ] Copys definitivos
- [ ] Imágenes de alta calidad
- [ ] Testimonios de clientes

---

Desarrollado con ❤️ para Wiger AI

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
