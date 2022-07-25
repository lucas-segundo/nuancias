import { RemoteTag } from 'data/models'
import { TagModel } from 'domain/models/common'
import { AbstractAuthToken } from '../auth-token/auth-token'

export abstract class AbstractRemotePost extends AbstractAuthToken {
  static mapTags(tags?: RemoteTag.Model[] | null): TagModel[] | [] {
    const tagsMapped = tags?.map((tag) => {
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
