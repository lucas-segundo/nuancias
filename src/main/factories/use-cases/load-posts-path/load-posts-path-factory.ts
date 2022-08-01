import { RemotePostsPath } from 'data/use-cases/path/remote-posts/remote-posts-path'
import { ApolloGraphqlClient } from 'infra/http'
import { GET_POSTS_SLUG_AND_USERNAME } from 'infra/http/apollo-client/operations/queries'

export const makeLoadPostsPath = () => {
  return new RemotePostsPath(
    new ApolloGraphqlClient(`${process.env.NEXT_PUBLIC_CMS_API_URL}/graphql`),
    GET_POSTS_SLUG_AND_USERNAME
  )
}
