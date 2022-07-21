import { faker } from '@faker-js/faker'
import { RemoteSearchPostsModel } from '..'

export const makeSearchedPostMock = (): RemoteSearchPostsModel.PostData => ({
  id: faker.datatype.uuid(),
  attributes: {
    title: faker.random.word(),
    slug: faker.random.words(),
    user: {
      data: {
        attributes: {
          username: faker.internet.userName(),
        },
      },
    },
  },
})

export const makeSearchPostsResponseMock =
  (): RemoteSearchPostsModel.QueryResponse => ({
    posts: {
      data: [makeSearchedPostMock(), makeSearchedPostMock()],
    },
  })
