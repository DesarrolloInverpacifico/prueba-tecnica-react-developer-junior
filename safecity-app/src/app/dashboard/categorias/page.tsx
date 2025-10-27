'use client'
import { useEffect, useRef } from 'react'
import { useIncidentCategory } from '@/hooks/use-incident-category'
import { usePagination } from '@/hooks/use-pagination'
import { useRequireRole } from '@/hooks/use-require-role'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import { CategoriasTable } from './components/categorias-table'
import { categoriasColumns } from './components/categorias-table-columns'
import { Skeleton } from '@/components/ui/skeleton'
import { PaginationControls } from '@/components/pagination/pagination-controls'
import CardUnauthorized from '@/components/unauthorized/card-unauthorized'
import ModalCreateCategoria from './components/modal-create-categoria'

export default function CategoriasPage() {
  const { fetchIncidentCategories, incidentCategories: data, loading } = useIncidentCategory()
  const { page, totalPages, paginatedData, goToPage } = usePagination(data ?? [], 5)

  const { isAuthorized } = useRequireRole(['admin'])

  const fetched = useRef(false)

  useEffect(() => {
    if (fetched.current || !isAuthorized) return
    fetched.current = true

    fetchIncidentCategories()
  }, [fetchIncidentCategories, isAuthorized])

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
          <ItemTitle className='text-2xl font-bold'>Gestión de categorías</ItemTitle>
          <ItemDescription>Esta es la página de gestión de categorías</ItemDescription>
        </ItemContent>
        <ItemActions>
          <ModalCreateCategoria onCreated={fetchIncidentCategories} />
        </ItemActions>
      </Item>

      <Card>
        <CardHeader>
          <CardTitle className=' font-bold'>Lista de categorías</CardTitle>
          <CardDescription className=''>
            Esta es la lista de todas las categorías registradas.
          </CardDescription>
        </CardHeader>
        {loading ? (
          <div className='flex justify-center items-center'>
            <Skeleton className=' w-11/12 rounded-xl  h-[300px]' />
          </div>
        ) : (
          <CardContent>
            <CategoriasTable columns={categoriasColumns} data={paginatedData} />
            <PaginationControls page={page} totalPages={totalPages} onPageChange={goToPage} />
          </CardContent>
        )}
      </Card>
    </div>
  )
}
