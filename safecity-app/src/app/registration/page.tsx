'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/validations/auth/register-schema'
import { registerService } from '@/services/auth/register-service'
import { RegisterUserFormValues } from '@/interfaces/auth/register-interfaces'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { handleError } from '../../utils/registration/handle-error'
import { Spinner } from '@/components/ui/spinner'

export default function RegistrationPage() {
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const form = useForm<RegisterUserFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      last_name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  })

  const onSubmit = async (data: RegisterUserFormValues) => {
    setLoading(true)
    try {
      const res = await registerService(data)
      if (res.data) {
        toast.success('Registro exitoso')
        router.push('/')
      }
    } catch (err) {
      const msgError = handleError(err)
      toast.error(msgError)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-items-center min-h-screen '>
      <main className='w-[90%] sm:w-[40%] mx-auto my-auto '>
        <Card className='my-8'>
          <CardHeader>
            <CardTitle className='flex font-bold items-center justify-center text-xl'>
              Safe City.
            </CardTitle>
            <CardDescription className='flex  items-center justify-center '>
              Crea tu cuenta reporta incidentes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form id='form-register' className='mb-2' onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup className='grid grid-cols-2 gap-4'>
                <Controller
                  name='name'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} orientation='vertical'>
                      <FieldLabel htmlFor='form-register-name'>Nombres</FieldLabel>
                      <Input
                        {...field}
                        id='form-register-name'
                        aria-invalid={fieldState.invalid}
                        placeholder='John Doe'
                        autoComplete='off'
                        type='text'
                        required
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name='last_name'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='form-register-lastname'>Apellidos</FieldLabel>
                      <Input
                        {...field}
                        id='form-register-lastname'
                        aria-invalid={fieldState.invalid}
                        placeholder='Smith Williams'
                        autoComplete='off'
                        type='text'
                        required
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>

              <FieldGroup className='mt-8'>
                <Controller
                  name='email'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='form-register-mail'>Correo electrónico</FieldLabel>
                      <Input
                        {...field}
                        id='form-register-mail'
                        aria-invalid={fieldState.invalid}
                        placeholder='tucorreo@ejemplo.com'
                        autoComplete='off'
                        type='email'
                        required
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name='password'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='form-register-password'>Contraseña</FieldLabel>
                      <Input
                        {...field}
                        id='form-register-password'
                        aria-invalid={fieldState.invalid}
                        placeholder='***********'
                        autoComplete='off'
                        type='password'
                        required
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
                <Controller
                  name='password_confirmation'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='form-register-password-confirmation'>
                        Confirmar contraseña
                      </FieldLabel>
                      <Input
                        {...field}
                        id='form-register-password-confirmation'
                        aria-invalid={fieldState.invalid}
                        placeholder='***********'
                        autoComplete='off'
                        type='password'
                        required
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>
          <CardFooter>
            <div className='grid grid-cols-1 w-full gap-4'>
              <Button type='submit' form='form-register' disabled={loading}>
                {loading && <Spinner />}
                Crear cuenta
              </Button>

              <div>
                <p className='flex items-center justify-center text-muted-foreground'>
                  ¿Ya tienes cuenta?
                </p>
                <Link href='/' className='w-full'>
                  <Button type='button' variant='outline' className='w-full'>
                    Iniciar sesión
                  </Button>
                </Link>
              </div>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
