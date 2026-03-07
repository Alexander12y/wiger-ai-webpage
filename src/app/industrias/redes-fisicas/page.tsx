import { Metadata } from 'next'
import IndustryPageTemplate from '@/components/templates/IndustryPageTemplate'
import { IndustryPageData } from '@/types/industry'

export const metadata: Metadata = {
  title: 'Redes Físicas — Wiger AI',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Soluciones de inteligencia artificial para fabricantes y distribuidores de redes físicas.',
}

const redesFisicasData: IndustryPageData = {
  slug: 'redes-fisicas',
  name: 'Redes Físicas',
  tagline: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',

  hero: {
    headline: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod',
    subheadline:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam.',
    ctaLabel: 'Solicitar demostración',
  },

  challenges: [
    {
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      icon: '🏭',
    },
    {
      title: 'Consectetur adipiscing elit',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      icon: '📦',
    },
    {
      title: 'Sed do eiusmod tempor',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      icon: '🔗',
    },
    {
      title: 'Incididunt ut labore',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      icon: '⚙️',
    },
    {
      title: 'Et dolore magna aliqua',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam quis nostrud exercitation.',
      icon: '📊',
    },
    {
      title: 'Ut enim ad minim veniam',
      description:
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit.',
      icon: '🌐',
    },
  ],

  segments: [
    {
      name: 'Redes deportivas',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    },
    {
      name: 'Redes de seguridad en construcción',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
    },
    {
      name: 'Malla industrial',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
      name: 'Redes agrícolas',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.',
    },
    {
      name: 'Redes de contención',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam quis nostrud.',
    },
    {
      name: 'Distribución mayorista',
      description:
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor.',
    },
  ],

  solutions: [
    {
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud.',
      features: [
        'Lorem ipsum dolor sit amet consectetur',
        'Adipiscing elit sed do eiusmod tempor',
        'Incididunt ut labore et dolore magna',
        'Aliqua ut enim ad minim veniam',
      ],
    },
    {
      title: 'Consectetur adipiscing elit',
      description:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit.',
      features: [
        'Quis nostrud exercitation ullamco laboris',
        'Nisi ut aliquip ex ea commodo consequat',
        'Duis aute irure dolor in reprehenderit',
        'In voluptate velit esse cillum dolore',
      ],
    },
    {
      title: 'Sed do eiusmod tempor',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident.',
      features: [
        'Excepteur sint occaecat cupidatat non',
        'Proident sunt in culpa qui officia',
        'Deserunt mollit anim id est laborum',
        'Lorem ipsum dolor sit amet consectetur',
      ],
    },
    {
      title: 'Incididunt ut labore et dolore',
      description:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum lorem ipsum dolor sit amet.',
      features: [
        'Adipiscing elit sed do eiusmod tempor',
        'Incididunt ut labore et dolore magna',
        'Aliqua ut enim ad minim veniam quis',
        'Nostrud exercitation ullamco laboris',
      ],
    },
  ],

  metrics: [
    { value: 'XX%', label: 'Lorem ipsum dolor' },
    { value: 'XXx', label: 'Consectetur adipiscing' },
    { value: 'XX%', label: 'Sed do eiusmod' },
    { value: 'XXk+', label: 'Incididunt ut labore' },
  ],

  caseStudies: [
    {
      company: 'Lorem Ipsum S.A.',
      result: 'XX% lorem ipsum dolor sit amet',
      quote:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation.',
    },
    {
      company: 'Consectetur Dolor Ltda.',
      result: 'XXx lorem ipsum consectetur',
      quote:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit.',
    },
    {
      company: 'Eiusmod Tempor Corp.',
      result: 'XX% lorem ipsum eiusmod',
      quote:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident sunt.',
    },
  ],

  faqs: [
    {
      question: 'Lorem ipsum dolor sit amet consectetur adipiscing elit?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      question: 'Sed do eiusmod tempor incididunt ut labore et dolore?',
      answer:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      question: 'Ut enim ad minim veniam quis nostrud exercitation ullamco?',
      answer:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate.',
    },
    {
      question: 'Excepteur sint occaecat cupidatat non proident sunt in culpa?',
      answer:
        'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod.',
    },
    {
      question: 'Quis nostrud exercitation ullamco laboris nisi ut aliquip?',
      answer:
        'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
  ],
}

export default function RedesFisicasPage() {
  return <IndustryPageTemplate data={redesFisicasData} />
}
