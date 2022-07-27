import { AbstractRemotePost } from 'data/abstracts'
import {
  PostCardSortVar,
  PostCardVariables,
  RemotePostCardModel,
  RemotePostCardQueryVar,
} from 'data/models'
import { GraphqlClient } from 'data/protocols/http'
import { StatusCodeEnum } from 'data/protocols/http/common'
import { UnexpectedError } from 'domain/errors'
import { PostCardModel } from 'domain/models'
import { LoadPostCard } from 'domain/use-cases'

export class RemotePostCard
  extends AbstractRemotePost
  implements LoadPostCard<PostCardVariables>
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
  }: PostCardVariables): Promise<PostCardModel.Model[] | []> {
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

    const posts = this.mapPosts(postsData)

    return posts?.filter((post): post is PostCardModel.Model => !!post) || []
  }

  private mapPosts(
    posts: RemotePostCardModel.PostsData
  ): (PostCardModel.Model | null)[] {
    return posts.map((post) => {
      const postAttr = post.attributes
      if (!post.id || !postAttr) return null

      const tags = RemotePostCard.mapTags(postAttr.tags?.data)
      if (tags.length === 0) return null

      const userAttr = postAttr.user?.data?.attributes
      if (!userAttr) return null

      const postUrl = RemotePostCard.getPostUrl(
        postAttr.image.data?.attributes?.formats
      )
      const avatarUrl = RemotePostCard.getAvatarUrl(
        userAttr.avatar.data?.attributes?.formats
      )
      const preview = RemotePostCard.makePreview(postAttr.content)

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
