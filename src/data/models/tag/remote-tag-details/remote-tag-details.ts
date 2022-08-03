import {
  GetTagPostsQuery,
  GetTagPostsQueryVariables,
} from 'data/protocols/http/graphql/types'

export type QueryVariables = GetTagPostsQueryVariables
export type QueryResponse = GetTagPostsQuery
export type TagData = NonNullable<QueryResponse['tag']>['data']
type PostsData = NonNullable<NonNullable<TagData>['attributes']>['posts']
export type PostData = NonNullable<PostsData>['data'][0]
export type Image = NonNullable<PostData['attributes']>['image']
export type User = NonNullable<PostData['attributes']>['user']
export type UserData = NonNullable<
  NonNullable<PostData['attributes']>['user']
>['data']
