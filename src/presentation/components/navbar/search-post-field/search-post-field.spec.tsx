import { faker } from '@faker-js/faker'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { makeSearchedPostMock } from 'domain/models/post/searched-post/mock'

import { SearchPosts } from 'domain/use-cases/post'
import { SearchPostsField } from './search-post-field'

const searchPostsMocked: jest.Mocked<SearchPosts> = {
  getAllByText: jest.fn(),
}

const makeSut = () => {
  render(<SearchPostsField searchPosts={searchPostsMocked} />)
}

const userSearchPost = async (fakeText = faker.random.words()) => {
  const user = userEvent.setup()
  await user.type(screen.getByPlaceholderText(/pesquisar histórias/i), fakeText)
}

describe('<SearchPosts />', () => {
  it('should call searchPosts with correct values', async () => {
    makeSut()

    const fakeText = faker.random.words()
    await userSearchPost(fakeText)

    await waitFor(
      () => expect(searchPostsMocked.getAllByText).toBeCalledWith(fakeText),
      {
        interval: 600,
      }
    )
  })

  it('should show searched articles', async () => {
    makeSut()

    const fakeText = faker.random.words()
    const fakesSearchedPost = [
      makeSearchedPostMock(fakeText),
      makeSearchedPostMock(fakeText),
    ]
    searchPostsMocked.getAllByText.mockResolvedValueOnce(fakesSearchedPost)

    await userSearchPost(fakeText)

    const articles = await screen.findAllByRole('article')
    articles.forEach((articles) => {
      expect(articles.firstChild).toHaveTextContent(fakeText)
    })
  })

  it('should handle no content found on search', async () => {
    makeSut()

    searchPostsMocked.getAllByText.mockResolvedValueOnce([])
    await userSearchPost()

    expect(
      await screen.findByText(/nenhuma história encontrada/i)
    ).toBeInTheDocument()
  })

  it('should handle error if searching fails', async () => {
    makeSut()

    searchPostsMocked.getAllByText.mockRejectedValue(
      new Error('ocorreu um erro')
    )
    await userSearchPost()

    expect(await screen.findByText(/ocorreu um erro/i)).toBeInTheDocument()
  })

  it('should dropdown disappear after erase the input text', async () => {
    makeSut()

    const fakesSearchedPost = [makeSearchedPostMock(), makeSearchedPostMock()]
    searchPostsMocked.getAllByText.mockResolvedValueOnce(fakesSearchedPost)

    const user = userEvent.setup()

    const searchInput = screen.getByPlaceholderText(/pesquisar histórias/i)
    await user.type(searchInput, faker.random.words())

    const articles = await screen.findAllByRole('article', undefined, {
      interval: 600,
    })
    expect(articles.length).toBeGreaterThan(0)

    await user.clear(searchInput)

    expect(screen.queryAllByRole('article')).toEqual([])
  })
})
