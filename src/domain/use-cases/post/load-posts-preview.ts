import { PostPreviewModel } from 'domain/models'

export interface LoadPostsPreview<Filter> {
  getAll(filter: Filter): Promise<PostPreviewModel.Model[] | []>
}
