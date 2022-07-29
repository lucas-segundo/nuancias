import { faker } from '@faker-js/faker'
import { RemoteWriterPageData } from 'data/models'
import { GraphqlClient } from 'data/protocols/http'
import { LoadWriterPageData } from 'domain/use-cases'
import { RemoteLoadWriterPageData } from './remote-load-writer-page-data'

const graphqlClientMocked: jest.Mocked<GraphqlClient.Client> = {
  query: jest.fn(),
}

const makeSut = (fakeQueryDocument = faker.datatype.string()) => {
  const sut = new RemoteLoadWriterPageData(
    graphqlClientMocked,
    fakeQueryDocument
  )
  const fakeAuthToken = faker.datatype.uuid()

  const fakeParams: LoadWriterPageData.Params = {
    username: faker.internet.userName(),
    postsLimit: faker.datatype.number(),
  }

  return {
    sut,
    fakeAuthToken,
    fakeParams,
  }
}

describe('RemoteLoadWriterPageData', () => {
  it('should call client with right values', async () => {
    const fakeQueryDocument = faker.datatype.string()
    const { sut, fakeAuthToken } = makeSut(fakeQueryDocument)
    const params: LoadWriterPageData.Params = {
      username: faker.internet.userName(),
      postsLimit: faker.datatype.number(),
    }

    sut.setAuthToken(fakeAuthToken)
    await sut.get(params)

    const graphqlParams: GraphqlClient.Params<RemoteWriterPageData.QueryVariables> =
      {
        queryDocument: fakeQueryDocument,
        variables: { ...params, postsSortBy: 'publishedAt:desc' },
        config: {
          authToken: fakeAuthToken,
          cachePolicy: 'no-cache',
        },
      }

    expect(graphqlClientMocked.query).toBeCalledWith(graphqlParams)
  })

  // it('should return data if query is success', async () => {
  //   const { sut, fakeAuthToken, fakeParams } = makeSut()

  //   sut.setAuthToken(fakeAuthToken)
  //   await sut.get(fakeParams)

  //   graphqlClientMocked.query.mockResolvedValueOnce()
  // })
})
