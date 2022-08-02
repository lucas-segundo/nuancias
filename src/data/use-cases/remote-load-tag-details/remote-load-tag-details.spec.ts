import { faker } from '@faker-js/faker'
import { RemoteTagDetails } from 'data/models'
import { GraphqlClient } from 'data/protocols/http'
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

  return {
    sut,
    fakeAuthToken,
    fakeParams,
  }
}

describe('RemoteLoadTagDetails', () => {
  it('should call the client with correct values', async () => {
    const fakeQueryDocument = faker.datatype.string()
    const { sut, fakeAuthToken, fakeParams } = makeSut(fakeQueryDocument)

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
})
