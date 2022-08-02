import { PostContentModel } from 'domain/models'

export interface LoadPostContentData {
  getBySlug(slug: string): Promise<PostContentModel.Model>
}
