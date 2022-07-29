import { PostModel, UserModel } from '../../../common'

export type Post = Pick<PostModel, 'id' | 'slug'>
export type Writer = Pick<UserModel, 'id' | 'username'>

export type Model = {
  post: Post
  writer: Writer
}
