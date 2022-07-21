import { PostPageModel } from 'domain/models'

export interface LoadPostPageData {
  getBySlug(slug: string): Promise<PostPageModel.Model | null>
}
