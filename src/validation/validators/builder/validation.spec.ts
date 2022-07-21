import { faker } from '@faker-js/faker'
import { EmailFieldValidation } from '../email/email-field'
import { RequiredFieldValidation } from '../required-field/required-field'
import { ValidationBuilder as sut } from './validation-builder'

describe('ValidationBuilder', () => {
  it('should return RequiredFieldValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).required().build()

    expect(validations).toStrictEqual([new RequiredFieldValidation(field)])
  })

  it('should return EmailValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).email().build()

    expect(validations).toStrictEqual([new EmailFieldValidation(field)])
  })

  it('should return more than one validation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).email().required().build()

    expect(validations).toStrictEqual([
      new EmailFieldValidation(field),
      new RequiredFieldValidation(field),
    ])
  })
})
