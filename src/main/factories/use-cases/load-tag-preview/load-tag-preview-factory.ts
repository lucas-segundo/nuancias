import { RemoteLoadTagPreview } from 'data/use-cases/remote-load-tag-preview/remote-load-tag-preview'
import { ApolloGraphqlClient } from 'infra/http'
import { GET_TAGS } from 'infra/http/apollo-client/operations/queries'

export const makeLoadTagPreview = () => {
  return new RemoteLoadTagPreview(
    new ApolloGraphqlClient(`${process.env.NEXT_PUBLIC_CMS_API_URL}/graphql`),
    GET_TAGS
  )
}
