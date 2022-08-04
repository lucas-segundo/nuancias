import { faker } from '@faker-js/faker'
import { TagDetailsModel } from 'domain/models'

const makeImage = (): TagDetailsModel.Image => ({
  src: faker.image.abstract(),
})

const makeWriter = (): TagDetailsModel.Writer => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  username: faker.internet.userName(),
  bio: faker.random.words(),
  avatar: makeImage(),
})

const makePost = (): TagDetailsModel.Post => ({
  id: faker.datatype.uuid(),
  slug: faker.datatype.uuid(),
  title: faker.random.words(),
  preview: faker.lorem.paragraph(),
  publishedAt: faker.datatype.datetime().toISOString(),
  image: makeImage(),
  writer: makeWriter(),
})

export const makeTagDetails = (): TagDetailsModel.Model => ({
  id: faker.datatype.uuid(),
  slug: faker.datatype.uuid(),
  title: faker.random.words(),
  posts: [makePost(), makePost(), makePost()],
})
