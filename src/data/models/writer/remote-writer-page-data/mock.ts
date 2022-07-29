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
    image: {
      data: {
        attributes: {
          url: faker.image.abstract(),
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
    avatar: {
      data: {
        attributes: {
          url: faker.image.avatar(),
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
