import { ImageModel, PostModel, TagModel, UserModel } from '../../common'

export type Post = Pick<
  PostModel,
  'id' | 'title' | 'preview' | 'content' | 'publishedAt'
>

export type Writer = Pick<UserModel, 'name' | 'username' | 'bio' | 'avatar'>

export type Tag = Pick<TagModel, 'id' | 'title' | 'slug'>

export type Image = Pick<ImageModel, 'src'>

export type Model = Post & {
  writer: Writer
  image?: Image
  tags: Tag[]
}
