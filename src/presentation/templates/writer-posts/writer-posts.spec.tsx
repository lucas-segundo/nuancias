import { render, screen } from '@testing-library/react'
import { makeWriterDetailsMock } from 'domain/models/writer/details/mock'
import { SearchPosts } from 'domain/use-cases/post'

import { WriterPosts } from './writer-posts'

const searchPostsMocked: jest.Mocked<SearchPosts> = {
  getAllByText: jest.fn(),
}

describe('<WriterPosts />', () => {
  it('should render the heading', () => {
    render(
      <WriterPosts
        searchPosts={searchPostsMocked}
        writer={makeWriterDetailsMock()}
      />
    )

    expect(screen.getByText(/histórias/i)).toBeInTheDocument()
  })
})
