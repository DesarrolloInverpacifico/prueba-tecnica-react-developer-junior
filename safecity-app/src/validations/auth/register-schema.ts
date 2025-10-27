import { z } from 'zod'

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, 'El nombre es obligatorio')
      .max(255, 'El nombre debe tener como máximo 255 caracteres'),
    last_name: z
      .string()
      .min(1, 'El apellido es obligatorio')
      .max(255, 'El apellido debe tener como máximo 255 caracteres'),
    email: z
      .string()
      .min(1, 'El correo es obligatorio')
      .max(255, 'El correo debe tener como máximo 255 caracteres'),
    password: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .max(255, 'La contraseña es demasiado larga'),
    password_confirmation: z
      .string()
      .min(8, 'La confirmación contraseña debe tener al menos 8 caracteres')
      .max(255, 'La contraseña es demasiado larga')
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Las contraseñas no coinciden',
    path: ['password_confirmation']
  })
