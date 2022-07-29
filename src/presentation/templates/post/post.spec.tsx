import { render, screen } from '@testing-library/react'
import { makePostPageMock } from 'domain/models/post/post-page/mock'
import { makeWriterCardMock } from 'domain/models/writer/writer-card/mock'
import { SearchPosts } from 'domain/use-cases'
import { Post } from '..'

const searchPostsMocked: jest.Mocked<SearchPosts> = {
  getAllByText: jest.fn(),
}

describe('<Post />', () => {
  it('should render correctly', () => {
    render(
      <Post
        searchPosts={searchPostsMocked}
        userData={makeWriterCardMock()}
        postData={makePostPageMock()}
      />
    )

    expect(screen.getByAltText(/usuário/)).toBeInTheDocument()
  })
})
