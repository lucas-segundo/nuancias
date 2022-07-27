import { AbstractRemotePost } from 'data/abstracts'
import { RemotePostPageModel } from 'data/models'
import { GraphqlClient } from 'data/protocols/http'
import { StatusCodeEnum } from 'data/protocols/http/common'
import { UnexpectedError } from 'domain/errors'
import { PostPageModel } from 'domain/models'
import { LoadPostPageData } from 'domain/use-cases'

export class RemotePostPage
  extends AbstractRemotePost
  implements LoadPostPageData
{
  constructor(
    private readonly graphqlClient: GraphqlClient.Client,
    private readonly queryDocument: unknown
  ) {
    super()
  }

  async getBySlug(slug: string) {
    const response = await this.graphqlClient.query<
      RemotePostPageModel.QueryVariables,
      RemotePostPageModel.QueryResponse
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

  adaptResponseToModel(data: RemotePostPageModel.QueryResponse) {
    const postData = data.posts?.data[0]

    if (!postData) return null

    const post = this.mapValidPost(postData)

    return post
  }

  private mapValidPost(
    post: RemotePostPageModel.PostData
  ): PostPageModel.Model | null {
    const postAttr = post.attributes
    const tags = this.mapTags(postAttr?.tags?.data)
    const userAttr = postAttr?.user?.data?.attributes

    if (!post.id || !postAttr || !userAttr || tags.length === 0) return null

    const postUrl = this.getPostUrl(postAttr.image.data?.attributes?.formats)
    const avatarUrl = this.getAvatarUrl(
      userAttr.avatar.data?.attributes?.formats
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
