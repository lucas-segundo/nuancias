import { PostCardModel } from 'domain/models'
import PostCard from '../post-card/post-card'

export type LastPostsProps = {
  posts?: PostCardModel.Model[]
}

const renderPostCards = (posts: PostCardModel.Model[]) => {
  return posts.map((post) => <PostCard key={post.id} post={post} />)
}

const LastPosts = ({ posts }: LastPostsProps) => {
  return (
    <section className="default-screen-margin mb-24">
      <div className="my-7">
        <h1 className="text-2xl lg:text-4xl font-bold">Últimas Histórias</h1>
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

export default LastPosts
