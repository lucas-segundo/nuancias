export interface Validation {
  validate(field: string, value: string | number): (string | null)[]
}
