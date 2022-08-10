import { PostPreviewModel } from 'domain/models'
import Image from 'next/image'
import Link from 'next/link'
import { makePostLink, makeWriterLink } from 'presentation/routers/helpers'
import { makePtBRDate } from '../post-card/helpers'
import { renderPostTagsToListItems } from '../post-tag/helpers'

export type PostListItemProps = {
  post: PostPreviewModel.Model
}

export const PostListItem = ({ post }: PostListItemProps) => {
  const tagsList = renderPostTagsToListItems({
    tags: post.tags,
    cssClassName: 'mt-2 ml-1',
  })

  return (
    <article className="flex justify-between cursor-pointer">
      <div>
        <Link href={makeWriterLink(post.writer.username)}>
          <a className="flex items-center mb-2">
            <Image
              className="rounded-full"
              src={post.writer.avatar.src}
              width={20}
              height={20}
              objectFit="cover"
              alt={'Imagem do escritor'}
            />

            <span className="ml-2 text-xs font-semibold">
              {post.writer.name}
            </span>
          </a>
        </Link>
        <Link href={makePostLink(post.writer.username, post.slug)}>
          <a>
            <h1 className="font-bold text-sm md:text-base">{post.title}</h1>
          </a>
        </Link>
        <ul className="flex flex-wrap mb-1">{tagsList}</ul>
        <span className="text-xs text-gray-600">
          {makePtBRDate(post.publishedAt)}
        </span>
      </div>
      <Link href={makePostLink(post.writer.username, post.slug)}>
        <a>
          <figure className="flex items-center ml-4 w-24">
            <Image
              src={post.image.src}
              width={100}
              height={100}
              objectFit="cover"
              alt="Imagem da história"
            />
          </figure>
        </a>
      </Link>
    </article>
  )
}
