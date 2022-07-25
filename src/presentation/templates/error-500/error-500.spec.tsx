import { render, screen } from '@testing-library/react'
import { SearchPosts } from 'domain/use-cases'
import { Error500 } from '..'

const searchPostsMocked: jest.Mocked<SearchPosts> = {
  getAllByText: jest.fn(),
}

describe('<Error500 />', () => {
  it('should render correctly', () => {
    render(<Error500 searchPosts={searchPostsMocked} />)

    expect(screen.getByText('500')).toBeInTheDocument()
  })
})
