import { faker } from '@faker-js/faker'
import { SearchedPost } from '../..'

export const makeSearchedPostMock = (text?: string): SearchedPost.Model => ({
  id: faker.datatype.uuid(),
  title: `${faker.random.word()} ${text}`,
  slug: `${faker.random.word()} ${text}`,
  writer: {
    username: faker.internet.userName(),
  },
})
