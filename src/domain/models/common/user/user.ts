import { ImageModel } from '../image'

export type UserModel = {
  id: string
  name: string
  bio: string
  username: string
  avatar: ImageModel
}
