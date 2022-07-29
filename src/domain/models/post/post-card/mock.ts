import { faker } from '@faker-js/faker'
import { PostCardModel } from 'domain/models'
import { makeTagModelMock } from 'domain/models/common/tag/mock'

export const makePostCardWriterMock = (): PostCardModel.Writer => ({
  name: faker.name.findName(),
  username: faker.internet.userName(),
  avatar: {
    src: faker.image.avatar(),
  },
})

export const makePostCardMock = (): PostCardModel.Model => ({
  id: faker.datatype.uuid(),
  title: faker.random.words(15),
  preview: faker.random.words(),
  slug: faker.random.word(),
  publishedAt: faker.datatype.datetime().toDateString(),
  writer: makePostCardWriterMock(),
  image: {
    src: faker.image.city(),
  },
  tags: [makeTagModelMock(), makeTagModelMock()],
})

export const makePostCardsMock = (): PostCardModel.Model[] => [
  makePostCardMock(),
  makePostCardMock(),
]
