import { render, screen } from '@testing-library/react'
import { makeTagDetails } from 'domain/models/tag/details/mock'
import { SearchPosts } from 'domain/use-cases'

import { TagPosts } from './tag-posts'

const searchPostsMocked: jest.Mocked<SearchPosts> = {
  getAllByText: jest.fn(),
}

describe('<TagPosts />', () => {
  it('should render correctly', () => {
    render(<TagPosts searchPosts={searchPostsMocked} tag={makeTagDetails()} />)

    expect(
      screen.getByRole('heading', { name: /Histórias/i })
    ).toBeInTheDocument()
    expect(screen.getAllByRole('article').length).toBeGreaterThan(0)
  })
})
