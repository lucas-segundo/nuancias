import { faker } from '@faker-js/faker'
import { RemotePostPagePathsModel } from '..'

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
  (): RemotePostPagePathsModel.QueryResponse => ({
    posts: {
      data: [makePost(), makePost()],
    },
  })
