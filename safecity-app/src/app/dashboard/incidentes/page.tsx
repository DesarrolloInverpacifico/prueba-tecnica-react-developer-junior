'use client'
import { useEffect } from 'react'
import { useIncidentByRole } from '@/hooks/use-list-incident-by-rol'
import { useRequireRole } from '@/hooks/use-require-role'
import { usePagination } from '@/hooks/use-pagination'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import { Skeleton } from '@/components/ui/skeleton'
import { IncidenteTable } from '@/app/dashboard/incidentes/components/incidente-table'
import ModalCreateIncidente from '@/app/dashboard/incidentes/components/modal-create-incidente'
import { incidentColumns } from '@/app/dashboard/incidentes/components/incidente-table-columns'
import { PaginationControls } from '@/components/pagination/pagination-controls'
import CardUnauthorized from '@/components/unauthorized/card-unauthorized'
import { toast } from 'sonner'

export default function IncidentesPage() {
  const { items, loading, error, fetchIncident } = useIncidentByRole()
  const { page, totalPages, paginatedData, goToPage } = usePagination(items ?? [], 5)
  const { isAuthorized } = useRequireRole(['admin', 'user'])

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

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
          <ItemTitle className='text-2xl font-bold'>Gestión de incidentes</ItemTitle>
          <ItemDescription>Esta es la página de gestión de incidentes</ItemDescription>
        </ItemContent>
        <ItemActions>
          <ModalCreateIncidente onCreated={fetchIncident} />
        </ItemActions>
      </Item>

      <Card>
        <CardHeader>
          <CardTitle className='font-bold'>Lista de incidentes</CardTitle>
          <CardDescription>Esta es la lista de todos los incidentes registrados.</CardDescription>
        </CardHeader>

        {loading ? (
          <div className='flex justify-center items-center'>
            <Skeleton className=' w-11/12 rounded-xl  h-[300px]' />
          </div>
        ) : (
          <CardContent>
            <IncidenteTable columns={incidentColumns} data={paginatedData} />
            <PaginationControls page={page} totalPages={totalPages} onPageChange={goToPage} />
          </CardContent>
        )}
      </Card>
    </div>
  )
}
