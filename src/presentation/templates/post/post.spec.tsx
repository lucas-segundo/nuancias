import { render, screen } from '@testing-library/react'
import { makePostPageMock } from 'domain/models/post/post-page/mock'
import { makeWriterCardMock } from 'domain/models/writer/writer-card/mock'
import { SearchPosts } from 'domain/use-cases/post'
import { Post } from '..'

const searchPostsMocked: jest.Mocked<SearchPosts> = {
  getAllByText: jest.fn(),
}

describe('<Post />', () => {
  it('should render correctly', () => {
    render(
      <Post
        searchPosts={searchPostsMocked}
        writer={makeWriterCardMock()}
        postData={makePostPageMock()}
      />
    )

    expect(screen.getByAltText(/usuário/)).toBeInTheDocument()
  })
})
