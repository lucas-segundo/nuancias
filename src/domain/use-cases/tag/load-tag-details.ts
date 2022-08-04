import { TagDetailsModel } from 'domain/models'

export type Params = {
  slug: string
}

export interface Model {
  get(params: Params): Promise<TagDetailsModel.Model>
}
