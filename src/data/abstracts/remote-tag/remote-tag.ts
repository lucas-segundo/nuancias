import { getCharactersFromHTML, IMAGE_PLACEHOLDER } from 'data/helpers'
import { ImageFormats } from 'data/models/common'
import { AbstractAuthToken } from '../auth-token/auth-token'

export abstract class AbstractRemoteTag extends AbstractAuthToken {
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
