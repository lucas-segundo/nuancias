import { RemoteLoadWriterDetails } from 'data/use-cases'
import { ApolloGraphqlClient } from 'infra/http'
import { GET_USER_AND_POSTS } from 'infra/http/apollo-client/operations/queries/get-users-and-posts'

export const makeLoadWriterPage = () => {
  return new RemoteLoadWriterDetails(
    new ApolloGraphqlClient(`${process.env.NEXT_PUBLIC_CMS_API_URL}/graphql`),
    GET_USER_AND_POSTS
  )
}
