import { PostPreviewModel } from 'domain/models'
import Image from 'next/image'
import Link from 'next/link'
import { makePostLink, makeWriterLink } from 'presentation/routers/helpers'
import { renderPostTagsToListItems } from '../post-tag/helpers'
import { makePtBRDate } from './helpers'

export type PostCardProps = {
  post: Omit<PostPreviewModel.Model, 'tags' | 'writer'>
  tags?: PostPreviewModel.Tag[]
  writer: PostPreviewModel.Writer
  postImage: PostPreviewModel.Image
}

export const PostCard = ({ post, writer, tags, postImage }: PostCardProps) => {
  const tagsList =
    tags &&
    renderPostTagsToListItems({
      tags: tags,
      cssClassName: 'm-1',
    })

  return (
    <article data-cy="last-post" className="cursor-pointer">
      <Link href={makePostLink(writer.username, post.slug)}>
        <a aria-label="Link para história">
          <figure>
            <Image
              className="rounded"
              src={postImage.src}
              width={400}
              height={300}
              objectFit="cover"
              quality={100}
              alt={'Imagem da história'}
            />
          </figure>
        </a>
      </Link>
      <Link href={makeWriterLink(writer.username)}>
        <a
          aria-label="Link para o escritor"
          data-cy="link-to-writer"
          className="flex items-center my-2"
        >
          <Image
            src={writer.avatar.src}
            width={30}
            height={30}
            className="rounded-full"
            objectFit="cover"
            alt="Imagem do escritor"
          />
          <div className="space-x-1 text-xs">
            <span className="font-semibold ml-2">{writer.name}</span>
            <span>-</span>
            <span className="text-gray-600">
              {makePtBRDate(post.publishedAt)}
            </span>
          </div>
        </a>
      </Link>
      <ul className="flex flex-wrap mb-2">{tagsList}</ul>
      <Link href={makePostLink(writer.username, post.slug)}>
        <a className="space-y-3">
          <h3 className="text-xl font-bold">{post.title}</h3>
          <p>{post.preview}</p>
        </a>
      </Link>
    </article>
  )
}
