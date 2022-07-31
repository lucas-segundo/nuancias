import { render, screen } from '@testing-library/react'
import { makePostPreviewMock } from 'domain/models/post/preview/mock'
import { SearchPosts } from 'domain/use-cases/post'
import { Home } from '..'

const searchPostsMocked: jest.Mocked<SearchPosts> = {
  getAllByText: jest.fn(),
}

const makeFakePosts = () => [makePostPreviewMock(), makePostPreviewMock()]

describe('<Home />', () => {
  it('should render correctly', () => {
    render(<Home searchPosts={searchPostsMocked} posts={makeFakePosts()} />)

    expect(screen.getAllByRole('article')[0]).toBeInTheDocument()
  })
})
