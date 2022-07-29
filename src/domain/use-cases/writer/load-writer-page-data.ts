import { WriterPageModel } from 'domain/models'

type Filter = {
  username: string
  postsLimit: number
}

export interface LoadWriterPageData {
  get(filter: Filter): WriterPageModel.Model
}
