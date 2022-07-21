import axios, { AxiosError, AxiosResponse } from 'axios'
import { HttpClient } from 'data/protocols/http'
import { StatusCodeEnum } from 'data/protocols/http/common'

export class AxiosClient implements HttpClient.Client {
  async request(params: HttpClient.Params) {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: params.url,
        method: params.method,
        data: params.body,
      })
    } catch (error) {
      const axiosError = error as AxiosError | undefined
      if (axiosError?.response) {
        axiosResponse = axiosError.response
      } else {
        return {
          data: error as Error,
          statusCode: StatusCodeEnum.SERVER_ERROR,
        }
      }
    }

    return {
      data: axiosResponse.data,
      statusCode: axiosResponse.status,
    }
  }
}
