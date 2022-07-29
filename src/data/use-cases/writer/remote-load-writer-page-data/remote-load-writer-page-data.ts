import { AbstractRemotePost } from 'data/abstracts'
import { RemoteWriterPageData } from 'data/models'
import { GraphqlClient } from 'data/protocols/http'
import { LoadWriterPageData } from 'domain/use-cases'

export class RemoteLoadWriterPageData extends AbstractRemotePost {
  constructor(
    private readonly graphqlClient: GraphqlClient.Client,
    private readonly queryDocument: unknown
  ) {
    super()
  }

  async get(params: LoadWriterPageData.Params): Promise<void> {
    await this.graphqlClient.query<
      RemoteWriterPageData.QueryVariables,
      RemoteWriterPageData.QueryResponse
    >({
      queryDocument: this.queryDocument,
      variables: { ...params, postsSortBy: 'publishedAt:desc' },
      config: {
        authToken: this._authToken,
        cachePolicy: 'no-cache',
      },
    })
  }
}
