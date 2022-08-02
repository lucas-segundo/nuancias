import { PostModel, TagModel } from 'domain/models/common'

type Post = Pick<PostModel, 'id' | 'title' | 'preview' | 'slug' | 'publishedAt'>
export type Model = TagModel<Post>
