import { GetPostsSlugAndUsernameQuery } from 'data/protocols/http/graphql/types'
import { GetPostsSlugAndUsernameQueryVariables } from 'data/protocols/http/graphql/types'

export type QueryVariables = GetPostsSlugAndUsernameQueryVariables

export type QueryResponse = GetPostsSlugAndUsernameQuery
export type PostsData = NonNullable<QueryResponse['posts']>['data']
export type PostData = PostsData[0]
