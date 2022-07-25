import { faker } from '@faker-js/faker'
import { AbstractAuthToken } from './auth-token'

class Sut extends AbstractAuthToken {}

describe('AbstractAuthToken', () => {
  it('should set the auth token', () => {
    const sut = new Sut()
    const token = faker.datatype.uuid()

    sut.setAuthToken(token)

    expect(sut._authToken).toBe(token)
  })
})
