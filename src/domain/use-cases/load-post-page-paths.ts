import { PostPagePathModel } from 'domain/models'

export interface LoadPostPagePaths<Filter> {
  getAll(filter: Filter): Promise<PostPagePathModel.Model[]>
}
