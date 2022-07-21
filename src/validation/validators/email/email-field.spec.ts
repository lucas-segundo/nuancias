import { faker } from '@faker-js/faker'
import { InvalidFieldError } from 'validation/errors'
import { EmailFieldValidation } from './email-field'

const makeSut = () => {
  const fakeField = faker.database.column()
  const sut = new EmailFieldValidation(fakeField)

  return {
    sut,
    fakeField,
  }
}

describe('EmailFieldValidation', () => {
  it('should return InvalidFieldError when is not email', () => {
    const { sut, fakeField } = makeSut()

    const validation = sut.validate(faker.random.word())

    expect(validation).toEqual(new InvalidFieldError(fakeField))
  })

  it('should return nothing when email is correct', () => {
    const { sut } = makeSut()

    const validation = sut.validate(faker.internet.email())

    expect(validation).toBeFalsy()
  })

  it('should return InvalidFieldError when email field is empty', () => {
    const { sut, fakeField } = makeSut()

    const validation = sut.validate('')

    expect(validation).toEqual(new InvalidFieldError(fakeField))
  })
})
