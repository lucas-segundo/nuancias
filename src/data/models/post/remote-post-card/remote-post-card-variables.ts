import { GetPostsByFilterQueryVariables } from 'data/protocols/http/graphql/types'

export type PostCardSortVar = {
  by: 'id' | 'publishedAt'
  order?: 'asc' | 'desc'
}

export type PostCardVariables = {
  limit?: number
  sort?: PostCardSortVar
}

export type RemotePostCardQueryVar = GetPostsByFilterQueryVariables
