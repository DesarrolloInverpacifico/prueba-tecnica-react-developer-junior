import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'El correo es obligatorio')
    .max(255, 'El correo debe tener como máximo 255 caracteres')
})
