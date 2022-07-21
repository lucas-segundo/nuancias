import { RemotePostCard } from 'data/use-cases/remote-post-card/remote-post-card'
import { ApolloGraphqlClient } from 'infra/http'
import { GET_POSTS_BY_FILTER } from 'infra/http/apollo-client/operations/queries'

export const makeLoadPostCard = () => {
  return new RemotePostCard(new ApolloGraphqlClient(), GET_POSTS_BY_FILTER)
}
