import { faker } from '@faker-js/faker'
import axios, { AxiosRequestConfig } from 'axios'
import { StatusCodeEnum } from 'data/protocols/http/common'
import { makeFakeHttpParams } from 'data/use-cases/remote-authentication/mock'
import { AxiosClient } from './axios-client'

jest.mock('axios')

const mockResolvedAxiosRequest = (
  fakeResponseData = {
    [faker.random.word()]: faker.random.words(),
  }
) => {
  const axiosMocked = axios as jest.Mocked<typeof axios>

  axiosMocked.request.mockResolvedValueOnce({
    data: fakeResponseData,
    status: 200,
  })
}

const makeSut = () => {
  const sut = new AxiosClient()
  const axiosMocked = axios as jest.Mocked<typeof axios>
  const fakeParams = makeFakeHttpParams()

  return {
    sut,
    fakeParams,
    axiosMocked,
  }
}

describe('AxiosClient', () => {
  it('should call axios with correct params', async () => {
    const { sut, fakeParams } = makeSut()
    mockResolvedAxiosRequest()

    const axiosConfig: AxiosRequestConfig = {
      url: fakeParams.url,
      method: fakeParams.method,
      data: fakeParams.body,
    }

    await sut.request(fakeParams)
    expect(axios.request).toHaveBeenCalledWith(axiosConfig)
  })

  it('should returns data on success', async () => {
    const { sut, fakeParams } = makeSut()
    const fakeResponseData = {
      [faker.random.word()]: faker.random.words(),
    }

    mockResolvedAxiosRequest(fakeResponseData)

    const response = await sut.request(fakeParams)
    expect(response).toEqual({
      data: fakeResponseData,
      statusCode: StatusCodeEnum.OK,
    })
  })

  it('should throw a axios error when request fail', async () => {
    const { sut, fakeParams, axiosMocked } = makeSut()
    const httpResponse = {
      data: faker.datatype.json(),
      status: faker.internet.httpStatusCode(),
    }

    axiosMocked.request.mockRejectedValueOnce({
      response: httpResponse,
    })

    const response = await sut.request(fakeParams)
    expect(response).toEqual({
      data: httpResponse.data,
      statusCode: httpResponse.status,
    })
  })

  it('should throw a unknow error when something fails', async () => {
    const { sut, fakeParams, axiosMocked } = makeSut()

    axiosMocked.request.mockRejectedValueOnce(new Error())

    const response = await sut.request(fakeParams)
    expect(response).toEqual({
      data: new Error(),
      statusCode: StatusCodeEnum.SERVER_ERROR,
    })
  })
})
