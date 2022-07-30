import { render, screen } from '@testing-library/react'
import { makeWriterPageMock } from 'domain/models/writer/writer-page/mock'
import { SearchPosts } from 'domain/use-cases'

import { WriterPosts } from './writer-posts'

const searchPostsMocked: jest.Mocked<SearchPosts> = {
  getAllByText: jest.fn(),
}

describe('<WriterPosts />', () => {
  it('should render the heading', () => {
    render(
      <WriterPosts
        searchPosts={searchPostsMocked}
        writer={makeWriterPageMock()}
      />
    )

    expect(screen.getByText(/histórias/i)).toBeInTheDocument()
  })
})
