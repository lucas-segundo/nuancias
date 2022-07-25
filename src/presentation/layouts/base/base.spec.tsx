import { render, screen } from '@testing-library/react'
import { SearchPosts } from 'domain/use-cases'
import { Base } from './base'

const searchPostsMocked: jest.Mocked<SearchPosts> = {
  getAllByText: jest.fn(),
}

describe('<Base />', () => {
  it('should render correctly', () => {
    render(<Base searchPosts={searchPostsMocked}>Base</Base>)

    expect(screen.getByText('Base')).toBeInTheDocument()
  })
})
