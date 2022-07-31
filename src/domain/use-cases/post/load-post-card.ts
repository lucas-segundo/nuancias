import { PostPreviewModel } from 'domain/models'

export interface LoadPostCard<Filter> {
  getAll(filter: Filter): Promise<PostPreviewModel.Model[] | []>
}
