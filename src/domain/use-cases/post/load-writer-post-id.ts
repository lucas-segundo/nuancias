import { WriterPostIDModel } from 'domain/models'

export interface LoadWriterPostID<Filter> {
  getAll(filter: Filter): Promise<WriterPostIDModel.Model[]>
}
