export interface IndustryPageData {
  slug: string
  name: string
  tagline: string
  heroImage?: string
  hero: { headline: string; headlineAccent?: string; subheadline: string; ctaLabel: string }
  challengesHeading: string
  challenges: { title: string; description: string; icon: string }[]
  segmentsHeading: string
  segments: { name: string; description: string }[]
  solutionsHeading: string
  solutions: { title: string; description: string; features: string[] }[]
  metricsHeading: string
  metrics: { value: string; label: string }[]
  caseStudiesHeading: string
  caseStudies: { company: string; result: string; quote: string; href?: string }[]
  faqHeading: string
  faqs: { question: string; answer: string }[]
  ctaHeading: string
  ctaText: string
}
