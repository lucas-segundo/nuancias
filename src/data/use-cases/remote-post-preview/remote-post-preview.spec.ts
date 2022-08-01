import { faker } from '@faker-js/faker'
import { RemotePostPreviewModel } from 'data/models'
import { makePostCardQueryResponseMock } from 'data/models/post/remote-post-preview/mock'
import { GraphqlClient } from 'data/protocols/http'
import { HttpResponse, StatusCodeEnum } from 'data/protocols/http/common'
import { UnexpectedError } from 'domain/errors'
import { RemotePostPreview } from './remote-post-preview'

const graphqlClientMocked: jest.Mocked<GraphqlClient.Client> = {
  query: jest.fn(),
}

const makeSut = (fakeQueryDocument = faker.datatype.string()) => {
  const sut = new RemotePostPreview(graphqlClientMocked, fakeQueryDocument)
  const fakeResponse: HttpResponse<RemotePostPreviewModel.QueryResponse> = {
    data: makePostCardQueryResponseMock(),
    statusCode: StatusCodeEnum.OK,
  }
  const fakeFilter: RemotePostPreviewModel.Params = {
    limit: faker.datatype.number(),
  }

  return {
    sut,
    fakeResponse,
    fakeFilter,
  }
}

describe('RemotePostPreview', () => {
  it('should call GraphqlClient with right values', async () => {
    const fakeQueryDocument = faker.datatype.string()
    const { sut, fakeResponse, fakeFilter } = makeSut(fakeQueryDocument)

    graphqlClientMocked.query.mockResolvedValueOnce(fakeResponse)

    const fakeAuthToken = faker.datatype.json()
    sut.setAuthToken(fakeAuthToken)
    await sut.getAll(fakeFilter)

    const { limit, sort } = fakeFilter
    const variables: RemotePostPreviewModel.QueryVariables = {
      limit,
      sortBy: sort && sut.makeSortBy(sort),
    }

    const graphqlParams: GraphqlClient.Params<unknown> = {
      queryDocument: fakeQueryDocument,
      variables,
      config: {
        authToken: fakeAuthToken,
        cachePolicy: 'no-cache',
      },
    }

    expect(graphqlClientMocked.query).toBeCalledWith(graphqlParams)
  })

  it('should return PostCards if query is success', async () => {
    const { sut, fakeResponse, fakeFilter } = makeSut()

    graphqlClientMocked.query.mockResolvedValueOnce(fakeResponse)

    const response = await sut.getAll(fakeFilter)
    const fakeModel = sut.adaptResponseToModel(fakeResponse.data)

    expect(response).toEqual(fakeModel)
  })

  it('should returns empty array if dont have PostCards', async () => {
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
