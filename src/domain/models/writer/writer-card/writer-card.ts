import { UserModel } from 'domain/models/common'

export type Model = Pick<UserModel, 'username' | 'name' | 'bio' | 'avatar'>
