import { GetPostsSlugAndUsernameQuery } from 'data/protocols/http/graphql/types'

export type QueryResponse = GetPostsSlugAndUsernameQuery
export type PostsData = NonNullable<QueryResponse['posts']>['data']
