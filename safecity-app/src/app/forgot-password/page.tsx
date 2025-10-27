'use client'

import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { ForgotPasswordFormValues } from '@/interfaces/auth/forgot-password-interfaces'
import { forgotPasswordService } from '@/services/auth/forgot-password-service'
import { forgotPasswordSchema } from '@/validations/auth/forgot-password-schema'

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

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setLoading(true)
    try {
      const res = await forgotPasswordService(data)
      const { status, email } = res.data

      if (status) {
        toast.success('Correo de restablecimiento enviado correctamente.')
        router.push('/')
        return
      }

      if (email === "We can't find a user with that email address.") {
        toast.error(' No se encontró un usuario con ese correo electrónico.')
        return
      }

      if (email === 'Please wait before retrying.') {
        toast.error(' Por favor espera antes de volver a intentarlo.')
        return
      }

      console.log(' Error inesperado en la respuesta del servidor:', res.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errormsg = error?.message
        toast.error(errormsg)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-items-center min-h-screen '>
      <main className='w-[90%] sm:w-[40%]  mx-auto my-auto '>
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
                  Enviar enlace de restablecimiento
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
