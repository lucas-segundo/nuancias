import { ImageModel } from '../image'
import { PostModel } from '../post'

export type UserModel<Avatar = ImageModel, Posts = PostModel[]> = {
  id: string
  name: string
  bio: string
  username: string
  avatar: Avatar
  posts: Posts
}
