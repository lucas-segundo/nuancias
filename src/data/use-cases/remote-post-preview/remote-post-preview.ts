import { AbstractRemotePost } from 'data/abstracts'
import { IMAGE_PLACEHOLDER } from 'data/helpers'
import { RemotePostPreviewModel } from 'data/models'
import { GraphqlClient } from 'data/protocols/http'
import { StatusCodeEnum } from 'data/protocols/http/common'
import { UnexpectedError } from 'domain/errors'
import { PostPreviewModel } from 'domain/models'
import { LoadPostsPreview } from 'domain/use-cases'

export class RemotePostPreview
  extends AbstractRemotePost
  implements LoadPostsPreview<RemotePostPreviewModel.Params>
{
  constructor(
    private readonly graphqlClient: GraphqlClient.Client,
    private readonly queryDocument: unknown
  ) {
    super()
  }

  async getAll({
    limit,
    sort,
  }: RemotePostPreviewModel.Params): Promise<PostPreviewModel.Model[] | []> {
    const sortBy = sort && this.makeSortBy(sort)

    const response = await this.graphqlClient.query<
      RemotePostPreviewModel.QueryVariables,
      RemotePostPreviewModel.QueryResponse
    >({
      queryDocument: this.queryDocument,
      variables: {
        limit,
        sortBy,
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

  makeSortBy(sort: RemotePostPreviewModel.SortBy) {
    return `${sort.by}:${sort.order}`
  }

  adaptResponseToModel(
    data: RemotePostPreviewModel.QueryResponse
  ): PostPreviewModel.Model[] | [] {
    const posts = data.posts?.data.reduce<PostPreviewModel.Model[]>(
      (validPosts, post) => {
        const result = this.mapValidPost(post)
        result && validPosts.push(result)

        return validPosts
      },
      []
    )

    return posts || []
  }

  private mapValidPost(
    post: RemotePostPreviewModel.PostData
  ): PostPreviewModel.Model | undefined {
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

      const { title, slug, publishedAt } = postAttr
      const { name, username } = userAttr
      return {
        id: post.id,
        title,
        preview,
        slug,
        publishedAt,
        image: {
          src: postUrl,
        },
        writer: {
          name,
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
