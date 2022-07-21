import { TagModel } from 'domain/models'

export type PostTagProps = {
  tagData: TagModel
}

const PostTag = ({ tagData }: PostTagProps) => {
  return (
    <span className="h-5 px-3 py-1 bg-gray-200 border rounded-md text-xs text-gray-500 font-semibold">
      {tagData.title}
    </span>
  )
}

export default PostTag
