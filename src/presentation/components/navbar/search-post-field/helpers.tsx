import { SearchedPost } from 'domain/models'
import { ReactNode } from 'react'
import { PostItem } from './post-item/post-item'

export const renderPostItems = (posts: SearchedPost.Model[] | undefined) => {
  if (posts?.length)
    return (
      <div className="overflow-y-auto">
        {posts?.map((post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    )

  return (
    <div className="text-sm px-2 py-1">
      <span>Nenhuma história encontrada</span>
    </div>
  )
}

export const renderLoadingPostItems = () => {
  const skeletonQuantity = [1, 2, 3]
  return (
    <div>
      {skeletonQuantity.map((key) => (
        <PostItem key={key} isLoading={true} />
      ))}
    </div>
  )
}

type PostsItemDropdownProps = {
  children: ReactNode
}
export const PostsItemDropdown = ({ children }: PostsItemDropdownProps) => (
  <div
    className="bg-white absolute w-full border rounded-b shadow overflow-y"
    aria-busy={true}
  >
    {children}
  </div>
)
