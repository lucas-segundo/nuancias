import { TagPreviewModel } from 'domain/models'
import { renderPostTagsToListItems } from '../post-tag/helpers'

export type GroupedTagsProps = {
  tags?: TagPreviewModel.Model[]
}

export const GroupedTags = (props: GroupedTagsProps) => {
  const tagsList = props.tags
    ? renderPostTagsToListItems({
        tags: props.tags,
        cssClassName: 'm-1',
      })
    : 'Nenhuma Nuancia produzida.'

  return (
    <div className="flex justify-center md:mx-8 mb-7 md:mb-0">
      <div>
        <div className="border border-cyan-200 p-4 rounded">
          <div className="mb-5">
            <h3 className="text-xl lg:text-2xl font-bold">Nuancias</h3>
            <div className="space-y-1">
              <span className="bg-cyan-400 w-10 lg:w-20 h-0.5 block"></span>
              <span className="bg-fuchsia-400 w-5 lg:w-10 h-0.5 block"></span>
            </div>
          </div>
          <ul className="flex flex-wrap mb-2">{tagsList}</ul>
        </div>
      </div>
    </div>
  )
}
