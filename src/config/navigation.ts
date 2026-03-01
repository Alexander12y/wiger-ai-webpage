export interface NavItem {
  name: string
  href: string
}

export const navItems: NavItem[] = [
  { name: 'Productos', href: '#productos' },
  { name: 'Clientes', href: '/clientes' },
  { name: 'Capacidades', href: '#sobre-nosotros' },
  { name: 'Impacto', href: '#marketing' },
]
