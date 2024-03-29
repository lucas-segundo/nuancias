import { PostPreviewModel } from 'domain/models'
import { PostCard } from '../post-card/post-card'

export type LastPostsProps = {
  posts?: PostPreviewModel.Model[]
}

const renderPostCards = (posts: PostPreviewModel.Model[]) => {
  return posts.map((post) => (
    <PostCard
      key={post.id}
      post={post}
      postImage={post.image}
      tags={post.tags}
      writer={post.writer}
    />
  ))
}

export const LastPosts = ({ posts }: LastPostsProps) => {
  return (
    <section className="default-screen-margin">
      <div className="my-7">
        <h2 className="text-2xl lg:text-4xl font-bold">Últimas Histórias</h2>
        <div className="space-y-1">
          <span className="bg-cyan-400 w-10 lg:w-20 h-0.5 block"></span>
          <span className="bg-fuchsia-400 w-5 lg:w-10 h-0.5 block"></span>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
        {posts?.length ? (
          renderPostCards(posts)
        ) : (
          <span>Não existe nenhuma história.</span>
        )}
      </div>
    </section>
  )
}
