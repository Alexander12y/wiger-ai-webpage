<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Proyecto Wiger AI - Landing Page

**Estado actual:** Proyecto con animación 3D de constelación de agentes

### Características actuales:
- ✅ Next.js 15 con TypeScript y Tailwind CSS
- ✅ Animación 3D "Constelación de agentes" con Three.js
- ✅ Componentes de secciones (Hero, Services)
- ✅ Sistema de scroll suave (Lenis)
- ✅ Responsive design
- ✅ Fondo claro con paleta azul/gris
- ✅ Fallbacks para accesibilidad y WebGL

### Estructura del proyecto:
```
src/
├── app/
│   ├── page.tsx (página principal)
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── 3d/
│   │   ├── Scene3D.tsx (escena 3D)
│   │   ├── AgentConstellation.tsx (animación principal)
│   │   └── StaticAgentFallback.tsx (fallback estático)
│   ├── sections/
│   │   └── ServicesSection.tsx
│   ├── ui/
│   └── Navbar.tsx
└── hooks/
    ├── useGSAP.ts
    └── useMotion.ts (detección de prefers-reduced-motion y WebGL)
```

### Tecnologías principales:
- **Framework:** Next.js 15 con App Router
- **Styling:** Tailwind CSS
- **3D Graphics:** Three.js + React Three Fiber + Drei
- **Animations:** GSAP
- **Scroll:** Lenis para scroll suave
- **TypeScript:** Para type safety

### Animación actual: Constelación de agentes
- **Metáfora:** Nodo central que despierta micro-agentes para resolver tareas
- **Elementos:** 
  - Nodo central azul con pulso
  - 8-12 agentes (esferas) que se activan progresivamente
  - Conexiones dinámicas entre agentes activos
  - Checkmarks para tareas completadas
  - Anillo de pulso expansivo
- **Colores:** Paleta azul/gris para fondo claro
- **Accesibilidad:** Respeta prefers-reduced-motion

### Hero Content:
- **Título:** "El sistema AI para manufactureros y distribuidores."
- **Subtítulo:** "Una plataforma AI unificada que mantiene tus activos más importantes administrados, todas las decisiones correctas y experiencias inmersivas para ti y para tus clientes."

### Características técnicas:
- **Rendimiento:** ≤ 150KB JS optimizado
- **Fallbacks:** WebGL detection + static fallback
- **Accesibilidad:** prefers-reduced-motion support
- **SEO:** SSR para content, hidratación posterior de animación

### Instrucciones para desarrollo:
- Mantener la animación de constelación performante
- Usar fondo claro con gradientes sutiles
- Seguir el patrón de componentes establecido
- Mantener responsive design y accesibilidad