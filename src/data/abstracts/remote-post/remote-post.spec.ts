import { makeRemoteTagMock } from 'data/models/remote-tag/mock'
import { AbstractRemotePost } from './remote-post'

class Sut extends AbstractRemotePost {}

const makeSut = () => {
  const sut = new Sut()

  return {
    sut,
  }
}

describe('AbstractRemotePost', () => {
  it('should return tag mapped', () => {
    const { sut } = makeSut()
    const remoteTagMock = makeRemoteTagMock()
    const tags = sut.mapTags([remoteTagMock])

    const remoteTagMapped = {
      id: remoteTagMock.id,
      title: remoteTagMock.attributes?.title,
      slug: remoteTagMock.attributes?.slug,
    }

    expect(tags).toStrictEqual([remoteTagMapped])
  })

  it('should return empty tag array with receive nothing in params', () => {
    const { sut } = makeSut()
    const tags = sut.mapTags()

    expect(tags).toStrictEqual([])
  })
})
