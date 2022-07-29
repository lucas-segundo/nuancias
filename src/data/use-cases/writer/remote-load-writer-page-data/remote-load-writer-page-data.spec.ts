import { faker } from '@faker-js/faker'
import { RemoteWriterPageData } from 'data/models'
import { makeRemoteWriterPageDataMock } from 'data/models/writer/remote-writer-page-data/mock'
import { GraphqlClient } from 'data/protocols/http'
import { HttpResponse, StatusCodeEnum } from 'data/protocols/http/common'
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

  const fakeResponse: HttpResponse<RemoteWriterPageData.QueryResponse> = {
    data: makeRemoteWriterPageDataMock(),
    statusCode: StatusCodeEnum.OK,
  }

  return {
    sut,
    fakeAuthToken,
    fakeParams,
    fakeResponse,
  }
}

describe('RemoteLoadWriterPageData', () => {
  it('should call client with right values', async () => {
    const fakeQueryDocument = faker.datatype.string()
    const { sut, fakeAuthToken, fakeResponse } = makeSut(fakeQueryDocument)
    const params: LoadWriterPageData.Params = {
      username: faker.internet.userName(),
      postsLimit: faker.datatype.number(),
    }

    graphqlClientMocked.query.mockResolvedValueOnce(fakeResponse)

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

  it('should return data if query is success', async () => {
    const { sut, fakeAuthToken, fakeParams, fakeResponse } = makeSut()

    graphqlClientMocked.query.mockResolvedValueOnce(fakeResponse)

    sut.setAuthToken(fakeAuthToken)
    const response = await sut.get(fakeParams)
    const fakeModel = sut.adaptResponseToModel(fakeResponse.data)

    expect(response).toEqual(fakeModel)
  })
})
