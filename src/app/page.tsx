'use client'

import { HeroSection } from "@/components/sections/HeroSection";
import { TrustedByStrip } from "@/components/sections/TrustedByStrip";
import { ExpandableServicesSection } from "@/components/sections/ExpandableServicesSection";
import { CapabilitiesGrid } from "@/components/sections/CapabilitiesGrid";
import { MetricsSection } from "@/components/sections/MetricsSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/Footer";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

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
