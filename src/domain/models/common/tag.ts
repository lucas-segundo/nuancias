import { PostModel } from './post'

export type TagModel<Post = PostModel> = {
  id: string
  title: string
  slug: string
  posts: Post[]
}
