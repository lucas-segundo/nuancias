import { RemotePostCard } from 'data/use-cases/remote-post-card/remote-post-card'
import { ApolloGraphqlClient } from 'infra/http'
import { GET_POSTS_BY_FILTER } from 'infra/http/apollo-client/operations/queries'

export const makeLoadPostCard = () => {
  return new RemotePostCard(
    new ApolloGraphqlClient(`${process.env.NEXT_PUBLIC_CMS_API_URL}/graphql`),
    GET_POSTS_BY_FILTER
  )
}
