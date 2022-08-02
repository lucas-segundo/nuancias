import { faker } from '@faker-js/faker'
import { RemotePostContentModel } from 'data/models'
import { makePostPageQueryResponseMock } from 'data/models/post/remote-post-content/mock'
import { GraphqlClient } from 'data/protocols/http'
import { HttpResponse, StatusCodeEnum } from 'data/protocols/http/common'
import { UnexpectedError } from 'domain/errors'
import { RemotePostContent } from './remote-post-content'

const graphqlClientMocked: jest.Mocked<GraphqlClient.Client> = {
  query: jest.fn(),
}

const makeSut = (fakeQueryDocument = faker.datatype.string()) => {
  const sut = new RemotePostContent(graphqlClientMocked, fakeQueryDocument)
  const fakeSlug = faker.datatype.uuid()
  const fakeAuthToken = faker.datatype.uuid()
  const fakeVariables: RemotePostContentModel.QueryVariables = {
    slug: fakeSlug,
  }

  const fakeResponse: HttpResponse<RemotePostContentModel.QueryResponse> = {
    data: makePostPageQueryResponseMock(),
    statusCode: StatusCodeEnum.OK,
  }

  return {
    sut,
    fakeSlug,
    fakeAuthToken,
    fakeVariables,
    fakeResponse,
  }
}

describe('RemotePostContent', () => {
  it('should call GraphqlClient correctly', async () => {
    const fakeQueryDocument = faker.datatype.string()
    const { sut, fakeAuthToken, fakeSlug, fakeVariables, fakeResponse } =
      makeSut(fakeQueryDocument)

    graphqlClientMocked.query.mockResolvedValueOnce(fakeResponse)

    sut.setAuthToken(fakeAuthToken)
    await sut.getBySlug(fakeSlug)

    const graphqlParams: GraphqlClient.Params<RemotePostContentModel.QueryVariables> =
      {
        queryDocument: fakeQueryDocument,
        variables: fakeVariables,
        config: {
          authToken: fakeAuthToken,
          cachePolicy: 'no-cache',
        },
      }

    expect(graphqlClientMocked.query).toBeCalledWith(graphqlParams)
  })

  it('should return data if query is success', async () => {
    const { sut, fakeResponse, fakeSlug } = makeSut()

    graphqlClientMocked.query.mockResolvedValueOnce(fakeResponse)

    const response = await sut.getBySlug(fakeSlug)
    const fakeModel = sut.adaptResponseToModel(fakeResponse.data)

    expect(response).toEqual(fakeModel)
  })

  it('should return error if query found nothing', async () => {
    const { sut, fakeResponse, fakeSlug } = makeSut()
    fakeResponse.statusCode = StatusCodeEnum.NO_CONTENT

    graphqlClientMocked.query.mockResolvedValueOnce(fakeResponse)

    const response = sut.getBySlug(fakeSlug)

    await expect(response).rejects.toThrow(new UnexpectedError())
  })

  it('should throw UnexpectedError if a unknow error happen', async () => {
    const { sut, fakeSlug } = makeSut()

    graphqlClientMocked.query.mockResolvedValueOnce({
      data: {},
      statusCode: faker.internet.httpStatusCode({
        types: ['clientError', 'serverError'],
      }),
    })

    const response = sut.getBySlug(fakeSlug)

    await expect(response).rejects.toThrow(new UnexpectedError())
  })
})
