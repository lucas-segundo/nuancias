import { HttpResponse } from './common'

export type Params = {
  url: string
  method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH'
  body: object
}

export interface Client {
  request<ResDataType>(params: Params): Promise<HttpResponse<ResDataType>>
}
