import { faker } from '@faker-js/faker'
import { RemoteWriterDetails } from 'data/models'
import { makeRemoteWriterPageDataMock } from 'data/models/writer/remote-load-writer-details/mock'
import { GraphqlClient } from 'data/protocols/http'
import { HttpResponse, StatusCodeEnum } from 'data/protocols/http/common'
import { UnexpectedError } from 'domain/errors'
import { LoadWriterDetails } from 'domain/use-cases'
import { RemoteLoadWriterDetails } from './remote-load-writer-details'

const graphqlClientMocked: jest.Mocked<GraphqlClient.Client> = {
  query: jest.fn(),
}

const makeSut = (fakeQueryDocument = faker.datatype.string()) => {
  const sut = new RemoteLoadWriterDetails(
    graphqlClientMocked,
    fakeQueryDocument
  )
  const fakeAuthToken = faker.datatype.uuid()

  const fakeParams: LoadWriterDetails.Params = {
    username: faker.internet.userName(),
    postsLimit: faker.datatype.number(),
  }

  const fakeResponse: HttpResponse<RemoteWriterDetails.QueryResponse> = {
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

describe('RemoteLoadWriterDetails', () => {
  it('should call client with right values', async () => {
    const fakeQueryDocument = faker.datatype.string()
    const { sut, fakeAuthToken, fakeResponse } = makeSut(fakeQueryDocument)
    const params: LoadWriterDetails.Params = {
      username: faker.internet.userName(),
      postsLimit: faker.datatype.number(),
    }

    graphqlClientMocked.query.mockResolvedValueOnce(fakeResponse)

    sut.setAuthToken(fakeAuthToken)
    await sut.get(params)

    const graphqlParams: GraphqlClient.Params<RemoteWriterDetails.QueryVariables> =
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

  it('should throw UnexpectedError if a unknow error happen', async () => {
    const { sut, fakeAuthToken, fakeParams } = makeSut()

    graphqlClientMocked.query.mockResolvedValueOnce({
      data: {},
      statusCode: faker.internet.httpStatusCode({
        types: ['clientError', 'serverError'],
      }),
    })

    sut.setAuthToken(fakeAuthToken)
    const response = sut.get(fakeParams)

    await expect(response).rejects.toThrow(new UnexpectedError())
  })
})
