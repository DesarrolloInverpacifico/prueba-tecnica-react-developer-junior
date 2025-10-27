'use client'

import { Button } from '@/components/ui/button'
import { IncidentCategory } from '@/interfaces/incident-category/incident-category-interface'
import { ColumnDef } from '@tanstack/react-table'
import { Pencil, Trash } from 'lucide-react'

export const categoriasColumns: ColumnDef<IncidentCategory>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorFn: (row) => row.attributes.name,
    header: 'Categoría'
  },
  {
    accessorFn: (row) => row.attributes.description,
    header: 'Descripción'
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const payment = row.original

      return (
        <div className='flex justify-center'>
          <Button
            className='h-8 w-8 p-0 mr-4'
            onClick={() => navigator.clipboard.writeText(payment.id.toString())}
          >
            <span className='sr-only'>edit</span>
            <Pencil className='h-4 w-4' />
          </Button>
          <Button
            variant='destructive'
            className='h-8 w-8 p-0'
            onClick={() => navigator.clipboard.writeText(payment.id.toString())}
          >
            <span className='sr-only'>delete</span>
            <Trash className='h-4 w-4' />
          </Button>
        </div>
      )
    }
  }
]
