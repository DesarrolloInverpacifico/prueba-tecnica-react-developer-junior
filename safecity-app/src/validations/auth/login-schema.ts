import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El correo es obligatorio')
    .max(255, 'El correo debe tener como máximo 255 caracteres'),
  password: z
    .string()
    .min(1, 'La contraseña es obligatoria')
    .max(255, 'La contraseña es demasiado larga')
})
