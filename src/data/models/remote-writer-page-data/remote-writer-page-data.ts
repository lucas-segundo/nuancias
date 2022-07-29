import {
  GetUserAndPostsQuery,
  GetUserAndPostsQueryVariables,
} from 'data/protocols/http/graphql/types'

export type QueryResponse = GetUserAndPostsQuery
export type UserData = NonNullable<
  QueryResponse['usersPermissionsUsers']
>['data'][0]

export type QueryVariables = GetUserAndPostsQueryVariables
