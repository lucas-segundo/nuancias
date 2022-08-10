import { TagPreviewModel } from 'domain/models'

export type PostTagProps = {
  tagData: TagPreviewModel.Model
}

export const PostTag = ({ tagData }: PostTagProps) => {
  return (
    <span className="h-5 px-3 py-1 bg-gray-200 border rounded-md text-xs text-gray-900 font-semibold">
      {tagData.title}
    </span>
  )
}
