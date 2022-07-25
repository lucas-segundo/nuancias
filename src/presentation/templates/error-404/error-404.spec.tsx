import { render, screen } from '@testing-library/react'
import { SearchPosts } from 'domain/use-cases'
import { Error404 } from '..'

const searchPostsMocked: jest.Mocked<SearchPosts> = {
  getAllByText: jest.fn(),
}

describe('<Error404 />', () => {
  it('should render correctly', () => {
    render(<Error404 searchPosts={searchPostsMocked} />)

    expect(screen.getByText('404')).toBeInTheDocument()
  })
})
