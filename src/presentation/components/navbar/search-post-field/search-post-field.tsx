import { SearchedPost } from 'domain/models'
import { SearchPosts } from 'domain/use-cases'
import { useCallback, useEffect, useState } from 'react'
import {
  PostsItemDropdown,
  renderLoadingPostItems,
  renderPostItems,
} from './helpers'

export type SearchPostsFieldProps = {
  searchPosts: SearchPosts
}

const SearchPostsField = ({ searchPosts }: SearchPostsFieldProps) => {
  const [textToSearch, setTextToSearch] = useState('')
  const [posts, setPosts] = useState<SearchedPost.Model[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({
    searchPostError: '',
  })

  const handleSearchForPosts = useCallback(async () => {
    try {
      const response = await searchPosts.getAllByText(textToSearch)
      setPosts(response)
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message
        setErrors((prev) => ({ ...prev, searchPostError: errorMessage }))
      }
    }
  }, [searchPosts, textToSearch])

  useEffect(() => {
    setPosts(null)
    if (textToSearch.length > 4) {
      const timeOutId = setTimeout(async () => {
        setIsLoading(true)
        await handleSearchForPosts()
        setIsLoading(false)
      }, 500)

      return () => clearTimeout(timeOutId)
    }
  }, [textToSearch, handleSearchForPosts])

  const handleRenderPostItems = () => {
    if (posts)
      return <PostsItemDropdown>{renderPostItems(posts)}</PostsItemDropdown>

    if (isLoading)
      return <PostsItemDropdown>{renderLoadingPostItems()}</PostsItemDropdown>

    if (errors.searchPostError)
      return (
        <PostsItemDropdown>
          <div className="text-sm px-2 py-1">
            <span>{errors.searchPostError}</span>
          </div>
        </PostsItemDropdown>
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
      {handleRenderPostItems()}
    </div>
  )
}

export default SearchPostsField
