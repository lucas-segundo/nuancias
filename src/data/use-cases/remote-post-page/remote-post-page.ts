import { AbstractRemotePost } from 'data/abstracts/remote-post'
import { getCharactersFromHTML } from 'data/helpers'
import { RemotePostPageModel } from 'data/models'
import { ImageFormats } from 'data/models/common'
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
        const postModel = RemotePostPage.adaptResponseToModel(response.data)
        return postModel
      case StatusCodeEnum.NO_CONTENT:
        return null
      default:
        throw new UnexpectedError()
    }
  }

  static adaptResponseToModel(data: RemotePostPageModel.QueryResponse) {
    const postData = data.posts?.data[0]

    if (!postData) return null

    const post = RemotePostPage.mapPost(postData)

    return post
  }

  private static mapPost(
    post: RemotePostPageModel.PostData
  ): PostPageModel.Model | null {
    if (!post.id) return null

    const tags = RemotePostPage.mapTags(post.attributes?.tags)
    if (tags.length === 0 || !post.attributes) return null

    const userAttr = post.attributes.user?.data?.attributes
    if (!userAttr) return null

    const { medium: postImageMedium, small: postImageSmall } = post.attributes
      .image.data?.attributes?.formats as ImageFormats

    const { small: avatarSmall, thumbnail: avatarThumb } = userAttr.avatar.data
      ?.attributes?.formats as ImageFormats

    const postUrl =
      postImageMedium?.url ||
      postImageSmall?.url ||
      '/images/post-placeholder.png'
    const avatarUrl =
      avatarSmall?.url || avatarThumb?.url || 'avatar-placeholder.png'

    const preview =
      getCharactersFromHTML({
        html: post.attributes.content,
        characterCount: 150,
      }) + '...'

    return {
      id: post.id,
      title: post.attributes.title,
      preview,
      content: post.attributes.content,
      publishedAt: post.attributes.publishedAt,
      image: {
        src: postUrl,
      },
      writer: {
        name: userAttr.name,
        bio: userAttr.biography,
        username: userAttr.username,
        avatar: {
          src: avatarUrl,
        },
      },
      tags,
    }
  }
}
