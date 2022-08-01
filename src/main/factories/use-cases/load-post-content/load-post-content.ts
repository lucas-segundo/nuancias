import { RemotePostContent } from 'data/use-cases'
import { ApolloGraphqlClient } from 'infra/http'
import { GET_POST_BY_SLUG } from 'infra/http/apollo-client/operations/queries'

export const makeLoadPostContent = () => {
  return new RemotePostContent(
    new ApolloGraphqlClient(`${process.env.NEXT_PUBLIC_CMS_API_URL}/graphql`),
    GET_POST_BY_SLUG
  )
}
