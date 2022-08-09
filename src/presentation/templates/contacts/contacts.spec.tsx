import { render, screen } from '@testing-library/react'
import { SearchPosts } from 'domain/use-cases'

import { Contacts } from './contacts'

const searchPostsMocked: jest.Mocked<SearchPosts> = {
  getAllByText: jest.fn(),
}

describe('<Contacts />', () => {
  it('should render the heading', () => {
    render(<Contacts searchPosts={searchPostsMocked} />)

    expect(
      screen.getByRole('heading', { name: /contatos/i })
    ).toBeInTheDocument()
  })
})
