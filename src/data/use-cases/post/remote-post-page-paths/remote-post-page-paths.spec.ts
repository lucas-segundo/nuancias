import { faker } from '@faker-js/faker'
import { RemotePostPagePathsModel } from 'data/models'
import { makePostPagePathsQueryResponseMock } from 'data/models/post/remote-post-page-paths/mock'
import { GraphqlClient } from 'data/protocols/http'
import { HttpResponse, StatusCodeEnum } from 'data/protocols/http/common'
import { UnexpectedError } from 'domain/errors'
import { RemotePostPagePaths } from './remote-post-page-paths'

const graphqlClientMocked: jest.Mocked<GraphqlClient.Client> = {
  query: jest.fn(),
}

const makeSut = (fakeQueryDocument = faker.datatype.string()) => {
  const sut = new RemotePostPagePaths(graphqlClientMocked, fakeQueryDocument)
  const fakeAuthToken = faker.datatype.uuid()

  const fakeResponse: HttpResponse<RemotePostPagePathsModel.QueryResponse> = {
    data: makePostPagePathsQueryResponseMock(),
    statusCode: StatusCodeEnum.OK,
  }

  const fakeFilter: RemotePostPagePathsModel.QueryVariables = {
    limit: faker.datatype.number(),
  }

  return {
    sut,
    fakeAuthToken,
    fakeFilter,
    fakeResponse,
  }
}

describe('RemotePostPagePath', () => {
  it('should call GraphqlClient correctly', async () => {
    const fakeQueryDocument = faker.datatype.string()
    const { sut, fakeAuthToken, fakeFilter, fakeResponse } =
      makeSut(fakeQueryDocument)

    graphqlClientMocked.query.mockResolvedValueOnce(fakeResponse)

    sut.setAuthToken(fakeAuthToken)
    await sut.getAll(fakeFilter)

    const graphqlParams: GraphqlClient.Params<unknown> = {
      queryDocument: fakeQueryDocument,
      variables: {
        limit: fakeFilter.limit,
      },
      config: {
        authToken: fakeAuthToken,
        cachePolicy: 'no-cache',
      },
    }

    expect(graphqlClientMocked.query).toBeCalledWith(graphqlParams)
  })

  it('should return PostPagePaths if query is success', async () => {
    const { sut, fakeResponse, fakeFilter } = makeSut()

    graphqlClientMocked.query.mockResolvedValueOnce(fakeResponse)

    const response = await sut.getAll(fakeFilter)
    const fakeModel = sut.adaptResponseToModel(fakeResponse.data)

    expect(response).not.toBeUndefined()
    expect(fakeModel).not.toBeUndefined()

    expect(response).toEqual(fakeModel)
  })

  it('should returns empty array if dont have PostPagePaths', async () => {
    const { sut, fakeFilter } = makeSut()

    const fakeResponse: HttpResponse = {
      data: [],
      statusCode: StatusCodeEnum.NO_CONTENT,
    }
    graphqlClientMocked.query.mockResolvedValueOnce(fakeResponse)

    const response = await sut.getAll(fakeFilter)

    expect(response).toEqual([])
  })

  it('should returns UnexpectedError if a unknow error happen', async () => {
    const { sut, fakeFilter } = makeSut()

    graphqlClientMocked.query.mockResolvedValueOnce({
      data: {},
      statusCode: faker.internet.httpStatusCode({
        types: ['clientError', 'serverError'],
      }),
    })

    const response = sut.getAll(fakeFilter)

    await expect(response).rejects.toThrow(new UnexpectedError())
  })
})