import { getCharactersFromHTML, IMAGE_PLACEHOLDER } from 'data/helpers'
import { RemoteTag } from 'data/models'
import { ImageFormats } from 'data/models/common'
import { TagPreviewModel } from 'domain/models'
import { AbstractAuthToken } from '../auth-token/auth-token'

export abstract class AbstractRemotePost extends AbstractAuthToken {
  adaptToTagModel(data?: RemoteTag.Model[]): TagPreviewModel.Model[] | [] {
    const tags = data?.reduce<TagPreviewModel.Model[]>((validTags, tag) => {
      const result = this.mapValidTag(tag)

      result && validTags.push(result)

      return validTags
    }, [])

    return tags || []
  }

  mapValidTag(tag?: RemoteTag.Model): TagPreviewModel.Model | undefined {
    if (tag?.id && tag?.attributes?.title && tag?.attributes?.slug) {
      const { id, attributes } = tag
      return {
        id,
        title: attributes?.title,
        slug: attributes?.slug,
      }
    }
  }

  getImageFormat(
    imageFormats: ImageFormats,
    placeholder: IMAGE_PLACEHOLDER
  ): string {
    return (
      imageFormats?.medium?.url ||
      imageFormats?.small?.url ||
      imageFormats?.thumbnail?.url ||
      placeholder
    )
  }

  makePreview(htmlContent: string): string {
    return (
      getCharactersFromHTML({
        html: htmlContent,
        characterCount: 150,
      }) + '...'
    )
  }
}
