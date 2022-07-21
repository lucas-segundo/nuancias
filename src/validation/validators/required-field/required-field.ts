import { RequiredFieldValidationError } from 'validation/errors'
import { FieldValidation } from 'validation/protocols'

export class RequiredFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(value: string | number) {
    return value ? null : this.error
  }

  get error() {
    return new RequiredFieldValidationError(this.field)
  }
}
