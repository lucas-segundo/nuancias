import { faker } from '@faker-js/faker'
import { WriterDetailsModel } from 'domain/models'

const makeTag = (): WriterDetailsModel.Tag => ({
  id: faker.datatype.uuid(),
  title: faker.random.words(),
  slug: faker.datatype.uuid(),
})

const makePost = (): WriterDetailsModel.Post => ({
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

export const makeWriterDetailsMock = (): WriterDetailsModel.Model => ({
  id: faker.datatype.uuid(),
  bio: faker.random.words(),
  username: faker.internet.userName(),
  name: faker.name.findName(),
  avatar: {
    src: faker.image.avatar(),
  },
  posts: [makePost(), makePost()],
})
