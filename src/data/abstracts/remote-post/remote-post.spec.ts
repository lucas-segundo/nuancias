import { IMAGE_PLACEHOLDER } from 'data/helpers'
import { makeImageFormats } from 'data/models/common/image-formats/mock'
import { makeRemoteTagMock } from 'data/models/tag/remote-tag/mock'
import { AbstractRemotePost } from './remote-post'

class Sut extends AbstractRemotePost {}

const makeSut = () => {
  const sut = new Sut()
  const fakeImageFormats = makeImageFormats()
  const placeholder = IMAGE_PLACEHOLDER.POST

  return {
    sut,
    fakeImageFormats,
    placeholder,
  }
}

describe('AbstractRemotePost', () => {
  it('should return tag mapped', () => {
    const { sut } = makeSut()
    const remoteTagMock = makeRemoteTagMock()
    const tags = sut.adaptToTagModel([remoteTagMock])

    const remoteTagMapped = {
      id: remoteTagMock.id,
      title: remoteTagMock.attributes?.title,
      slug: remoteTagMock.attributes?.slug,
    }

    expect(tags).toStrictEqual([remoteTagMapped])
  })

  it('should return empty tag array with receive nothing in params', () => {
    const { sut } = makeSut()
    const tags = sut.adaptToTagModel()

    expect(tags).toStrictEqual([])
  })

  it('should return medium image if available', () => {
    const { sut, fakeImageFormats, placeholder } = makeSut()
    const image = sut.getImageFormat(fakeImageFormats, placeholder)

    expect(image).toBe(fakeImageFormats?.medium?.url)
  })

  it('should return small image if medium is not available', () => {
    const { sut, fakeImageFormats, placeholder } = makeSut()

    delete fakeImageFormats?.medium
    const image = sut.getImageFormat(fakeImageFormats, placeholder)

    expect(image).toBe(fakeImageFormats?.small?.url)
  })

  it('should return thumbnail image if small and medium is not available', () => {
    const { sut, fakeImageFormats, placeholder } = makeSut()

    delete fakeImageFormats?.medium
    delete fakeImageFormats?.small
    const image = sut.getImageFormat(fakeImageFormats, placeholder)

    expect(image).toBe(fakeImageFormats?.thumbnail?.url)
  })

  it('should return placeholder image if none image is available', () => {
    const { sut, placeholder } = makeSut()
    const image = sut.getImageFormat({}, placeholder)

    expect(image).toBe(placeholder)
  })
})
