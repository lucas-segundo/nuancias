import { AbstractAuthToken } from 'data/abstracts'
import { RemoteWriterPostIDModel } from 'data/models'
import { GraphqlClient } from 'data/protocols/http'
import { StatusCodeEnum } from 'data/protocols/http/common'
import { UnexpectedError } from 'domain/errors'
import { WriterPostIDModel } from 'domain/models'
import { LoadWriterPostID } from 'domain/use-cases'

type Filter = {
  limit: number
}

export class RemoteWriterPostID
  extends AbstractAuthToken
  implements LoadWriterPostID<Filter>
{
  constructor(
    private readonly graphqlClient: GraphqlClient.Client,
    private readonly queryDocument: unknown
  ) {
    super()
  }

  async getAll({ limit }: Filter): Promise<WriterPostIDModel.Model[] | []> {
    const response = await this.graphqlClient.query<
      RemoteWriterPostIDModel.QueryVariables,
      RemoteWriterPostIDModel.QueryResponse
    >({
      queryDocument: this.queryDocument,
      variables: {
        limit,
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

  adaptResponseToModel(data: RemoteWriterPostIDModel.QueryResponse) {
    const postsData = data.posts?.data
    if (!postsData) return []

    const posts = this.mapValidPosts(postsData)

    return (
      posts?.filter((post): post is WriterPostIDModel.Model => !!post) || []
    )
  }

  private mapValidPosts(
    posts: RemoteWriterPostIDModel.PostsData
  ): (WriterPostIDModel.Model | null)[] {
    return posts.map((post) => {
      const userData = post.attributes?.user?.data
      if (
        !userData?.id ||
        !userData.attributes ||
        !post?.id ||
        !post?.attributes
      )
        return null

      return {
        post: {
          id: post.id,
          slug: post.attributes.slug,
        },
        writer: {
          id: userData.id,
          username: userData.attributes.username,
        },
      }
    })
  }
}
