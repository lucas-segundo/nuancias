import { faker } from '@faker-js/faker'
import { RemotePostPageModel } from '..'

const makeImage = () => ({
  data: {
    id: faker.datatype.uuid(),
    attributes: {
      formats: faker.datatype.json(),
    },
  },
})

const makeTag = (): RemotePostPageModel.TagData => ({
  id: faker.datatype.uuid(),
  attributes: {
    title: faker.random.word(),
    slug: faker.datatype.string(),
  },
})

const makePost = (): RemotePostPageModel.PostData => ({
  id: faker.datatype.uuid(),
  attributes: {
    title: faker.random.word(),
    content: faker.datatype.string(),
    image: makeImage(),
    publishedAt: faker.datatype.datetime(),
    tags: {
      data: [makeTag(), makeTag()],
    },
    user: {
      data: {
        id: faker.datatype.uuid(),
        attributes: {
          name: faker.name.findName(),
          biography: faker.random.words(),
          username: faker.internet.userName(),
          avatar: makeImage(),
        },
      },
    },
  },
})

export const makePostPageQueryResponseMock =
  (): RemotePostPageModel.QueryResponse => ({
    posts: {
      data: [makePost(), makePost()],
    },
  })
