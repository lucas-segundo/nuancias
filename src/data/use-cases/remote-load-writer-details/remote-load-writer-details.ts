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

    switch (response.statusCode) {
      case StatusCodeEnum.OK:
        const model = this.adaptResponseToModel(response.data)
        if (model) return model
      default:
        throw new UnexpectedError()
    }
  }

  adaptResponseToModel(
    data: RemoteWriterDetails.QueryResponse
  ): WriterDetailsModel.Model | undefined {
    const userData = data.usersPermissionsUsers?.data[0]

    if (userData) return this.mapValidUser(userData)
  }

  private mapValidUser(
    writer: RemoteWriterDetails.WriterData
  ): WriterDetailsModel.Model | undefined {
    const writerAttr = writer.attributes

    const validPosts = writerAttr?.posts?.data.reduce<
      WriterDetailsModel.Post[]
    >((validPosts, post) => {
      const result = this.mapValidPost(post)
      result && validPosts.push(result)

      return validPosts
    }, [])

    const avatarUrl = this.getImageFormat(
      writerAttr?.avatar.data?.attributes?.formats,
      IMAGE_PLACEHOLDER.AVATAR
    )

    if (validPosts && writerAttr && writer.id)
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
  ): WriterDetailsModel.Post | undefined {
    const postAttr = post.attributes
    const tags = this.adaptToTagModel(postAttr?.tags?.data)

    const postUrl = this.getImageFormat(
      postAttr?.image.data?.attributes?.formats,
      IMAGE_PLACEHOLDER.POST
    )

    if (post.id && postAttr && tags.length) {
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
}
