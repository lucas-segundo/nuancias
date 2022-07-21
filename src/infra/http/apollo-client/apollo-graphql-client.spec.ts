import {
  ApolloError,
  ApolloLink,
  ApolloQueryResult,
  NetworkStatus,
} from '@apollo/client'
import { faker } from '@faker-js/faker'
import { HttpResponse, StatusCodeEnum } from 'data/protocols/http/common'
import { ApolloGraphqlClient } from './apollo-graphql-client'
import client from './client'
import { mockQueryDocumentNode } from './mock'

jest.mock('@apollo/client')
jest.mock('@apollo/client/link/context', () => ({
  setContext: () => new ApolloLink(),
}))

const makeSut = () => {
  const sut = new ApolloGraphqlClient()
  const fakeVariables = {
    [faker.database.column()]: faker.random.word(),
  }

  const fakeConfig = {
    authToken: faker.internet.password(),
  }

  const fakeQueryDocumentNode = mockQueryDocumentNode()
  const gqlClientMocked = client as jest.Mocked<typeof client>

  return {
    sut,
    fakeVariables,
    fakeQueryDocumentNode,
    gqlClientMocked,
    fakeConfig,
  }
}

describe('ApolloGraphqlClient', () => {
  it('should call ApolloClient query with correct values', async () => {
    const {
      sut,
      fakeVariables,
      fakeQueryDocumentNode,
      gqlClientMocked,
      fakeConfig,
    } = makeSut()

    const resolvedValue: ApolloQueryResult<unknown> = {
      data: faker.datatype.json(),
      loading: false,
      networkStatus: NetworkStatus.ready,
    }
    gqlClientMocked.query.mockResolvedValueOnce(resolvedValue)

    await sut.query({
      queryDocument: fakeQueryDocumentNode,
      variables: fakeVariables,
      config: fakeConfig,
    })

    expect(client.query).toBeCalledWith({
      query: fakeQueryDocumentNode,
      variables: fakeVariables,
      context: { authToken: fakeConfig.authToken },
    })
  })

  it('should return response if request is success', async () => {
    const {
      sut,
      fakeQueryDocumentNode,
      fakeVariables,
      gqlClientMocked,
      fakeConfig,
    } = makeSut()

    const fakeData = faker.datatype.json()
    const resolvedValue: ApolloQueryResult<unknown> = {
      data: fakeData,
      loading: false,
      networkStatus: NetworkStatus.ready,
    }
    gqlClientMocked.query.mockResolvedValueOnce(resolvedValue)

    const response = await sut.query({
      queryDocument: fakeQueryDocumentNode,
      variables: fakeVariables,
      config: fakeConfig,
    })

    const httpResponse: HttpResponse = {
      data: fakeData,
      statusCode: StatusCodeEnum.OK,
    }

    expect(response).toEqual(httpResponse)
  })

  it('should return error if request failed', async () => {
    const {
      sut,
      fakeQueryDocumentNode,
      fakeVariables,
      gqlClientMocked,
      fakeConfig,
    } = makeSut()

    const errorStatusCode = faker.internet.httpStatusCode({
      types: ['clientError', 'serverError'],
    })

    const errorResponse: Pick<ApolloError, 'networkError'> = {
      networkError: {
        statusCode: errorStatusCode,
        name: faker.random.word(),
        message: faker.random.words(),
      },
    }

    gqlClientMocked.query.mockRejectedValueOnce(errorResponse)

    const response = await sut.query({
      queryDocument: fakeQueryDocumentNode,
      variables: fakeVariables,
      config: fakeConfig,
    })

    const httpResponse: HttpResponse = {
      data: errorResponse,
      statusCode: errorStatusCode,
    }

    expect(response).toEqual(httpResponse)
  })
})
