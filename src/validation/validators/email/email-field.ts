import { InvalidFieldError } from 'validation/errors'
import { FieldValidation } from 'validation/protocols'

export class EmailFieldValidation implements FieldValidation {
  constructor(readonly field: string) {}

  validate(value: string): Error | null {
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

    const isEmailValid = emailRegex.test(value)
    return isEmailValid ? null : this.error
  }

  get error() {
    return new InvalidFieldError(this.field)
  }
}
