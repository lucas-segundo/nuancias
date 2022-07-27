import { faker } from '@faker-js/faker'
import { PostCardModel, PostPageModel, SearchedPost } from '..'
import { makeTagModelMock } from '../common/tag/mock'

export const makeSearchedPostMock = (text?: string): SearchedPost.Model => ({
  id: faker.datatype.uuid(),
  title: `${faker.random.word()} ${text}`,
  slug: `${faker.random.word()} ${text}`,
  writer: {
    username: faker.internet.userName(),
  },
})

const makePostCardMock = (): PostCardModel.Model => ({
  id: faker.datatype.uuid(),
  title: faker.random.words(),
  preview: faker.random.words(),
  slug: faker.random.word(),
  publishedAt: faker.datatype.datetime().toDateString(),
  writer: {
    name: faker.name.findName(),
    username: faker.internet.userName(),
    avatar: {
      src: faker.image.avatar(),
    },
  },
  image: {
    src: faker.image.city(),
  },
  tags: [
    {
      id: faker.datatype.uuid(),
      slug: faker.random.word(),
      title: faker.random.words(),
    },
  ],
})

export const makePostCardsMock = (): PostCardModel.Model[] => [
  makePostCardMock(),
  makePostCardMock(),
]

export const makePostPageMock = (): PostPageModel.Model => ({
  id: faker.datatype.uuid(),
  title: faker.random.words(),
  preview: faker.random.words(),
  image: {
    src: faker.image.business(1000, 1000),
  },
  content: '<h1>hello</h1>',
  publishedAt: faker.datatype.datetime().toDateString(),
  tags: [makeTagModelMock(), makeTagModelMock()],
  writer: {
    name: faker.name.findName(),
    username: faker.internet.userName(),
    bio: faker.random.words(),
    avatar: {
      src: faker.internet.url(),
    },
  },
})
