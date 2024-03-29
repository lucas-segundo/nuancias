import { AbstractRemotePost } from 'data/abstracts'
import { IMAGE_PLACEHOLDER } from 'data/helpers'
import { RemotePostContentModel } from 'data/models'
import { GraphqlClient } from 'data/protocols/http'
import { StatusCodeEnum } from 'data/protocols/http/common'
import { UnexpectedError } from 'domain/errors'
import { PostContentModel } from 'domain/models'
import { LoadPostContentData } from 'domain/use-cases'

export class RemotePostContent
  extends AbstractRemotePost
  implements LoadPostContentData
{
  constructor(
    private readonly graphqlClient: GraphqlClient.Client,
    private readonly queryDocument: unknown
  ) {
    super()
  }

  async getBySlug(slug: string) {
    const response = await this.graphqlClient.query<
      RemotePostContentModel.QueryVariables,
      RemotePostContentModel.QueryResponse
    >({
      queryDocument: this.queryDocument,
      variables: {
        slug,
      },
      config: {
        authToken: this._authToken,
        cachePolicy: 'no-cache',
      },
    })

    switch (response.statusCode) {
      case StatusCodeEnum.OK:
        const model = this.adaptResponseToModel(response.data)
        if (model) return model
      default:
        throw new UnexpectedError()
    }
  }

  adaptResponseToModel(
    data: RemotePostContentModel.QueryResponse
  ): PostContentModel.Model | undefined {
    const postData = data.posts?.data[0]

    if (postData) return this.mapValidPost(postData)
  }

  private mapValidPost(
    post: RemotePostContentModel.PostData
  ): PostContentModel.Model | undefined {
    const postAttr = post.attributes
    const tags = this.adaptToTagModel(postAttr?.tags?.data)
    const userAttr = postAttr?.user?.data?.attributes

    const postUrl = this.getImageFormat(
      postAttr?.image.data?.attributes?.formats,
      IMAGE_PLACEHOLDER.POST
    )
    const avatarUrl = this.getImageFormat(
      userAttr?.avatar.data?.attributes?.formats,
      IMAGE_PLACEHOLDER.AVATAR
    )

    if (post.id && postAttr && userAttr && tags.length) {
      const preview = this.makePreview(postAttr.content)

      const { title, content, publishedAt, slug } = postAttr
      const { name, username, biography } = userAttr
      return {
        id: post.id,
        title,
        slug,
        preview,
        content,
        publishedAt,
        image: {
          src: postUrl,
        },
        writer: {
          name,
          bio: biography,
          username,
          avatar: {
            src: avatarUrl,
          },
        },
        tags,
      }
    }
  }
}
