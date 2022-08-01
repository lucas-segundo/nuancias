import { faker } from '@faker-js/faker'
import { RemotePostContentModel } from '../..'

const makeImage = () => ({
  data: {
    id: faker.datatype.uuid(),
    attributes: {
      formats: faker.datatype.json(),
    },
  },
})

const makeTag = (): RemotePostContentModel.TagData => ({
  id: faker.datatype.uuid(),
  attributes: {
    title: faker.random.word(),
    slug: faker.datatype.string(),
  },
})

const makePost = (): RemotePostContentModel.PostData => ({
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
  (): RemotePostContentModel.QueryResponse => ({
    posts: {
      data: [makePost(), makePost()],
    },
  })
