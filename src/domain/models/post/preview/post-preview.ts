import { ImageModel, TagModel, PostModel, UserModel } from '../../common'

export type Post = Pick<
  PostModel,
  'id' | 'title' | 'preview' | 'slug' | 'publishedAt'
>
export type Writer = Pick<UserModel, 'name' | 'username' | 'avatar'>

export type Tag = Pick<TagModel, 'id' | 'title' | 'slug'>

export type Image = Pick<ImageModel, 'src'>

export type Model = Post & {
  writer: Writer
  image: Image
  tags: Tag[]
}
