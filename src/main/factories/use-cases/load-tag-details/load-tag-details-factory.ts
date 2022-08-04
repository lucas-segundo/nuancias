import { RemoteLoadTagDetails } from 'data/use-cases'
import { ApolloGraphqlClient } from 'infra/http'
import { GET_TAG_POSTS } from 'infra/http/apollo-client/operations/queries/get-tag-posts'

export const makeLoadTagDetails = () => {
  return new RemoteLoadTagDetails(
    new ApolloGraphqlClient(`${process.env.NEXT_PUBLIC_CMS_API_URL}/graphql`),
    GET_TAG_POSTS
  )
}
