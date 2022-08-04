import { faker } from '@faker-js/faker'
import { RemoteTagPreviewModel } from '../..'

export const makeRemoteTagMock = (): RemoteTagPreviewModel.Model => ({
  id: faker.datatype.uuid(),
  attributes: {
    title: faker.random.words(),
    slug: faker.datatype.uuid(),
  },
})
