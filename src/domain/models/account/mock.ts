import { faker } from '@faker-js/faker'
import { AccountModel } from '..'

export const makeFakeAccountModel = (): AccountModel.Model => ({
  acessToken: faker.datatype.uuid(),
  user: {
    id: faker.datatype.string(),
  },
})
