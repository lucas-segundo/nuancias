import { SearchedPostModel } from 'domain/models'
import { SearchPosts } from 'domain/use-cases'
import { useCallback, useState } from 'react'

export const useGetPostsByText = (searchPosts: SearchPosts) => {
  const [posts, setPosts] = useState<SearchedPostModel.Model[] | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const getPosts = useCallback(
    async (text: string) => {
      setIsLoading(true)
      try {
        const response = await searchPosts.getAllByText(text)
        setPosts(response)
      } catch (error) {
        if (error instanceof Error) {
          const errorMessage = error.message
          setError(errorMessage)
        }
      }
      setIsLoading(false)
    },
    [searchPosts]
  )

  return {
    posts,
    isLoading,
    error,
    getPosts,
  }
}
