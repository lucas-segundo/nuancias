import {
  GetUserAndPostsQuery,
  GetUserAndPostsQueryVariables,
} from 'data/protocols/http/graphql/types'

export type QueryResponse = GetUserAndPostsQuery
export type WriterData = NonNullable<
  QueryResponse['usersPermissionsUsers']
>['data'][0]
export type PostData = NonNullable<
  NonNullable<WriterData['attributes']>['posts']
>['data'][0]
export type TagData = NonNullable<
  NonNullable<PostData['attributes']>['tags']
>['data'][0]

export type QueryVariables = GetUserAndPostsQueryVariables
