import { faker } from '@faker-js/faker'
import { SearchedPostModel } from '../..'

export const makeSearchedPostMock = (
  text?: string
): SearchedPostModel.Model => {
  const validText = text ? text : ''
  return {
    id: faker.datatype.uuid(),
    title: `${faker.random.word()} ${validText}`,
    slug: `${faker.random.word()} ${validText}`,
    writer: {
      username: faker.internet.userName(),
    },
  }
}
