import { faker } from '@faker-js/faker'
import { PostPageModel, SearchedPost } from '..'
import { makeTagModelMock } from '../common/tag/mock'

export const makeSearchedPostMock = (text?: string): SearchedPost.Model => ({
  id: faker.datatype.uuid(),
  title: `${faker.random.word()} ${text}`,
  slug: `${faker.random.word()} ${text}`,
  writer: {
    username: faker.internet.userName(),
  },
})

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
