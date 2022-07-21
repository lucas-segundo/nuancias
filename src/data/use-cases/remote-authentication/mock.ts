import { faker } from '@faker-js/faker'
import { HttpClient } from 'data/protocols/http'

export const makeFakeHttpParams = (): HttpClient.Params => ({
  url: faker.internet.url(),
  body: {
    [faker.random.word()]: faker.random.words(),
  },
  method: faker.internet.httpMethod(),
})
