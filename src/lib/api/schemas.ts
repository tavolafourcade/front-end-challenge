import { z } from 'zod'

export const categorySchema = z.object({
  id: z.number(),
  name: z.string(),
})

export const categoriesSchema = z.array(categorySchema)

export const imageSchema = z.object({
  id: z.number(),
  url: z.string(),
})

export const imagesSchema = z.array(imageSchema)

export type Category = z.infer<typeof categorySchema>
export type ImageItem = z.infer<typeof imageSchema>
