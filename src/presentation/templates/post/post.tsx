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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  const postLink =
    siteUrl + makePostLink(props.writer.username, props.postData.slug)
  const writerLink = siteUrl + makeWriterLink(props.writer.username)

  return (
    <>
      <Meta
        title={`${props.postData.title} - por ${props.writer.name} - Nuancias`}
        description={props.postData.preview}
        openGraph={{
          url: postLink,
          locale: 'pt-BR',
          site_name: 'Nuancias',
          type: 'article',
          article: {
            publishedTime: props.postData.publishedAt,
            authors: [writerLink],
            tags: props.postData.tags.map((tag) => tag.title),
          },
          images: [
            {
              url: props.postData.image.src,
              width: 1200,
              height: 630,
              alt: 'Image da história',
            },
          ],
        }}
      />
      <ArticleJsonLd
        url={postLink}
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
        publisherLogo={siteUrl + '/images/meta-tag-image-logo.jpg'}
      />
      <Base searchPosts={props.searchPosts}>
        <section
          data-cy="post-page"
          className="default-screen-margin-post mt-10 mb-80"
        >
          <WriterCard writer={props.writer} />
          <PostContent postData={props.postData} />
        </section>
      </Base>
    </>
  )
}
