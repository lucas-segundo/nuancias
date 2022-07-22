import { RemotePostPage } from 'data/use-cases/remote-post-page/remote-post-page'
import { ApolloGraphqlClient } from 'infra/http'
import { GET_POST_BY_SLUG } from 'infra/http/apollo-client/operations/queries'

export const makeLoadPostPage = () => {
  return new RemotePostPage(
    new ApolloGraphqlClient(`${process.env.NEXT_PUBLIC_CMS_API_URL}/graphql`),
    GET_POST_BY_SLUG
  )
}
