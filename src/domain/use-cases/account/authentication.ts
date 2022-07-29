import { AccountModel } from 'domain/models'

export type UserCredencials = {
  email: string
  password: string
}

export interface Authentication {
  auth(credencials: UserCredencials): Promise<AccountModel.Model>
}
