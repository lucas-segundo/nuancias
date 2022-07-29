import { faker } from '@faker-js/faker'
import { RemoteTag } from '../..'

export const makeRemoteTagMock = (): RemoteTag.Model => ({
  id: faker.datatype.uuid(),
  attributes: {
    title: faker.random.words(),
    slug: faker.datatype.uuid(),
  },
})
