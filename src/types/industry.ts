export interface IndustryPageData {
  slug: string
  name: string
  tagline: string
  hero: { headline: string; subheadline: string; ctaLabel: string }
  challenges: { title: string; description: string; icon: string }[]
  segments: { name: string; description: string }[]
  solutions: { title: string; description: string; features: string[] }[]
  metrics: { value: string; label: string }[]
  caseStudies: { company: string; result: string; quote: string; href?: string }[]
  faqs: { question: string; answer: string }[]
}
