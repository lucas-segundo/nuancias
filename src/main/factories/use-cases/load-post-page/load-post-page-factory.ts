import { RemotePostPage } from 'data/use-cases/remote-post-page/remote-post-page'
import { ApolloGraphqlClient } from 'infra/http'
import { GET_POST_BY_SLUG } from 'infra/http/apollo-client/operations/queries'

export const makeLoadPostPage = () => {
  return new RemotePostPage(new ApolloGraphqlClient(), GET_POST_BY_SLUG)
}
