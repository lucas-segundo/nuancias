import { TagPreviewModel } from 'domain/models'
import { CgTag } from 'react-icons/cg'

export type TagCardProps = {
  tag: TagPreviewModel.Model
}

export const TagCard = (props: TagCardProps) => {
  return (
    <div className="flex items-center my-7">
      <CgTag size={30} className="text-fuchsia-500" aria-label="Tag" />
      <h1 className="ml-2 text-3xl font-bold text-gray-600">
        {props.tag.title}
      </h1>
    </div>
  )
}
