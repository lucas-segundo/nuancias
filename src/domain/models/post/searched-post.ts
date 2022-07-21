import { PostModel, UserModel } from '../common'

export type Post = Pick<PostModel, 'id' | 'title' | 'slug'>
export type Writer = Pick<UserModel, 'username'>

export type Model = Post & {
  writer: Writer
}
