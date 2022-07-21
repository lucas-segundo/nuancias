export interface FieldValidation {
  field: string

  validate(value: string | number): Error | null
  get error(): Error
}
