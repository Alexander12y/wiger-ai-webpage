export interface NavItem {
  name: string
  href: string
}

export const navItems: NavItem[] = [
  { name: 'Productos', href: '#productos' },
  { name: 'Clientes', href: '/clientes' },
  { name: 'Sobre nosotros', href: '/sobre-nosotros' },
  { name: 'Impacto', href: '#marketing' },
  { name: 'Contacto', href: '/contacto' },
]
