import { DM_Sans, IBM_Plex_Mono, Instrument_Serif } from "next/font/google";
import { getLocale } from "next-intl/server";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
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
        className={`${dmSans.variable} ${ibmPlexMono.variable} ${instrumentSerif.variable} antialiased`}
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
