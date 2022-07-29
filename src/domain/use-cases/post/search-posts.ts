import { SearchedPostModel } from 'domain/models'

export interface SearchPosts {
  getAllByText(text: string): Promise<SearchedPostModel.Model[] | []>
}
