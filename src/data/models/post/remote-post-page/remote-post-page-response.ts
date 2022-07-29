import { GetPostBySlugQuery } from 'data/protocols/http/graphql/types'

export type QueryResponse = GetPostBySlugQuery
export type PostData = NonNullable<GetPostBySlugQuery['posts']>['data'][0]
export type TagsData = NonNullable<PostData['attributes']>['tags']
export type TagData = NonNullable<TagsData>['data'][0]
