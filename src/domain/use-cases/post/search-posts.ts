import { SearchedPost } from 'domain/models'

export interface SearchPosts {
  getAllByText(text: string): Promise<SearchedPost.Model[] | []>
}
