import { GetPostsByTextQuery } from 'data/protocols/http/graphql/types'

export type QueryResponse = GetPostsByTextQuery
export type Post = GetPostsByTextQuery['posts']
export type PostsData = NonNullable<Post>['data']
export type PostData = NonNullable<PostsData[0]>

export type UserData = NonNullable<NonNullable<PostData>['attributes']>['user']
