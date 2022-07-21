import { render, screen } from '@testing-library/react'

import LoadingPage from './loading-page'

describe('<LoadingPage />', () => {
  it('should render the heading', () => {
    render(<LoadingPage />)

    expect(screen.getByText(/carregando/i)).toBeInTheDocument()
  })
})
