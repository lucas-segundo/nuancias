import { faker } from '@faker-js/faker'
import { RemoteAuthenticationResponse } from '../..'

export const makeRemoteAuthenticationResponseMock =
  (): RemoteAuthenticationResponse.Model => ({
    jwt: faker.datatype.uuid(),
    user: {
      id: faker.datatype.number(),
    },
  })
