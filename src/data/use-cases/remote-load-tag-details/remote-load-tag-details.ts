import { AbstractAuthToken } from 'data/abstracts'
import { RemoteTagDetails } from 'data/models'
import { GraphqlClient } from 'data/protocols/http'
import { LoadTagDetails } from 'domain/use-cases'

export class RemoteLoadTagDetails
  extends AbstractAuthToken
  implements LoadTagDetails.Model
{
  constructor(
    private readonly graphqlClient: GraphqlClient.Client,
    private readonly queryDocument: unknown
  ) {
    super()
  }

  async get(params: LoadTagDetails.Params) {
    await this.graphqlClient.query<
      RemoteTagDetails.QueryVariables,
      RemoteTagDetails.QueryResponse
    >({
      queryDocument: this.queryDocument,
      variables: { tagId: params.id },
      config: {
        authToken: this._authToken,
        cachePolicy: 'no-cache',
      },
    })
  }
}
