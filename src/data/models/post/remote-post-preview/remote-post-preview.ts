import { GetPostsByFilterQuery } from 'data/protocols/http/graphql/types'
import { GetPostsByFilterQueryVariables } from 'data/protocols/http/graphql/types'

export type SortBy = {
  by: 'id' | 'publishedAt'
  order?: 'asc' | 'desc'
}

export type Params = {
  limit?: number
  sort?: SortBy
}

export type QueryVariables = GetPostsByFilterQueryVariables

export type QueryResponse = GetPostsByFilterQuery
export type PostsData = NonNullable<GetPostsByFilterQuery['posts']>['data']
export type PostData = PostsData[0]
type PostAttr = NonNullable<PostData['attributes']>
export type Tags = PostAttr['tags']
