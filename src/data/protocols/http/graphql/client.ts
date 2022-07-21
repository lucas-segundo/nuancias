import { HttpResponse } from '../common'

export type Params<VariablesType> = {
  queryDocument: unknown
  variables: VariablesType
  config?: {
    authToken?: string
    cachePolicy?: 'no-cache'
  }
}

export interface Client {
  query<VariablesType, ResponseType>(
    params: Params<VariablesType>
  ): Promise<HttpResponse<ResponseType>>
}
