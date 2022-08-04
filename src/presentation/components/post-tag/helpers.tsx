import { TagPreviewModel } from 'domain/models'
import Link from 'next/link'
import { PagesRoutersEnum } from 'presentation/routers/pages'
import { PostTag } from './post-tag'

type Params = {
  tags: TagPreviewModel.Model[]
  cssClassName?: string
}

export const renderPostTagsToListItems = ({ tags, cssClassName }: Params) =>
  tags.map((tag) => (
    <li
      role={'tag-item'}
      key={tag.id}
      className={cssClassName ? cssClassName : ''}
    >
      <Link href={`/${PagesRoutersEnum.TAG}/${tag.slug}`}>
        <a role="link-to-tag">
          <PostTag tagData={tag} />
        </a>
      </Link>
    </li>
  ))
