import { GetPostsByFilterQuery } from 'data/protocols/http/graphql/types'

export type QueryResponse = GetPostsByFilterQuery
export type PostsData = NonNullable<GetPostsByFilterQuery['posts']>['data']
type PostData = NonNullable<PostsData[0]['attributes']>
export type Tags = PostData['tags']
