import { Meta } from 'presentation/components/elements'
import { NavbarProps } from 'presentation/components'
import PostContent, {
  PostContentProps,
} from 'presentation/components/post-content/post-content'
import UserCard, {
  UserCardProps,
} from 'presentation/components/user-card/user-card'
import { Base } from 'presentation/layouts'

export type PostProps = NavbarProps & UserCardProps & PostContentProps

const Post = (props: PostProps) => {
  return (
    <>
      <Meta
        title={`${props.postData.title} - por ${props.userData.name} - Nuancias`}
        description={props.postData.preview}
      />
      <Base searchPosts={props.searchPosts}>
        <div className="default-screen-margin-post mt-10 mb-80">
          <UserCard userData={props.userData} />
          <PostContent postData={props.postData} />
        </div>
      </Base>
    </>
  )
}

export default Post
