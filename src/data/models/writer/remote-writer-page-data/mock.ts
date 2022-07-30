import { faker } from '@faker-js/faker'
import { RemoteWriterPageData } from 'data/models'

const makeTagData = (): RemoteWriterPageData.TagData => ({
  id: faker.datatype.uuid(),
  attributes: {
    title: faker.random.words(),
    slug: faker.database.column(),
  },
})

const makePostData = (): RemoteWriterPageData.PostData => ({
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

const makeWriterData = (): RemoteWriterPageData.WriterData => ({
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
  (): RemoteWriterPageData.QueryResponse => ({
    usersPermissionsUsers: {
      data: [makeWriterData(), makeWriterData()],
    },
  })
