import { PostContentModel } from 'domain/models'

export interface LoadPostPageData {
  getBySlug(slug: string): Promise<PostContentModel.Model | null>
}
