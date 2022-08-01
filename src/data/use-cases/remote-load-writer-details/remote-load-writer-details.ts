import { AbstractRemotePost } from 'data/abstracts'
import { IMAGE_PLACEHOLDER } from 'data/helpers'
import { RemoteWriterDetails } from 'data/models'
import { GraphqlClient } from 'data/protocols/http'
import { StatusCodeEnum } from 'data/protocols/http/common'
import { UnexpectedError } from 'domain/errors'
import { WriterDetailsModel } from 'domain/models'
import { LoadWriterDetails } from 'domain/use-cases'

export class RemoteLoadWriterDetails
  extends AbstractRemotePost
  implements LoadWriterDetails.Model
{
  constructor(
    private readonly graphqlClient: GraphqlClient.Client,
    private readonly queryDocument: unknown
  ) {
    super()
  }

  async get(params: LoadWriterDetails.Params) {
    const response = await this.graphqlClient.query<
      RemoteWriterDetails.QueryVariables,
      RemoteWriterDetails.QueryResponse
    >({
      queryDocument: this.queryDocument,
      variables: { ...params, postsSortBy: 'publishedAt:desc' },
      config: {
        authToken: this._authToken,
        cachePolicy: 'no-cache',
      },
    })

    const model = this.adaptResponseToModel(response.data)

    switch (response.statusCode) {
      case StatusCodeEnum.OK:
        if (model) return model
      default:
        throw new UnexpectedError()
    }
  }

  adaptResponseToModel(
    data: RemoteWriterDetails.QueryResponse
  ): WriterDetailsModel.Model | null {
    const userData = data.usersPermissionsUsers?.data[0]

    if (!userData) return null

    const writer = this.mapValidUser(userData)

    return writer
  }

  private mapValidUser(
    writer: RemoteWriterDetails.WriterData
  ): WriterDetailsModel.Model | null {
    if (!writer.id) return null
    const writerAttr = writer.attributes
    const posts = writerAttr?.posts?.data.map((post) => this.mapValidPost(post))
    const validPosts = posts?.filter(
      (post): post is WriterDetailsModel.Post => !!post
    )

    if (!validPosts || !writerAttr) return null

    const avatarUrl = this.getImageFormat(
      writerAttr.avatar.data?.attributes?.formats,
      IMAGE_PLACEHOLDER.AVATAR
    )

    return {
      id: writer.id,
      name: writerAttr.name,
      username: writerAttr.username,
      bio: writerAttr.biography,
      avatar: {
        src: avatarUrl,
      },
      posts: validPosts,
    }
  }

  private mapValidPost(
    post: RemoteWriterDetails.PostData
  ): WriterDetailsModel.Post | null {
    const postAttr = post.attributes
    const tags = this.mapTags(postAttr?.tags?.data)

    if (!post.id || !postAttr || tags.length === 0) return null

    const postUrl = this.getImageFormat(
      postAttr.image.data?.attributes?.formats,
      IMAGE_PLACEHOLDER.POST
    )

    const preview = this.makePreview(postAttr.content)

    const { title, slug, publishedAt } = postAttr

    return {
      id: post.id,
      title,
      slug,
      preview,
      publishedAt,
      image: {
        src: postUrl,
      },
      tags,
    }
  }
}
