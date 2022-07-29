import { ImageModel, PostModel, UserModel } from 'domain/models/common'

export type Image = Pick<ImageModel, 'src'>
export type Post = Pick<
  PostModel,
  'id' | 'preview' | 'title' | 'slug' | 'publishedAt'
>

export type Model = Pick<
  UserModel<Image, Post[]>,
  'id' | 'name' | 'bio' | 'avatar' | 'posts'
>
