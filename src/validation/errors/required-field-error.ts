export class RequiredFieldValidationError extends Error {
  constructor(field: string) {
    super(`O campo ${field} deve ser preenchido.`)
    this.name = 'RequiredFieldValidationError'
  }
}
