import { faker } from '@faker-js/faker'
import { RemoteWriterDetails } from 'data/models'

const makeTagData = (): RemoteWriterDetails.TagData => ({
  id: faker.datatype.uuid(),
  attributes: {
    title: faker.random.words(),
    slug: faker.database.column(),
  },
})

const makePostData = (): RemoteWriterDetails.PostData => ({
  id: faker.datatype.uuid(),
  attributes: {
    title: faker.random.words(),
    content: '<h1>hello</h1>',
    slug: faker.datatype.uuid(),
    image: {
      data: {
        attributes: {
          formats: { medium: { url: faker.image.abstract() } },
        },
      },
    },
    publishedAt: faker.datatype.datetime(),
    tags: {
      data: [makeTagData(), makeTagData()],
    },
  },
})

const makeWriterData = (): RemoteWriterDetails.WriterData => ({
  id: faker.datatype.uuid(),
  attributes: {
    name: faker.name.findName(),
    biography: faker.random.words(),
    username: faker.internet.userName(),
    avatar: {
      data: {
        attributes: {
          formats: { medium: { url: faker.image.abstract() } },
        },
      },
    },
    posts: {
      data: [makePostData(), makePostData()],
    },
  },
})

export const makeRemoteWriterPageDataMock =
  (): RemoteWriterDetails.QueryResponse => ({
    usersPermissionsUsers: {
      data: [makeWriterData(), makeWriterData()],
    },
  })
