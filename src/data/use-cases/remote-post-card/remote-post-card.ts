import { AbstractRemotePost } from 'data/abstracts'
import { getCharactersFromHTML } from 'data/helpers'
import {
  PostCardSortVar,
  PostCardVariables,
  RemotePostCardModel,
  RemotePostCardQueryVar,
} from 'data/models'
import { ImageFormats } from 'data/models/common'
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
    const sortBy = sort && RemotePostCard.makeSortBy(sort)

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
        return RemotePostCard.adaptResponseToModel(response.data) || []
      case StatusCodeEnum.NO_CONTENT:
        return []
      default:
        throw new UnexpectedError()
    }
  }

  static makeSortBy(sort: PostCardSortVar) {
    return `${sort.by}:${sort.order}`
  }

  static adaptResponseToModel(data: RemotePostCardModel.QueryResponse) {
    const postsData = data.posts?.data
    if (!postsData) return []

    const posts = RemotePostCard.mapPosts(postsData)

    return posts?.filter((post): post is PostCardModel.Model => !!post) || []
  }

  private static mapPosts(
    posts: RemotePostCardModel.PostsData
  ): (PostCardModel.Model | null)[] {
    return posts.map((post) => {
      if (!post.id || !post.attributes) return null

      const tags = RemotePostCard.mapTags(post.attributes.tags?.data)
      if (tags.length === 0) return null

      const userAttr = post.attributes.user?.data?.attributes
      if (!userAttr) return null

      const postUrl = RemotePostCard.getPostUrl(post)
      const avatarUrl = RemotePostCard.getAvatarUrl(post)
      const preview = RemotePostCard.makePreview(post.attributes.content)

      return {
        id: post.id,
        title: post.attributes.title,
        preview,
        slug: post.attributes.slug,
        publishedAt: post.attributes.publishedAt,
        image: {
          src: postUrl,
        },
        writer: {
          name: userAttr.name,
          username: userAttr.username,
          avatar: {
            src: avatarUrl,
          },
        },
        tags,
      }
    })
  }

  private static getPostUrl(post: RemotePostCardModel.PostsData[0]) {
    const { medium, small } = post?.attributes?.image.data?.attributes
      ?.formats as ImageFormats

    return medium?.url || small?.url || '/images/post-placeholder.png'
  }

  private static getAvatarUrl(post: RemotePostCardModel.PostsData[0]) {
    const { medium, small } = post?.attributes?.user?.data?.attributes?.avatar
      .data?.attributes?.formats as ImageFormats

    return medium?.url || small?.url || 'avatar-placeholder.png'
  }

  private static makePreview(htmlContent: string) {
    return (
      getCharactersFromHTML({
        html: htmlContent,
        characterCount: 150,
      }) + '...'
    )
  }
}
