'use client'
import { useState } from 'react'
import { Incident } from '@/interfaces/incident/incident-interface'
import { getByIdIncidentService } from '@/services/incident/incident-service'
import { STATUS_LABELS } from '@/constants/status'
import { handleError } from '@/utils/incident/handle-error'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { toast } from 'sonner'
import { Eye } from 'lucide-react'

interface ModalViewIncidenteProps {
  id: number
}

export default function ModalViewIncidente({ id }: ModalViewIncidenteProps) {
  const [open, setOpen] = useState(false)
  const [incident, setIncident] = useState<Incident | null>(null)
  const [loading, setLoading] = useState(false)

  const handleOpenChange = async (isOpen: boolean) => {
    setOpen(isOpen)

    if (isOpen) {
      try {
        setLoading(true)
        const res = await getByIdIncidentService(id.toString())
        setIncident(res.data)
      } catch (err) {
        const msgError = handleError(err)
        toast.error(msgError)
      } finally {
        setLoading(false)
      }
    } else {
      setIncident(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className='h-8 w-8 p-0 mr-4'>
          <span className='sr-only'>edit</span>
          <Eye className='h-4 w-4' />
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[525px]'>
        <DialogHeader>
          <DialogTitle>Ver incidente</DialogTitle>
        </DialogHeader>
        <DialogDescription>Información completa del reporte seleccionado</DialogDescription>
        {loading && (
          <div className='text-center py-6 text-sm text-muted-foreground'>Cargando...</div>
        )}
        {!loading && incident && (
          <div className='grid grid-cols-2 gap-4'>
            <div className='col-span-2'>
              <div className='font-bold'>Título</div>
              <div className='text-muted-foreground'>
                {incident.attributes.title ?? 'No se encontró un titulo'}
              </div>
            </div>
            <div>
              <div className='font-bold'>Categoría</div>
              <div className='text-muted-foreground'>
                {incident.relationships.category?.attributes?.name}
              </div>
            </div>
            <div>
              <div className='font-bold'>Estado</div>

              <div className='text-muted-foreground'>
                {STATUS_LABELS[incident.attributes.status] ?? '—'}
              </div>
            </div>
            <div className='col-span-2'>
              <div className='font-bold'>Descripción</div>
              <div className='text-muted-foreground'>{incident.attributes.description ?? '—'}</div>
            </div>
            <div className='col-span-2'>
              <div className='font-bold'>Locación</div>
              <div className='text-muted-foreground'>
                {incident.attributes.location?.coordinates?.join(', ') ?? 'Sin ubicación'}
              </div>
            </div>
            <div>
              <div className='font-bold'>Reportado por</div>
              <div className='text-muted-foreground'>
                {incident.relationships.reporter?.attributes?.name ?? '—'}
              </div>
            </div>
            <div>
              <div className='font-bold'>Fecha del reporte</div>
              <div className='text-muted-foreground'>
                {new Date(incident.attributes.reported_at).toLocaleString('es-CO')}
              </div>
            </div>
            <div>
              <div className='font-bold'>Fecha de verificación</div>
              <div className='text-muted-foreground'>
                {incident.attributes.assigned_at
                  ? new Date(incident.attributes.assigned_at).toLocaleString('es-CO')
                  : 'No verficado'}
              </div>
            </div>
            <div>
              <div className='font-bold'>Última actualización</div>
              <div className='text-muted-foreground'>
                {incident.attributes.updated_at
                  ? new Date(incident.attributes.updated_at).toLocaleString('es-CO')
                  : ''}
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline'>Cerrar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
