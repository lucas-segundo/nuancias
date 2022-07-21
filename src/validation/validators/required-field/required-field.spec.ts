import { faker } from '@faker-js/faker'
import { RequiredFieldValidationError } from 'validation/errors'
import { RequiredFieldValidation } from './required-field'

const makeSut = (fakeField = faker.database.column()) => {
  const sut = new RequiredFieldValidation(fakeField)

  return {
    sut,
  }
}

describe('RequiredFieldValidation', () => {
  it('should return RequiredFieldValidationError if field is empty', () => {
    const fakeField = faker.database.column()
    const { sut } = makeSut(fakeField)

    const validation = sut.validate('')

    expect(validation).toEqual(new RequiredFieldValidationError(fakeField))
  })

  it('should return nothing if field is not empty', () => {
    const fakeField = faker.database.column()
    const { sut } = makeSut(fakeField)

    const validation = sut.validate(faker.random.word())

    expect(validation).toBeFalsy()
  })
})
