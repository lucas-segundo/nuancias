import { FieldValidation } from 'validation/protocols'
import { EmailFieldValidation } from '../email/email-field'
import { RequiredFieldValidation } from '../required-field/required-field'

export class ValidationBuilder {
  private constructor(
    private readonly field: string,
    private readonly validations: FieldValidation[]
  ) {}

  static field(field: string) {
    return new ValidationBuilder(field, [])
  }

  required() {
    this.validations.push(new RequiredFieldValidation(this.field))
    return this
  }

  email() {
    this.validations.push(new EmailFieldValidation(this.field))
    return this
  }

  build() {
    return this.validations
  }
}
