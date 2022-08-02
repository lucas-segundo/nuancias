import { getCharactersFromHTML, IMAGE_PLACEHOLDER } from 'data/helpers'
import { RemoteTag } from 'data/models'
import { ImageFormats } from 'data/models/common'
import { TagModel } from 'domain/models/common'
import { AbstractAuthToken } from '../auth-token/auth-token'

export abstract class AbstractRemotePost extends AbstractAuthToken {
  adaptToTagModel(data?: RemoteTag.Model[] | null): TagModel[] | [] {
    const tags = data?.reduce<TagModel[]>((validTags, tag) => {
      const result = this.mapValidTag(tag)

      result && validTags.push(result)

      return validTags
    }, [])

    return tags || []
  }

  mapValidTag(tag?: RemoteTag.Model): TagModel | null {
    if (!tag) return null
    const { id, attributes } = tag

    if (id && attributes?.title && attributes?.slug) {
      return {
        id,
        title: attributes?.title,
        slug: attributes?.slug,
      }
    } else {
      return null
    }
  }

  getImageFormat(imageFormats: ImageFormats, placeholder: IMAGE_PLACEHOLDER) {
    return (
      imageFormats?.medium?.url ||
      imageFormats?.small?.url ||
      imageFormats?.thumbnail?.url ||
      placeholder
    )
  }

  makePreview(htmlContent: string) {
    return (
      getCharactersFromHTML({
        html: htmlContent,
        characterCount: 150,
      }) + '...'
    )
  }
}
