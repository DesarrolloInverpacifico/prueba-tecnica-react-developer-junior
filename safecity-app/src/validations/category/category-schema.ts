import { z } from 'zod'

export const CreateCategorySchema = z.object({
  name: z
    .string()
    .min(1, 'el nombre de la categoría es obligatoria')
    .max(255, 'el nombre de la categoría no puede tener más de 255  caracteres')
    .transform((s) => s.trim())
})

export type CreateCategoryFormValues = z.infer<typeof CreateCategorySchema>
