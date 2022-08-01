import { PathWriterPostModel } from 'domain/models'

export interface LoadPathWriterPost<Filter> {
  getAll(filter: Filter): Promise<PathWriterPostModel.Model[]>
}
