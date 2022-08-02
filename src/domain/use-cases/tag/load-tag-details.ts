import { TagDetailsModel } from 'domain/models'

export type Params = {
  id: string
}

export interface Model {
  get(params: Params): Promise<TagDetailsModel.Model>
}
