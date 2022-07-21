import { faker } from '@faker-js/faker'
import { RemotePostCardModel } from '..'

const makeUserMock = () => ({
  data: {
    id: faker.datatype.uuid(),
    attributes: {
      name: faker.name.findName(),
      username: faker.internet.userName(),
      biography: faker.random.words(),
      avatar: {
        data: {
          id: faker.datatype.uuid(),
          attributes: {
            formats: {
              small: {
                url: faker.internet.url(),
              },
              medium: {
                url: faker.internet.url(),
              },
              large: {
                url: faker.internet.url(),
              },
              thumbnail: {
                url: faker.internet.url(),
              },
            },
          },
        },
      },
    },
  },
})

const makeImageMock = () => ({
  data: {
    id: faker.datatype.uuid(),
    attributes: {
      formats: {
        large: {
          url: faker.internet.url(),
        },
        small: {
          url: faker.internet.url(),
        },
        medium: {
          url: faker.internet.url(),
        },
        thumbnail: {
          url: faker.internet.url(),
        },
      },
    },
  },
})

const makeTagsMock = () => ({
  data: [
    {
      id: faker.datatype.uuid(),
      attributes: {
        title: faker.random.word(),
        slug: faker.random.words(),
      },
    },
  ],
})

export const makePostCardQueryResponseMock =
  (): RemotePostCardModel.QueryResponse => ({
    posts: {
      data: [
        {
          id: faker.datatype.uuid(),
          attributes: {
            title: faker.lorem.word(),
            content: faker.lorem.paragraph(),
            slug: faker.random.words(),
            publishedAt: faker.datatype.datetime().toDateString(),
            image: makeImageMock(),
            user: makeUserMock(),
            tags: makeTagsMock(),
          },
        },
      ],
    },
  })
