import { Meta } from 'presentation/components/elements'
import {
  NavbarProps,
  PostContent,
  PostContentProps,
  WriterCard,
  WriterCardProps,
} from 'presentation/components'
import { Base } from 'presentation/layouts'

export type PostProps = NavbarProps & WriterCardProps & PostContentProps

export const Post = (props: PostProps) => {
  return (
    <>
      <Meta
        title={`${props.postData.title} - por ${props.writer.name} - Nuancias`}
        description={props.postData.preview}
      />
      <Base searchPosts={props.searchPosts}>
        <div className="default-screen-margin-post mt-10 mb-80">
          <WriterCard writer={props.writer} />
          <PostContent postData={props.postData} />
        </div>
      </Base>
    </>
  )
}
