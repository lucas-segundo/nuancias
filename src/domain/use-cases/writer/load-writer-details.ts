import { WriterDetailsModel } from 'domain/models'

export type Params = {
  username: string
  postsLimit: number
}

export interface Model {
  get(params: Params): Promise<WriterDetailsModel.Model>
}
