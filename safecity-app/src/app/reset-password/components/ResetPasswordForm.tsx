'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import {
  resetPasswordSchema,
  resetPasswordFormValues
} from '@/validations/auth/reset-password-schema'
import { ResetPasswordService } from '@/services/auth/reset-password-service'
import { ResetPasswordBody } from '@/interfaces/auth/reset-password-interfaces'
import { handleError } from '@/utils/reset-password.ts/handle-error'

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
import { Spinner } from '@/components/ui/spinner'

export default function ResetPasswordForm() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)

  const token = searchParams.get('token')
  const email = searchParams.get('email')

  const form = useForm<resetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: email ?? '',
      password: '',
      password_confirmation: ''
    }
  })

  const onSubmit = async (data: resetPasswordFormValues) => {
    if (!token || !email) return

    setLoading(true)
    try {
      const body: ResetPasswordBody = {
        ...data,
        token: token
      }

      await ResetPasswordService(body)
      toast.success('se actualizó correctamente la contraseña')
      router.push('/')
    } catch (error) {
      const msgError = handleError(error)
      toast.error(msgError)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!token || !email) {
      router.push('/')
    }
  }, [token, email, router])

  return (
    <div className='flex items-center justify-items-center min-h-screen '>
      <main className='w-[90%] sm:w-[40%] mx-auto my-auto '>
        <Card className=' '>
          <CardHeader>
            <CardTitle className='flex font-bold items-center justify-center text-xl'>
              Restablecer contraseña
            </CardTitle>
            <CardDescription className='flex  items-center justify-center '>
              Ingresa tu correo electrónico para restablecer tu contraseña, se le enviará un enlace
              de restablecimiento.
            </CardDescription>
          </CardHeader>
          <form id='form-login' onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className='mb-8'>
              <FieldGroup>
                <Controller
                  name='email'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='form-login-email'>Correo electrónico</FieldLabel>
                      <Input
                        {...field}
                        id='form-login-email'
                        aria-invalid={fieldState.invalid}
                        placeholder='tucorreo@ejemplo.com'
                        type='email'
                        disabled
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
            </CardContent>
            <CardFooter>
              <div className='grid grid-cols-1 w-full gap-4'>
                <Button type='submit' disabled={loading}>
                  {loading && <Spinner />}
                  Actualizar contraseña
                </Button>

                <Link href='/' className='w-full'>
                  <Button type='button' variant='outline' className='w-full'>
                    Iniciar sesión
                  </Button>
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  )
}
