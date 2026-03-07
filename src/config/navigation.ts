export interface NavItem {
  name: string
  href: string
  children?: { name: string; href: string; description?: string }[]
}

export const navItems: NavItem[] = [
  { name: 'Productos', href: '#productos' },
  { name: 'Clientes', href: '/clientes' },
  { name: 'Sobre nosotros', href: '/sobre-nosotros' },
  {
    name: 'Industrias',
    href: '#',
    children: [
      {
        name: 'Redes Físicas',
        href: '/industrias/redes-fisicas',
        description: 'Lorem ipsum dolor sit amet',
      },
    ],
  },
  { name: 'Contacto', href: '/contacto' },
]
