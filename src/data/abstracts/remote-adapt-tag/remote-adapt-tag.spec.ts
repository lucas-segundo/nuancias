import { makeRemoteTagMock } from 'data/models/tag/remote-tag-preview/mock'
import { AbstractRemoteAdaptTag } from './remote-adapt-tag'

class Sut extends AbstractRemoteAdaptTag {}

const makeSut = () => {
  const sut = new Sut()

  return {
    sut,
  }
}

describe('RemoteAdaptTag', () => {
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
})
