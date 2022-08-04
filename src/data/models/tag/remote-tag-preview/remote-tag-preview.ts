import {
  GetTagsQuery,
  GetTagsQueryVariables,
} from 'data/protocols/http/graphql/types'

export type Model = {
  id?: string | null
  attributes?: { title: string; slug: string } | null
}

export type QueryVariables = GetTagsQueryVariables
export type QueryResponse = GetTagsQuery
