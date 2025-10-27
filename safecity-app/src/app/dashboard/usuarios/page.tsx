'use client'

import { useRequireRole } from '@/hooks/use-require-role'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Item, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import CardUnauthorized from '@/components/unauthorized/card-unauthorized'
import { Skeleton } from '@/components/ui/skeleton'
import { Construction } from 'lucide-react'

export default function UsuariosPage() {
  const { isAuthorized } = useRequireRole(['admin'])

  if (isAuthorized === null) {
    return (
      <div className='flex justify-center items-center h-[60vh]'>
        <Skeleton className='w-11/12 h-[300px] rounded-xl' />
      </div>
    )
  }

  if (!isAuthorized) {
    return <CardUnauthorized />
  }
  return (
    <div>
      <Item>
        <ItemContent>
          <ItemTitle className='text-2xl font-bold'>Usuario</ItemTitle>
          <ItemDescription>Esta es la página de gestión de usuario</ItemDescription>
        </ItemContent>
      </Item>
      <div className='flex justify-center items-center mt-4 '>
        <Card className='w-[90%] sm:w-[50%]'>
          <CardHeader className='flex flex-col items-center text-center space-y-3'>
            <Construction size={48} className='text-muted-foreground' />
            <CardTitle className='font-bold text-xl'>Estamos trabajando en esta página</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className='text-center'>
              la página de usuario estará disponible próximamente.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
