import { PostContentModel } from 'domain/models'
import Image from 'next/image'
import { makePtBRDate } from '../post-card/helpers'
import { renderPostTagsToListItems } from '../post-tag/helpers'

export type PostContentProps = {
  postData: PostContentModel.Model
}

export const PostContent = ({ postData }: PostContentProps) => {
  const tagsList = renderPostTagsToListItems({
    tags: postData.tags,
    cssClassName: 'm-1',
  })

  return (
    <article>
      <h1 className="text-4xl font-bold mt-5 mb-2">{postData.title}</h1>
      <span className="text-xs text-gray-600">
        {makePtBRDate(postData.publishedAt)}
      </span>
      <ul className="flex flex-wrap my-2">{tagsList}</ul>
      <figure className="relative h-80 md:h-[429px]">
        <Image
          className="rounded"
          src={postData.image.src}
          objectFit="cover"
          layout="fill"
          quality={100}
          alt={'Imagem principal da história'}
        />
      </figure>
      <div
        id="article-content"
        className="my-5"
        dangerouslySetInnerHTML={{ __html: postData.content }}
      />
    </article>
  )
}
