# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start local dev server (Next.js)
npm run build    # Production build
npm run start    # Run production build locally
npm run lint     # Run ESLint
```

No test framework is configured in this project.

## Architecture

This is a single-page marketing landing site for **Wiger AI** — an AI platform targeting manufacturers and distributors. It uses **Next.js 15 App Router** with TypeScript and Tailwind CSS v4.

### Page Composition

`src/app/layout.tsx` renders `<Navbar>` globally, then the page content. `src/app/page.tsx` is a client component (`'use client'`) that wraps everything in `<SmoothScrollProvider>` (Lenis) and renders sections in this order:

1. **Hero** — full-screen video background (`/videos/hero-background.mp4`) with text overlay and CTA buttons
2. `<ClientLogosSection>` — logos of client companies
3. `<ExpandableServicesSection>` — interactive services grid
4. `<VideoTextSection>` — video + text split layout
5. `<Footer>`

### Key Conventions

- **Styling**: Use inline `style` for brand colors (not Tailwind classes) so they're easy to identify and update. The brand palette is: `#2979FF` (primary blue), `#00E5FF` (accent cyan), `#4DA6FF` (light blue), `#FFFFFF` / `#EDEDED` (text).
- **Tailwind** is used for layout, spacing, and responsive utilities; brand colors go in `style` props.
- **No global state manager** — components are self-contained.
- **Animation libraries available**: GSAP, Framer Motion, and Lenis (smooth scroll). The `SmoothScrollProvider` must wrap all scrollable content.
- **Three.js stack** (`@react-three/fiber`, `@react-three/drei`) is installed but not currently used in active components. Use `useReducedMotion()` and `useWebGLSupport()` from `src/hooks/useMotion.ts` before rendering any 3D or heavy animation.

### Navigation

Nav links are defined centrally in `src/config/navigation.ts` as anchor hrefs (e.g. `#productos`). Update that file when adding or renaming sections.

### Fonts

Geist Sans and Geist Mono loaded via `next/font/google` in `layout.tsx`, exposed as CSS variables `--font-geist-sans` and `--font-geist-mono`.

### Deployment

Optimized for Vercel. No special environment variables are required.
