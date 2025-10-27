import { z } from 'zod'

export const CreateIncidentSchema = z.object({
  category_id: z.number().int().positive(),
  description: z
    .string()
    .min(1, 'La descripción es obligatoria')
    .max(1000, 'La descripción no puede tener más de 1000 caracteres')
    .transform((s) => s.trim())
})

export type CreateIncidentFormValues = z.infer<typeof CreateIncidentSchema>
