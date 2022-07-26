import { SearchPosts } from 'domain/use-cases'
import { useGetPostsByText } from 'presentation/hooks'
import { useEffect, useState } from 'react'
import { renderLoadingPostItems, renderPostItems } from './helpers'

export type SearchPostsFieldProps = {
  searchPosts: SearchPosts
}

export const SearchPostsField = ({ searchPosts }: SearchPostsFieldProps) => {
  const [textToSearch, setTextToSearch] = useState('')
  const { posts, isLoading, error, getPosts } = useGetPostsByText(searchPosts)
  const isAllowToSearch = textToSearch.length > 4

  useEffect(() => {
    if (isAllowToSearch) {
      const timeOutId = setTimeout(async () => {
        getPosts(textToSearch)
      }, 500)

      return () => clearTimeout(timeOutId)
    }
  }, [getPosts, textToSearch, isAllowToSearch])

  const handleRenderPostItems = () => {
    if (posts) return renderPostItems(posts)

    if (isLoading) return renderLoadingPostItems()

    if (error)
      return (
        <div className="text-sm px-2 py-1">
          <span>{error}</span>
        </div>
      )
  }

  return (
    <div className="relative mx-2 md:mx-6">
      <div className="flex border rounded border-cyan-100">
        <input
          className="border-none focus:outline-none h-8 w-60 md:w-80 p-1 text-sm"
          placeholder="Pesquisar Histórias"
          onChange={(event) => setTextToSearch(event.target.value)}
          value={textToSearch}
        />
      </div>
      <div
        className={`bg-white absolute w-full border rounded-b shadow overflow-y ${
          isAllowToSearch ? '' : 'hidden'
        }`}
        aria-busy={isLoading}
        aria-hidden={!isAllowToSearch}
      >
        {handleRenderPostItems()}
      </div>
    </div>
  )
}
