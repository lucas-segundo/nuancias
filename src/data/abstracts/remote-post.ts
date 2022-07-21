import { RemotePostCardModel } from 'data/models'
import { TagModel } from 'domain/models/common'
import { AbstractAuthToken } from './auth-token'

type Tags = RemotePostCardModel.Tags

export abstract class AbstractRemotePost extends AbstractAuthToken {
  static mapTags(tags?: Tags | null): TagModel[] | [] {
    const tagsMapped = tags?.data.map((tag) => {
      const { id, attributes } = tag

      if (id && attributes?.title && attributes?.slug)
        return {
          id,
          title: attributes?.title,
          slug: attributes?.slug,
        }
    })

    const tagsChecked = tagsMapped?.filter((tag): tag is TagModel => !!tag)

    return tagsChecked || []
  }
}
