import { faker } from '@faker-js/faker'
import { WriterCardModel } from 'domain/models'

export const makeWriterCardMock = (): WriterCardModel.Model => ({
  name: faker.name.findName(),
  bio: faker.random.words(),
  username: faker.internet.userName(),
  avatar: {
    src: faker.image.avatar(),
  },
})
