import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localePrefix: 'as-needed',
  localeDetection: true,
  pathnames: {
    '/': '/',
    '/contacto': {
      es: '/contacto',
      en: '/contact',
    },
    '/sobre-nosotros': {
      es: '/sobre-nosotros',
      en: '/about-us',
    },
    '/clientes': {
      es: '/clientes',
      en: '/clients',
    },
    '/clientes/sercodam': {
      es: '/clientes/sercodam',
      en: '/clients/sercodam',
    },
    '/industrias/redes-fisicas': {
      es: '/industrias/redes-fisicas',
      en: '/industries/physical-nets',
    },
  },
})

export type Pathnames = keyof typeof routing.pathnames
export type Locale = (typeof routing.locales)[number]
