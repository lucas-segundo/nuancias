import { TagModel } from 'domain/models'
import { PostTag } from './post-tag'

type Params = {
  tags: TagModel[]
  cssClassName?: string
}

export const renderPostTagsToListItems = ({ tags, cssClassName }: Params) =>
  tags.map((tag) => (
    <li role={'tag-item'} key={tag.id} className={cssClassName}>
      <PostTag tagData={tag} />
    </li>
  ))
