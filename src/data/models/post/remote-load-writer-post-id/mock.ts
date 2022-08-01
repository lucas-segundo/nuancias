import { faker } from '@faker-js/faker'
import { RemoteWriterPostIDModel } from '../..'

const makePost = () => ({
  id: faker.datatype.uuid(),
  attributes: {
    slug: faker.datatype.string(),
    user: {
      data: {
        id: faker.datatype.uuid(),
        attributes: {
          username: faker.internet.userName(),
        },
      },
    },
  },
})

export const makePostPagePathsQueryResponseMock =
  (): RemoteWriterPostIDModel.QueryResponse => ({
    posts: {
      data: [makePost(), makePost()],
    },
  })
