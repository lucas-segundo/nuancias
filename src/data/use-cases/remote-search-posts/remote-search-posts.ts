import { RemoteSearchPostsModel } from 'data/models'
import { GraphqlClient } from 'data/protocols/http'
import { StatusCodeEnum } from 'data/protocols/http/common'
import { UnexpectedError } from 'domain/errors'
import { SearchedPostModel } from 'domain/models'
import { SearchPosts } from 'domain/use-cases'

export class RemoteSearchPosts implements SearchPosts {
  constructor(
    private readonly graphqlClient: GraphqlClient.Client,
    private readonly queryDocument: unknown
  ) {}

  async getAllByText(text: string): Promise<SearchedPostModel.Model[] | []> {
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
        return this.adaptResponseToModel(response.data)
      case StatusCodeEnum.NO_CONTENT:
        return []
      default:
        throw new UnexpectedError()
    }
  }

  adaptResponseToModel(
    data: RemoteSearchPostsModel.QueryResponse
  ): SearchedPostModel.Model[] | [] {
    const posts = data.posts?.data.reduce<SearchedPostModel.Model[]>(
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
    post: RemoteSearchPostsModel.PostData
  ): SearchedPostModel.Model | undefined {
    const postAttr = post.attributes
    const userAttr = postAttr?.user?.data?.attributes

    if (post.id && postAttr && userAttr)
      return {
        id: post.id,
        title: postAttr.title,
        slug: postAttr.slug,
        writer: {
          username: userAttr.username,
        },
      }
  }
}
