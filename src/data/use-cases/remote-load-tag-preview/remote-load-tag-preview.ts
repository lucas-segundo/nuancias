import { AbstractRemotePost } from 'data/abstracts'
import { RemoteTagPreviewModel } from 'data/models'
import { GraphqlClient } from 'data/protocols/http'
import { StatusCodeEnum } from 'data/protocols/http/common'
import { UnexpectedError } from 'domain/errors'
import { TagPreviewModel } from 'domain/models'
import { LoadTagPreview } from 'domain/use-cases'

export class RemoteTagPreview
  extends AbstractRemotePost
  implements LoadTagPreview.Model
{
  constructor(
    private readonly graphqlClient: GraphqlClient.Client,
    private readonly queryDocument: unknown
  ) {
    super()
  }

  async getAll({ tagsLimit }: LoadTagPreview.Params) {
    const response = await this.graphqlClient.query<
      RemoteTagPreviewModel.QueryVariables,
      RemoteTagPreviewModel.QueryResponse
    >({
      queryDocument: this.queryDocument,
      variables: {
        tagsLimit,
      },
      config: {
        authToken: this._authToken,
        cachePolicy: 'no-cache',
      },
    })

    switch (response.statusCode) {
      case StatusCodeEnum.OK:
        return this.adaptResponseToModel(response.data)
      case StatusCodeEnum.NO_CONTENT:
        return []
      default:
        throw new UnexpectedError()
    }
  }

  adaptResponseToModel(
    data: RemoteTagPreviewModel.QueryResponse
  ): TagPreviewModel.Model[] | [] {
    const tag = this.adaptToTagModel(data.tags?.data)

    return tag
  }
}
