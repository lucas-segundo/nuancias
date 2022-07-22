import { Meta } from 'presentation/components/elements'
import {
  NavbarProps,
  PostContent,
  PostContentProps,
  UserCard,
  UserCardProps,
} from 'presentation/components'
import { Base } from 'presentation/layouts'

export type PostProps = NavbarProps & UserCardProps & PostContentProps

export const Post = (props: PostProps) => {
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
