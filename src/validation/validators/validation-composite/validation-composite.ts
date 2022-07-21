import { Validation } from 'presentation/protocols'
import { FieldValidation } from 'validation/protocols'

export class ValidationComposite implements Validation {
  private constructor(readonly validators: FieldValidation[]) {}

  static build(validators: FieldValidation[]) {
    return new ValidationComposite(validators)
  }

  validate(field: string, value: string | number) {
    const validators = this.validators.filter(
      (validator) => validator.field === field
    )

    const errors = validators.map((validator) => validator.validate(value))
    const errorsMessages = errors.map((error) => error && error?.message)

    return errorsMessages.filter((errorMessage) => errorMessage != null)
  }
}
