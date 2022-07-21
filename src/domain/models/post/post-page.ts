import { ImageModel, PostModel, TagModel, UserModel } from '../common'

export type Post = Pick<
  PostModel,
  'id' | 'title' | 'content' | 'publishedAt' | 'preview'
>
export type Tag = Pick<TagModel, 'id' | 'title' | 'slug'>
export type Image = Pick<ImageModel, 'src'>
export type Writer = Pick<UserModel, 'avatar' | 'name' | 'username' | 'bio'>

export type Model = Post & {
  writer: Writer
  image?: Image
  tags: Tag[]
}
