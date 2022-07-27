import { getCharactersFromHTML, IMAGE_PLACEHOLDER } from 'data/helpers'
import { RemoteTag } from 'data/models'
import { ImageFormats } from 'data/models/common'
import { TagModel } from 'domain/models/common'
import { AbstractAuthToken } from '../auth-token/auth-token'

export abstract class AbstractRemotePost extends AbstractAuthToken {
  mapTags(tags?: RemoteTag.Model[] | null): TagModel[] | [] {
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
