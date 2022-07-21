import { faker } from '@faker-js/faker'
import { EmailFieldValidation } from '../email/email-field'
import { RequiredFieldValidation } from '../required-field/required-field'
import { ValidationComposite } from './validation-composite'

describe('ValidationComposite', () => {
  it('should return FieldValidations on .build', () => {
    const fakeField = faker.database.column()
    const validators = [
      new RequiredFieldValidation(fakeField),
      new EmailFieldValidation(fakeField),
    ]
    const sut = ValidationComposite.build(validators)

    expect(sut.validators).toStrictEqual(validators)
  })

  it('should return a empty array on .validate if it has no error', () => {
    const fakeField = faker.database.column()
    const validators = [
      new RequiredFieldValidation(fakeField),
      new EmailFieldValidation(fakeField),
    ]
    const sut = ValidationComposite.build(validators)

    const errors = sut.validate(fakeField, faker.internet.email())

    expect(errors).toEqual([])
  })

  it('should return ALL errors messages on .validate if it has errors', () => {
    const fakeField = faker.database.column()
    const validators = [
      new RequiredFieldValidation(fakeField),
      new EmailFieldValidation(fakeField),
    ]
    const validatorsErrorsMessage = validators.map(
      (validator) => validator.error.message
    )

    const sut = ValidationComposite.build(validators)
    const errors = sut.validate(fakeField, '')

    expect(errors).toEqual(validatorsErrorsMessage)
  })

  it('should return SOME errors messages on .validate if it has errors', () => {
    const fakeField = faker.database.column()
    const validators = [
      new RequiredFieldValidation(fakeField),
      new EmailFieldValidation(fakeField),
    ]

    const validatorsErrorsMessage = validators.map(
      (validator) => validator.error.message
    )

    const sut = ValidationComposite.build(validators)
    const errors = sut.validate(fakeField, faker.random.word())

    expect(errors).toEqual([validatorsErrorsMessage.pop()])
  })
})
