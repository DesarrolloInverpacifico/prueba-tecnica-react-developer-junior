'use client'

import { Incident } from '@/interfaces/incident/incident-interface'
import { STATUS_LABELS, STATUS_STYLES } from '@/constants/status'

import { Badge } from '@/components/ui/badge'
import { ColumnDef } from '@tanstack/react-table'
import ModalViewIncidente from './modal-view-incidente'

export const incidentColumns: ColumnDef<Incident>[] = [
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorFn: (row) => row.attributes.description,
    header: 'Reporte',
    cell: ({ row }) => (
      <div className='w-60 overflow-hidden text-ellipsis'>
        {row.original.attributes.description}
      </div>
    )
  },
  {
    accessorFn: (row) => row.relationships.category.attributes.name,
    header: 'Categoría'
  },
  {
    accessorFn: (row) => row.attributes.status,
    header: 'Estado',
    cell: ({ row }) => (
      <div className='w-32'>
        <Badge
          variant='outline'
          className={STATUS_STYLES[row.original.attributes.status] || 'bg-gray-100 text-gray-700'}
        >
          {STATUS_LABELS[row.original.attributes.status] || row.original.attributes.status}
        </Badge>
      </div>
    )
  },
  {
    accessorFn: (row) => {
      const date = new Date(row.attributes.reported_at)
      return date.toLocaleString('es-CO', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'America/Bogota'
      })
    },
    id: 'reported_at',
    header: 'Fecha del reporte'
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const payment = row.original

      return <ModalViewIncidente id={payment.id} />
    }
  }
]
