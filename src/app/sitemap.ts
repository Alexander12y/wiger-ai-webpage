import { MetadataRoute } from 'next'

const BASE_URL = 'https://wiger.ai'

const routes = [
  { path: '', priority: 1 },
  { path: '/contacto', priority: 0.8, enPath: '/en/contact' },
  { path: '/sobre-nosotros', priority: 0.7, enPath: '/en/about-us' },
  { path: '/clientes', priority: 0.7, enPath: '/en/clients' },
  { path: '/clientes/sercodam', priority: 0.6, enPath: '/en/clients/sercodam' },
  { path: '/industrias/redes-fisicas', priority: 0.7, enPath: '/en/industries/physical-networks' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const route of routes) {
    // Spanish (default, no prefix)
    entries.push({
      url: `${BASE_URL}${route.path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: route.priority,
      alternates: route.enPath
        ? {
            languages: {
              es: `${BASE_URL}${route.path}`,
              en: `${BASE_URL}${route.enPath}`,
            },
          }
        : undefined,
    })

    // English (with /en prefix)
    if (route.enPath) {
      entries.push({
        url: `${BASE_URL}${route.enPath}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route.priority,
        alternates: {
          languages: {
            es: `${BASE_URL}${route.path}`,
            en: `${BASE_URL}${route.enPath}`,
          },
        },
      })
    }
  }

  return entries
}
