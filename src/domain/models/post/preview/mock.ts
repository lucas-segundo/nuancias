import { faker } from '@faker-js/faker'
import { PostPreviewModel } from 'domain/models'

export const makePostCardTagMock = (): PostPreviewModel.Tag => ({
  id: faker.datatype.uuid(),
  slug: faker.datatype.string(),
  title: faker.random.words(),
})

export const makePostCardWriterMock = (): PostPreviewModel.Writer => ({
  name: faker.name.findName(),
  username: faker.internet.userName(),
  avatar: {
    src: faker.image.avatar(),
  },
})

export const makePostPreviewMock = (): PostPreviewModel.Model => ({
  id: faker.datatype.uuid(),
  title: faker.random.words(15),
  preview: faker.random.words(),
  slug: faker.random.word(),
  publishedAt: faker.datatype.datetime().toDateString(),
  writer: makePostCardWriterMock(),
  image: {
    src: faker.image.city(),
  },
  tags: [makePostCardTagMock(), makePostCardTagMock()],
})
