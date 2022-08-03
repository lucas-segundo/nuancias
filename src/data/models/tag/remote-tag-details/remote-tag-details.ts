import {
  GetTagPostsQuery,
  GetTagPostsQueryVariables,
} from 'data/protocols/http/graphql/types'

export type QueryVariables = GetTagPostsQueryVariables
export type QueryResponse = GetTagPostsQuery
export type TagData = NonNullable<QueryResponse['tag']>['data']
type PostsData = NonNullable<NonNullable<TagData>['attributes']>['posts']
export type PostData = NonNullable<PostsData>['data'][0]
