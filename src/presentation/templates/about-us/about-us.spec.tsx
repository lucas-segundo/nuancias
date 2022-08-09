import { render, screen } from '@testing-library/react'
import { SearchPosts } from 'domain/use-cases'

import { AboutUs } from './about-us'

const searchPostsMocked: jest.Mocked<SearchPosts> = {
  getAllByText: jest.fn(),
}

describe('<AboutUs />', () => {
  it('should render correctly', () => {
    render(<AboutUs searchPosts={searchPostsMocked} />)

    expect(screen.getByRole('heading', { name: /sobre/i })).toBeInTheDocument()
  })
})
