import { render, screen } from '@testing-library/react'

import { Footer } from './footer'

describe('<Footer />', () => {
  it('should render the heading', () => {
    render(<Footer />)

    expect(screen.getByLabelText(/rodapé da página/i)).toBeInTheDocument()
  })
})
