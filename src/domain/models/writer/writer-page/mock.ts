import { faker } from '@faker-js/faker'
import { WriterPageModel } from 'domain/models'

const makeTag = (): WriterPageModel.Tag => ({
  id: faker.datatype.uuid(),
  title: faker.random.words(),
  slug: faker.datatype.uuid(),
})

const makePost = (): WriterPageModel.Post => ({
  id: faker.datatype.uuid(),
  title: faker.random.words(),
  preview: faker.random.words(),
  slug: faker.datatype.uuid(),
  publishedAt: faker.datatype.datetime().toISOString(),
  image: {
    src: faker.image.abstract(),
  },
  tags: [makeTag(), makeTag()],
})

export const makeWriterPageMock = (): WriterPageModel.Model => ({
  id: faker.datatype.uuid(),
  bio: faker.random.words(),
  username: faker.internet.userName(),
  name: faker.name.findName(),
  avatar: {
    src: faker.image.avatar(),
  },
  posts: [makePost(), makePost()],
})
