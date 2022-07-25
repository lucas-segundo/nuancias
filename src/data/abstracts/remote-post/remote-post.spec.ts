import { AbstractRemotePost } from './remote-post'

class Sut extends AbstractRemotePost {}

describe('AbstractRemotePost', () => {
  it('should return empty tag array with receive nothing in params', () => {
    const tags = Sut.mapTags()

    expect(tags).toStrictEqual([])
  })
})
