import { render, screen } from '@testing-library/react'
import { makeUserCommonMock } from 'domain/models/common/user/mock'
import { makePostPageMock } from 'domain/models/post/mock'
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
        userData={makeUserCommonMock()}
        postData={makePostPageMock()}
      />
    )

    expect(screen.getByAltText(/usuário/)).toBeInTheDocument()
  })
})
