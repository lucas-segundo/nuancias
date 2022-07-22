import { render, screen } from '@testing-library/react'

import { InputField } from './input-field'

describe('<InputField />', () => {
  it('should render the element', () => {
    render(<InputField label="InputField" />)

    const element = screen.getByText(/InputField/i)
    expect(element).toBeInTheDocument()
  })

  it('should render the element with css', () => {
    render(<InputField className="mt-1" label="InputField" />)

    const element = screen.getByLabelText(/InputField/i)
    expect(element).toHaveClass('mt-1')
  })

  it('should have only border bottom', () => {
    render(<InputField label="InputField" isBorderOnlyBottom />)

    const element = screen.getByLabelText(/InputField/i)
    expect(element).toHaveClass('border-b')
  })
})
