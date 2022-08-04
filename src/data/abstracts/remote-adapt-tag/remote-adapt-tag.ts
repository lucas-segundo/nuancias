import { RemoteTagPreviewModel } from 'data/models'
import { TagPreviewModel } from 'domain/models'
import { AbstractAuthToken } from '../auth-token/auth-token'

export abstract class AbstractRemoteAdaptTag extends AbstractAuthToken {
  adaptToTagModel(
    data?: RemoteTagPreviewModel.Model[]
  ): TagPreviewModel.Model[] | [] {
    const tags = data?.reduce<TagPreviewModel.Model[]>((validTags, tag) => {
      const result = this.mapValidTag(tag)

      result && validTags.push(result)

      return validTags
    }, [])

    return tags || []
  }

  mapValidTag(
    tag?: RemoteTagPreviewModel.Model
  ): TagPreviewModel.Model | undefined {
    if (tag?.id && tag?.attributes?.title && tag?.attributes?.slug) {
      const { id, attributes } = tag
      return {
        id,
        title: attributes?.title,
        slug: attributes?.slug,
      }
    }
  }
}
