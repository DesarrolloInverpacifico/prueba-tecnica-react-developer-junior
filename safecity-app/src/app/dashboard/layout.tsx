'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from 'react'

import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { DashboardSidebar } from './components/dashboard-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { AuthProvider } from '@/context/auth-context'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const segments = pathname.split('/')
  const crumbs = segments.slice(1)

  return (
    <AuthProvider>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>
          <header className='flex h-16 shrink-0 items-center gap-2 border-b'>
            <div className='flex items-center gap-2 px-3'>
              <SidebarTrigger />
              <Separator orientation='vertical' className='mr-2 h-4' />

              <Breadcrumb>
                <BreadcrumbList>
                  {crumbs.map((segment, index) => {
                    const href = `/${crumbs.slice(0, index + 1).join('/')}`
                    const isLast = index === crumbs.length - 1
                    const label = decodeURIComponent(segment)
                      .replace(/-/g, ' ')
                      .replace(/\b\w/g, (l) => l.toUpperCase())

                    return (
                      <React.Fragment key={href}>
                        {index > 0 && <BreadcrumbSeparator />}
                        <BreadcrumbItem>
                          {isLast ? (
                            <BreadcrumbPage>{label}</BreadcrumbPage>
                          ) : (
                            <BreadcrumbLink asChild>
                              <Link href={href}>{label}</Link>
                            </BreadcrumbLink>
                          )}
                        </BreadcrumbItem>
                      </React.Fragment>
                    )
                  })}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          <main className='flex flex-1 flex-col gap-4 p-4'>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </AuthProvider>
  )
}
