import { PostCardModel } from 'domain/models'

export interface LoadPostCard<Filter> {
  getAll(filter: Filter): Promise<PostCardModel.Model[] | []>
}
