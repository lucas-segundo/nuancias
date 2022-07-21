import { render, screen } from '@testing-library/react'
import { makeUserCommonMock } from 'domain/models/common/user/mock'
import { makeUserLink } from 'presentation/routers/helpers'

import UserCard from './user-card'

const makeSut = (userData = makeUserCommonMock()) => {
  render(<UserCard userData={userData} />)
}

describe('<UserCard />', () => {
  it('should render with props', () => {
    const userData = makeUserCommonMock()
    makeSut(userData)

    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      makeUserLink(userData.username)
    )
    expect(screen.getByAltText(/usuário principal/i)).toBeInTheDocument()
    expect(screen.getByText(userData.name)).toBeInTheDocument()
    expect(screen.getByText(userData.bio)).toBeInTheDocument()
  })
})
