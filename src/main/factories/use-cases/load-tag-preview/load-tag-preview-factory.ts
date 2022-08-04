import { RemoteLoadTagDetails } from 'data/use-cases'
import { ApolloGraphqlClient } from 'infra/http'
import { GET_TAGS } from 'infra/http/apollo-client/operations/queries'

export const makeLoadTagPreview = () => {
  return new RemoteLoadTagDetails(
    new ApolloGraphqlClient(`${process.env.NEXT_PUBLIC_CMS_API_URL}/graphql`),
    GET_TAGS
  )
}
