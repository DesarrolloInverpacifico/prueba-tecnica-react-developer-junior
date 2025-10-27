'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from 'axios'

import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/validations/auth/login-schema'
import { loginService } from '@/services/auth/login-service'
import { LoginFormValues } from '@/interfaces/auth/login-interfaces'
import { authStorage } from '@/lib/auth-storage'

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

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false)

  const router = useRouter()

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true)
    try {
      const res = await loginService(data)
      const token = res.data.attributes.access_token

      if (token) {
        authStorage.setToken(token)
        form.reset()
        toast.success('Inicio de sesión exitoso')
        router.push('/dashboard')
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorData = err.response?.data?.errors
        let errorMsg

        if (errorData?.email?.[0].includes('The provided credentials are incorrect.')) {
          errorMsg = 'Las credenciales son incorrectas'
        } else {
          errorMsg = 'Ocurrió un error inesperado.'
        }

        toast.error(errorMsg)
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
              Safe City.
            </CardTitle>
            <CardDescription className='flex  items-center justify-center '>
              Inicia sesión para reportar incidentes de seguridad
            </CardDescription>
          </CardHeader>
          <form id='form-login' onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className='mb-8'>
              <FieldGroup className='mb-3'>
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
                <Controller
                  name='password'
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor='form-login-password'>Contraseña</FieldLabel>
                      <Input
                        {...field}
                        id='form-login-password'
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

              <Link className='text-sm ' href='/forgot-password'>
                ¿Olvidaste tu contraseña?
              </Link>
            </CardContent>
            <CardFooter>
              <div className='grid grid-cols-1 w-full gap-4'>
                <Button type='submit' disabled={loading}>
                  {loading && <Spinner />}
                  Iniciar sesión
                </Button>

                <div>
                  <p className='flex items-center justify-center text-muted-foreground'>
                    ¿No tienes una cuenta?
                  </p>
                  <Link href='/registration' className='w-full'>
                    <Button type='button' variant='outline' className='w-full'>
                      Regístrate
                    </Button>
                  </Link>
                </div>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
    </div>
  )
}
