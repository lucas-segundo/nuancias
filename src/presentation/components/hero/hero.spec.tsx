import { render, screen } from '@testing-library/react'

import { Hero } from './hero'

describe('<Hero />', () => {
  it('should render the heading', () => {
    render(<Hero />)

    expect(screen.getByAltText(/balão/i)).toBeInTheDocument()
  })
})
