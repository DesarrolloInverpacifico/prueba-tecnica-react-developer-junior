'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  CreateCategoryFormValues,
  CreateCategorySchema
} from '@/validations/category/category-schema'
import { CategoryStore } from '@/interfaces/incident-category/category-storage-interface'
import { createIncidentCategoryService } from '@/services/incident-category/incident-category-service'
import { handleError } from '../../../../utils/incident-category/handle-error'

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
import { Spinner } from '@/components/ui/spinner'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Plus } from 'lucide-react'

interface ModalCreateCategoriaProps {
  onCreated?: () => void
}

export default function ModalCreateCategoria({ onCreated }: ModalCreateCategoriaProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(CreateCategorySchema),
    defaultValues: {
      name: ''
    }
  })

  const onSubmit = async (body: CreateCategoryFormValues) => {
    setLoading(true)
    try {
      const categoryBody: CategoryStore = {
        ...body
      }

      await createIncidentCategoryService(categoryBody)
      onCreated?.()
      form.reset()
      toast.success('Se creó correctamente la categoría')
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
      <form id='form-create-category' className='mb-2' onSubmit={form.handleSubmit(onSubmit)}>
        <DialogTrigger asChild>
          <Button size='lg' aria-label='Agregar nueva categoría'>
            <Plus /> Nueva Categoría
          </Button>
        </DialogTrigger>

        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Crear un nuevo categoría</DialogTitle>
          </DialogHeader>
          <DialogDescription className='sr-only'>
            Complete los campos a continuación para registrar un nuevo categoría en el sistema.
          </DialogDescription>

          <FieldGroup className='my-4'>
            <Controller
              name='name'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='form-create-category-name'>
                    Nombre de la categoría
                  </FieldLabel>
                  <Input
                    {...field}
                    id='form-create-category-name'
                    aria-invalid={fieldState.invalid}
                    placeholder='Escriba la categoría'
                    type='text'
                    required
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant='outline'>Cancelar</Button>
            </DialogClose>
            <Button type='submit' form='form-create-category' disabled={loading}>
              {loading && <Spinner />}
              Guardar categoría
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
