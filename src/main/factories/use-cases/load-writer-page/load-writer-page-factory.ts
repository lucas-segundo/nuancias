import { RemoteLoadWriterPageData } from 'data/use-cases/writer/remote-load-writer-page-data/remote-load-writer-page-data'
import { ApolloGraphqlClient } from 'infra/http'
import { GET_USER_AND_POSTS } from 'infra/http/apollo-client/operations/queries/get-users-and-posts'

export const makeLoadWriterPage = () => {
  return new RemoteLoadWriterPageData(
    new ApolloGraphqlClient(`${process.env.NEXT_PUBLIC_CMS_API_URL}/graphql`),
    GET_USER_AND_POSTS
  )
}
