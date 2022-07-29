import { RemotePostPagePaths } from 'data/use-cases/post/remote-post-page-paths/remote-post-page-paths'
import { ApolloGraphqlClient } from 'infra/http'
import { GET_POSTS_SLUG_AND_USERNAME } from 'infra/http/apollo-client/operations/queries'

export const makeLoadPostPaths = () => {
  return new RemotePostPagePaths(
    new ApolloGraphqlClient(`${process.env.NEXT_PUBLIC_CMS_API_URL}/graphql`),
    GET_POSTS_SLUG_AND_USERNAME
  )
}
