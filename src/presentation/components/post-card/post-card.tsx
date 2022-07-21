import { PostCardModel } from 'domain/models'
import Image from 'next/image'
import Link from 'next/link'
import { makePostLink } from 'presentation/routers/helpers'
import { renderPostTagsToListItems } from '../post-tag/helpers'
import { makePtBRDate } from './helpers'

export type PostCardProps = {
  post: PostCardModel.Model
}

const PostCard = ({ post }: PostCardProps) => {
  const tagsList = renderPostTagsToListItems({
    tags: post.tags,
    cssClassName: 'm-1',
  })

  return (
    <article className="cursor-pointer">
      <Link href={makePostLink(post.writer.username, post.slug)}>
        <a role="link-to-post">
          <figure>
            <Image
              className="rounded"
              src={post.image.src}
              width={400}
              height={300}
              objectFit="cover"
              quality={100}
              alt={'Imagem da história'}
            />
          </figure>
        </a>
      </Link>
      <div className="flex items-center my-2">
        <Image
          src={post.writer.avatar.src}
          width={20}
          height={20}
          className="rounded-full"
          alt="Imagem do usuário"
        />
        <div className="space-x-1 text-xs">
          <span className="font-semibold ml-2">{post.writer.name}</span>
          <span>-</span>
          <span className="text-gray-600">
            {makePtBRDate(post.publishedAt)}
          </span>
        </div>
      </div>
      <ul className="flex flex-wrap mb-2">{tagsList}</ul>
      <Link href={makePostLink(post.writer.username, post.slug)}>
        <a className="space-y-3">
          <h3 className="text-xl font-bold">{post.title}</h3>
          <p>{post.preview}</p>
        </a>
      </Link>
    </article>
  )
}

export default PostCard
