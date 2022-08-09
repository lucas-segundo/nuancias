import { render, screen } from '@testing-library/react'
import { SearchPosts } from 'domain/use-cases'
import { Navbar } from './navbar'
import { checkIsMobileScreen } from 'presentation/helpers'

jest.mock('presentation/helpers')

const searchPostsMocked: jest.Mocked<SearchPosts> = {
  getAllByText: jest.fn(),
}

const makeSut = () => {
  render(<Navbar searchPosts={searchPostsMocked} />)
}

describe('<Navbar />', () => {
  it('should render correctly', () => {
    makeSut()
  })

  it('should not hide navegation items in desktop', () => {
    const checkIsMobileScreenMocked = checkIsMobileScreen as jest.Mock
    checkIsMobileScreenMocked.mockReturnValue(false)

    makeSut()

    expect(screen.getByRole('navbar-items')).toBeVisible()
  })

  it('should hide navegation items in mobile', () => {
    const checkIsMobileScreenMocked = checkIsMobileScreen as jest.Mock
    checkIsMobileScreenMocked.mockReturnValue(true)

    makeSut()

    expect(screen.queryByRole('navbar-items')).toBeNull()
  })
})
