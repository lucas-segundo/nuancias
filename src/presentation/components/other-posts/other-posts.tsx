import { PostPreviewModel } from 'domain/models'
import { PostListItem } from '../post-list-item/post-list-item'

export type OtherPostsProps = {
  posts?: PostPreviewModel.Model[]
}

const renderPostItems = (posts: PostPreviewModel.Model[]) =>
  posts.map((post) => <PostListItem key={post.id} post={post} />)

export const OtherPosts = ({ posts }: OtherPostsProps) => {
  return (
    <section
      data-cy="other-posts-section"
      className="default-screen-margin mt-4"
    >
      <div className="space-y-1">
        <h1 className="text-xl lg:text-2xl font-bold">O que mais?</h1>
        <span className="bg-cyan-400 w-10 lg:w-20 h-0.5 block"></span>
        <span className="bg-fuchsia-400 w-5 lg:w-10 h-0.5 block"></span>
      </div>
      <div className="space-y-4 mt-4">
        {posts?.length ? (
          renderPostItems(posts)
        ) : (
          <span>Outras histórias em produção.</span>
        )}
      </div>
    </section>
  )
}
