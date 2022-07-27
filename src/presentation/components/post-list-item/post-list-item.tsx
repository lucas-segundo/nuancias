import { PostCardModel } from 'domain/models'
import Image from 'next/image'
import { makePtBRDate } from '../post-card/helpers'
import { renderPostTagsToListItems } from '../post-tag/helpers'

export type PostListItemProps = {
  post: PostCardModel.Model
}

export const PostListItem = ({ post }: PostListItemProps) => {
  const tagsList = renderPostTagsToListItems({
    tags: post.tags,
    cssClassName: 'mt-2 ml-1',
  })

  return (
    <article className="flex justify-between cursor-pointer">
      <div>
        <a className="flex items-center mb-2">
          <Image
            className="rounded-full"
            src={post.writer.avatar.src}
            width={20}
            height={20}
            alt={'Imagem do usuário'}
          />

          <span className="ml-2 text-xs font-semibold">{post.writer.name}</span>
        </a>
        <a>
          <h4 className="font-bold text-sm md:text-base">{post.title}</h4>
        </a>
        <ul className="flex flex-wrap mb-1">{tagsList}</ul>
        <span className="text-xs text-gray-600">
          {makePtBRDate(post.publishedAt)}
        </span>
      </div>
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
    </article>
  )
}
