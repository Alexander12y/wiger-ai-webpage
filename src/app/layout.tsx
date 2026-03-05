import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import { headers } from "next/headers";
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

export const metadata: Metadata = {
  title: "Wiger AI — ERP + CRM para Manufactura y Distribución",
  description: "Plataforma de gestión unificada para manufactureros y distribuidores. Control de inventario, ventas, producción y clientes en un solo sistema diseñado para la industria.",
  icons: {
    icon: "/wiger_ai_chip.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read the nonce injected by middleware so Next.js can attach it to its own
  // inline scripts, keeping them compliant with our strict CSP (no unsafe-inline).
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} antialiased`}
        suppressHydrationWarning={true}
        {...(nonce ? { "data-nonce": nonce } : {})}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
