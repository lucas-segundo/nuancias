import {
  ImageModel,
  PostModel,
  TagModel,
  UserModel,
} from 'domain/models/common'

export type Image = Pick<ImageModel, 'src'>
export type Tag = Pick<TagModel, 'id' | 'slug' | 'title'>
export type Post = Pick<
  PostModel,
  'id' | 'preview' | 'title' | 'slug' | 'publishedAt'
> & {
  image: Image
  tags: Tag[]
}

export type Model = Pick<
  UserModel<Image, Post[]>,
  'id' | 'username' | 'name' | 'bio' | 'avatar' | 'posts'
>
