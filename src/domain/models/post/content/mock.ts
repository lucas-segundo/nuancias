import { faker } from '@faker-js/faker'
import { PostContentModel } from 'domain/models'

const makePostPageTagMock = (): PostContentModel.Tag => ({
  id: faker.datatype.uuid(),
  slug: faker.datatype.string(),
  title: faker.random.words(),
})

export const makePostContentMock = (): PostContentModel.Model => ({
  id: faker.datatype.uuid(),
  title: faker.random.words(),
  preview: faker.random.words(),
  image: {
    src: faker.image.business(1000, 1000),
  },
  content: '<h1>hello</h1>',
  publishedAt: faker.datatype.datetime().toDateString(),
  tags: [makePostPageTagMock(), makePostPageTagMock()],
  writer: {
    name: faker.name.findName(),
    username: faker.internet.userName(),
    bio: faker.random.words(),
    avatar: {
      src: faker.internet.url(),
    },
  },
})
