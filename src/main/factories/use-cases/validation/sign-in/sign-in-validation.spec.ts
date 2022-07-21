import {
  EmailFieldValidation,
  RequiredFieldValidation,
  ValidationComposite,
} from 'validation/validators'
import { makeSignInValidation } from './sign-in-validation'

describe('makeSignInValidation', () => {
  it('should returns with correct validations', () => {
    const sut = makeSignInValidation()

    expect(sut).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidation('Email'),
        new EmailFieldValidation('Email'),
        new RequiredFieldValidation('Senha'),
      ])
    )
  })
})
