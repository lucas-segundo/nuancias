export class InvalidFieldError extends Error {
  constructor(field: string) {
    super(`O que foi preenchido no campo ${field} não é válido.`)
    this.name = 'InvalidFieldError'
  }
}
