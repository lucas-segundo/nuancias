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
        const postModel = this.adaptResponseToModel(response.data)
        return postModel
      case StatusCodeEnum.NO_CONTENT:
        return null
      default:
        throw new UnexpectedError()
    }
  }

  adaptResponseToModel(data: RemotePostContentModel.QueryResponse) {
    const postData = data.posts?.data[0]

    if (!postData) return null

    const post = this.mapValidPost(postData)

    return post
  }

  private mapValidPost(
    post: RemotePostContentModel.PostData
  ): PostContentModel.Model | null {
    const postAttr = post.attributes
    const tags = this.adaptToTagModel(postAttr?.tags?.data)
    const userAttr = postAttr?.user?.data?.attributes

    if (!post.id || !postAttr || !userAttr || tags.length === 0) return null

    const postUrl = this.getImageFormat(
      postAttr.image.data?.attributes?.formats,
      IMAGE_PLACEHOLDER.POST
    )
    const avatarUrl = this.getImageFormat(
      userAttr.avatar.data?.attributes?.formats,
      IMAGE_PLACEHOLDER.AVATAR
    )

    const preview = this.makePreview(postAttr.content)

    const { title, content, publishedAt } = postAttr
    const { name, username, biography } = userAttr
    return {
      id: post.id,
      title,
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
