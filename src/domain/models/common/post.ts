import { ImageModel } from './image'

export type PostModel<Image = ImageModel> = {
  id: string
  title: string
  slug: string
  preview: string
  content: string
  publishedAt: string
  image: Image
}
