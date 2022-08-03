import { PostModel, TagModel } from 'domain/models/common'

export type Post = Pick<
  PostModel,
  'id' | 'title' | 'preview' | 'slug' | 'publishedAt' | 'image'
>
export type Model = TagModel<Post>
