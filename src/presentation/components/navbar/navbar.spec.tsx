import { render } from '@testing-library/react'
import { SearchPosts } from 'domain/use-cases'
import { Navbar } from './navbar'

const searchPostsMocked: jest.Mocked<SearchPosts> = {
  getAllByText: jest.fn(),
}

describe('<Navbar />', () => {
  it('should render correctly', () => {
    render(<Navbar searchPosts={searchPostsMocked} />)
  })
})
