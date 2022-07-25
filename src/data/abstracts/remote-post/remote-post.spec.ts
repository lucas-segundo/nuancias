import { makeRemoteTagMock } from 'data/models/remote-tag/mock'
import { AbstractRemotePost } from './remote-post'

class Sut extends AbstractRemotePost {}

describe('AbstractRemotePost', () => {
  it('should return tag mapped', () => {
    const remoteTagMock = makeRemoteTagMock()
    const tags = Sut.mapTags([remoteTagMock])

    const remoteTagMapped = {
      id: remoteTagMock.id,
      title: remoteTagMock.attributes?.title,
      slug: remoteTagMock.attributes?.slug,
    }

    expect(tags).toStrictEqual([remoteTagMapped])
  })

  it('should return empty tag array with receive nothing in params', () => {
    const tags = Sut.mapTags()

    expect(tags).toStrictEqual([])
  })
})
