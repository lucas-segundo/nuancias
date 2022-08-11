import { Meta } from 'presentation/components/elements'
import {
  NavbarProps,
  PostContent,
  PostContentProps,
  WriterCard,
  WriterCardProps,
} from 'presentation/components'
import { Base } from 'presentation/layouts'
import { ArticleJsonLd } from 'next-seo'
import { makePostLink, makeWriterLink } from 'presentation/routers/helpers'

export type PostProps = NavbarProps & WriterCardProps & PostContentProps

export const Post = (props: PostProps) => {
  return (
    <>
      <Meta
        title={`${props.postData.title} - por ${props.writer.name} - Nuancias`}
        description={props.postData.preview}
      />
      <ArticleJsonLd
        url={
          process.env.NEXT_PUBLIC_SITE_URL +
          makePostLink(props.writer.username, props.postData.slug)
        }
        title={props.postData.title}
        description={props.postData.preview}
        images={[props.postData.image.src]}
        datePublished={props.postData.publishedAt}
        authorName={[
          {
            name: props.writer.name,
            url:
              process.env.NEXT_PUBLIC_SITE_URL +
              makeWriterLink(props.writer.username),
          },
        ]}
        publisherName="Nuancias"
        publisherLogo={
          process.env.NEXT_PUBLIC_SITE_URL + '/images/meta-tag-image-logo.jpg'
        }
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
