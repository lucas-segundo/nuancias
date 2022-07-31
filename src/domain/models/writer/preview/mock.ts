import { faker } from '@faker-js/faker'
import { WriterPreviewModel } from 'domain/models'

export const makeWriterCardMock = (): WriterPreviewModel.Model => ({
  name: faker.name.findName(),
  bio: faker.random.words(),
  username: faker.internet.userName(),
  avatar: {
    src: faker.image.avatar(),
  },
})
