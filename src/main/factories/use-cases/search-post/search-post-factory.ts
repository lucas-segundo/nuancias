import { RemoteSearchPosts } from 'data/use-cases/remote-search-posts/remote-search-posts'
import { ApolloGraphqlClient } from 'infra/http'
import { GET_POSTS_BY_TEXT } from 'infra/http/apollo-client/operations/queries'

export const makeSeachPost = () => {
  return new RemoteSearchPosts(new ApolloGraphqlClient(), GET_POSTS_BY_TEXT)
}
