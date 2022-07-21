import { ImageModel, TagModel, PostModel, UserModel } from '../common'

export type Post = Pick<
  PostModel,
  'id' | 'title' | 'slug' | 'preview' | 'publishedAt'
>
export type Writer = Pick<UserModel, 'avatar' | 'name' | 'username'>
export type Tag = Pick<TagModel, 'id' | 'slug' | 'title'>
export type Image = Pick<ImageModel, 'src'>

export type Model = Post & {
  writer: Writer
  image: Image
  tags: Tag[]
}
