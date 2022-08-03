import { faker } from '@faker-js/faker'
import { RemoteTagDetails } from 'data/models'
import { makeRemoteTagDetailsMock } from 'data/models/tag/remote-tag-details/mock'
import { GraphqlClient } from 'data/protocols/http'
import { HttpResponse, StatusCodeEnum } from 'data/protocols/http/common'
import { LoadTagDetails } from 'domain/use-cases'
import { RemoteLoadTagDetails } from './remote-load-tag-details'

const graphqlClientMocked: jest.Mocked<GraphqlClient.Client> = {
  query: jest.fn(),
}

const makeSut = (fakeQueryDocument = faker.datatype.string()) => {
  const sut = new RemoteLoadTagDetails(graphqlClientMocked, fakeQueryDocument)
  const fakeAuthToken = faker.datatype.uuid()
  const fakeParams: LoadTagDetails.Params = {
    id: faker.datatype.uuid(),
  }
  const fakeResponse: HttpResponse<RemoteTagDetails.QueryResponse> = {
    data: makeRemoteTagDetailsMock(),
    statusCode: StatusCodeEnum.OK,
  }

  return {
    sut,
    fakeAuthToken,
    fakeParams,
    fakeResponse,
  }
}

describe('RemoteLoadTagDetails', () => {
  it('should call the client with correct values', async () => {
    const fakeQueryDocument = faker.datatype.string()
    const { sut, fakeAuthToken, fakeParams, fakeResponse } =
      makeSut(fakeQueryDocument)

    graphqlClientMocked.query.mockResolvedValueOnce(fakeResponse)

    sut.setAuthToken(fakeAuthToken)
    await sut.get(fakeParams)

    const graphqlParams: GraphqlClient.Params<RemoteTagDetails.QueryVariables> =
      {
        queryDocument: fakeQueryDocument,
        variables: { tagId: fakeParams.id },
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

    expect(response).not.toBeUndefined()
    expect(fakeModel).not.toBeUndefined()

    expect(response).toEqual(fakeModel)
  })
})
