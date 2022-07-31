import { AbstractRemotePost } from 'data/abstracts'
import { IMAGE_PLACEHOLDER } from 'data/helpers'
import {
  PostCardSortVar,
  PostCardVariables,
  RemotePostCardModel,
  RemotePostCardQueryVar,
} from 'data/models'
import { GraphqlClient } from 'data/protocols/http'
import { StatusCodeEnum } from 'data/protocols/http/common'
import { UnexpectedError } from 'domain/errors'
import { PostPreviewModel } from 'domain/models'
import { LoadPostsPreview } from 'domain/use-cases'

export class RemotePostCard
  extends AbstractRemotePost
  implements LoadPostsPreview<PostCardVariables>
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
  }: PostCardVariables): Promise<PostPreviewModel.Model[] | []> {
    const sortBy = sort && this.makeSortBy(sort)

    const response = await this.graphqlClient.query<
      RemotePostCardQueryVar,
      RemotePostCardModel.QueryResponse
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
        return this.adaptResponseToModel(response.data) || []
      case StatusCodeEnum.NO_CONTENT:
        return []
      default:
        throw new UnexpectedError()
    }
  }

  makeSortBy(sort: PostCardSortVar) {
    return `${sort.by}:${sort.order}`
  }

  adaptResponseToModel(data: RemotePostCardModel.QueryResponse) {
    const postsData = data.posts?.data
    if (!postsData) return []

    const posts = this.mapValidPosts(postsData)

    return posts?.filter((post): post is PostPreviewModel.Model => !!post) || []
  }

  private mapValidPosts(
    posts: RemotePostCardModel.PostsData
  ): (PostPreviewModel.Model | null)[] {
    return posts.map((post) => {
      const postAttr = post.attributes
      const tags = this.mapTags(postAttr?.tags?.data)
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
    })
  }
}
