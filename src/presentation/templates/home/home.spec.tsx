import { render, screen } from '@testing-library/react'
import { makePostCardsMock } from 'domain/models/post/mock'
import { SearchPosts } from 'domain/use-cases'
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
