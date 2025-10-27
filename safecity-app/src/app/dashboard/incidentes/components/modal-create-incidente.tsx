'use client'

import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  CreateIncidentFormValues,
  CreateIncidentSchema
} from '@/validations/incident/incident-schema'
import { useIncidentCategory } from '@/hooks/use-incident-category'
import { IncidentStore } from '@/interfaces/incident/incident-storage-interface'
import { useGeolocation } from '@/hooks/use-geolocation'
import { createIncidentService } from '@/services/incident/incident-service'
import { handleError } from '../../../../utils/incident/handle-error'

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
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { toast } from 'sonner'
import { Plus } from 'lucide-react'

interface ModalCreateIncidenteProps {
  onCreated?: () => void
}

export default function ModalCreateIncidente({ onCreated }: ModalCreateIncidenteProps) {
  const { incidentCategories: data, fetchIncidentCategories } = useIncidentCategory()
  const {
    location,
    loading: locLoading,
    error: locError,
    fetchLocation,
    setLocation
  } = useGeolocation()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<CreateIncidentFormValues>({
    resolver: zodResolver(CreateIncidentSchema),
    defaultValues: {
      category_id: 1,
      description: ''
    }
  })

  useEffect(() => {
    if (open) {
      fetchIncidentCategories()
    } else {
      setLocation(null)
    }
  }, [open, fetchIncidentCategories, setLocation])

  useEffect(() => {
    if (open) fetchLocation()
  }, [open, fetchLocation])

  const onSubmit = async (body: CreateIncidentFormValues) => {
    if (!location) {
      toast.error('No hay ubicación, no se puede enviar el incidente.')
      return
    }

    setLoading(true)
    try {
      const incidentBody: IncidentStore = {
        ...body,
        location: {
          type: 'Point',
          coordinates: [location.lng, location.lat]
        }
      }

      await createIncidentService(incidentBody)
      onCreated?.()
      form.reset()
      toast.success('Se creó correctamente el incidente')
      setOpen(false)
    } catch (error) {
      const msgError = handleError(error)
      toast.error(msgError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <form id='form-create-incident' className='mb-2' onSubmit={form.handleSubmit(onSubmit)}>
        <DialogTrigger asChild>
          <Button size='lg'>
            <Plus /> Nuevo incidente
          </Button>
        </DialogTrigger>

        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Crear un nuevo incidente</DialogTitle>
          </DialogHeader>
          <DialogDescription className='sr-only'>
            Complete los campos a continuación para registrar un nuevo incidente en el sistema.
          </DialogDescription>

          <FieldGroup>
            <Controller
              name='category_id'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-create-incident-category'>Categoría</FieldLabel>
                  <Select
                    name={field.name}
                    value={String(field.value)}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger id='form-create-incident-category'>
                      <SelectValue placeholder='Seleccione categoría' />
                    </SelectTrigger>
                    <SelectContent position='item-aligned'>
                      {data?.map((cat) => (
                        <SelectItem key={cat.id} value={String(cat.id)}>
                          {cat.attributes.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name='description'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-create-incident-descripcion'>Descripción</FieldLabel>
                  <Textarea
                    {...field}
                    id='form-create-incident-descripcion'
                    aria-invalid={fieldState.invalid}
                    placeholder='Describa el incidente aquí...'
                    className='min-h-[120px]'
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Card className='mt-4'>
              <CardHeader>
                <CardTitle> Ubicación actual</CardTitle>
              </CardHeader>
              <CardContent>
                {locLoading && (
                  <p className='text-sm text-muted-foreground'>Obteniendo ubicación...</p>
                )}
                {locError && <p className='text-sm text-destructive'>{locError}</p>}
                {location && (
                  <div className='text-sm'>
                    {location.lat},{location.lng}
                  </div>
                )}
                {!locLoading && !locError && !location && (
                  <p className='text-sm text-muted-foreground'>Sin datos de ubicación.</p>
                )}
              </CardContent>
            </Card>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancelar</Button>
            </DialogClose>
            <Button type='submit' form='form-create-incident' disabled={loading}>
              {loading && <Spinner />}
              Guardar incidente
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
