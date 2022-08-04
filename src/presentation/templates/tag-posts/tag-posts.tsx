import { TagDetailsModel } from 'domain/models'
import { SearchPosts } from 'domain/use-cases'
import { PostCard } from 'presentation/components'
import { TagCard } from 'presentation/components/tag-card/tag-card'
import { Base } from 'presentation/layouts'

export type TagPostsProps = {
  searchPosts: SearchPosts
  tag: TagDetailsModel.Model
}

const renderPostCards = (posts: TagDetailsModel.Post[]) => {
  return posts.map((post) => (
    <PostCard
      key={post.id}
      post={post}
      postImage={post.image}
      writer={post.writer}
    />
  ))
}

export const TagPosts = (props: TagPostsProps) => {
  return (
    <Base searchPosts={props.searchPosts}>
      <div className="default-screen-margin mt-10 mb-80">
        <div className="my-7">
          <TagCard tag={props.tag} />
          <h1 className="text-xl lg:text-2xl font-bold">Histórias</h1>
          <div className="space-y-1">
            <span className="bg-cyan-400 w-10 lg:w-20 h-0.5 block"></span>
            <span className="bg-fuchsia-400 w-5 lg:w-10 h-0.5 block"></span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
          {renderPostCards(props.tag.posts)}
        </div>
      </div>
    </Base>
  )
}