import { faker } from '@faker-js/faker'
import { TagModel } from './tag'

export const makeTagModelMock = (): TagModel => ({
  id: faker.datatype.uuid(),
  slug: faker.datatype.string(),
  title: faker.random.words(),
})
