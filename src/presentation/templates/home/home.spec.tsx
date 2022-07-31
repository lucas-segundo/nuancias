import { render, screen } from '@testing-library/react'
import { makePostCardsMock } from 'domain/models/post/post-card/mock'
import { SearchPosts } from 'domain/use-cases/post'
import { Home } from '..'

const searchPostsMocked: jest.Mocked<SearchPosts> = {
  getAllByText: jest.fn(),
}

describe('<Home />', () => {
  it('should render correctly', () => {
    render(<Home searchPosts={searchPostsMocked} posts={makePostCardsMock()} />)

    expect(screen.getAllByRole('article')[0]).toBeInTheDocument()
  })
})
