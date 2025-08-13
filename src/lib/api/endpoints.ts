import { get, post } from './httpClient'
import { categoriesSchema, imagesSchema } from './schemas'
import type { Category, ImageItem } from './schemas'

const CATEGORIES_URL = 'https://f6fe9241e02b404689f62c585d0bd967.api.mockbin.io/categories'
const UNANALYZED_IMAGES_URL =
  'https://5f2f729312b1481b9b1b4eb9d00bc455.api.mockbin.io/unanalyzed-images'
// const ANNOTATIONS_URL = 'https://eb1b6f8bfab448df91c68bd442d6a968.api.mockbin.io/annotations'

export async function getCategories(): Promise<Category[]> {
  const data = await get(CATEGORIES_URL)
  return categoriesSchema.parse(data)
}

export async function getUnanalyzedImages(): Promise<ImageItem[]> {
  const data = await get(UNANALYZED_IMAGES_URL)
  return imagesSchema.parse(data)
}
