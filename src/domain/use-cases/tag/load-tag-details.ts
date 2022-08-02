import { TagDetailsModel } from 'domain/models'

type Params = {
  id: string
}

export interface LoadTagDetails {
  get(params: Params): Promise<TagDetailsModel.Model>
}
