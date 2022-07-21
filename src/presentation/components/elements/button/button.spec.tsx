import { render, screen } from '@testing-library/react'

import Button from './button'

describe('<Button />', () => {
  it('should render loading button', () => {
    render(<Button text="Button" className="mt-1" isLoading />)

    const buttonRender = screen.getByRole('button', { name: /Button/i })
    expect(buttonRender).toBeDisabled()
  })

  it('should render outline', () => {
    render(<Button text="Button" className="mt-1" isOutline />)

    const buttonRender = screen.getByRole('button', { name: /Button/i })
    expect(buttonRender).toHaveClass('text-black bg-white')
  })
})
