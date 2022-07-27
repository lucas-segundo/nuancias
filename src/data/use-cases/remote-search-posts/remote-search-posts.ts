import { RemoteSearchPostsModel } from 'data/models'
import { GraphqlClient } from 'data/protocols/http'
import { StatusCodeEnum } from 'data/protocols/http/common'
import { UnexpectedError } from 'domain/errors'
import { SearchedPost } from 'domain/models'
import { SearchPosts } from 'domain/use-cases'

export class RemoteSearchPosts implements SearchPosts {
  constructor(
    private readonly graphqlClient: GraphqlClient.Client,
    private readonly queryDocument: unknown
  ) {}

  async getAllByText(text: string): Promise<SearchedPost.Model[] | []> {
    const response = await this.graphqlClient.query<
      RemoteSearchPostsModel.QueryVariables,
      RemoteSearchPostsModel.QueryResponse
    >({
      queryDocument: this.queryDocument,
      variables: {
        searchTo: text,
        limit: 10,
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

  adaptResponseToModel(resData: RemoteSearchPostsModel.QueryResponse) {
    const postsData = resData.posts?.data
    if (!postsData) return null

    const posts = this.mapValidPosts(postsData)
    return posts?.filter((post): post is SearchedPost.Model => !!post) || []
  }

  private mapValidPosts(
    posts: RemoteSearchPostsModel.PostsData
  ): (SearchedPost.Model | null)[] {
    return posts.map((post) => {
      if (!post.id) return null

      const postAttr = post.attributes
      if (!postAttr) return null

      const userAttr = postAttr.user?.data?.attributes
      if (!userAttr) return null

      return {
        id: post.id,
        title: postAttr.title,
        slug: postAttr.slug,
        writer: {
          username: userAttr.username,
        },
      }
    })
  }
}
