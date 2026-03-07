'use client'

import dynamic from 'next/dynamic'
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustedByStrip } from "@/components/sections/TrustedByStrip";
import { ExpandableServicesSection } from "@/components/sections/ExpandableServicesSection";
import { MetricsSection } from "@/components/sections/MetricsSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/Footer";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

const CapabilitiesGrid = dynamic(
  () => import('@/components/sections/CapabilitiesGrid').then(m => ({ default: m.CapabilitiesGrid })),
  {
    loading: () => (
      <div
        style={{ backgroundColor: 'var(--color-surface-page)', minHeight: '600px' }}
        className="py-24 lg:py-32 px-6"
      />
    ),
    ssr: false,
  }
)

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="w-full">
        <HeroSection />
        <TrustedByStrip />
        <ExpandableServicesSection />
        <CapabilitiesGrid />
        <MetricsSection />
        <CTASection />
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
