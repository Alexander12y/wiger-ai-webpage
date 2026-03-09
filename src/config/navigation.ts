export interface NavItem {
  /** Translation key under the 'nav' namespace */
  labelKey: string
  href: string
  children?: { labelKey: string; href: string; descriptionKey?: string }[]
}

export const navItems: NavItem[] = [
  { labelKey: 'products', href: '#productos' },
  { labelKey: 'clients', href: '/clientes' },
  { labelKey: 'aboutUs', href: '/sobre-nosotros' },
  {
    labelKey: 'industries',
    href: '#',
    children: [
      {
        labelKey: 'physicalNetworks',
        href: '/industrias/redes-fisicas',
        descriptionKey: 'physicalNetworksDesc',
      },
    ],
  },
  { labelKey: 'contact', href: '/contacto' },
]
