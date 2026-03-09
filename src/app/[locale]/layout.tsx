import type { Metadata } from "next";
import { headers } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = messages.metadata;

  return {
    metadataBase: new URL("https://wiger.ai"),
    title: t.title,
    description: t.description,
    icons: { icon: "/wiger_chip.png" },
    robots: { index: true, follow: true, nocache: false },
    openGraph: {
      title: t.title,
      description: t.description,
      url: "https://wiger.ai",
      siteName: "Wiger AI",
      images: [
        { url: "/og-image.png", width: 1200, height: 630, alt: "Wiger AI" },
      ],
      locale: locale === "en" ? "en_US" : "es_MX",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.twitterTitle,
      description: t.description,
      images: ["/og-image.png"],
    },
    alternates: {
      languages: {
        es: "https://wiger.ai",
        en: "https://wiger.ai/en",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "es" | "en")) {
    notFound();
  }

  setRequestLocale(locale);

  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const messages = await getMessages();

  return (
    <div {...(nonce ? { "data-nonce": nonce } : {})}>
      <NextIntlClientProvider messages={messages}>
        <Navbar />
        {children}
      </NextIntlClientProvider>
    </div>
  );
}
