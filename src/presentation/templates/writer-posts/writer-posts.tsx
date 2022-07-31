import { WriterPageModel } from 'domain/models'
import { SearchPosts } from 'domain/use-cases/post'
import { PostCard, WriterCard } from 'presentation/components'
import { Base } from 'presentation/layouts'

export type WriterPostsProps = {
  searchPosts: SearchPosts
  writer: WriterPageModel.Model
}

const renderPostCards = (writer: WriterPageModel.Model) => {
  const posts = writer.posts
  return posts.map((post) => (
    <PostCard
      key={post.id}
      post={post}
      postImage={post.image}
      tags={post.tags}
      writer={writer}
    />
  ))
}

export const WriterPosts = (props: WriterPostsProps) => {
  return (
    <Base searchPosts={props.searchPosts}>
      <div className="default-screen-margin mt-10 mb-80">
        <WriterCard writer={props.writer} />
        <div className="my-7">
          <h1 className="text-xl lg:text-2xl font-bold">Histórias</h1>
          <div className="space-y-1">
            <span className="bg-cyan-400 w-10 lg:w-20 h-0.5 block"></span>
            <span className="bg-fuchsia-400 w-5 lg:w-10 h-0.5 block"></span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {renderPostCards(props.writer)}
        </div>
      </div>
    </Base>
  )
}
