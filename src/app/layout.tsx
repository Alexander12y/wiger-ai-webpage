import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const DESCRIPTION = "Plataforma de gestión unificada para manufactureros y distribuidores. Control de inventario, ventas, producción y clientes en un solo sistema diseñado para la industria.";

export const metadata: Metadata = {
  metadataBase: new URL('https://wiger.ai'),
  title: "Wiger AI — ERP + CRM para Manufactura y Distribución",
  description: DESCRIPTION,
  robots: { index: true, follow: true, nocache: false },
  openGraph: {
    title: "Wiger AI — ERP + CRM para Manufactura y Distribución",
    description: DESCRIPTION,
    url: 'https://wiger.ai',
    siteName: 'Wiger AI',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Wiger AI' }],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Wiger AI — ERP + CRM para Manufactura y Distribución",
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
