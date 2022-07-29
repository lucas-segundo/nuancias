import { faker } from '@faker-js/faker'

import { RemoteAuthentication } from './remote-authentication'
import { HttpClient } from 'data/protocols/http'
import { makeFakeAccountModel } from 'domain/models'
import { UnexpectedError, InvalidCredentialsError } from 'domain/errors'
import { makeRemoteAuthenticationResponseMock } from 'data/models/remote-authentication/mock'
import { StatusCodeEnum } from 'data/protocols/http/common'

const httpClientMocked: jest.Mocked<HttpClient.Client> = {
  request: jest.fn(),
}

const makeFakeCredencials = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
})

const makeSut = (url = faker.internet.url()) => {
  const sut = new RemoteAuthentication(url, httpClientMocked)

  return {
    sut,
  }
}

describe('RemoteAuthentication', () => {
  it('should call HttpClient with correct params', async () => {
    const fakeUrl = faker.internet.url()
    const fakeCredencials = makeFakeCredencials()
    const fakeParams: HttpClient.Params = {
      url: fakeUrl,
      body: {
        identifier: fakeCredencials.email,
        password: fakeCredencials.password,
      },
      method: 'POST',
    }

    httpClientMocked.request.mockResolvedValueOnce({
      data: makeFakeAccountModel(),
      statusCode: StatusCodeEnum.OK,
    })

    const { sut } = makeSut(fakeUrl)
    await sut.auth(fakeCredencials)

    expect(httpClientMocked.request).toHaveBeenCalledWith(fakeParams)
  })

  it('should returns Account if response is success', async () => {
    const fakeRemoteResponse = makeRemoteAuthenticationResponseMock()
    httpClientMocked.request.mockResolvedValueOnce({
      data: fakeRemoteResponse,
      statusCode: StatusCodeEnum.OK,
    })

    const fakeCredencials = makeFakeCredencials()

    const { sut } = makeSut()
    const response = await sut.auth(fakeCredencials)

    expect(response).toEqual({
      acessToken: fakeRemoteResponse.jwt,
      user: fakeRemoteResponse.user,
    })
  })

  it('should returns CredencialError if returns status code 401', async () => {
    httpClientMocked.request.mockResolvedValueOnce({
      data: {},
      statusCode: StatusCodeEnum.UNAUTHORIZED,
    })

    const fakeCredencials = makeFakeCredencials()

    const { sut } = makeSut()
    const response = sut.auth(fakeCredencials)

    await expect(response).rejects.toThrow(new InvalidCredentialsError())
  })

  it('should returns CredencialError if returns status code 400', async () => {
    httpClientMocked.request.mockResolvedValueOnce({
      data: {},
      statusCode: StatusCodeEnum.BAD_REQUEST,
    })

    const fakeCredencials = makeFakeCredencials()

    const { sut } = makeSut()
    const response = sut.auth(fakeCredencials)

    await expect(response).rejects.toThrow(new InvalidCredentialsError())
  })

  it('should returns UnexpectedError if a unknow error happen', async () => {
    httpClientMocked.request.mockResolvedValueOnce({
      data: {},
      statusCode: faker.internet.httpStatusCode({
        types: ['serverError'],
      }),
    })

    const fakeCredencials = makeFakeCredencials()

    const { sut } = makeSut()
    const response = sut.auth(fakeCredencials)

    await expect(response).rejects.toThrow(new UnexpectedError())
  })
})
