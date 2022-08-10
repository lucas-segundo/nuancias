import { render, screen } from '@testing-library/react'
import { SearchPosts } from 'domain/use-cases'
import { Navbar } from './navbar'
import userEvent from '@testing-library/user-event'

const searchPostsMocked: jest.Mocked<SearchPosts> = {
  getAllByText: jest.fn(),
}

const makeSut = () => {
  render(<Navbar searchPosts={searchPostsMocked} />)
  const user = userEvent.setup()

  return { user }
}

describe('<Navbar />', () => {
  it('should render correctly', () => {
    makeSut()
  })

  it('should open and close navegation bar if is mobile', async () => {
    const { user } = makeSut()

    await user.click(screen.getByLabelText(/abrir barra/i))
    expect(screen.getByTestId('navbar-items')).not.toHaveAttribute('hidden')

    await user.click(screen.getByLabelText(/fechar barra/i))
    expect(screen.queryByTestId('navbar-items')).toHaveAttribute('hidden')
  })
})
