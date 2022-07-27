import { PostCardModel } from 'domain/models'
import Image from 'next/image'
import { makePtBRDate } from '../post-card/helpers'
import { renderPostTagsToListItems } from '../post-tag/helpers'

export type PostListItemProps = {
  post: PostCardModel.Model
}

const PostListItem = ({ post }: PostListItemProps) => {
  const tagsList = renderPostTagsToListItems({
    tags: post.tags,
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
          <h4 className="font-bold text-sm md:text-base mb-2">{post.title}</h4>
        </a>
        <ul className="flex space-x-1 mb-1">{tagsList}</ul>
        <span className="text-xs text-gray-600">
          {makePtBRDate(post.publishedAt)}
        </span>
      </div>
      <a className="flex items-center ml-4 min-w-80">
        <figure className="w-28">
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

export default PostListItem
