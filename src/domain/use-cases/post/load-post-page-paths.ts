import { PathWriterPostModel } from 'domain/models'

export interface LoadPostPagePaths<Filter> {
  getAll(filter: Filter): Promise<PathWriterPostModel.Model[]>
}
