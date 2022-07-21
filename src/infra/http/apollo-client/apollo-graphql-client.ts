import { DocumentNode } from 'graphql'
import { ApolloError, OperationVariables } from '@apollo/client'

import { GraphqlClient } from 'data/protocols/http'
import client from './client'
import { HttpResponse, StatusCodeEnum } from 'data/protocols/http/common'

type CustomNetworkError = {
  statusCode?: number
}
export class ApolloGraphqlClient implements GraphqlClient.Client {
  async query<VariablesType, ResponseType>({
    queryDocument,
    variables,
    config,
  }: GraphqlClient.Params<VariablesType>): Promise<HttpResponse<ResponseType>> {
    const authToken = config?.authToken
    try {
      const apolloResponse = await client.query<ResponseType>({
        query: queryDocument as DocumentNode,
        variables: variables as OperationVariables,
        context: { authToken },
        fetchPolicy: config?.cachePolicy,
      })

      return {
        data: apolloResponse.data,
        statusCode: StatusCodeEnum.OK,
      }
    } catch (error) {
      const apolloError = error as ApolloError
      const networkError = apolloError?.networkError as CustomNetworkError

      return {
        data: apolloError,
        statusCode: networkError?.statusCode || StatusCodeEnum.SERVER_ERROR,
      } as unknown as HttpResponse<ResponseType>
    }
  }
}
