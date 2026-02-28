export interface NavItem {
  name: string
  href: string
}

export const navItems: NavItem[] = [
  { name: 'Productos', href: '#productos' },
  { name: 'Clientes', href: '/clientes' },
  { name: 'Sobre Nosotros', href: '#sobre-nosotros' },
  { name: 'Marketing', href: '#marketing' }
]
