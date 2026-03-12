import { Geist, Geist_Mono, Syne } from "next/font/google";
import { getLocale } from "next-intl/server";
import { headers } from "next/headers";
import Script from "next/script";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-LYDLPBDY2Q"
          strategy="afterInteractive"
          nonce={nonce}
        />
        <Script id="gtag-init" strategy="afterInteractive" nonce={nonce}>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LYDLPBDY2Q');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
