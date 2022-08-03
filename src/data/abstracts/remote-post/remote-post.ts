import { getCharactersFromHTML, IMAGE_PLACEHOLDER } from 'data/helpers'
import { ImageFormats } from 'data/models/common'
import { AbstractRemoteAdaptTag } from '../remote-adapt-tag/remote-adapt-tag'

export abstract class AbstractRemotePost extends AbstractRemoteAdaptTag {
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
