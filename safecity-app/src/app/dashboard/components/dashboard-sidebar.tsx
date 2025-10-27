import * as React from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/auth-context'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail
} from '@/components/ui/sidebar'
import NavUser from './nav-user'
import {
  GalleryVerticalEnd,
  LayoutDashboard,
  User,
  SquareStack,
  Building,
  TriangleAlert
} from 'lucide-react'

export function DashboardSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, roles, logout } = useAuth()

  const navMain = [
    { title: 'Dashboard', url: '/', icon: LayoutDashboard, roles: ['admin', 'user'] },
    { title: 'Usuarios', url: '/usuarios', icon: User, roles: ['admin'] },
    { title: 'Categorías', url: '/categorias', icon: SquareStack, roles: ['admin'] },
    {
      title: 'Centros de control',
      url: '/centros-de-control',
      icon: Building,
      roles: ['admin']
    },
    { title: 'Incidentes', url: '/incidentes', icon: TriangleAlert, roles: ['admin', 'user'] }
  ]

  const filteredNav = navMain.filter((item) => item.roles.some((r) => roles.includes(r)))

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <a href='#'>
                <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                  <GalleryVerticalEnd className='size-4' />
                </div>
                <div className='flex flex-col gap-0.5 leading-none'>
                  <span className='font-medium'>SafeCity</span>
                  <span className=''>v0.1.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {filteredNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <Link href={`/dashboard${item.url}`}>
                  <SidebarMenuButton>
                    {item.icon && <item.icon />}
                    {item.title}
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} logout={logout}></NavUser>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
