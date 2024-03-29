import { AbstractRemoteTag } from 'data/abstracts/remote-tag/remote-tag'
import { IMAGE_PLACEHOLDER } from 'data/helpers'
import { RemoteTagDetails } from 'data/models'
import { GraphqlClient } from 'data/protocols/http'
import { StatusCodeEnum } from 'data/protocols/http/common'
import { UnexpectedError } from 'domain/errors'
import { TagDetailsModel } from 'domain/models'
import { LoadTagDetails } from 'domain/use-cases'

export class RemoteLoadTagDetails
  extends AbstractRemoteTag
  implements LoadTagDetails.Model
{
  constructor(
    private readonly graphqlClient: GraphqlClient.Client,
    private readonly queryDocument: unknown
  ) {
    super()
  }

  async get(params: LoadTagDetails.Params) {
    const response = await this.graphqlClient.query<
      RemoteTagDetails.QueryVariables,
      RemoteTagDetails.QueryResponse
    >({
      queryDocument: this.queryDocument,
      variables: { tagSlug: params.slug },
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
    data: RemoteTagDetails.QueryResponse
  ): TagDetailsModel.Model | undefined {
    const tag = data.tags?.data[0]

    if (tag) return this.mapValidTag(tag)
  }

  private mapValidTag(
    tag: RemoteTagDetails.TagData
  ): TagDetailsModel.Model | undefined {
    const tagAttr = tag?.attributes

    const validPosts = tagAttr?.posts?.data.reduce<TagDetailsModel.Post[]>(
      (validPosts, post) => {
        const result = this.mapValidPost(post)
        result && validPosts.push(result)

        return validPosts
      },
      []
    )

    if (validPosts && tagAttr && tag.id)
      return {
        id: tag.id,
        title: tagAttr.title,
        slug: tagAttr.slug,
        posts: validPosts,
      }
  }

  private mapValidPost(
    post: RemoteTagDetails.PostData
  ): TagDetailsModel.Post | undefined {
    const postAttr = post.attributes

    const postUrl = this.getImageFormat(
      postAttr?.image.data?.attributes?.formats,
      IMAGE_PLACEHOLDER.POST
    )

    const writer = this.mapValidUser(postAttr?.user?.data)

    if (post.id && postAttr && writer) {
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
        writer,
      }
    }
  }

  private mapValidUser(
    user: RemoteTagDetails.UserData
  ): TagDetailsModel.Writer | undefined {
    const userAttr = user?.attributes

    const avatarUrl = this.getImageFormat(
      userAttr?.avatar.data?.attributes?.formats,
      IMAGE_PLACEHOLDER.AVATAR
    )

    if (userAttr && user.id)
      return {
        id: user.id,
        name: userAttr.name,
        username: userAttr.username,
        bio: userAttr.biography,
        avatar: {
          src: avatarUrl,
        },
      }
  }
}
