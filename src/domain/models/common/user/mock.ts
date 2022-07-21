import { faker } from '@faker-js/faker'
import { UserModel } from './user'

export const makeUserCommonMock = (): UserModel => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  username: faker.internet.userName(),
  bio: faker.random.words(),
  avatar: {
    src: faker.image.avatar(),
  },
})
