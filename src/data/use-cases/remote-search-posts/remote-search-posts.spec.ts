import { faker } from '@faker-js/faker'
import { makeSearchPostsResponseMock } from 'data/models/post/remote-search-posts/mock'
import { RemoteSearchPostsModel } from 'data/models'
import { GraphqlClient } from 'data/protocols/http'
import { HttpResponse, StatusCodeEnum } from 'data/protocols/http/common'
import { UnexpectedError } from 'domain/errors'
import { RemoteSearchPosts } from './remote-search-posts'

const graphqlClientMocked: jest.Mocked<GraphqlClient.Client> = {
  query: jest.fn(),
}

const makeSut = (fakeQueryDocument = faker.datatype.string()) => {
  const sut = new RemoteSearchPosts(graphqlClientMocked, fakeQueryDocument)
  const fakeResponse: HttpResponse<RemoteSearchPostsModel.QueryResponse> = {
    data: makeSearchPostsResponseMock(),
    statusCode: StatusCodeEnum.OK,
  }

  return {
    sut,
    fakeResponse,
  }
}

describe('RemoteSearchPosts', () => {
  it('should call the graphqlClient with correct values', async () => {
    const fakeQueryDocument = faker.datatype.string()
    const { sut, fakeResponse } = makeSut(fakeQueryDocument)
    const fakeText = faker.random.words()

    graphqlClientMocked.query.mockResolvedValueOnce(fakeResponse)

    await sut.getAllByText(fakeText)

    const fakeParams: GraphqlClient.Params<RemoteSearchPostsModel.QueryVariables> =
      {
        queryDocument: fakeQueryDocument,
        variables: {
          searchTo: fakeText,
          limit: 10,
        },
      }

    expect(graphqlClientMocked.query).toBeCalledWith(fakeParams)
  })

  it('should return Posts if query is success on RemoteSearchPosts', async () => {
    const { sut, fakeResponse } = makeSut()

    const fakeText = faker.random.words()
    graphqlClientMocked.query.mockResolvedValueOnce(fakeResponse)

    const response = await sut.getAllByText(fakeText)
    const fakeModel = sut.adaptResponseToModel(fakeResponse.data)

    expect(response).toEqual(fakeModel)
  })

  it('should returns empty array if dont have posts', async () => {
    const { sut } = makeSut()

    const fakeResponse: HttpResponse = {
      data: [],
      statusCode: StatusCodeEnum.NO_CONTENT,
    }
    graphqlClientMocked.query.mockResolvedValueOnce(fakeResponse)

    const response = await sut.getAllByText(faker.random.words())

    expect(response).toEqual([])
  })

  it('should returns UnexpectedError if a unknow error happen', async () => {
    const { sut } = makeSut()

    graphqlClientMocked.query.mockResolvedValueOnce({
      data: {},
      statusCode: faker.internet.httpStatusCode({
        types: ['clientError', 'serverError'],
      }),
    })

    const response = sut.getAllByText(faker.random.words())

    await expect(response).rejects.toThrow(new UnexpectedError())
  })
})
