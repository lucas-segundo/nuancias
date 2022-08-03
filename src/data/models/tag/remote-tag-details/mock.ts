import { faker } from '@faker-js/faker'
import { RemoteTagDetails } from 'data/models'

export const makePost = (): RemoteTagDetails.PostData => ({
  id: faker.datatype.uuid(),
  attributes: {
    title: faker.random.words(),
    slug: faker.datatype.uuid(),
    content: '<h1>hello</h1>',
    publishedAt: faker.datatype.datetime(),
    image: {
      data: {
        id: faker.datatype.uuid(),
        attributes: {
          formats: faker.datatype.json(),
        },
      },
    },
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
