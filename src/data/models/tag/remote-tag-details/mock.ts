import { faker } from '@faker-js/faker'
import { RemoteTagDetails } from 'data/models'

const makeImage = (): RemoteTagDetails.Image => ({
  data: {
    id: faker.datatype.uuid(),
    attributes: {
      formats: faker.datatype.json(),
    },
  },
})

const makeUser = (): RemoteTagDetails.User => ({
  data: {
    id: faker.datatype.uuid(),
    attributes: {
      name: faker.name.findName(),
      username: faker.internet.userName(),
      biography: faker.random.words(),
      avatar: makeImage(),
    },
  },
})

const makePost = (): RemoteTagDetails.PostData => ({
  id: faker.datatype.uuid(),
  attributes: {
    title: faker.random.words(),
    slug: faker.datatype.uuid(),
    content: '<h1>hello</h1>',
    publishedAt: faker.datatype.datetime(),
    image: makeImage(),
    user: makeUser(),
  },
})

export const makeRemoteTagDetailsMock = (): RemoteTagDetails.QueryResponse => ({
  tag: {
    data: {
      id: faker.datatype.uuid(),
      attributes: {
        title: faker.random.words(),
        slug: faker.datatype.uuid(),
        posts: { data: [makePost(), makePost()] },
      },
    },
  },
})
