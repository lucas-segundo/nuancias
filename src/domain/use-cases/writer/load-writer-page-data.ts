import { WriterPageModel } from 'domain/models'

export type Params = {
  username: string
  postsLimit: number
}

export interface Model {
  get(params: Params): Promise<WriterPageModel.Model>
}
