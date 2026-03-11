import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Metadata } from 'next'
import IndustryPageTemplate from '@/components/templates/IndustryPageTemplate'
import { IndustryPageData } from '@/types/industry'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'industryRedesFisicas' })
  return {
    title: t('title'),
    description: t('description'),
  }
}

export default async function RedesFisicasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations({ locale, namespace: 'industryRedesFisicas' })

  const redesFisicasData: IndustryPageData = {
    slug: 'redes-fisicas',
    name: t('name'),
    tagline: t('tagline'),
    heroImage: '/optimized/physicalnet_industy_hero.webp',
    hero: {
      headline: t('heroHeadline'),
      headlineAccent: t('heroHeadlineAccent'),
      subheadline: t('heroSubheadline'),
      ctaLabel: t('heroCtaLabel'),
    },
    challengesHeading: t('challengesHeading'),
    challenges: t.raw('challenges'),
    segmentsHeading: t('segmentsHeading'),
    segments: t.raw('segments'),
    solutionsHeading: t('solutionsHeading'),
    solutions: t.raw('solutions'),
    metricsHeading: t('metricsHeading'),
    metrics: t.raw('metrics'),
    caseStudiesHeading: t('caseStudiesHeading'),
    caseStudies: t.raw('caseStudies'),
    faqHeading: t('faqHeading'),
    faqs: t.raw('faqs'),
    ctaHeading: t('ctaHeading'),
    ctaText: t('ctaText'),
  }

  return <IndustryPageTemplate data={redesFisicasData} />
}
