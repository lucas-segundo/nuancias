import { RemotePostPreview } from 'data/use-cases'
import { ApolloGraphqlClient } from 'infra/http'
import { GET_POSTS_BY_FILTER } from 'infra/http/apollo-client/operations/queries'

export const makeLoadPostPreview = () => {
  return new RemotePostPreview(
    new ApolloGraphqlClient(`${process.env.NEXT_PUBLIC_CMS_API_URL}/graphql`),
    GET_POSTS_BY_FILTER
  )
}
