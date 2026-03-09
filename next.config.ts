import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

// Static security headers applied to every response via Next.js.
// NOTE: Content-Security-Policy is intentionally absent here — it is generated
// dynamically in middleware.ts with a per-request nonce so that
// 'unsafe-inline' is not required for scripts.
const securityHeaders = [
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options",  value: "nosniff" },
  // Disallow embedding this site in any iframe (defense against clickjacking)
  { key: "X-Frame-Options",         value: "DENY" },
  // Legacy XSS filter (belt-and-suspenders for old browsers)
  { key: "X-XSS-Protection",        value: "1; mode=block" },
  // Limit referrer information sent to third parties
  { key: "Referrer-Policy",         value: "strict-origin-when-cross-origin" },
  // Disable browser features that are not needed on this site
  { key: "Permissions-Policy",      value: "camera=(), microphone=(), geolocation=(), payment=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [85],
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
