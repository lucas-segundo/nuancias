import { RemoteAuthenticationResponse } from 'data/models'
import { HttpClient } from 'data/protocols/http'
import { StatusCodeEnum } from 'data/protocols/http/common'
import { UnexpectedError, InvalidCredentialsError } from 'domain/errors'
import { AccountModel } from 'domain/models'
import { Authentication, UserCredencials } from 'domain/use-cases'

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient.Client
  ) {}

  async auth(credencials: UserCredencials): Promise<AccountModel.Model> {
    const response =
      await this.httpClient.request<RemoteAuthenticationResponse.Model>({
        url: this.url,
        method: 'POST',
        body: {
          identifier: credencials.email,
          password: credencials.password,
        },
      })

    switch (response.statusCode) {
      case StatusCodeEnum.OK:
        const { jwt, user } = response.data
        return {
          acessToken: jwt,
          user: {
            id: user.id,
          },
        }
      case StatusCodeEnum.UNAUTHORIZED:
        throw new InvalidCredentialsError()
      case StatusCodeEnum.BAD_REQUEST:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
