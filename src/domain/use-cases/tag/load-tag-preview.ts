import { TagPreviewModel } from 'domain/models'

export type Params = {
  tagsLimit: number
}

export interface Model {
  getAll(params: Params): TagPreviewModel.Model[]
}
