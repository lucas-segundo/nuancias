import { SearchedPost } from 'domain/models'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'

export type PostItemProps = {
  post?: SearchedPost.Model
  isLoading?: boolean
}

export const PostItem = ({ post, isLoading }: PostItemProps) => {
  return (
    <article
      data-cy="searched-article"
      className="p-3 text-sm border-b border-cyan-200"
      aria-busy={isLoading}
    >
      {!isLoading ? (
        <Link href={`@${post?.writer.username}/${post?.slug}`}>
          <a>
            <h4 className="font-medium">{post?.title}</h4>
          </a>
        </Link>
      ) : (
        <>
          <Skeleton />
          <Skeleton count={2} />
        </>
      )}
    </article>
  )
}
