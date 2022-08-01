import { RemoteWriterPostID } from 'data/use-cases'
import { ApolloGraphqlClient } from 'infra/http'
import { GET_POSTS_SLUG_AND_USERNAME } from 'infra/http/apollo-client/operations/queries'

export const makeLoadWriterPostID = () => {
  return new RemoteWriterPostID(
    new ApolloGraphqlClient(`${process.env.NEXT_PUBLIC_CMS_API_URL}/graphql`),
    GET_POSTS_SLUG_AND_USERNAME
  )
}
