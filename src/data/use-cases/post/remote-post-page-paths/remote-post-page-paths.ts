import { AbstractAuthToken } from 'data/abstracts'
import { RemotePostPagePathsModel } from 'data/models'
import { GraphqlClient } from 'data/protocols/http'
import { StatusCodeEnum } from 'data/protocols/http/common'
import { UnexpectedError } from 'domain/errors'
import { PathWriterPostModel } from 'domain/models'
import { LoadPostPagePaths } from 'domain/use-cases'

type Filter = {
  limit: number
}

export class RemotePostPagePaths
  extends AbstractAuthToken
  implements LoadPostPagePaths<Filter>
{
  constructor(
    private readonly graphqlClient: GraphqlClient.Client,
    private readonly queryDocument: unknown
  ) {
    super()
  }

  async getAll({ limit }: Filter): Promise<PathWriterPostModel.Model[] | []> {
    const response = await this.graphqlClient.query<
      RemotePostPagePathsModel.QueryVariables,
      RemotePostPagePathsModel.QueryResponse
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

  adaptResponseToModel(data: RemotePostPagePathsModel.QueryResponse) {
    const postsData = data.posts?.data
    if (!postsData) return []

    const posts = this.mapValidPosts(postsData)

    return (
      posts?.filter((post): post is PathWriterPostModel.Model => !!post) || []
    )
  }

  private mapValidPosts(
    posts: RemotePostPagePathsModel.PostsData
  ): (PathWriterPostModel.Model | null)[] {
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
