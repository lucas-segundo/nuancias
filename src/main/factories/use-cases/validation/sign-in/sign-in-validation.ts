import { ValidationBuilder } from 'validation/validators'
import { ValidationComposite } from 'validation/validators'

export const makeSignInValidation = () => {
  return ValidationComposite.build([
    ...ValidationBuilder.field('Email').email().required().build(),
    ...ValidationBuilder.field('Senha').required().build(),
  ])
}
