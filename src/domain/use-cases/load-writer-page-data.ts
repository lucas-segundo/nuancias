import { WriterPage } from 'domain/models'

type Filter = {
  username: string
  postsLimit: number
}

export interface LoadWriterPageData {
  get(filter: Filter): WriterPage.Model
}
